const Gates = require("../models/modulos_");
const Sequelize = require("sequelize");
const path = require("path");
let fs = require("fs");
const scdl = require("soundcloud-downloader").default;
const http = require('url');
var moment = require('moment-timezone');
const Usuarios = require("../models/Usuarios");
//var mediaserver = require('mediaserver');
//var multer = require('multer');

exports.validate_membership = async (req, res) => {
  ////////console.log(req.user);
  var user = res.locals.user;
 console.log(user)
 
if (user.membership == "Basic") {
 return res.redirect('/dashboard')
}else{
let Hoy = moment()
let fecha_final= moment(Hoy).isSameOrAfter(user.hasta); // true
console.log(fecha_final)
  if (fecha_final){
                 console.log("Has introducido la fecha de Hoy");
                 const usuario = await Usuarios.findOne({ where: { id: user.id } });
                 usuario.membership = 'Basic';

  // Guardarlos en la BD
  await usuario.save();
 user.membership = 'Basic'
 user.basic = true
 user.vip = false
 user.gold = false
 req.session.passport.user.membership = 'Basic'
 req.session.passport.user.basic = true
 req.session.passport.user.vip = false
 req.session.passport.user.gold = false
 console.log(user)
 console.log(req.session)
 console.log(req.user)
                  let msg = 'Su suscripción actual a finalizado'
                 return  res.redirect('/dashb/'+msg)
            }
        else{
              let final = moment(user.hasta)
                let tiempo = Hoy.diff(final,'days');
                 console.log(Hoy);
                 console.log(final)
                console.log(tiempo);
                if (tiempo == -1) {
                  let msg = 'Te queda 1 día de suscripción'
                 return  res.redirect('/dashb/'+msg)

                }

                if (tiempo == -2) {
                  let msg = 'Te quedan 2 días de suscripción'
                 return  res.redirect('/dashb/'+msg)
                }
                console.log('te quedan mas de 2 dias');
               res.redirect('/dashboard')            
            }

}
};
exports.contador_vistas = (req, res) => {
  ////////console.log(req.user);
  let id_buscar = req.params.id;
  Gates.obtenerGateforDown(id_buscar).then((resultado) => {
    let parsed = JSON.parse(resultado)[0];
    let view = parsed.vista;
    let cont_view = parseInt(view) + 1;
  Gates.actualizaGateView(id_buscar,cont_view).then((resultado) => {
    
    return "OK";
   
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      let fecha = new Date()
  fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
    if (error)
      console.log(error);
    else
      console.log('El archivo fue creado');
  });
      return res.redirect("/?msg=" + msg);
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    let fecha = new Date()
fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
  if (error)
    console.log(error);
  else
    console.log('El archivo fue creado');
});
    return res.redirect("/?msg=" + msg);
  });
};
exports.viewGate = (req, res) => {
  ////////console.log(req.user);
  let id_buscar = req.params.id;
  var id_user = req.user.id;

  Gates.obtenerUserforGate(id_user).then((resultado) => {
    let parsed_user = JSON.parse(resultado)[0];
    let cont = parsed_user.length;
    //////console.log(parsed_user);
    Gates.obtenerGate(id_buscar, id_user).then((resultado) => {
      let parsed = JSON.parse(resultado)[0];
      let cont = parsed.length;
      //////console.log(parsed);
      res.render("gate", {
        pageName: "Gate",
        gate: parsed,
        user: parsed_user,
        cont_gates: cont,
        layout: false,
      });
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      let fecha = new Date()
  fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
    if (error)
      console.log(error);
    else
      console.log('El archivo fue creado');
  });
      return res.redirect("/?msg=" + msg);
    });
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      let fecha = new Date()
  fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
    if (error)
      console.log(error);
    else
      console.log('El archivo fue creado');
  });
      return res.redirect("/?msg=" + msg);
    });
};
exports.viewGatePersonalizado = (req, res) => {
  let req_buscar = req.params.enlace;
  //	var id_user = req.user.id;
  //////console.log(req_buscar);
  Gates.obtenerGatePersonalizado(req_buscar).then((resultado) => {
    let parsed = JSON.parse(resultado)[0];
    console.log(parsed)
    if (typeof parsed === "undefined") {
      let msg=  "Este gate fue eliminado por el creador"
     return res.redirect("/?msg=" + msg);
      
    }
    let id_user = parsed.id_usuario;

    //////console.log(parsed);
    Gates.obtenerUserforGate(id_user).then((resultado) => {
      let parsed_user = JSON.parse(resultado)[0];
      //let cont= parsed_user.length
      //////console.log(parsed_user);
      let bondGate = false;
      let backstore = false;
      let filegate = false;
      if (parsed.tipo_create == "bondgate") {
        bondGate = true;
      }
      if (parsed.tipo_create == "backstore") {
        backstore = true;
      }
      if (parsed.tipo_create == "filegate") {
        filegate = true;
      }

      res.render("gate", {
        pageName: parsed.titulo,
        gate: parsed,
        user: parsed_user,
        filegate,
        bondGate,
        backstore,
        layout: false,
      });
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      let fecha = new Date()
  fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
    if (error)
      console.log(error);
    else
      console.log('El archivo fue creado');
  });
      return res.redirect("/?msg=" + msg);
    });
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      let fecha = new Date()
  fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
    if (error)
      console.log(error);
    else
      console.log('El archivo fue creado');
  });
      return res.redirect("/?msg=" + msg);
    });
};

exports.formCreateFileGate = (req, res) => {
  console.log(req.user);
  const user = res.locals.user;
  var photo = req.user.photo;
  let notPhoto = true;
  if (photo == "0" || photo == "" || photo == null) {
    notPhoto = false;
  }
  Gates.obtenernotificacionesbyLimit3().then((resultado2) => {
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
    Gates.obtenerGatesbyUser(user.id).then((respuesta) => {
      let parsed_g = JSON.parse(respuesta);
      total_gates = parsed_g.length;
      ////////console.log(total_gates);
      let total_descargas = 0;
      for (let i = 0; i < total_gates; i++) {
        total_descargas += parseInt(parsed_g[i].descargas);
        ////////console.log(plan_basico_Mensual)
        //const element = array[index];
      }
      Gates.obtenerSuscripbyUserG(user.id).then((data) => {
        let parsed_s = JSON.parse(data);
        total_sus = parsed_s.length;
        Gates.totalGates().then((respuestat) => {
          let parsed = JSON.parse(respuestat);
          let array = [];
          for (let i = 0; i < parsed.length; i++) {
            var enlace_perzonalizado = parsed[i].enlace_perzonalizado;
            array.push(enlace_perzonalizado);
            ////////console.log(parsed)
          }
          
          Gates.obtenerGeneros(user.id).then((data2) => {
            let par_generos = JSON.parse(data2);

          res.render("create-gate", {
            pageName: "Crear File Gate",
            dashboardPage: true,
            fileGate: true,
            array,
            hay_not,
            total_gates,
            total_descargas,
            total_sus,
            parsed_lmit,
            notPhoto,par_generos,
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
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
};

exports.formEditFileGate = (req, res) => {
  const user = res.locals.user;
  const id_user = res.locals.user.id;
  var parametro_buscar = req.params.id;
  var backstore,
    fileGate,
    bondGate = false;
  var photo = req.user.photo;
  let notPhoto = true;
  if (photo == "0" || photo == "" || photo == null) {
    notPhoto = false;
  }
  Gates.obtenernotificacionesbyLimit3().then((resultado2) => {
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

    Gates.obtenerGatesbyUser(user.id).then((respuesta) => {
      let parsed_g = JSON.parse(respuesta);
      total_gates = parsed_g.length;
      ////////console.log(total_gates);
      let total_descargas = 0;
      for (let i = 0; i < total_gates; i++) {
        total_descargas += parseInt(parsed_g[i].descargas);
        ////////console.log(plan_basico_Mensual)
        //const element = array[index];
      }
      Gates.obtenerSuscripbyUserG(user.id).then((data) => {
        let parsed_s = JSON.parse(data);
        total_sus = parsed_s.length;
        Gates.obtenerGate(parametro_buscar, id_user).then((resultado) => {
          let parsed = JSON.parse(resultado)[0];
          let cont = parsed.length;
          if (parsed.tipo_create === "filegate") {
            fileGate = true;
          }
          if (parsed.tipo_create === "bondgate") {
            bondGate = true;
          }
          if (parsed.tipo_create === "backstore") {
            backstore = true;
          }
          Gates.totalGates().then((respuestat) => {
            let parsed_t = JSON.parse(respuestat);
            let array = [];
            for (let i = 0; i < parsed_t.length; i++) {
              var enlace_perzonalizado = parsed_t[i].enlace_perzonalizado;
              array.push(enlace_perzonalizado);
              ////////console.log(parsed)
            }
            Gates.obtenerGeneros(user.id).then((data2) => {
              let par_generos = JSON.parse(data2);
          res.render("create-gate-edit", {
            pageName: "Edit File Gate",
            gate: parsed,
            dashboardPage: true,
            fileGate: true,
            user,
            array,
            backstore,
            fileGate,
            bondGate,
            notPhoto,
            hay_not,
            total_gates,
            total_descargas,
            total_sus,
            parsed_lmit,par_generos
            //cont_gates:total_gates,
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

exports.formCreateBondGate = (req, res) => {
  const user = res.locals.user;

  if (user.basic) {
    return res.redirect("/dashboard");
  }
  var photo = req.user.photo;
  let notPhoto = true;
  if (photo == "0" || photo == "" || photo == null) {
    notPhoto = false;
  }
  Gates.obtenernotificacionesbyLimit3().then((resultado2) => {
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

    Gates.obtenerGatesbyUser(user.id).then((respuesta) => {
      let parsed_g = JSON.parse(respuesta);
      total_gates = parsed_g.length;
      //////console.log(total_gates);
      let total_descargas = 0;
      for (let i = 0; i < total_gates; i++) {
        total_descargas += parseInt(parsed_g[i].descargas);
        //////console.log(plan_basico_Mensual)
        //const element = array[index];
      }
      Gates.obtenerSuscripbyUserG(user.id).then((data) => {
        let parsed_s = JSON.parse(data);
        total_sus = parsed_s.length;
        Gates.totalGates().then((respuesta) => {
          let parsed = JSON.parse(respuesta);
          let array = [];
          for (let i = 0; i < parsed.length; i++) {
            const enlace_perzonalizado = parsed[i].enlace_perzonalizado;
            array.push(enlace_perzonalizado);
            //////console.log(parsed)
          }
          Gates.obtenerGeneros(user.id).then((data2) => {
            let par_generos = JSON.parse(data2);
          res.render("create-gate", {
            pageName: "Crear Bond Gate",
            dashboardPage: true,
            bondGate: true,
            notPhoto,
            parsed_lmit,
            hay_not,
            total_gates,
            total_descargas,
            total_sus,
            user, array,par_generos
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
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
};

exports.formBackstore = (req, res) => {
  const user = res.locals.user;

  if (!user.gold) {
    return res.redirect("dashboard");
  }
  var photo = req.user.photo;
  let notPhoto = true;
  if (photo == "0" || photo == "" || photo == null) {
    notPhoto = false;
  }
  Gates.obtenernotificacionesbyLimit3().then((resultado2) => {
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

    Gates.obtenerGatesbyUser(user.id).then((respuesta) => {
      let parsed_g = JSON.parse(respuesta);
      total_gates = parsed_g.length;
      //////console.log(total_gates);
      let total_descargas = 0;
      for (let i = 0; i < total_gates; i++) {
        total_descargas += parseInt(parsed_g[i].descargas);
        //////console.log(plan_basico_Mensual)
        //const element = array[index];
      }
      Gates.obtenerSuscripbyUserG(user.id).then((data) => {
        let parsed_s = JSON.parse(data);
        total_sus = parsed_s.length;
        Gates.totalGates().then((respuesta) => {
          let parsed = JSON.parse(respuesta);
          let array = [];
          for (let i = 0; i < parsed.length; i++) {
            var enlace_perzonalizado = parsed[i].enlace_perzonalizado;
            array.push(enlace_perzonalizado);
            //////console.log(parsed)
          }
          Gates.obtenerGeneros(user.id).then((data2) => {
            let par_generos = JSON.parse(data2);

          res.render("create-gate", {
            pageName: "BackStore",
            dashboardPage: true,
            backstore: true,
            notPhoto,
            parsed_lmit,
            hay_not,
            total_gates,
            total_descargas,
            total_sus,par_generos,
            user,
            array
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
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });
};

exports.createGate = (req, res) => {
  var id_user = req.user.id;
  console.log(req.body.url_demo);
  console.log(req.body.url_track);
  const { url_demo, gender, other_gender, url_track, artist_name, music_title, music_desc, music_price, color, color_titulo, color_descripcion, show_watermarker, desing_social, user_logo, privacity, gate_link, promotion, suscribir_youtube, omitir_youtube, url_youtube, nombre_youtube, like_facebook, compartir_facebook, omitir_facebook, url_facebook, seguir_twitter, compartir_twitter, omitir_twitter, url_twitter, seguir_soundcloud, compartir_soundcloud,
    repost_souncloud, omitir_souncloud, url_souncloud, seguir_instagram, omitir_instagram, url_instagram, seguir_spotify, omitir_spotify, url_spotify, seguir_deezer, guardar_deezer, omitir_deezer, url_deezer, seguir_tiktok, omitir_tiktok, url_tiktok, seguir_mixcloud, repost_mixcloud, like_mixcloud, omitir_mixcloud, url_mixcloud, fecha_programa, archivo1, img_flyer, tipo_create,seguir_twitch,  omitir_twitch, url_twitch, seguir_applemusic,  omitir_applemusic, url_applemusic,omitir_correo } = req.body;

  const SOUNDCLOUD_URL = url_demo;
  let link = SOUNDCLOUD_URL
  console.log(link)
  if (typeof link === "undefined") {
    link_ = [0, 0, 0]
    var sound = ""
    console.log("Entro aqui")
  } else {
    link_ = link.split('/')
    var sound = link_[2]
    if (sound == "soundcloud.com" || sound == "soundcloud.es") {

    } else {
      sound = "";
      console.log("Entro aqui  aja")
    }
  }
  if ((typeof SOUNDCLOUD_URL === "undefined") || sound == "") {
    console.log("Entro aqui  pero si")
    let genero = gender;
    let titulo = "Sin tema";
    console.log(sound)
    Gates.insertargates({
      url_demo,
      genero,
      other_gender,
      url_track,
      artist_name,
      music_title,
      music_desc,
      music_price,
      color,
      color_titulo,
      color_descripcion,
      show_watermarker,
      desing_social,
      user_logo,
      privacity,
      gate_link,
      promotion,
      suscribir_youtube,
      omitir_youtube,
      url_youtube,
      nombre_youtube,
      like_facebook,
      compartir_facebook,
      omitir_facebook,
      url_facebook,
      seguir_twitter,
      compartir_twitter,
      omitir_twitter,
      url_twitter,
      seguir_soundcloud,
      compartir_soundcloud,
      repost_souncloud,
      omitir_souncloud,
      url_souncloud,
      seguir_instagram,
      omitir_instagram,
      url_instagram,
      seguir_spotify,
      omitir_spotify,
      url_spotify,
      seguir_deezer,
      guardar_deezer,
      omitir_deezer,
      url_deezer,
      seguir_tiktok,
      omitir_tiktok,
      url_tiktok,
      seguir_mixcloud,
      repost_mixcloud,
      like_mixcloud,
      omitir_mixcloud,
      url_mixcloud,
      fecha_programa,
      archivo1,
      img_flyer,
      tipo_create,
      id_user, titulo, seguir_twitch,  omitir_twitch, url_twitch, seguir_applemusic,  omitir_applemusic, url_applemusic,omitir_correo
    })
      .then((respuesta23) => {
        //console.log(respuesta23);
        let backstore = false;
        let bondGate = false;
        let fileGate = false;
        if (tipo_create == "filegate") {
          fileGate = true;
        }
        if (tipo_create == "bondgate") {
          bondGate = true;
        }
        if (tipo_create == "backstore") {
          backstore = true;
        }
        if (promotion == "Si") {
          let msg = "Enlace personalizado";
          //////console.log(msg)
          res.redirect("/sendMail/" + gate_link + "/" + id_user + "/" + msg);
        } else {
          res.redirect("/dashboard/filegate");
        }
      })
      .catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        let fecha = new Date()
  fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
    if (error)
      console.log(error);
    else
      console.log('El archivo fue creado');
  });
        return res.redirect("/?msg=" + msg);
      });
  } else if (sound == "soundcloud.com" || sound == "soundcloud.es") {
    //const CLIENT_ID = 'asdhkalshdkhsf'
    scdl.getInfo(SOUNDCLOUD_URL).then((stream) => {
     // console.log(stream)
      var titulo = stream.title;
      let genero = gender;
      scdl.download(SOUNDCLOUD_URL).then(stream2 => stream2.pipe(fs.createWriteStream(__dirname + '/../public/assets/uploads/' + titulo + '.mp3'))).catch((err) => {
        console.log(err)
        let msg = "Error en sistema";
        return res.redirect("/?msg=" + msg);
      });

      Gates.insertargates({
        url_demo,
        genero,
        other_gender,
        url_track,
        artist_name,
        music_title,
        music_desc,
        music_price,
        color,
        color_titulo,
        color_descripcion,
        show_watermarker,
        desing_social,
        user_logo,
        privacity,
        gate_link,
        promotion,
        suscribir_youtube,
        omitir_youtube,
        url_youtube,
        nombre_youtube,
        like_facebook,
        compartir_facebook,
        omitir_facebook,
        url_facebook,
        seguir_twitter,
        compartir_twitter,
        omitir_twitter,
        url_twitter,
        seguir_soundcloud,
        compartir_soundcloud,
        repost_souncloud,
        omitir_souncloud,
        url_souncloud,
        seguir_instagram,
        omitir_instagram,
        url_instagram,
        seguir_spotify,
        omitir_spotify,
        url_spotify,
        seguir_deezer,
        guardar_deezer,
        omitir_deezer,
        url_deezer,
        seguir_tiktok,
        omitir_tiktok,
        url_tiktok,
        seguir_mixcloud,
        repost_mixcloud,
        like_mixcloud,
        omitir_mixcloud,
        url_mixcloud,
        fecha_programa,
        archivo1,
        img_flyer,
        tipo_create,
        id_user, titulo, seguir_twitch,  omitir_twitch, url_twitch, seguir_applemusic,  omitir_applemusic, url_applemusic,omitir_correo
      })
        .then((respuesta) => {
          let parsed_ = JSON.parse(respuesta);
          var id_gate = parsed_.id;
          var title = stream.title;
          var id_track = stream.id;
          var permalink_url = stream.permalink_url;
          console.log(respuesta)
          Gates.SaveSoundC(
            id_user,
            id_gate,
            title,
            id_track,
            permalink_url
          ).then((data) => {
            let parsed_s = JSON.parse(data);
            var id_save = parsed_s.id;
            Gates.UpdateRelationGate(id_save, id_gate);
            if (promotion == "Si") {
              let msg = "Enlace personalizado";
              //////console.log(msg)
              res.redirect(
                "/sendMail/" + gate_link + "/" + id_user + "/" + msg
              );
            } else {
              res.redirect("/dashboard/filegate");
            }
          }).catch((err) => {
            console.log(err)
            let msg = "Error en sistema";
            let fecha = new Date()
  fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
    if (error)
      console.log(error);
    else
      console.log('El archivo fue creado');
  });
            return res.redirect("/?msg=" + msg);
          });;
        })
        .catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          let fecha = new Date()
  fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
    if (error)
      console.log(error);
    else
      console.log('El archivo fue creado');
  });
          return res.redirect("/?msg=" + msg);
        });
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      let fecha = new Date()
  fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
    if (error)
      console.log(error);
    else
      console.log('El archivo fue creado');
  });
      return res.redirect("/?msg=" + msg);
    });;
  }
};

exports.updateGate = (req, res) => {
  var id_user = req.user.id;
 console.log(req.body);

  const { id_gate, url_demo, gender, other_gender, url_track, artist_name, music_title,
    music_desc,
    music_price,
    color,
    color_titulo,
    color_descripcion,
    show_watermarker,
    desing_social,
    user_logo,
    privacity,
    gate_link,
    promotion,
    suscribir_youtube,
    omitir_youtube,
    url_youtube,
    nombre_youtube,
    like_facebook,
    compartir_facebook,
    omitir_facebook,
    url_facebook,
    seguir_twitter,
    compartir_twitter,
    omitir_twitter,
    url_twitter,
    seguir_soundcloud,
    compartir_soundcloud,
    repost_souncloud,
    omitir_souncloud,
    url_souncloud,
    seguir_instagram,
    omitir_instagram,
    url_instagram,
    seguir_spotify,
    omitir_spotify,
    url_spotify,
    seguir_deezer,
    guardar_deezer,
    omitir_deezer,
    url_deezer,
    seguir_tiktok,
    omitir_tiktok,
    url_tiktok,
    seguir_mixcloud,
    repost_mixcloud,
    like_mixcloud,
    omitir_mixcloud,
    url_mixcloud,
    fecha_programa,
    archivo1,
    img_flyer,
    tipo_create,
    seguir_twitch,
omitir_twitch,
url_twitch,
seguir_applemusic,
omitir_applemusic,
url_applemusic,omitir_correo
  } = req.body;

  //////console.log(url_demo+"-"+gender+"-"+other_gender+"-"+url_track+"-"+artist_name+"-"+music_title+"-"+music_desc+"-"+music_price+"-"+color+"-"+show_watermarker+"-"+desing_social+"-"+user_logo+"-"+privacity+"-"+gate_link+"-"+promotion+"-"+suscribir_youtube+"-"+omitir_youtube+"-"+url_youtube+"-"+nombre_youtube+"-"+like_facebook+"-"+compartir_facebook+"-"+omitir_facebook+"-"+url_facebook+"-"+seguir_twitter+"-"+compartir_twitter+"-"+omitir_twitter+"-"+url_twitter+"-"+seguir_soundcloud+"-"+compartir_soundcloud+"-"+repost_souncloud+"-"+omitir_souncloud+"-"+url_souncloud+"-"+seguir_instagram+"-"+omitir_instagram+"-"+url_instagram+"-"+seguir_spotify+"-"+omitir_spotify+"-"+url_spotify+"-"+seguir_deezer+"-"+guardar_deezer+"-"+omitir_deezer+"-"+url_deezer+"-"+seguir_tiktok+"-"+omitir_tiktok+"-"+seguir_mixcloud+"-"+repost_mixcloud+"-"+like_mixcloud+"-"+omitir_mixcloud+"-"+url_mixcloud);

  Gates.updategates({
    id_gate,
    url_demo,
    gender,
    other_gender,
    url_track,
    artist_name,
    music_title,
    music_desc,
    music_price,
    color,
    color_titulo,
    color_descripcion,
    show_watermarker,
    desing_social,
    user_logo,
    privacity,
    gate_link,
    promotion,
    suscribir_youtube,
    omitir_youtube,
    url_youtube,
    nombre_youtube,
    like_facebook,
    compartir_facebook,
    omitir_facebook,
    url_facebook,
    seguir_twitter,
    compartir_twitter,
    omitir_twitter,
    url_twitter,
    seguir_soundcloud,
    compartir_soundcloud,
    repost_souncloud,
    omitir_souncloud,
    url_souncloud,
    seguir_instagram,
    omitir_instagram,
    url_instagram,
    seguir_spotify,
    omitir_spotify,
    url_spotify,
    seguir_deezer,
    guardar_deezer,
    omitir_deezer,
    url_deezer,
    seguir_tiktok,
    omitir_tiktok,
    url_tiktok,
    seguir_mixcloud,
    repost_mixcloud,
    like_mixcloud,
    omitir_mixcloud,
    url_mixcloud,
    fecha_programa,
    archivo1,
    img_flyer,
    tipo_create,
    id_user,
    seguir_twitch,
omitir_twitch,
url_twitch,
seguir_applemusic,
omitir_applemusic,
url_applemusic,omitir_correo
  })
    .then((respuesta) => {
      //	////console.log(respuesta);
    })
    .catch((err) => {
      console.log(err)
      let msg = (err.errors.map((error) => error.message)).toString();
      let fecha = new Date()
      fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
        if (error)
          console.log(error);
        else
          console.log('El archivo fue creado');
      });
      return res.redirect("/?msg=" + msg);
    });
  //redirect('/dashboard');
  let tipo = tipo_create.charAt(0).toUpperCase() + tipo_create.slice(1);
  let msg = tipo + " actualizado con éxito";
  res.redirect("/dashb/" + msg+'/'+ tipo_create);
};

exports.getGates = async (req, res) => {
  var photo = req.user.photo;
  let parametro_buscar = req.params.gates;
  let product = req.params.productUdpt;
  var id_user = req.user.id;
  let msg = false;
  let notPhoto = true;
  let fileGateget = true;
  let bondGateget = false;
  let backstoreget = false;
  //////console.log(req.session)

  if (req.params.msg) {
    msg = req.params.msg;
    ////console.log(msg);
  }
  if (typeof product === "undefined") {
    product = false;
  }
  if (typeof parametro_buscar === "undefined") {
    parametro_buscar = "filegate";
  }

  if (parametro_buscar === "bondgate") {
    fileGateget = false;
    bondGateget = true;
  }
  if (parametro_buscar === "backstore") {
    fileGateget = false;
    backstoreget = true;
  }

  if (photo == "0" || photo == "" || photo == null) {
    notPhoto = false;
  }
  var total_gates = "";
  
  //////console.log(req.params.gates);
  Gates.obtenerGates(parametro_buscar, id_user).then((resultado) => {
    let parsed = JSON.parse(resultado);
    let cont = parsed.length;
    let total_c = 0
    for (let i = 0; i < parsed.length; i++) {
      total_c = parseInt(total_c)+parseInt(parsed[i].correos)
    }
    Gates.obtenernotificacionesbyLimit3().then((resultado2) => {
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

      Gates.obtenerGatesbyUser(id_user).then((respuesta) => {
        let parsed_g = JSON.parse(respuesta);
        total_gates = parsed_g.length;
        //////console.log(total_gates);
        let total_descargas = 0;
        for (let i = 0; i < total_gates; i++) {
          total_descargas += parseInt(parsed_g[i].descargas);
          //////console.log(plan_basico_Mensual)
          //const element = array[index];
        }
        Gates.obtenerSuscripbyUserG(id_user).then((data) => {
          let parsed_s = JSON.parse(data);
          total_sus = parsed_s.length;
          Gates.obtenerGatesTop().then(async(res_top) => {
            let parsed_top = JSON.parse(res_top);
            Gates.obtenerbackTop().then(async(res_topBack) => {
              if (backstoreget) {
                parsed_top =JSON.parse(res_topBack);
              }
           var Modal = await Gates.obtenerModalLandAct().then((resultado_m) => {
             return JSON.parse(resultado_m);  
           })
           console.log(Modal)

           if (typeof parametro_buscar === "undefined" || parametro_buscar === "bondgate" || parametro_buscar === "backstore" || req.params.gates === "filegate") {
            Modal = false;
          }         
           
          res.render("dashboard", {
            pageName: 'BackArtist',
            gates: parsed,
            product,
            parsed_lmit,
            notificaciones: true,
            dashboardPage: true,
            total_gates,
            notPhoto,
            total_descargas,
            notificaciones_parsed: parsed,
            total_sus,
            parsed_s,
            hay_not,
            fileGateget,
            bondGateget,
            backstoreget,parsed_top,
            msg,Modal,
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
      let fecha = new Date()
  fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
    if (error)
      console.log(error);
    else
      console.log('El archivo fue creado');
  });
      return res.redirect("/?msg=" + msg);
    });
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      let fecha = new Date()
  fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
    if (error)
      console.log(error);
    else
      console.log('El archivo fue creado');
  });
      return res.redirect("/?msg=" + msg);
    });
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      let fecha = new Date()
  fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
    if (error)
      console.log(error);
    else
      console.log('El archivo fue creado');
  });
      return res.redirect("/?msg=" + msg);
    });
};

exports.deleteGate = async (req, res) => {
  let parametro_buscar = req.params.id_;
  let tipo = req.params.tipo;
  if (typeof parametro_buscar === "undefined") {
    parametro_buscar = "filegate";
  }
  Gates.deleteGate(parametro_buscar).then((resultado) => {
    //let parsed = JSON.parse(resultado);
    //let cont= parsed.length
    ////console.log(resultado);
    res.redirect("/dashboard/"+tipo);
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    fs.writeFile('./error.txt', err, error => {
      if (error)
        console.log(error);
      else
        console.log('El archivo fue creado');
    });
    return res.redirect("/?msg=" + msg);
  });
};

exports.downloadGate = (req, res) => {
  ////console.log(req.params);
  var parametro_buscar = req.params.id_gate;
  var correo = req.params.correo;
  var id_usuario = req.params.id_usuario;
let url = false
  if (req.params.url) {
    url = true
  }
  let archivo = req.params.id;
  if (req.cookies.back_compra) {
  console.log('existe cookie')
  res.clearCookie("back_compra");
}
if (archivo == "URL") {
  url = true
}


  //////console.log(parametro_buscar)
  var fileName = String(archivo); // The default name the browser will use
  //var filePath =__dirname + '/../public/assets/uploads/'; // Or format the path using the `id` rest param
  //////console.log(fileName)
  var filePath = path.join(__dirname, "/../public/assets/uploads/", fileName);

  //let absPath = path.join(__dirname, '/my_files/', filename);
  ////console.log(filePath);
  Gates.guardarSuscripcionGate(
    "suscripcion_gate",
    correo,
    parametro_buscar,
    id_usuario
  ).then((resultado) => {

    if (resultado == "0") {
      console.log("correo registrado para ese usuario")
      Gates.obtenerGateforDown(parametro_buscar).then((resultado) => {
        let parsed = JSON.parse(resultado)[0];
        let cont = parsed.length;
        let down = parsed.descargas;
        let mails = parsed.correos;
        let cont_down = parseInt(down) + 1;
        let cont_mails = "No cuenta";
        ////console.log(cont_mails);
        Gates.actualizarGateDownload(parametro_buscar, cont_down, cont_mails).then((resultado) => {
            console.log(parsed)
            if (url == true) {
              console.log(parsed.url_fuente)
              let urrr = parsed.url_fuente
             return res.redirect(urrr)
            }
            
            res.download(filePath, (err) => {
              if (err) {
                console.log(err);
              }
            })
          }).catch((err) => {
            console.log(err)
            let msg = "Error en sistema";
            let fecha = new Date()
      fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
        if (error)
          console.log(error);
        else
          console.log('El archivo fue creado');
      });
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
      
    }else{
      Gates.obtenerGateforDown(parametro_buscar).then((resultado) => {
        let parsed = JSON.parse(resultado)[0];
        let cont = parsed.length;
        let down = parsed.descargas;
        let mails = parsed.correos;
        let cont_down = parseInt(down) + 1;
        let cont_mails = parseInt(mails) + 1;
        ////console.log(cont_mails);
        Gates.actualizarGateDownload(parametro_buscar, cont_down, cont_mails).then((resultado) => {
            console.log(parsed)
            if (url == true) {
              console.log(parsed.url_fuente)
              let urrr = parsed.url_fuente
             return res.redirect(urrr)
            }
            
            res.download(filePath, (err) => {
              if (err) {
                console.log(err);
              }
            })
          }).catch((err) => {
            console.log(err)
            let msg = "Error en sistema";
            let fecha = new Date()
      fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
        if (error)
          console.log(error);
        else
          console.log('El archivo fue creado');
      });
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


   
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    let fecha = new Date()
  fs.writeFile('./error'+Number(fecha)+'.txt', err, error => {
    if (error)
      console.log(error);
    else
      console.log('El archivo fue creado');
  });
    return res.redirect("/?msg=" + msg);
  });
  
  //res.download(filePath);
};
