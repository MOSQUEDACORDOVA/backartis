const BD_module = require("../models/modulos_");
var request = require("request");
var moment = require('moment-timezone');
const crypto = require("crypto");

var CLIENT_ID =
  "";
var SECRET =
  "";
var PAYPAL_API = "https://api-m.sandbox.paypal.com";

exports.walletDashboard = (req, res) => {
  const user = res.locals.user;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
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
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
};

exports.datos_pagos = (req, res) => {
  const user = res.locals.user;
  var photo = user.photo;
  let notPhoto = true;
  console.log(photo)
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
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
            user,notPhoto,
            total_sus,
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
        BD_module.obtenernotificacionesbyLimit3().then((resultado2) => {
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

        BD_module.obtenerSuscripbyUserG(user.id).then((data) => {
          let parsed_s = JSON.parse(data);
          total_sus = parsed_s.length;
          res.render("wallet", {
            pageName: "Billetera",
            dashboardPage: true,
            datos_pagos: true,
            parsed,notPhoto,
            pais_o,
            user,
            total_gates,
            total_descargas,parsed_lmit,
            total_sus,hay_not
          });
        }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });        }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
      }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
    }
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
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
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });;
};

exports.recargar_backcoin = (req, res) => {
  const user = res.locals.user;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
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
    BD_module.obtenernotificacionesbyLimit3().then((resultado2) => {
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

    BD_module.obtenerSuscripbyUserG(user.id).then((data) => {
      let parsed_s = JSON.parse(data);
      total_sus = parsed_s.length;
      res.render("wallet", {
        pageName: "Billetera",
        dashboardPage: true,
        recargar_backcoin: true,
        total_gates,
        total_descargas,
        user,notPhoto,
        total_sus,hay_not,parsed_lmit
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
  });
};

exports.descontar_backcoin = (req, res) => {
  const user = res.locals.user;
  var user_id = req.params.id;
  var producto = req.params.product;
  var monto = req.params.amount;
  var modo = req.params.modo;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }

  BD_module.obtenerBackcoinDataPay(user_id).then((data) => {
    let parsed_ = JSON.parse(data)[0];
    console.log(parsed_.monto);
    console.log(monto);
     console.log(producto);
     console.log(modo);

    
    if (parseInt(parsed_.monto) < parseInt(monto)) {
      let msg =""
      if (modo == "back_pay") {
        msg ="Su saldo es insuficiente para comprar la pista deseada, use otros medios de pago."
        res.redirect('/dashb/'+msg)
      }else{
        msg ="Su saldo es insuficiente"
        res.redirect('/dashb/'+msg)
      }
      
    } else {
      if (modo == "back_pay") {
        var data = req.params.back_pay;
        let data_s = data.split(",");
        console.log(data_s);
         
        BD_module.descontarBackcoin(user_id, monto).then(async (resp) => {
          //console.log(resp);
          req.user.backcoins = resp;
          const generateRandomString = (num) => {
            const characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var result1 = Math.random().toString(5).substring(0, characters);

            return result1;
          };
          let numero_referencia = crypto.randomBytes(5).toString("HEX");
          console.log(data_s[1])
         
        await  BD_module.recargaBackcoin(data_s[1], monto).then(async (rest) => {
            console.log('HELLO');
            //req.user.backcoins=res;
            producto = 'Venta: ' + data_s[4]
          await BD_module.guardarPago(
            data_s[1],
            "Pagado",
            numero_referencia,
            monto,
            producto,
            "Backcoins"
          ).then(async (pago)=>{
            console.log('ENTRO AQUI EN EL PAGO DEL VENDEDOR')
            console.log(pago)
         
        
          //console.log(generateRandomString(monto));
          producto = 'Compra: ' + data_s[4]
        await  BD_module.guardarPagoVenta(
            user_id,
            "Pagado",
            numero_referencia,
            monto,
            producto,
            "Backcoins",data_s[1]
          ).then((dev) => {
            console.log('registra comprador')
            console.log(dev)
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
 })
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
                console.log("aqui redirecciona a send mail");
                res.redirect("/actualizo_membresia/"+producto+"/"+monto+ "/"+modo);
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
  });
      }
    }
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
};

exports.retirar_fondos_form = (req, res) => {
  const user = res.locals.user;
  var photo = user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
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
        BD_module.obtenernotificacionesbyLimit3().then((resultado2) => {
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
        BD_module.obtenerSuscripbyUserG(user.id).then((data) => {
          let parsed_s = JSON.parse(data);
          total_sus = parsed_s.length;
          res.render("wallet", {
            pageName: "Billetera",
            dashboardPage: true,
            datos_pagos: true,
            total_gates,
            total_descargas,
            user,notPhoto,parsed_lmit,
            total_sus,hay_not
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
          BD_module.obtenernotificacionesbyLimit3().then((resultado2) => {
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
          res.render("wallet", {
            pageName: "Billetera",
            dashboardPage: true,
            retirar_fondos: true,
            parsed,notPhoto,
            pais_o,
            user,
            total_gates,
            total_descargas,parsed_lmit,
            total_sus,hay_not
          });
        }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });        }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
      }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
    }
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
};

exports.retirar_fondos_save = (req, res) => {
  const { id, monto_retiro,valida_fondo } = req.body;
  const user = res.locals.user;
  
  if (user.basic) {
    return res.redirect("/dashboard");
  }
  if (valida_fondo == "SALDO INSUFICIENTE") {
    let msg ="Su saldo actual es insuficiente para realizar el retiro solicitado, intente otro monto menor o revise que su saldo actual sea distinto de 0 (cero)"
    res.redirect("/wallet/"+msg);
  }else{
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
  });

  }
};

exports.cancelar_retirar_fondos_save = (req, res) => {
  const user = res.locals.user;
  const id_retiro = req.params.id
  const monto = req.params.monto
  var id_usuario = user.id
  if (user.basic) {
    return res.redirect("/dashboard");
  }
  let status = "Cancelado";
  if (req.params.status) {
    status =req.params.status;
    id_usuario = req.params.id_user
  }

    
    let Hoy = new Date(); //Fecha actual del sistema
    let fecha_ = Hoy.toISOString();
    BD_module.RetiroscancelarSave_update(id_retiro,monto,status).then(
      (respuesta) => {
        //let parsed_s = JSON.parse(respuesta);
        var numero_referencia = id_retiro;
        console.log(numero_referencia);
        console.log('monto: retiro '+monto);
        BD_module.devolverBackcoin(id_usuario, monto).then((resp) => {
          console.log(resp);
         req.user.backcoins = resp;
          const generateRandomString = (num) => {
            const characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var result1 = Math.random().toString(36).substring(0, num);
  
            return result1;
          };
          BD_module.guardarPago(
            id_usuario,
            status,
            numero_referencia,
            monto,
            "Cancelar Retiro Backcoins",
            "No aplica"
          ).then(() => {
            let msg = "Se cre fino";
            res.redirect(
              "/send_retirar_fondos/" +
                numero_referencia +
                "/" +
                monto +
                "/" +
                status
            );
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
  });
};

exports.retiros = (req, res) => {
  const user = res.locals.user;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
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
          console.log(parsed_retiros)
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
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
};
