const Modulo_BD = require("../models/modulos_");
var moment = require('moment-timezone');
exports.dashboard = (req, res) => {
  ////console.log(req.params.gates);
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  var total_gates = "";
  let admin_dash1 = true;
  Modulo_BD.totalGates().then((res) => {
    let parsed = JSON.parse(res);
    total_gates = parsed.length;
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });;
  Modulo_BD.obtenerUsuarios().then((resultado) => {
    let parsed = JSON.parse(resultado);
    let cont_u = parsed.length;
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
let gold_c=0, vip_c=0,basic_c=0
for (let i = 0; i < parsed.length; i++) {
  if (parsed[i].membership === "Gold") {
    gold_c++
  }
  if (parsed[i].membership === "VIP") {
    vip_c++
  }
  if (parsed[i].membership === "Basic") {
    basic_c++
  }
}

   console.log(gold_c);
   console.log(vip_c);
    res.render("index_admin", {
      usuarios: parsed,
      dashboardPage: true,
      cont_user: cont_u,
      cont_gates: total_gates,
      admin_dash1,
      notPhoto,
      msg,gold_c,
      vip_c,
      basic_c,
      parsed_lmit,
      hay_not
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });;
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/?msg=" + msg);
});
};

exports.verCupones = (req, res) => {
  let userID = req.params.id;
  let username = req.params.username;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  ////console.log(req.params.gates);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  ////console.log(username);

  Modulo_BD.obtenerCuponesUsados(userID).then((resultado) => {
    let parsed = JSON.parse(resultado);
    ////console.log(parsed);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("index_admin", {
      cupones_usados: parsed,
      dashboardPage: true,
      usuarios: true,
      admin_dash1: true,
      username,
      notPhoto,
      msg,      
      parsed_lmit,
      hay_not
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
};

exports.updateProfile = (req, res) => {
  let id_buscar = req.params.id;
  //	var id_user = req.user.id;
  let admin_dash1 = true;
  Modulo_BD.obtenerUserforGate(id_buscar).then((resultado) => {
    let parsed_user = JSON.parse(resultado)[0];
    let cont = parsed_user.length;
    ////console.log(parsed_user);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("editar_usuario", {
      pageName: "Actualizar Perfil del Usuario",
      dashboardPage: true,
      parsed_user,
      admin_dash1,    
      parsed_lmit,
      hay_not
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
};

// Actualizar usuario en la base de datos
exports.UpdateUser = async (req, res) => {
  const {
    id,
    name,
    last_name,
    user_name,
    email,
    password,
    confirmpassword,
    photo1,
    tipo,
    membresia,fecha_final
  } = req.body;

  if (!password && !confirmpassword) {
    Modulo_BD.actualizarUser(
      id,
      name,
      last_name,
      user_name,
      email,
      photo1,
      tipo,
      membresia,fecha_final
    )
      .then(() => {
        //////console.log(result);
      })
      .catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/?msg=" + msg);
      });
    //redirect('/dashboard');
    //const usuario = await Usuarios.findOne({where: {email}});
    // "user" is the user with newly updated info
    //const user = res.locals.user;
    let msg = "Usuario guardado con exito";
    res.redirect("/admin_dash/" + msg);
  } else {
    if (password !== confirmpassword) {
      req.flash("error", "Las contraseñas no son iguales");

      return res.render("editar_usuario", {
        pageName: "Actualizar Perfil del Usuario",
        dashboardPage: true,
        messages: req.flash(),
      });
    } else {
      Modulo_BD.actualizarpassW(id, password)
        .then(() => {})
        .catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/?msg=" + msg);
        });
      //redirect('/dashboard');
      //const usuario = await Usuarios.findOne({where: {email}});

      res.redirect("/admin_dash");
    }
  }
};
exports.deleteUser = async (req, res) => {
  let parametro_buscar = req.params.id;
  if (req.params.ext) {
    Modulo_BD.deleteUsuario(parametro_buscar).then((resultado) => {
      //let parsed = JSON.parse(resultado);
      //let cont= parsed.length
      ////console.log(resultado);
      let msg = "Se borró con éxito toda la informacion de su cuenta";
      res.redirect("/?msg=" + msg);
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });;
  } else {
    Modulo_BD.deleteUsuario(parametro_buscar).then((resultado) => {
      //let parsed = JSON.parse(resultado);
      //let cont= parsed.length
      ////console.log(resultado);

      res.redirect("/admin_dash");
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });;
  }
};

// PLANES
exports.planes = (req, res) => {
  //////console.log(req.params.gates);
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  var total_gates = "";
  let admin_dash1 = true;
  Modulo_BD.totalGates().then((res) => {
    let parsed = JSON.parse(res);
    total_gates = parsed.length;
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
  Modulo_BD.totalPlanes().then((resultado) => {
    let parsed = JSON.parse(resultado);
    let cont = parsed.length;
    let planes = true;
    //////console.log(parsed);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("index_admin", {
      //usuarios: parsed,
      dashboardPage: true,
      cont_user: cont,
      planes_parsed: parsed,
      planes,
      cont_gates: total_gates,
      admin_dash1,
      notPhoto,
      msg,parsed_lmit,
  hay_not
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

exports.addplanes = (req, res) => {
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  let userID = req.user.id;
  ////console.log(userID);
  //Modulo_BD
  //.obtenerUsuarios().then((resultado)=>{
  //	let parsed = JSON.parse(resultado);
  //	let cont= parsed.length
  //////console.log(parsed);
  Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
    let parsed_lmit = JSON.parse(resultado2);
    let cont = parsed_lmit.length;

    Hoy = new Date(); //Fecha actual del sistema
    var hay_not = false;
    if (cont == 0) {
      hay_not = true;
    } else {

      for (let i = 0; i < cont; i++) {

        console.log(parsed_lmit[i].fecha_inicio)
        console.log(parsed_lmit[i].fecha_final)
        let fecha_inicio = moment(parsed_lmit[i].fecha_inicio).isSame(Hoy, 'day'); // true
        let fecha_final= moment(parsed_lmit[i].fecha_final).isAfter(Hoy, 'day'); // true
          console.log(fecha_inicio)
          console.log(fecha_final)
        if (parsed_lmit[i].estado == "Activa") {
          if (fecha_final == false) {
            break;
          } else {
            hay_not = true;
          }
        } else {
          hay_not = true;
          break;
        }
      }
    }
  res.render("crear_planes", {
    pageName: "Crear Plan",
    dashboardPage: true,
 admin_dash1: true,
    userID,
    notPhoto,parsed_lmit,
hay_not
  });
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/?msg=" + msg);
});

  //})
};

// Actualizar usuario en la base de datos
exports.savePlan = async (req, res) => {
  const {
    id,
    tipo_plan,
    costo_plan,
    modo_plan,
    primera_linea,
    segunda_linea,
    tercera_linea,
    cuarta_linea,
    quinta_linea,
    sexta_linea,
    septima_linea,
    octava_linea,
    novena_linea,
    decima_linea,
    descuento, detalles
  } = req.body;
  var msg = "";
  Modulo_BD.guardarPlan(
    id,
    tipo_plan,
    costo_plan,
    modo_plan,
    primera_linea,
    segunda_linea,
    tercera_linea,
    cuarta_linea,
    quinta_linea,
    sexta_linea,
    septima_linea,
    octava_linea,
    novena_linea,
    decima_linea,
    descuento, detalles
  )
    .then((result) => {
      ////console.log(result);
      if (result === "0") {
        msg = "El plan ya existe, porfavor verifique";
      } else {
        msg = "Plan guardado con exito";
      }
      res.redirect("/planes/" + msg);
    })
    .catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
};
exports.deletePlan = async (req, res) => {
  let parametro_buscar = req.params.id;

  Modulo_BD.deletePlan(parametro_buscar).then((resultado) => {
    //let parsed = JSON.parse(resultado);
    //let cont= parsed.length
    ////console.log(resultado);
    Modulo_BD.totalPlanes().then((resultado) => {
      let msg = "Plan eliminado con exito";
      res.redirect("/planes/" + msg);
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

exports.editPlan = (req, res) => {
  let id_buscar = req.params.id;
  //	var id_user = req.user.id;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  let admin_dash1 = true;

  Modulo_BD.obtenerPlanforedit(id_buscar).then((resultado) => {
    let parsed_plan = JSON.parse(resultado)[0];
    let cont = parsed_plan.length;
    ////console.log(parsed_plan);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("edit_plan", {
      pageName: "Editar Plan",
      dashboardPage: true,
 admin_dash1: true,
      parsed_plan,
      notPhoto,
      admin_dash1,parsed_lmit,
  hay_not
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

exports.savePlanEdited = async (req, res) => {
  const {
    id,
    tipo_plan,
    costo_plan,
    modo_plan,
    primera_linea,
    segunda_linea,
    tercera_linea,
    cuarta_linea,
    quinta_linea,
    sexta_linea,
    septima_linea,
    octava_linea,
    novena_linea,
    decima_linea,
    descuento,detalles
  } = req.body;

  Modulo_BD.guardarPlanEdited(
    id,
    tipo_plan,
    costo_plan,
    modo_plan,
    primera_linea,
    segunda_linea,
    tercera_linea,
    cuarta_linea,
    quinta_linea,
    sexta_linea,
    septima_linea,
    octava_linea,
    novena_linea,
    decima_linea,
    descuento,detalles
  )
    .then((result) => {
      ////console.log(result);
    })
    .catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
  let msg = "Plan actualizado con exito";
  res.redirect("/planes/" + msg);
};

//ABOUT US
exports.aboutUs = (req, res) => {
  //////console.log(req.params.gates);
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  var total_gates = "";
  let admin_dash1 = true;
  Modulo_BD.totalGates().then((res) => {
    let parsed = JSON.parse(res);
    total_gates = parsed.length;
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
  Modulo_BD.totalaboutUs().then((resultado) => {
    let parsed = JSON.parse(resultado);
    let cont = parsed.length;
    let aboutUs = true;
    //////console.log(parsed);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("index_admin", {
      //usuarios: parsed,
      dashboardPage: true,
      cont_user: cont,
      aboutUs_parsed: parsed,
      aboutUs,
      notPhoto,
      cont_gates: total_gates,
      admin_dash1,
      msg,parsed_lmit,
  hay_not
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

exports.addAboutUs = (req, res) => {
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  let userID = req.user.id;
  Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
  res.render("create_about", {
    pageName: "Crear Sobre Nosotros",
    dashboardPage: true,
    admin_dash1: true,
    userID,
    notPhoto,parsed_lmit,
hay_not
  })
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
  //})
};

exports.save_aboutus = async (req, res) => {
  const {
    id,
    telefono,
    ws,
    facebook,
    instagram,
    souncloud,
    mixcloud,
    youtube,
    correo,
    twitter,
    spotify,
    tiktok,deezer,
    twitch,
    apple_music,
  } = req.body;
  var msg = "";
  Modulo_BD.guardaraboutus(
    id,
    telefono,
    ws,
    facebook,
    instagram,
    souncloud,
    mixcloud,
    youtube,
    correo,
    twitter,
    spotify,
    tiktok,
    deezer,
twitch,
apple_music
  )
    .then((result) => {
      ////console.log(result);
      if (result === "0") {
        msg = "Ya existe el telefono, porfavor verifique";
      } else {
        msg = "Sobre nosotros guardado con exito";
      }
      res.redirect("/aboutus/" + msg);
    })
    .catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
};

exports.editabout = (req, res) => {
  let id_buscar = req.params.id;
  //	var id_user = req.user.id;
  let admin_dash1 = true;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }

  Modulo_BD.obtenerAboutforedit(id_buscar).then((resultado) => {
    let parsed_about = JSON.parse(resultado)[0];
    let cont = parsed_about.length;
    ////console.log(parsed_about);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("edit_about", {
      pageName: "Editar Plan",
      dashboardPage: true,
      admin_dash1: true,
      parsed_about,
      notPhoto,
      admin_dash1,parsed_lmit,
  hay_not
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

exports.saveaboutEdited = async (req, res) => {
  const {
    id,
    telefono,
    ws,
    facebook,
    instagram,
    soundcloud,
    mixcloud,
    youtube,
    correo,
    twitter,
    spotify,
    tiktok,deezer,
twitch,
apple_music
  } = req.body;

  Modulo_BD.saveEditedAbout(
    id,
    telefono,
    ws,
    facebook,
    instagram,
    soundcloud,
    mixcloud,
    youtube,
    correo,
    twitter,
    spotify,
    tiktok,deezer,
twitch,
apple_music
  )
    .then((result) => {
      ////console.log(result);
    })
    .catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
  let msg = "Sobre nosotros actualizado con exito";
  res.redirect("/aboutus/" + msg);
};
exports.deleteAbout = async (req, res) => {
  let parametro_buscar = req.params.id;

  Modulo_BD.deleteAbout(parametro_buscar).then((resultado) => {
    //let parsed = JSON.parse(resultado);
    //let cont= parsed.length
    ////console.log(resultado);

    let msg = "Sobre nosotros eliminado con exito";
    res.redirect("/aboutus/" + msg);
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
};

// CUPONES
exports.getCupones = (req, res) => {
  //////console.log(req.params.gates);
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  var total_gates = "";
  let admin_dash1 = true;
  Modulo_BD.totalGates().then((res) => {
    let parsed = JSON.parse(res);
    total_gates = parsed.length;
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
  Modulo_BD.totalcupones().then((resultado) => {
    let parsed = JSON.parse(resultado);
    let cont = parsed.length;
    let cupones = true;
    //////console.log(parsed);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("index_admin", {
      //usuarios: parsed,
      dashboardPage: true,
      cont_user: cont,
      cuponoes_parsed: parsed,
      cupones,
      notPhoto,
      cont_gates: total_gates,
      admin_dash1,
      msg,parsed_lmit,
  hay_not
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

exports.addCupon = (req, res) => {
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  let userID = req.user.id;
  Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
  res.render("create_cupon", {
    pageName: "Crear Cupón",
    dashboardPage: true,
    admin_dash1: true,
    userID,
    notPhoto,parsed_lmit,
hay_not
  });
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/?msg=" + msg);
});

  //})
};

exports.save_cupon = async (req, res) => {
  const {
    id,
    nombre_cupon,
    valor_cupon,
    cantidad,
    tipo_cupon,
    fecha_inicio,
    fecha_final,
  } = req.body;
  var msg = "";
  Modulo_BD.guardarCupon(
    id,
    nombre_cupon,
    valor_cupon,
    fecha_inicio,
    fecha_final,
    cantidad,
    tipo_cupon
  )
    .then((result) => {
      ////console.log(result);
      if (result === "0") {
        msg = "Ya existe el cupón, porfavor verifique";
      } else {
        msg = "Cupón guardado con exito";
      }
      res.redirect("/cupones/" + msg);
    })
    .catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
};

exports.editCupon = (req, res) => {
  let id_buscar = req.params.id;
  //	var id_user = req.user.id;
  let admin_dash1 = true;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenerCuponforedit(id_buscar).then((resultado) => {
    let parsed_cupon = JSON.parse(resultado)[0];
    let cont = parsed_cupon.length;
    ////console.log(parsed_cupon);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("edit_cupon", {
      pageName: "Editar Cupón",
      dashboardPage: true,
      parsed_cupon,
      admin_dash1,
      notPhoto,parsed_lmit,
  hay_not
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

exports.saveCuponEdited = async (req, res) => {
  const {
    id,
    nombre_cupon,
    valor_cupon,
    cantidad,
    tipo_cupon,
    fecha_inicio,
    fecha_final,
  } = req.body;

  Modulo_BD.saveEditedCupon(
    id,
    nombre_cupon,
    valor_cupon,
    fecha_inicio,
    fecha_final,
    cantidad,
    tipo_cupon
  )
    .then((result) => {
      ////console.log(result);
    })
    .catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
  let msg = "Cupón actualizado con exito";
  res.redirect("/cupones/" + msg);
};
exports.deleteCupon = async (req, res) => {
  let parametro_buscar = req.params.id;

  Modulo_BD.deleteCupon(parametro_buscar).then((resultado) => {
    //let parsed = JSON.parse(resultado);
    //let cont= parsed.length
    ////console.log(resultado);

    let msg = "Cupón eliminado con exito";
    res.redirect("/cupones/" + msg);
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
};

//VENTAS
exports.getPagos = (req, res) => {
  //////console.log(req.params.gates);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  var total_gates = "";
  let admin_dash1 = true;
  Modulo_BD.totalGates().then((res) => {
    let parsed = JSON.parse(res);
    total_gates = parsed.length;
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });;
  Modulo_BD.totalPagos().then((resultado) => {
    let parsed = JSON.parse(resultado);
    let cont = parsed.length;
    let ventas = true;

    if (parsed.tipo_compra === "Gold" || parsed.tipo_compra === "VIP") {
      pre = true;
    }
    console.log(parsed);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("index_admin", {
      dashboardPage: true,
      cont_user: cont,
      ventas_parsed: parsed,
      ventas,
      notPhoto,
      cont_gates: total_gates,
      admin_dash1,
      msg,parsed_lmit,
  hay_not
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

// BANNER
exports.bannersGet = (req, res) => {
  //////console.log(req.params.gates);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  let admin_dash1 = true;
  Modulo_BD.obtenerBanners().then((resultado) => {
    let parsed = JSON.parse(resultado);
    let cont = parsed.length;
    let banners = true;
    //////console.log(parsed);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("index_admin", {
      //usuarios: parsed,
      dashboardPage: true,
      cont_user: cont,
      banners_parsed: parsed,
      banners,
      notPhoto,
      admin_dash1,
      msg,parsed_lmit,
  hay_not
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

exports.addBanner = (req, res) => {
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  let userID = req.user.id;
  Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
  res.render("create_banner", {
    pageName: "Crear Banner",
    dashboardPage: true,
    admin_dash1: true,
    userID,
    banners: true,
    notPhoto,parsed_lmit,
hay_not
  });
})
};

exports.save_banner = async (req, res) => {
  const { id, link, photo1, nombre } = req.body;
  var msg = "";
  Modulo_BD.guardarBanner(id, link, photo1, nombre)
    .then((result) => {
      ////console.log(result);
      if (result === "0") {
        msg = "Ya banner existe, porfavor verifique";
      } else {
        msg = "Banner guardado con exito";
      }
      res.redirect("/banner/" + msg);
    })
    .catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
};

exports.editBanner = (req, res) => {
  let id_buscar = req.params.id;
  //	var id_user = req.user.id;
  let admin_dash1 = true;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenerBannerforedit(id_buscar).then((resultado) => {
    let parsed_banner = JSON.parse(resultado)[0];
    let cont = parsed_banner.length;
    ////console.log(parsed_banner);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("edit_banner", {
      pageName: "Editar Banner",
      dashboardPage: true,
      parsed_banner,
      notPhoto,
      admin_dash1,parsed_lmit,
  hay_not
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

exports.sEditedBanner = async (req, res) => {
  const { id, link, photo1, nombre } = req.body;

  Modulo_BD.saveEditedBanner(id, link, photo1, nombre)
    .then((result) => {
      ////console.log(result);
    })
    .catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
  let msg = "Banner actualizado con exito";
  res.redirect("/banner/" + msg);
};
exports.deleteBanner = async (req, res) => {
  let parametro_buscar = req.params.id;

  Modulo_BD.deleteBanner(parametro_buscar).then((resultado) => {
    //let parsed = JSON.parse(resultado);
    //let cont= parsed.length
    ////console.log(resultado);

    let msg = "Banner eliminado con exito";
    res.redirect("/banner/" + msg);
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
};

// NOTIFICACIONES
exports.notificacionesGet = (req, res) => {
  //////console.log(req.params.gates);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenernotificaciones().then((resultado) => {
    let parsed = JSON.parse(resultado);
    //let cont= parsed.length
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
      res.render("index_admin", {
        //usuarios: parsed,
        dashboardPage: true,
        notificaciones_parsed: parsed,
        parsed_lmit,
        hay_not,
        notificaciones: true,
        admin_dash1: true,
        msg,
        notPhoto,
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

exports.addnotificaciones = (req, res) => {
  let userID = req.user.id;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenerUsuarios().then((resultado) => {
    let parsed = JSON.parse(resultado);
    let cont = parsed.length;
    //////console.log(parsed);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("notificaciones", {
      pageName: "Crear Notificacion",
      usuarios_parsed: parsed,
      dashboardPage: true,
      notPhoto,
      admin_dash1: true,
      userID,parsed_lmit,
  hay_not
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

exports.save_notificaciones = async (req, res) => {
  const { id_user, nombre, estado, descripcion, fecha_inicio, fecha_final, destino,id_notificacion } =
    req.body;
  var msg = "";
  Modulo_BD.saveDatosNotificaciones(
    id_user,
    nombre,
    estado,
    descripcion,
    fecha_inicio, fecha_final,
    destino,id_notificacion
  )
    .then((result) => {
      ////console.log(result);
      if (result === "0") {
        msg = "El nombre de la notificacion existe y se actualizado con éxito";
      } else {
        msg = "Notificacion guardado con exito";
      }
      res.redirect("/notificaciones/" + msg);
    })
    .catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
};

exports.editNotificaciones = (req, res) => {
  let id_buscar = req.params.id;
  let userID = req.user.id;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenerNotificacionforedit(id_buscar).then((resultado) => {
    let parsed_notificacion = JSON.parse(resultado)[0];
    let cont = parsed_notificacion.length;
    ////console.log(parsed_notificacion);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
            console.log('hello')
            hay_not = true;
            break;
          }
        }
      }
      console.log(hay_not)
    res.render("notificaciones", {
      pageName: "Editar Notificacion",
      dashboardPage: true,
      parsed_notificacion,
      notPhoto,
      admin_dash1: true,
      userID,parsed_lmit,
  hay_not
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

exports.deletenotificaciones = async (req, res) => {
  let parametro_buscar = req.params.id;

  Modulo_BD.deleteNotificaciones(parametro_buscar).then((resultado) => {
    //let parsed = JSON.parse(resultado);
    //let cont= parsed.length
    ////console.log(resultado);

    let msg = "Notificacion eliminada con exito";
    res.redirect("/notificaciones/" + msg);
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
};

// modal_land
exports.modal_landGet = (req, res) => {
  //////console.log(req.params.gates);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenerModalLand().then((resultado) => {
    let parsed = JSON.parse(resultado);
    //let cont= parsed.length
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
      res.render("index_admin", {
        //usuarios: parsed,
        dashboardPage: true,
        modal_land_parsed: parsed,
        parsed_lmit,
        hay_not,
        modal_land: true,
        admin_dash1: true,
        msg,
        notPhoto,
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

exports.addmodal_land = (req, res) => {
  let userID = req.user.id;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("modal_land", {
      pageName: "Crear modal",
      dashboardPage: true,
      notPhoto,
      admin_dash1: true,
      modal_land:true,
      userID,parsed_lmit,
  hay_not
    });
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
};

exports.save_modal_land = async (req, res) => {
  const { id_user, titulo, estado, descripcion,img ,link} =
    req.body;
  var msg = "";
  Modulo_BD.saveDatosModal_land(id_user, titulo, estado, descripcion,img,link)
    .then((result) => {
      ////console.log(result);
      if (result === "0") {
        msg = "El nombre de la notificacion existe y se actualizado con éxito";
      } else {
        msg = "Modal guardado con exito";
      }
      res.redirect("/modal_land/" + msg);
    })
    .catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
};
exports.save_modal_land_edit = async (req, res) => {
  const { id_, titulo, estado, descripcion,img,link} =
    req.body;
  var msg = "";
  Modulo_BD.saveEditedmodal(id_, titulo, estado, descripcion,img,link  )
    .then((result) => {
      ////console.log(result);
      if (result === "0") {
        msg = "El nombre de la notificacion existe y se actualizado con éxito";
      } else {
        msg = "Modal editado con exito";
      }
      res.redirect("/modal_land/" + msg);
    })
    .catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
};
exports.editmodal_land = (req, res) => {
  let id_buscar = req.params.id;
  let userID = req.user.id;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenerModalforedit(id_buscar).then((resultado) => {
    let parsed_modal_land = JSON.parse(resultado)[0];
    ////console.log(parsed_notificacion);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
            console.log('hello')
            hay_not = true;
            break;
          }
        }
      }
      console.log(hay_not)
    res.render("modal_land", {
      pageName: "Editar modal",
      dashboardPage: true,
      parsed_modal_land,
      notPhoto,
      admin_dash1: true,
      modal_land:true,
      userID,parsed_lmit,
  hay_not
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

exports.deletemodal_land = async (req, res) => {
  let parametro_buscar = req.params.id;

  Modulo_BD.deleteNotificaciones(parametro_buscar).then((resultado) => {
    //let parsed = JSON.parse(resultado);
    //let cont= parsed.length
    ////console.log(resultado);

    let msg = "Modal eliminado con exito";
    res.redirect("/modal_land/" + msg);
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
};

//TIPO DE CAMBIO
exports.tipo_cambio = (req, res) => {
  //////console.log(req.params.gates);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenerTipo_cambio().then((resultado) => {
    let parsed_tipo_cambio = JSON.parse(resultado);
    //let cont= parsed.length
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
      }parsed_lmit,
  hay_not

      res.render("index_admin", {
        //usuarios: parsed,
        dashboardPage: true,
        parsed_tipo_cambio,
        parsed_lmit,
        tipo_cambio: true,
        admin_dash1: true,
        msg,hay_not,
        notPhoto,
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

exports.tipo_cambio_add = (req, res) => {
  let userID = req.user.id;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
    let parsed_lmit = JSON.parse(resultado2);
    let cont = parsed_lmit.length;

    Hoy = new Date(); //Fecha actual del sistema
    var AnyoHoy = Hoy.getFullYear();
    var MesHoy = Hoy.getMonth();
    var DiaHoy = Hoy.getDate();
    var hay_not = false;
    if (cont == 0) {
      hay_not = true;
    }else{
   
    for (let i = 0; i < cont; i++) {

      console.log(parsed_lmit[i].estado)
      var Fecha_aux = parsed_lmit[i].fecha_publicacion.split("-");
      var Fecha1 = new Date(
        parseInt(Fecha_aux[0]),
        parseInt(Fecha_aux[1] - 1),
        parseInt(Fecha_aux[2])
      );
      ////////console.log(Fecha1)

      var AnyoFecha = Fecha1.getFullYear();
      var MesFecha = Fecha1.getMonth();
      var DiaFecha = Fecha1.getDate();

      if (parsed_lmit[i].estado == "Activa") {
        if (AnyoFecha == AnyoHoy && MesFecha == MesHoy && DiaFecha == DiaHoy) {
          break;
        } else {
          //////console.log("hay fecha");
          hay_not = true;
        }
      } else {
        //////console.log("hay activo");
        hay_not = true;
        break;
      }
    }
}
  res.render("tipo_cambio", {
    pageName: "Crear Tipo de Cambio",
    dashboardPage: true,
    notPhoto,
    admin_dash1: true,
    userID,parsed_lmit,
hay_not
  });
})
};

exports.tipo_cambio_save = async (req, res) => {
  const { id_user, tipo_cambio } = req.body;
  var id_tipo = req.body.id_tipo;
  ////console.log(id_tipo);
  if (typeof id_tipo === "undefined") {
    id_tipo = 1;
  }
  ////console.log(id_tipo);
  var msg = "";
  Modulo_BD.saveTipoCambio(id_user, tipo_cambio, id_tipo)
    .then((result) => {
      ////console.log(result);
      if (result === "0") {
        msg = "Se actualizó con exito el tipo de cambio";
      } else {
        msg = "Tipo de Cambio guardado con exito";
      }
      res.redirect("/tipo_cambio/" + msg);
    })
    .catch((err) => {
      return res.status(500).send("Error actualizando" + err);
    });
};

exports.tipo_cambio_edit = (req, res) => {
  let id_buscar = req.params.id;
  let userID = req.user.id;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenerTipoCambioById(id_buscar).then((resultado) => {
    let parsed_Tipo_cambio = JSON.parse(resultado)[0];
    let cont = parsed_Tipo_cambio.length;
    ////console.log(parsed_Tipo_cambio);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("tipo_cambio", {
      pageName: "Editar Tipo de Cambio",
      dashboardPage: true,
      parsed_Tipo_cambio,
      notPhoto,
      admin_dash1: true,
      userID,parsed_lmit,
  hay_not
    });
  })
  });
};

exports.tipo_cambio_delete = async (req, res) => {
  let parametro_buscar = req.params.id;

  Modulo_BD.deleteTipo_cambio(parametro_buscar).then((resultado) => {
    //let parsed = JSON.parse(resultado);
    //let cont= parsed.length
    ////console.log(resultado);

    let msg = "Tipo de cambio eliminado con éxito";
    res.redirect("/tipo_cambio/" + msg);
  });
};

//AYUDA Y TERMINOS Y CONDICIONES
exports.terminos_ayuda = (req, res) => {
  ////console.log(req.params.gates);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenerAyuda().then((resultado) => {
    let parsed_ayuda = JSON.parse(resultado);
    //let cont= parsed.length
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
      res.render("index_admin", {
        parsed_ayuda,
        dashboardPage: true,
        parsed_lmit,
        terminos_ayuda: true,
        admin_dash1: true,
        msg,hay_not,
        notPhoto,
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

exports.terminos_ayuda_add = (req, res) => {
  let userID = req.user.id;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
    let parsed_lmit = JSON.parse(resultado2);
    let cont = parsed_lmit.length;

    Hoy = new Date(); //Fecha actual del sistema
    var hay_not = false;
    if (cont == 0) {
      hay_not = true;
    } else {

      for (let i = 0; i < cont; i++) {

        console.log(parsed_lmit[i].fecha_inicio)
        console.log(parsed_lmit[i].fecha_final)
        let fecha_inicio = moment(parsed_lmit[i].fecha_inicio).isSame(Hoy, 'day'); // true
        let fecha_final= moment(parsed_lmit[i].fecha_final).isAfter(Hoy, 'day'); // true
          console.log(fecha_inicio)
          console.log(fecha_final)
        if (parsed_lmit[i].estado == "Activa") {
          if (fecha_final == false) {
            break;
          } else {
            hay_not = true;
          }
        } else {
          hay_not = true;
          break;
        }
      }
    }
  res.render("ayudas", {
    pageName: "Crear Ayuda ó  Términos y condiciones",
    dashboardPage: true,
    notPhoto,
    admin_dash1: true,
    userID,parsed_lmit,
hay_not
  });
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/?msg=" + msg);
});
};

exports.terminos_ayuda_save = async (req, res) => {
  const { id_user, tipo, terminos, politicas_privacidad, pregunta, respuesta } =
    req.body;
  var id_tipo = req.body.id_tipo;
  console.log(terminos);
  if (typeof id_tipo === "undefined") {
    id_tipo = 0;
  }
  //console.log(id_tipo);
  var msg = "";
  Modulo_BD.saveAyuda(
    id_user,
    tipo,
    terminos,
    politicas_privacidad,
    pregunta,
    respuesta,
    id_tipo
  )
    .then((result) => {
      //console.log(result);
      if (result === "0") {
        msg = "Se actualizó con exito el área de ayuda";
      } else {
        msg = "Ayuda guardada con exito";
      }
      res.redirect("/terminos_ayuda/" + msg);
    })
    .catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
};

exports.terminos_ayuda_edit = (req, res) => {
  let id_buscar = req.params.id;
  let userID = req.user.id;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenerAyudaById(id_buscar).then((resultado) => {
    let parsed_Ayuda = JSON.parse(resultado)[0];
    let cont = parsed_Ayuda.length;
    //console.log(parsed_Ayuda);
    let terminos = false;
    let politicas = false;
    let preguntas = false;
    if (parsed_Ayuda.tipo === "Términos y Condiciones") {
      terminos = true;
    }
    if (parsed_Ayuda.tipo === "Politicas") {
      politicas = true;
    }
    if (parsed_Ayuda.tipo === "Preguntas Frecuentes") {
      preguntas = true;
    }
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("ayudas", {
      pageName: "Editar Ayuda",
      dashboardPage: true,
      parsed_Ayuda,
      notPhoto,
      admin_dash1: true,
      userID,
      terminos,
      politicas,
      preguntas,parsed_lmit,
  hay_not
    })
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });;
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
};

exports.terminos_ayuda_delete = async (req, res) => {
  let parametro_buscar = req.params.id;

  Modulo_BD.deleteAyuda(parametro_buscar).then((resultado) => {
    //let parsed = JSON.parse(resultado);
    //let cont= parsed.length
    //console.log(resultado);

    let msg = "Ayuda elimina con éxito";
    res.redirect("/terminos_ayuda/" + msg);
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
};

//RETIROS
exports.retiros = (req, res) => {
  ////console.log(req.params.gates);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenerRetiros1().then((resultado) => {
    let parsed_retiros = JSON.parse(resultado);
    //let cont= parsed.length
    console.log(parsed_retiros)
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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

      res.render("index_admin", {
        parsed_retiros,
        dashboardPage: true,
        parsed_lmit,
        retiros: true,
        admin_dash1: true,
        msg,hay_not,
        notPhoto,
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

exports.retiros_save = async (req, res) => {
  const { id, status, photo1, fecha_pago, observacion,monto,id_usuario } = req.body;

  var msg = "";
  Modulo_BD.RetirosSave_update(id, status, photo1, fecha_pago, observacion)
    .then((result) => {
      console.log(status);

      if (status == "Error"){
        return res.redirect(`/cancelar_back/${id}/${monto}/${status}/${id_usuario}`)

      }
      msg = "Se actualizó con exito el retiro";
      res.redirect("/retiros/" + msg);
    })
    .catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
};

exports.retiros_edit = (req, res) => {
  let id_buscar = req.params.id;
  let userID = req.user.id;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenerRetirosbyId(id_buscar).then((resultado) => {
    let parsed_retiros = JSON.parse(resultado)[0];
    let cont = parsed_retiros.length;
    //console.log(parsed_retiros);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("retiros", {
      pageName: "Editar retiros",
      dashboardPage: true,
      parsed_retiros,
      notPhoto,
      admin_dash1: true,
      userID,
      retiros: true,parsed_lmit,
  hay_not
    })
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



// PUBLICIDAD
exports.publicidadGet = (req, res) => {
  //////console.log(req.params.gates);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  let admin_dash1 = true;
  Modulo_BD.obtenerPublicidad().then((resultado) => {
    let parsed = JSON.parse(resultado);
    let cont = parsed.length;
    let publicidad = true;

    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
      res.render("index_admin", {
      //usuarios: parsed,
      dashboardPage: true,
      cont_user: cont,
      publicidad_parsed: parsed,
      publicidad,
      notPhoto,
      admin_dash1,
      msg,parsed_lmit,
  hay_not
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
};

exports.addpublicidad = (req, res) => {
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  let userID = req.user.id;
  Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
    let parsed_lmit = JSON.parse(resultado2);
    let cont = parsed_lmit.length;

    Hoy = new Date(); //Fecha actual del sistema
    var hay_not = false;
    if (cont == 0) {
      hay_not = true;
    } else {

      for (let i = 0; i < cont; i++) {

        console.log(parsed_lmit[i].fecha_inicio)
        console.log(parsed_lmit[i].fecha_final)
        let fecha_inicio = moment(parsed_lmit[i].fecha_inicio).isSame(Hoy, 'day'); // true
        let fecha_final= moment(parsed_lmit[i].fecha_final).isAfter(Hoy, 'day'); // true
          console.log(fecha_inicio)
          console.log(fecha_final)
        if (parsed_lmit[i].estado == "Activa") {
          if (fecha_final == false) {
            break;
          } else {
            hay_not = true;
          }
        } else {
          hay_not = true;
          break;
        }
      }
    }
  res.render("create_banner", {
    pageName: "Crear Publicidad",
    dashboardPage: true,
    admin_dash1: true,
    publicidad:true,
    userID,
    notPhoto,parsed_lmit,
hay_not
  });
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/?msg=" + msg);
});
};

exports.save_publicidad = async (req, res) => {
  const { id, link, nombre } = req.body;
  var msg = "";
  Modulo_BD.guardarPublicidad(id, link, nombre)
    .then((result) => {
      ////console.log(result);
      if (result === "0") {
        msg = "Ya existe Publicidad con ese nombre, porfavor verifique";
      } else {
        msg = "Publicidad guardada con exito";
      }
      res.redirect("/publicidad/" + msg);
    })
    .catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
};

exports.editpublicidad = (req, res) => {
  let id_buscar = req.params.id;
  //	var id_user = req.user.id;
  let admin_dash1 = true;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenerBannerforedit(id_buscar).then((resultado) => {
    let parsed_publicidad = JSON.parse(resultado)[0];
    let cont = parsed_publicidad.length;
    ////console.log(parsed_publicidad);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("create_banner", {
      pageName: "Editar Publicidad",
      dashboardPage: true,
      editar_publicidad:true,
      parsed_publicidad,
      notPhoto,
      admin_dash1,parsed_lmit,
  hay_not
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

exports.sEditedpublicidad = async (req, res) => {
  const { id, link, nombre } = req.body;

  Modulo_BD.saveEditedPublicidad(id, link, nombre)
    .then((result) => {
      ////console.log(result);
    })
    .catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
  let msg = "Publicidad actualizada con exito";
  res.redirect("/publicidad/" + msg);
};
exports.deletepublicidad = async (req, res) => {
  let parametro_buscar = req.params.id;

  Modulo_BD.deleteBanner(parametro_buscar).then((resultado) => {
    //let parsed = JSON.parse(resultado);
    //let cont= parsed.length
    ////console.log(resultado);

    let msg = "Publicidad eliminada con exito";
    res.redirect("/publicidad/" + msg);
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
};

//soporte
exports.support = (req, res) => {
  ////console.log(req.params.gates);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenerSoporte().then((resultado) => {
    let par_support = JSON.parse(resultado);
    //let cont= parsed.length
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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

      res.render("index_admin", {
        par_support,
        dashboardPage: true,
        parsed_lmit,
        support: true,
        admin_dash1: true,
        msg,hay_not,
        notPhoto,
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
exports.delete_support = async (req, res) => {
  let parametro_buscar = req.params.id;

  Modulo_BD.deleteSoporte(parametro_buscar).then((resultado) => {
    //let parsed = JSON.parse(resultado);
    //let cont= parsed.length
    ////console.log(resultado);

    let msg = "Soporte eliminado con exito";
    res.redirect("/support_view/" + msg);
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
};

//fans

exports.fansPage_admin = (req, res) => {
  let msg = false;
  const user = res.locals.user;
  var photo = req.user.photo;
  let notPhoto = true;
  if (photo == "0") {
    notPhoto = false;
  }
  if (req.params.msg) {
    msg = req.params.msg;
  }

  Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
Modulo_BD.obtenerSuscripAdmin(user.id).then((data) => {
  let parsed_s = JSON.parse(data);
  total_sus = parsed_s.length;
          res.render("fans_admin", {
            pageName: "Fans",
        dashboardPage: true,
        parsed_lmit,
        fans_admin: true,
        admin_dash1: true,
        msg,hay_not,
        notPhoto,
        parsed_s
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

exports.deletefan_admin = async (req, res) => {
  let parametro_buscar = req.params.id;
  
  Modulo_BD.deleteFan_admin(parametro_buscar).then((resultado) => {
    let msg ="Se eliminó el fan con éxito"
    res.redirect("/fans/"+msg);
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
};

//generos
exports.generos = (req, res) => {
  ////console.log(req.params.gates);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenerGeneros().then((resultado) => {
    let par_generos = JSON.parse(resultado);
    //let cont= parsed.length
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
console.log(par_generos)
      res.render("index_admin", {
        par_generos,
        dashboardPage: true,
        parsed_lmit,
        generos: true,
        admin_dash1: true,
        msg,hay_not,
        notPhoto,
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
exports.generos_create = (req, res) => {
  let userID = req.user.id;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
    let parsed_lmit = JSON.parse(resultado2);
    let cont = parsed_lmit.length;

    Hoy = new Date(); //Fecha actual del sistema
    var hay_not = false;
    if (cont == 0) {
      hay_not = true;
    } else {

      for (let i = 0; i < cont; i++) {

        console.log(parsed_lmit[i].fecha_inicio)
        console.log(parsed_lmit[i].fecha_final)
        let fecha_inicio = moment(parsed_lmit[i].fecha_inicio).isSame(Hoy, 'day'); // true
        let fecha_final= moment(parsed_lmit[i].fecha_final).isAfter(Hoy, 'day'); // true
          console.log(fecha_inicio)
          console.log(fecha_final)
        if (parsed_lmit[i].estado == "Activa") {
          if (fecha_final == false) {
            break;
          } else {
            hay_not = true;
          }
        } else {
          hay_not = true;
          break;
        }
      }
    }
  res.render("generos", {
    pageName: "Crear Generos",
    dashboardPage: true,
    notPhoto,
    admin_dash1: true,
    generos: true,
    userID,parsed_lmit,
hay_not
  });
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/?msg=" + msg);
});
};
exports.genero_save = async (req, res) => {
  const user =  res.locals.user.id
  const {id, nombre } = req.body;
  var msg = "";
  Modulo_BD.saveGeneros(nombre, id, user)
    .then((result) => {
      ////console.log(result);
        msg = "Género guardado con exito";
      res.redirect("/generos_view/" + msg);
    })
    .catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
};
exports.edit_genero = (req, res) => {
  let id_buscar = req.params.id;
  //	var id_user = req.user.id;
  let admin_dash1 = true;
  var photo = req.user.photo;
  let notPhoto = true;
   if (photo == "0" || photo=="" || photo == null) {
    notPhoto = false;
  }
  Modulo_BD.obtenerGenerosById(id_buscar).then((resultado) => {
    let parsed_genero = JSON.parse(resultado)[0];
    let cont = parsed_genero.length;
    ////console.log(parsed_genero);
    Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    res.render("generos", {
      pageName: "Editar genero",
      dashboardPage: true,
      generos:true,
      parsed_genero,
      notPhoto,
      admin_dash1,parsed_lmit,
  hay_not
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
exports.del_genero = async (req, res) => {
  let parametro_buscar = req.params.id;
  
  Modulo_BD.deleteGeneros(parametro_buscar).then((resultado) => {
    let msg ="Se eliminó el genero con éxito"
    res.redirect("/generos_view/"+msg);
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
};