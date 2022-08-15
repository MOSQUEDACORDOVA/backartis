// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const BD_conect = require("../models/modulos_");

var moment = require('moment-timezone');
var request = require("request");
var CLIENT_ID =
  "AXAh-Ze4KzcjXTdOFXJ6U3ZagzU3aM8HUhRSI9Xn10Z8Ac2yXFQg58AbRzaGdfDS0achuY62g6sO_H9c";
var SECRET =
  "ENE0CtubJ5-TSMh1TB9FN5kZW87G37C6tLi0c-c1hG-Zruz_yHKAOPEyllzTd-Lhzcl__PBllJ3-mGsk";
var PAYPAL_API = "https://api-m.paypal.com";

exports.pasarela = async (req, res, next) => {
  var archivo = false;
  var id_gate = false;
  var amount = false;
  var product = false;
  var backstore_sell = false;
  var correo = false, back_product= false
  var modo = "";
  if (req.params.archivo) {
    archivo = req.params.archivo;
    id_gate = req.params.id_gate;
    amount = req.params.costo;
    product = req.params.tipo;
    correo = req.params.correo;
    back_product = req.params.productob;
    var userId = req.params.user_id;
    backstore_sell = true;
    modo = false;
    console.log(modo);
  } else {
    //const {amount, product } = req.body;
    amount = req.body.amount;
    product = req.body.product;
    modo = req.body.modo;
    console.log(modo);
    var userId = res.locals.user.id;
  }

  BD_conect.obtenerTipo_cambio().then((resultado) => {
    let parsed_tipo_cambio = JSON.parse(resultado)[0];

    let monto_soles =
      parseFloat(amount) * parseFloat(parsed_tipo_cambio.tipo_cambio);
    console.log(monto_soles);
    // Agrega credenciales
    mercadopago.configure({
      access_token:
        "TEST-7704156678097466-010904-a33b280de26eb4d1e747cf84848e3706-696588363",
    });
    console.log(modo + 'modo');
    // Crea un objeto de preferencia
    let preference = {
      items: [
        {
          id: userId,
          title: product,
          unit_price: parseFloat(monto_soles),
          quantity: 1,
          //currency_id: 'USD',
        },
      ],
      // ...
      back_urls: {
        success: "localhost:3000/visa/respuesta/success",
        failure: "localhost:3000/visa/respuesta/failure",
        pending: "localhost:3000/visa/respuesta/pending",
        //auto_return: "approved",
      },
      external_reference: userId + "/" + product + "/" + amount + "/" + modo,
      // ...
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        // Este valor reemplazará el string "<%= global.id %>" en tu HTML
        //global.id = response.body.id;
        console.log(response.body)
        request.post(
          PAYPAL_API + "/v1/oauth2/token",
          {
            headers: {
              Accept: "application/json",
              "Accept-Language": "en_US",
              "content-type": "application/x-www-form-urlencoded",
            },
            auth: {
              user: CLIENT_ID,
              pass: SECRET,
              // 'sendImmediately': false
            },
            form: {
              grant_type: "client_credentials",
            },
          },
          function (err, response) {
            if (err) {
              console.error(err);
              return res.sendStatus(500);
            }
            let parsed1 = JSON.parse(response.body);
            //console.log(parsed1.access_token)
            const access_token = parsed1.access_token;
            request.post(
              PAYPAL_API + "/v1/identity/generate-token",
              {
                headers: {
                  Accept: "application/json",
                  "Accept-Language": "en_US",
                  Authorization: "Bearer " + access_token,
                },
              },
              function (err, response2) {
                if (err) {
                  console.error(err);
                  return res.sendStatus(500);
                }
                let parsed2 = JSON.parse(response2.body);
                console.log(parsed2);
                const clien_token = parsed2.client_token;
                var Backcoin = false;

                if (product == "Backcoin") {
                  Backcoin = true;
                }
                console.log(access_token)
                if (product == "backstore") {
                  
                  res.render("pasarela_de_pago", {
                    pageName: "Pasarela",
                    dashboardPage: true,
                    layout: false,
                    recargar_backcoin: true,
                    clien_token,
                    access_token,
                    CLIENT_ID,
                    global,
                    amount,
                    product,
                    modo,
                    archivo,
                    id_gate,
                    Backcoin,
                    correo,
                    backstore_sell,
                    userId,
                    back_product
                    //user
                  });
                } else {
                  BD_conect.obtenerGatesbyUser(userId).then((respuesta) => {
                    let parsed_g = JSON.parse(respuesta);
                    total_gates = parsed_g.length;
                    console.log(total_gates);
                    let total_descargas = 0;
                    for (let i = 0; i < total_gates; i++) {
                      total_descargas += parseInt(parsed_g[i].descargas);
                      //console.log(plan_basico_Mensual)
                      //const element = array[index];
                    }
                    BD_conect.obtenernotificacionesbyLimit3().then((resultado2) => {
                      let parsed_lmit = JSON.parse(resultado2);
      let cont = parsed_lmit.length;
      Hoy = moment(); //Fecha actual del sistema
      var hay_not = false;
      if (cont == 0) {
        hay_not = true;
      } else {
        for (let i = 0; i < cont; i++) {
           let fecha_inicio = moment(Hoy).isSameOrAfter(parsed_lmit[i].fecha_inicio); // true
          let fecha_final= moment(Hoy).isAfter(parsed_lmit[i].fecha_final); // true
          if (parsed_lmit[i].estado == "Activa") {
            if (fecha_inicio == true) {
              console.log(fecha_inicio)
              if (fecha_final == false) {
                break;
              } else {
                hay_not = true;
              }
            }  
          } else {
            hay_not = true;
            break;
          }
        }
      }
                    BD_conect.obtenerSuscripbyUserG(userId).then((data) => {
                      let parsed_s = JSON.parse(data);
                      total_sus = parsed_s.length;
                      res.render("pasarela_de_pago", {
                        pageName: "Pasarela",
                        dashboardPage: true,
                        recargar_backcoin: true,
                        clien_token,
                        access_token,
                        CLIENT_ID,
                        global,
                        amount,
                        product,
                        modo,
                        archivo,
                        id_gate,
                        Backcoin,
                        total_descargas,
                        total_gates,parsed_lmit,
                        hay_not,
                        backstore_sell,
                        userId,
                        total_sus,
                        back_product
                        //user
                      });
                    }).catch((err) => {
                      console.log(err)
                      let msg = "Error en sistema";
                      return res.redirect("/?msg=" + msg);
                    });
                  }).catch((err) => {
                    console.log(err)
                    let msg = "Error en sistema";
                    return res.redirect("/?msg=" + msg);
                  });
                  }).catch((err) => {
                    console.log(err)
                    let msg = "Error en sistema";
                    return res.redirect("/?msg=" + msg);
                  });;
                }
              }
            );
          }
        );
        var global = response.body.id;
        //console.log(response)
        /*res.render('pasarela_de_pago', {
  pageName: "Pasarela",
  global,
  amount,
  product,
  dashboardPage: true,
});*/
      }).catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/?msg=" + msg);
      });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });;
};

exports.pagar = async (req, res, next) => {
  var aux = req.query.external_reference.split("/");
  let userid = aux[0];
  let producto = aux[1];
  let monto = aux[2];
  let modo = aux[3];
  let status = req.query.status;
  console.log(req.query);
  console.log('Aqui');
  let product = false;
  let errores = false;
  if (status === "approved") {
    product = true;
    var numero_referencia = req.query.payment_id;

    if (producto == "Backcoin" || product == "backstore") {
      BD_conect.recargaBackcoin(userid, monto).then((res) => {
        console.log(res);
        //req.user.backcoins=res;
        if (product == "backstore") {
        } else {
          req.user.backcoins = res;
          console.log(req.user.backcoins);
        }
      });
      BD_conect.guardarPago(
        userid,
        status,
        numero_referencia,
        monto,
        producto,
        "MercadoPago"
      ).then(() => {
        res.render("complete_pay", { errores, product, dashboardPage: true });
      });
    } else {
      BD_conect.actualizarUserMembership(userid, producto).then(() => {
        req.user.membership = producto;
        BD_conect.guardarPago(
          userid,
          status,
          numero_referencia,
          monto,
          producto,
          "MercadoPago"
        ).then(() => {
          BD_conect.guardarPlan_user(
            userid,
            producto,
            modo,
            "MercadoPago"
          ).then((respg) => {
            console.log(respg);
            console.log("aqui redirecciona a send mail");
            res.locals.user.membership = producto
            res.redirect("/actualizo_membresia/"+producto+"/"+monto+ "/"+modo);
          });
        });
        //      res.render('complete_pay', {errores,product,dashboardPage:true});
      });
    }
  } else {
    errores = true;
    res.render("complete_pay", { errores, product, dashboardPage: true });
  }
};
