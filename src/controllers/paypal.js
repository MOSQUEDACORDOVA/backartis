var express = require("express");
var request = require("request");
const BD_conect = require("../models/modulos_");
let fs = require("fs");
// Add your credentials:
// Add your client ID and secret
var CLIENT_ID =
  "";
var SECRET =
  "";
var PAYPAL_API = "https://api-m.paypal.com";
express();
// Set up the payment:
// 1. Set up a URL to handle requests from the PayPal button
exports.crearpago = async (req, res, next) => {
  const { amount, product, userId } = req.body;
  // console.log(product)
  // 2. Call /v1/payments/payment to set up the payment
  request.post(
    PAYPAL_API + "/v1/payments/payment",
    {
      auth: {
        user: CLIENT_ID,
        pass: SECRET,
      },
      body: {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        transactions: [
          {
            amount: {
              total: parseFloat(amount),
              currency: "USD",
            },
          },
        ],
        redirect_urls: {
          return_url: "https://example.com",
          cancel_url: "https://example.com",
        },
      },
      json: true,
    },
    function (err, response) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      // 3. Return the payment ID to the client
      res.json({
        id: response.body.id,
      });
    }
  );
};
// Execute the payment:
// 1. Set up a URL to handle requests from the PayPal button.
exports.procesar = async (req, res, next) => {
  const { amount, product } = req.body;
  const userId = res.locals.user.id;
  console.log(userId);
  // 2. Get the payment ID and the payer ID from the request body.
  var paymentID = req.body.paymentID;
  var payerID = req.body.payerID;
  // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
  request.post(
    PAYPAL_API + "/v1/payments/payment/" + paymentID + "/execute",
    {
      auth: {
        user: CLIENT_ID,
        pass: SECRET,
      },
      body: {
        payer_id: payerID,
        transactions: [
          {
            amount: {
              total: parseFloat(amount),
              currency: "USD",
            },
          },
        ],
      },
      json: true,
    },
    function (err, response) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      // 4. Return a success response to the client
      res.json({
        status: "success",
      });
      console.log(amount);
      let status = response.body.state;
      let numero_referencia = response.body.id;

      if (product == "Backcoin-Wallet") {
        console.log(product);
      } else {
        BD_conect.actualizarUserMembership(userId, product).then(() => {
          res.locals.user.membership = product;
          //res.render('complete_pay', {product, dashboardPage:true});
          BD_conect.guardarPago(
            userId,
            status,
            numero_referencia,
            amount,
            product,
            "Paypal"
          ).then(() => {
            //req.user.membership=producto;

            res.render("complete_pay", { product, dashboardPage: true });
          }).catch((err) => {
            console.log(err)
            let msg = "Error en sistema";
            return res.redirect("/?msg=" + msg);
          });
        });
      }
    }
  );
};
// Run `node ./server.js` in your terminal

exports.crearOrden = async (req, res, next) => {
  //console.log(req.params.token)
  var token = req.params.token;
  var amount = req.params.amount;
  var product = req.params.product;
  console.log(product);
  // 2. Call /v1/payments/payment to set up the payment
  request.post(
    "https://api-m.sandbox.paypal.com/v2/checkout/orders",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "PayPal-Partner-Attribution-Id": "FLAVORsb-qjuoo6097065_MP",
      },
      body: {
        intent: "CAPTURE",
        purchase_units: [
          {
            description: product,
            amount: {
              value: parseFloat(amount),
              currency_code: "USD",
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: parseFloat(amount),
                },
              },
            },
            items: [
              {
                unit_amount: {
                  currency_code: "USD",
                  value: parseFloat(amount),
                },
                quantity: "1",
                name: product,
              },
            ],
          },
        ],
      },
      json: true,
    },
    function (err, response, body) {
      if (err) {
        console.error(err);
        let fecha = new Date()
      fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
        if (error)
          console.log(error);
        else
          console.log('El archivo fue creado');
      });
        return res.sendStatus(500);
      }
      console.log(response.body);
      res.json({
        id: body.id,
      });
    }
  );
};

exports.aprobarOrden = async (req, res, next) => {
  var OrderID = req.params.id;
  var token = req.params.token;
  var amount = req.params.amount;
  var product = req.params.product;
  var modo = req.params.modo;
  console.log(token);
  request.post(
    "https://api-m.sandbox.paypal.com/v2/checkout/orders/" +
      OrderID +
      "/capture",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "PayPal-Partner-Attribution-Id": "FLAVORsb-qjuoo6097065_MP",
      },
    },
    function (err, response, body) {
      if (err) {
        console.error(err);
        let fecha = new Date()
      fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
        if (error)
          console.log(error);
        else
          console.log('El archivo fue creado');
      });
        return res.sendStatus(500);
      }

      let payment = JSON.parse(response.body).purchase_units;

      let numero_referencia = payment[0].payments.captures[0].id;
      let status = payment[0].payments.captures[0].status;
      console.log(status);
      const userId = req.params.id_user;
      let errores = false;
      console.log(product);
      if (product == "Backcoin" || product == "backstore") {
        BD_conect.recargaBackcoin(userId, amount).then((data) => {
          console.log(data + "b");

          if (product == "backstore") {
          } else {
            req.user.backcoins = data;
            console.log(req.user.backcoins);
          }
       
        BD_conect.guardarPago(
          userId,
          status,
          numero_referencia,
          amount,
          product,
          "Paypal"
        ).then((resp) => {
          console.log(resp);
          let fecha = new Date()
          fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
            if (error)
              console.log(error);
            else
              console.log('El archivo fue creado');
          });
         return res.redirect("/dashb/");
        }).catch((err) => {
          console.log(err)
          let fecha = new Date()
      fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
        if (error)
          console.log(error);
        else
          console.log('El archivo fue creado');
      });
          let msg = "Error en sistema";
          return res.redirect("/?msg=" + msg);
        });
 }).catch((err) => {
  console.log(err)
  let fecha = new Date()
      fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
        if (error)
          console.log(error);
        else
          console.log('El archivo fue creado');
      });
  let msg = "Error en sistema";
  return res.redirect("/?msg=" + msg);
});

      } else {
        BD_conect.actualizarUserMembership(userId, product).then(() => {
          res.locals.user.membership = product;
          //res.render('complete_pay', {product, dashboardPage:true});
          BD_conect.guardarPago(
            userId,
            status,
            numero_referencia,
            amount,
            product,
            "Paypal"
          ).then(() => {
            //req.user.membership=producto;
            console.log(res.locals.user.membership);
            BD_conect.guardarPlan_user(userId, product, modo, "Paypal").then(
              (respg) => {
                console.log("aqui redirecciona a send mail");
                return res.redirect("/actualizo_membresia/"+product+"/"+amount+ "/"+modo);
              }
            ).catch((err) => {
              console.log(err)
              let fecha = new Date()
      fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
        if (error)
          console.log(error);
        else
          console.log('El archivo fue creado');
      });
              let msg = "Error en sistema";
              return res.redirect("/?msg=" + msg);
            });
          }).catch((err) => {
      console.log(err)
      let fecha = new Date()
      fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
        if (error)
          console.log(error);
        else
          console.log('El archivo fue creado');
      });
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
        }).catch((err) => {
      console.log(err)
      let fecha = new Date()
      fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
        if (error)
          console.log(error);
        else
          console.log('El archivo fue creado');
      });
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
      }
    }
  ).catch((err) => {
    console.log(err)
    let fecha = new Date()
      fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
        if (error)
          console.log(error);
        else
          console.log('El archivo fue creado');
      });
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });;
};

exports.aprobarOrden2 = async (req, res, next) => {
  var OrderID = req.params.id;
  var token = req.params.token;
  var amount = req.params.amount;
  var product = req.params.product;
  var modo = req.params.modo;
  console.log("entro aqui");
  console.log(JSON.parse(req.body.purchase))

      let payment = JSON.parse(req.body.purchase);

      let numero_referencia = payment[0].payments.captures[0].id;
      let status = payment[0].payments.captures[0].status;
      console.log(status);
      const userId = req.params.id_user;
      let errores = false;
      console.log(product);
      if (product == "Backcoin" || product == "backstore") {
        BD_conect.recargaBackcoin(userId, amount).then((data) => {
          console.log(data + "b");

          if (product == "backstore") {
             req.user.backcoins = data;
            console.log(req.user.backcoins);
          } else {
            req.user.backcoins = data;
            console.log(req.user.backcoins);
          }
       
        BD_conect.guardarPago(
          userId,
          status,
          numero_referencia,
          amount,
          product,
          "Paypal"
        ).then((resp) => {
          console.log(resp);
         return res.redirect("/dashb/");
        }).catch((err) => {
          console.log(err)
          let fecha = new Date()
      fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
        if (error)
          console.log(error);
        else
          console.log('El archivo fue creado');
      });
          let msg = "Error en sistema";
          return res.redirect("/?msg=" + msg);
        });
 }).catch((err) => {
  console.log(err)
  let fecha = new Date()
      fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
        if (error)
          console.log(error);
        else
          console.log('El archivo fue creado');
      });
  let msg = "Error en sistema";
  return res.redirect("/?msg=" + msg);
});

      } else {
        BD_conect.actualizarUserMembership(userId, product).then(() => {
          res.locals.user.membership = product;
          //res.render('complete_pay', {product, dashboardPage:true});
          BD_conect.guardarPago(
            userId,
            status,
            numero_referencia,
            amount,
            product,
            "Paypal"
          ).then(() => {
            //req.user.membership=producto;
            console.log(res.locals.user.membership);
            BD_conect.guardarPlan_user(userId, product, modo, "Paypal").then(
              (respg) => {
                console.log("aqui redirecciona a send mail");
                return res.redirect("/actualizo_membresia/"+product+"/"+amount+ "/"+modo);
              }
            ).catch((err) => {
              console.log(err)
              let fecha = new Date()
      fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
        if (error)
          console.log(error);
        else
          console.log('El archivo fue creado');
      });
              let msg = "Error en sistema";
              return res.redirect("/?msg=" + msg);
            });
          }).catch((err) => {
      console.log(err)
      let fecha = new Date()
      fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
        if (error)
          console.log(error);
        else
          console.log('El archivo fue creado');
      });
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
        }).catch((err) => {
      console.log(err)
      let fecha = new Date()
      fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
        if (error)
          console.log(error);
        else
          console.log('El archivo fue creado');
      });
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
      }
};
