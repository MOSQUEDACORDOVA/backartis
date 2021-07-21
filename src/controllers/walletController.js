const BD_module = require("../models/modulos_");
var request = require("request");

var CLIENT_ID =
  "AQEp93PNKe5pQUGK4bMiah30CZzi_9YYP5pw1LqnWELnymhFyIvEQgjYT782ChQrqmSy8tUb81WNMcBF";
var SECRET =
  "EB5Wbz_NTICPraelJFn-5rK1T0tbp87DTmF8TvaQRjL3xckJyYIU4aC_Xbj41KqosgbKk5M4YIjuk__W";
var PAYPAL_API = "https://api-m.sandbox.paypal.com";

exports.walletDashboard = (req, res) => {
  const user = res.locals.user;
  var photo = req.user.photo;
  let notPhoto = true;
  if (photo == "0") {
    notPhoto = false;
  }
  if (user.basic) {
    return res.redirect("/dashboard");
  }

  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  BD_module.obtenernotificacionesbyLimit3().then((resultado2) => {
    let parsed_lmit = JSON.parse(resultado2);
    let cont = parsed_lmit.length;

    Hoy = new Date(); //Fecha actual del sistema
    var AnyoHoy = Hoy.getFullYear();
    var MesHoy = Hoy.getMonth();
    var DiaHoy = Hoy.getDate();
    var hay_not = false;
    for (let i = 0; i < cont; i++) {
      var Fecha_aux = parsed_lmit[i].fecha_publicacion.split("-");
      var Fecha1 = new Date(
        parseInt(Fecha_aux[0]),
        parseInt(Fecha_aux[1] - 1),
        parseInt(Fecha_aux[2])
      );
      console.log(Fecha1);

      var AnyoFecha = Fecha1.getFullYear();
      var MesFecha = Fecha1.getMonth();
      var DiaFecha = Fecha1.getDate();

      if (parsed_lmit[i].estado == "Activa") {
        if (AnyoFecha == AnyoHoy && MesFecha == MesHoy && DiaFecha == DiaHoy) {
          break;
        } else {
          console.log("hay fecha");
          hay_not = true;
        }
      } else {
        console.log("hay activo");
        hay_not = true;
        break;
      }
    }
    BD_module.obtenerGatesbyUser(user.id).then((respuesta) => {
      let parsed_g = JSON.parse(respuesta);
      total_gates = parsed_g.length;
      console.log(total_gates);
      let total_descargas = 0;
      for (let i = 0; i < total_gates; i++) {
        total_descargas += parseInt(parsed_g[i].descargas);
        //console.log(plan_basico_Mensual)
        //const element = array[index];
      }
      BD_module.obtenerSuscripbyUserG(user.id).then((data) => {
        let parsed_s = JSON.parse(data);
        total_sus = parsed_s.length;

        BD_module.totalPagosbyId(user.id).then((resultado) => {
          let parsed_ventas = JSON.parse(resultado);
          console.log(parsed_ventas);
          let cont = parsed_ventas.length;
          let ventas = true;
          res.render("wallet", {
            pageName: "Billetera",
            dashboardPage: true,
            movimientos: true,
            msg,
            total_gates,
            total_descargas,
            total_sus,
            notPhoto,
            parsed_ventas,
            parsed_lmit,
            hay_not,
            user,
          });
        });
      });
    });
  });
};

exports.datos_pagos = (req, res) => {
  const user = res.locals.user;

  if (user.basic) {
    return res.redirect("/dashboard");
  }
  BD_module.obtenerBackcoinDataPay(user.id).then((respuesta) => {
    let parsed = JSON.parse(respuesta)[0];
    //console.log(parsed);

    if (typeof parsed === "undefined") {
      BD_module.obtenerGatesbyUser(user.id).then((respuesta) => {
        let parsed_g = JSON.parse(respuesta);
        total_gates = parsed_g.length;
        let total_descargas = 0;
        for (let i = 0; i < total_gates; i++) {
          total_descargas += parseInt(parsed_g[i].descargas);
          //console.log(plan_basico_Mensual)
          //const element = array[index];
        }
        BD_module.obtenerSuscripbyUserG(user.id).then((data) => {
          let parsed_s = JSON.parse(data);
          total_sus = parsed_s.length;
          res.render("wallet", {
            pageName: "Billetera",
            dashboardPage: true,
            datos_pagos: true,
            total_gates,
            total_descargas,
            user,
            total_sus,
          });
        });
      });
    } else {
      if (parsed.pais === "Perú") {
        var pais_o = false;
      } else {
        pais_o = true;
      }
      BD_module.obtenerGatesbyUser(user.id).then((respuesta) => {
        let parsed_g = JSON.parse(respuesta);
        total_gates = parsed_g.length;
        let total_descargas = 0;
        for (let i = 0; i < total_gates; i++) {
          total_descargas += parseInt(parsed_g[i].descargas);
          //console.log(plan_basico_Mensual)
          //const element = array[index];
        }

        BD_module.obtenerSuscripbyUserG(user.id).then((data) => {
          let parsed_s = JSON.parse(data);
          total_sus = parsed_s.length;
          res.render("wallet", {
            pageName: "Billetera",
            dashboardPage: true,
            datos_pagos: true,
            parsed,
            pais_o,
            user,
            total_gates,
            total_descargas,
            total_sus,
          });
        });
      });
    }
  });
};

exports.saveDatos = (req, res) => {
  var id_user = req.user.id;
  const user = res.locals.user;
  // console.log(req.body);
  if (user.basic) {
    return res.redirect("/dashboard");
  }
  const {
    nombre_apellido,
    tipo_documento,
    n_documento,
    correo,
    pais,
    otro_pais,
    banco_peru,
    otro_pais_banco,
    cuenta,
  } = req.body;

  if (typeof otro_pais === "undefined") {
    var save_pais = pais;
  } else {
    save_pais = otro_pais;
  }

  if (typeof otro_pais_banco === "undefined") {
    var save_banco = banco_peru;
  } else {
    save_banco = otro_pais_banco;
  }

  if (typeof cuenta === "undefined") {
    var cuenta_banco = "";
    console.log(save_pais);
  } else {
    cuenta_banco = cuenta;
  }

  BD_module.saveDatosBackcoin(
    id_user,
    nombre_apellido,
    tipo_documento,
    n_documento,
    correo,
    save_pais,
    save_banco,
    cuenta_banco
  ).then((respuesta) => {
    console.log(respuesta);
    let msg = "Se ha actualizado correctamente tu información de pago";
    res.redirect("/wallet/" + msg);
  });
};

exports.recargar_backcoin = (req, res) => {
  const user = res.locals.user;

  if (user.basic) {
    return res.redirect("/dashboard");
  }

  BD_module.obtenerGatesbyUser(user.id).then((respuesta) => {
    let parsed_g = JSON.parse(respuesta);
    total_gates = parsed_g.length;
    let total_descargas = 0;
    for (let i = 0; i < total_gates; i++) {
      total_descargas += parseInt(parsed_g[i].descargas);
      //console.log(plan_basico_Mensual)
      //const element = array[index];
    }

    BD_module.obtenerSuscripbyUserG(user.id).then((data) => {
      let parsed_s = JSON.parse(data);
      total_sus = parsed_s.length;
      res.render("wallet", {
        pageName: "Billetera",
        dashboardPage: true,
        recargar_backcoin: true,
        total_gates,
        total_descargas,
        user,
        total_sus,
      });
    });
  });
};

exports.descontar_backcoin = (req, res) => {
  const user = res.locals.user;
  var user_id = req.params.id;
  var producto = req.params.product;
  var monto = req.params.amount;
  var modo = req.params.modo;
  if (user.basic) {
    return res.redirect("/dashboard");
  }
  BD_module.obtenerBackcoinDataPay(user_id).then((data) => {
    let parsed_ = JSON.parse(data)[0];
    console.log(parsed_.monto);
    console.log(monto);
    if (parseInt(parsed_.monto) < parseInt(monto)) {
      console.log("saldo insuficiente");
    } else {
      if (modo == "back_pay") {
        var data = req.params.back_pay;
        let data_s = data.split(",");
        console.log(data_s);
        BD_module.descontarBackcoin(user_id, monto).then((resp) => {
          //console.log(resp);
          req.user.backcoins = resp;
          const generateRandomString = (num) => {
            const characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var result1 = Math.random().toString(36).substring(0, num);

            return result1;
          };

          //console.log(generateRandomString(monto));
          let numero_referencia = generateRandomString(monto);
          BD_module.guardarPago(
            user_id,
            "Pagado",
            numero_referencia,
            monto,
            producto,
            "Backcoins"
          ).then(() => {
            let msg = "esto es una prueba";
            return res.redirect(
              "/ranking/" +
                data_s[0] +
                "/" +
                data_s[2] +
                "/" +
                data_s[1] +
                "/" +
                data_s[3] +
                "/back_pay"
            );
          });
        });
      } else {
        BD_module.descontarBackcoin(user_id, monto).then((resp) => {
          //console.log(resp);
          req.user.backcoins = resp;

          BD_module.actualizarUserMembership(user_id, producto).then(() => {
            req.user.membership = producto;
            let numero_referencia = monto + 1;
            BD_module.guardarPago(
              user_id,
              "Pagado",
              numero_referencia,
              monto,
              producto,
              "Backcoins"
            ).then(() => {
              BD_module.guardarPlan_user(
                user_id,
                producto,
                modo,
                "Backcoins"
              ).then((respg) => {
                //console.log(respg)
                // res.render('complete_pay', {product,dashboardPage:true});
                res.render("complete_pay", {
                  errores,
                  product,
                  dashboardPage: true,
                });
              });
            });
          });
        });
      }
    }
  });
};

exports.retirar_fondos_form = (req, res) => {
  const user = res.locals.user;

  if (user.basic) {
    return res.redirect("/dashboard");
  }
  BD_module.obtenerBackcoinDataPay(user.id).then((respuesta) => {
    let parsed = JSON.parse(respuesta)[0];

    if (typeof parsed === "undefined") {
      BD_module.obtenerGatesbyUser(user.id).then((respuesta) => {
        let parsed_g = JSON.parse(respuesta);
        total_gates = parsed_g.length;
        let total_descargas = 0;
        for (let i = 0; i < total_gates; i++) {
          total_descargas += parseInt(parsed_g[i].descargas);
        }
        BD_module.obtenerSuscripbyUserG(user.id).then((data) => {
          let parsed_s = JSON.parse(data);
          total_sus = parsed_s.length;
          res.render("wallet", {
            pageName: "Billetera",
            dashboardPage: true,
            datos_pagos: true,
            total_gates,
            total_descargas,
            user,
            total_sus,
          });
        });
      });
    } else {
      if (parsed.pais === "Perú") {
        var pais_o = false;
      } else {
        pais_o = true;
      }
      BD_module.obtenerGatesbyUser(user.id).then((respuesta) => {
        let parsed_g = JSON.parse(respuesta);
        total_gates = parsed_g.length;
        let total_descargas = 0;
        for (let i = 0; i < total_gates; i++) {
          total_descargas += parseInt(parsed_g[i].descargas);
        }

        BD_module.obtenerSuscripbyUserG(user.id).then((data) => {
          let parsed_s = JSON.parse(data);
          total_sus = parsed_s.length;
          res.render("wallet", {
            pageName: "Billetera",
            dashboardPage: true,
            retirar_fondos: true,
            parsed,
            pais_o,
            user,
            total_gates,
            total_descargas,
            total_sus,
          });
        });
      });
    }
  });
};

exports.retirar_fondos_save = (req, res) => {
  const { id, monto_retiro } = req.body;
  const user = res.locals.user;
  if (user.basic) {
    return res.redirect("/dashboard");
  }
  let status = "En espera";
  let Hoy = new Date(); //Fecha actual del sistema
  let fecha_ = Hoy.toISOString();
  BD_module.saveRetiro(id, user.id, status, monto_retiro, fecha_).then(
    (respuesta) => {
      let parsed_s = JSON.parse(respuesta);
      var numero_referencia = parsed_s.id;
      console.log(numero_referencia);

      BD_module.descontarBackcoin(user.id, monto_retiro).then((resp) => {
        //console.log(resp);
        req.user.backcoins = resp;
        const generateRandomString = (num) => {
          const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          var result1 = Math.random().toString(36).substring(0, num);

          return result1;
        };
        BD_module.guardarPago(
          user.id,
          status,
          numero_referencia,
          monto_retiro,
          "Retiro Backcoins",
          "Depósito / Transferencia"
        ).then(() => {
          let msg = "Se cre fino";
          res.redirect(
            "/send_retirar_fondos/" +
              numero_referencia +
              "/" +
              monto_retiro +
              "/" +
              status
          );
        });
      });
    }
  );
};

exports.retiros = (req, res) => {
  const user = res.locals.user;
  var photo = req.user.photo;
  let notPhoto = true;
  if (photo == "0") {
    notPhoto = false;
  }
  if (user.basic) {
    return res.redirect("/dashboard");
  }

  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  BD_module.obtenernotificacionesbyLimit3().then((resultado2) => {
    let parsed_lmit = JSON.parse(resultado2);
    let cont = parsed_lmit.length;

    Hoy = new Date(); //Fecha actual del sistema
    var AnyoHoy = Hoy.getFullYear();
    var MesHoy = Hoy.getMonth();
    var DiaHoy = Hoy.getDate();
    var hay_not = false;
    for (let i = 0; i < cont; i++) {
      var Fecha_aux = parsed_lmit[i].fecha_publicacion.split("-");
      var Fecha1 = new Date(
        parseInt(Fecha_aux[0]),
        parseInt(Fecha_aux[1] - 1),
        parseInt(Fecha_aux[2])
      );
      var AnyoFecha = Fecha1.getFullYear();
      var MesFecha = Fecha1.getMonth();
      var DiaFecha = Fecha1.getDate();

      if (parsed_lmit[i].estado == "Activa") {
        if (AnyoFecha == AnyoHoy && MesFecha == MesHoy && DiaFecha == DiaHoy) {
          break;
        } else {
          console.log("hay fecha");
          hay_not = true;
        }
      } else {
        console.log("hay activo");
        hay_not = true;
        break;
      }
    }
    BD_module.obtenerGatesbyUser(user.id).then((respuesta) => {
      let parsed_g = JSON.parse(respuesta);
      total_gates = parsed_g.length;
      let total_descargas = 0;
      for (let i = 0; i < total_gates; i++) {
        total_descargas += parseInt(parsed_g[i].descargas);
       
      }
      BD_module.obtenerSuscripbyUserG(user.id).then((data) => {
        let parsed_s = JSON.parse(data);
        total_sus = parsed_s.length;

        BD_module.obtenerRetirosbyUser(user.id).then((resultado) => {
          let parsed_retiros = JSON.parse(resultado);
          res.render("wallet", {
            pageName: "Billetera",
            dashboardPage: true,
            movimientos_retiros: true,
            msg,
            total_gates,
            total_descargas,
            total_sus,
            notPhoto,
            parsed_retiros,
            parsed_lmit,
            hay_not,
            user,
          });
        });
      });
    });
  });
};
