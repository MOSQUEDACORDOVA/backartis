const { Op } = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt-nodejs");
const Gates = require("../models/Gate");
const Gate_SoundC = require("../models/Gate_SoundC");
const Usuarios = require("../models/Usuarios");
const Planes = require("../models/Planes");
const Sobre_nosotros = require("../models/Sobre_nosotros");
const Cupones = require("../models/Cupones");
const Pagos = require("../models/Pagos");
const Banner = require("../models/Banner");
const Suscripciones = require("../models/Suscripciones");
const Backcoin = require("../models/Backcoin");
const Notificaciones = require("../models/Notificaciones");
const Used_cupons = require("./Used_cupons");
const Tipo_cambio = require("./Tipo_cambio");
const Ayuda = require("./Ayuda");
const Retiros = require("./Retiros");
const Soporte = require("./Soporte");
const Generos = require("./Generos");
const Modal_land = require("./Modal_land");

module.exports = {
  actualizarUser(id, nombre, apellido, userN, mail, photo, tipo, membresia,fecha_final) {
    //Actualizar datos del usuario
    
    return new Promise((resolve, reject) => {
      Usuarios.update(
        {
          name: nombre,lastName: apellido, membership: membresia,
          tipo: tipo,
          userName: userN,
          email: mail,
          photo: photo,hasta: fecha_final
        },
        {
          where: {
            id: id,
          },
        }
      )
        .then((plan) => {
          let planes = JSON.stringify(plan);
          resolve(planes);
          //console.log(planes);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  actualizarpassW(id, password) {
    //Actualizar clave
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    ////console.log(password);
    let sql =
      "UPDATE usuarios SET password ='" + password + "' WHERE id ='" + id + "'";
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err);
        else resolve();
      });
      resolve();
    });
  },
  actualizarUserMembership(userid, membershipUpdt) {
    //Actualizar datos del usuario
    ////console.log("hola")
    let sql =
      "UPDATE usuarios SET membership ='" +
      membershipUpdt +
      "' WHERE id ='" +
      userid +
      "'";
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err);
        else resolve();
      });
      resolve();
    });
  },
  deleteUsuario(parametro_buscar) {
    let sql = "DELETE FROM gates WHERE id ='" + parametro_buscar + "'";
    return new Promise((resolve, reject) => {
      Usuarios.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        //////console.log(JSON.stringify(users));
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });
    });
  },
  obtenerUserforGate(id_usuario) {
    return new Promise((resolve, reject) => {
      Usuarios.findAll({
        where: {
          id: id_usuario,
        },
      })
        .then((users) => {
          let userss = JSON.stringify(users);
          resolve(userss);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  obtenerGates(parametro_buscar, id_usuario) {
    return new Promise((resolve, reject) => {
      Gates.findAll({
        where: {
          tipo_create: parametro_buscar,
          id_usuario: id_usuario,
        },order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["createdAt", "DESC"],
        ],
      })
        .then((users) => {
          let gates = JSON.stringify(users);
          resolve(gates);
          //////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  obtenerGatesTop() {
    return new Promise((resolve, reject) => {
      Gates.findAll({attributes: ['id', 'tipo_create'],
        where: {
          [Op.or]: [{tipo_create: 'filegate'}, {tipo_create: 'bondgate'}]
        },limit: 3,
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["descargas", "DESC"],
        ],
      })
        .then((users) => {
          let gates = JSON.stringify(users);
          resolve(gates);
          //////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  obtenerbackTop() {
    return new Promise((resolve, reject) => {
      Gates.findAll({attributes: ['id', 'tipo_create'],
        where: {
          tipo_create: 'backstore'
        
        },limit: 3,
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["descargas", "DESC"],
        ],
      })
        .then((users) => {
          let gates = JSON.stringify(users);
          resolve(gates);
          //////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  obtenerGatesbyUser(id_usuario) {
    return new Promise((resolve, reject) => {
      Gates.findAll({
        where: {
          id_usuario: id_usuario,
        },order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["createdAt", "DESC"],
        ],
      })
        .then((users) => {
          let gates = JSON.stringify(users);
          resolve(gates);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  totalGates() {
    return new Promise((resolve, reject) => {
      Gates.findAll()
        .then((res) => {
          let gates = JSON.stringify(res);
          resolve(gates);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  totalPlanes() {
    return new Promise((resolve, reject) => {
      Planes.findAll()
        .then((res) => {
          let planes = JSON.stringify(res);
          resolve(planes);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  obtenerUsuarios() {
    return new Promise((resolve, reject) => {
      Usuarios.findAll()
        .then((users) => {
          let usuarios = JSON.stringify(users);
          resolve(usuarios);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  obtenerGate(parametro_buscar, id_usuario) {
    return new Promise((resolve, reject) => {
      Gates.findAll({
        where: {
          id: parametro_buscar,
          id_usuario: id_usuario,
        },
      })
        .then((users) => {
          let gates = JSON.stringify(users);
          resolve(gates);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  obtenerGatePersonalizado(parametro_buscar) {
    return new Promise((resolve, reject) => {
      Gates.findAll({
        where: {
          enlace_perzonalizado: parametro_buscar,
        },
      })
        .then((res) => {
          let gate = JSON.stringify(res);
          resolve(gate);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  deleteGate(parametro_buscar) {
    let sql = "DELETE FROM gates WHERE id ='" + parametro_buscar + "'";
    return new Promise((resolve, reject) => {
      Gates.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });;
    });
  },
  insertargates(arreglo) {

    if (typeof arreglo.omitir_correo === "undefined") {
      var omitir_correo = null;
      //console.log(url_mixcloud);
    } else {
      omitir_correo = (arreglo.omitir_correo).toString();
    }
    if (typeof arreglo.other_gender === "undefined") {
      var other_gender = "";
      //console.log(other_gender);
    } else {
      other_gender = arreglo.other_gender;
    }
    if (typeof arreglo.fecha_programa === "undefined" || arreglo.fecha_programa =="") {
      var fecha_programa = null;
      //console.log(fecha_programa);
    } else {
      fecha_programa = arreglo.fecha_programa;
    }
    if (typeof arreglo.url_track === "undefined") {
      var url_track = "";
      //console.log(url_track);
    } else {
      url_track = arreglo.url_track;
    }
    if (typeof arreglo.music_price === "undefined") {
      var music_price = "";
      //console.log(music_price);
    } else {
      music_price = arreglo.music_price;
    }

    if (typeof arreglo.show_watermarker === "undefined") {
      var show_watermarker = "";
      //console.log(show_watermarker);
    } else {
      show_watermarker = arreglo.show_watermarker;
    }
    if (typeof arreglo.user_logo === "undefined") {
      var user_logo = "";
      //console.log(user_logo);
    } else {
      user_logo = arreglo.user_logo;
    }

    if (typeof arreglo.suscribir_youtube === "undefined") {
      var suscribir_youtube = "";
      //console.log(suscribir_youtube);
    } else {
      suscribir_youtube = arreglo.suscribir_youtube;
    }
    if (typeof arreglo.omitir_youtube === "undefined") {
      var omitir_youtube = "";
      //console.log(omitir_youtube);
    } else {
      omitir_youtube = arreglo.omitir_youtube;
    }
    if (typeof arreglo.url_youtube === "undefined") {
      var url_youtube = "";
      //console.log(url_youtube);
    } else {
      url_youtube = arreglo.url_youtube.toString();
      //console.log(url_youtube);
    }
    if (typeof arreglo.nombre_youtube === "undefined") {
      var nombre_youtube = "";
      //console.log(nombre_youtube);
    } else {
      nombre_youtube = arreglo.nombre_youtube;
    }
    if (typeof arreglo.like_facebook === "undefined") {
      var like_facebook = "";
      //console.log(like_facebook);
    } else {
      like_facebook = arreglo.like_facebook;
    }
    if (typeof arreglo.compartir_facebook === "undefined") {
      var compartir_facebook = "";
      //console.log(compartir_facebook);
    } else {
      compartir_facebook = arreglo.compartir_facebook;
    }
    if (typeof arreglo.omitir_facebook === "undefined") {
      var omitir_facebook = "";
      //console.log(omitir_facebook);
    } else {
      omitir_facebook = arreglo.omitir_facebook;
    }
    if (typeof arreglo.url_facebook === "undefined") {
      var url_facebook = "";
      //console.log(url_facebook);
    } else {
      url_facebook = (arreglo.url_facebook).toString();

    }
    if (typeof arreglo.seguir_twitter === "undefined") {
      var seguir_twitter = "";
      //console.log(seguir_twitter);
    } else {
      seguir_twitter = arreglo.seguir_twitter;
    }
    if (typeof arreglo.compartir_twitter === "undefined") {
      var compartir_twitter = "";
      //console.log(compartir_twitter);
    } else {
      compartir_twitter = arreglo.compartir_twitter;
    }
    if (typeof arreglo.omitir_twitter === "undefined") {
      var omitir_twitter = "";
      //console.log(omitir_twitter);
    } else {
      omitir_twitter = arreglo.omitir_twitter;
    }
    if (typeof arreglo.url_twitter === "undefined") {
      var url_twitter = "";
      //console.log(url_twitter);
    } else {
      url_twitter = (arreglo.url_twitter).toString();
    }
    if (typeof arreglo.seguir_soundcloud === "undefined") {
      var seguir_soundcloud = "";
      //console.log(seguir_soundcloud);
    } else {
      seguir_soundcloud = arreglo.seguir_soundcloud;
    }
    if (typeof arreglo.compartir_soundcloud === "undefined") {
      var compartir_soundcloud = "";
      //console.log(compartir_soundcloud);
    } else {
      compartir_soundcloud = arreglo.compartir_soundcloud;
    }
    if (typeof arreglo.repost_souncloud === "undefined") {
      var repost_souncloud = "";
      //console.log(repost_souncloud);
    } else {
      repost_souncloud = arreglo.repost_souncloud;
    }
    if (typeof arreglo.omitir_souncloud === "undefined") {
      var omitir_souncloud = "";
      //console.log(omitir_souncloud);
    } else {
      omitir_souncloud = arreglo.omitir_souncloud;
    }
    if (typeof arreglo.url_souncloud === "undefined") {
      var url_souncloud = "";
      //console.log(url_souncloud);
    } else {
      url_souncloud = (arreglo.url_souncloud).toString();
    }
    if (typeof arreglo.seguir_instagram === "undefined") {
      var seguir_instagram = "";
      //console.log(seguir_instagram);
    } else {
      seguir_instagram = arreglo.seguir_instagram;
    }
    if (typeof arreglo.omitir_instagram === "undefined") {
      var omitir_instagram = "";
      //console.log(omitir_instagram);
    } else {
      omitir_instagram = arreglo.omitir_instagram;
    }
    if (typeof arreglo.url_instagram === "undefined") {
      var url_instagram = "";
      //console.log(url_instagram);
    } else {
      url_instagram = (arreglo.url_instagram).toString();
    }
    if (typeof arreglo.seguir_spotify === "undefined") {
      var seguir_spotify = "";
      //console.log(seguir_spotify);
    } else {
      seguir_spotify = arreglo.seguir_spotify;
    }
    if (typeof arreglo.omitir_spotify === "undefined") {
      var omitir_spotify = "";
      //console.log(omitir_spotify);
    } else {
      omitir_spotify = arreglo.omitir_spotify;
    }
    if (typeof arreglo.url_spotify === "undefined") {
      var url_spotify = "";
      //console.log(url_spotify);
    } else {
      url_spotify = (arreglo.url_spotify).toString();
    }
    if (typeof arreglo.seguir_deezer === "undefined") {
      var seguir_deezer = "";
      //console.log(seguir_deezer);
    } else {
      seguir_deezer = arreglo.seguir_deezer;
    }
    if (typeof arreglo.guardar_deezer === "undefined") {
      var guardar_deezer = "";
      //console.log(guardar_deezer);
    } else {
      guardar_deezer = arreglo.guardar_deezer;
    }
    if (typeof arreglo.omitir_deezer === "undefined") {
      var omitir_deezer = "";
      //console.log(omitir_deezer);
    } else {
      omitir_deezer = arreglo.omitir_deezer;
    }

    if (typeof arreglo.url_deezer === "undefined") {
      var url_deezer = "";
      //console.log(url_deezer);
    } else {
      url_deezer = (arreglo.url_deezer).toString();
    }
    if (typeof arreglo.seguir_tiktok === "undefined") {
      var seguir_tiktok = "";
      //console.log(seguir_tiktok);
    } else {
      seguir_tiktok = arreglo.seguir_tiktok;
    }
    if (typeof arreglo.omitir_tiktok === "undefined") {
      var omitir_tiktok = "";
      //console.log(omitir_tiktok);
    } else {
      omitir_tiktok = arreglo.omitir_tiktok;
    }
    if (typeof arreglo.url_tiktok === "undefined") {
      var url_tiktok = "";
      //console.log(url_tiktok);
    } else {
      url_tiktok = (arreglo.url_tiktok).toString();
    }
    if (typeof arreglo.seguir_mixcloud === "undefined") {
      var seguir_mixcloud = "";
      //console.log(seguir_mixcloud);
    } else {
      seguir_mixcloud = arreglo.seguir_mixcloud;
    }
    if (typeof arreglo.repost_mixcloud === "undefined") {
      var repost_mixcloud = "";
      //console.log(repost_mixcloud);
    } else {
      repost_mixcloud = arreglo.repost_mixcloud;
    }
    if (typeof arreglo.like_mixcloud === "undefined") {
      var like_mixcloud = "";
      //console.log(like_mixcloud);
    } else {
      like_mixcloud = arreglo.like_mixcloud;
    }
    if (typeof arreglo.omitir_mixcloud === "undefined") {
      var omitir_mixcloud = "";
      //console.log(omitir_mixcloud);
    } else {
      omitir_mixcloud = arreglo.omitir_mixcloud;
    }
    if (typeof arreglo.url_mixcloud === "undefined") {
      var url_mixcloud = "";
      //console.log(url_mixcloud);
    } else {
      url_mixcloud = (arreglo.url_mixcloud).toString();
    }

    if (typeof arreglo.titulo === "undefined") {
      var titulo = "";
      //console.log(url_mixcloud);
    } else {
      titulo = arreglo.titulo;
    }

    if (arreglo.color === "#000000") {
      var color = "";
      //console.log(color);
    } else {
      var color = arreglo.color;
    }
    if (arreglo.color_titulo === "#000000") {
      var color_titulo = "";
      //console.log(color);
    } else {
      var color_titulo = arreglo.color_titulo;
    }
    if (arreglo.color_descripcion === "#000000") {
      var color_descripcion = "";
      //console.log(color_descripcion);
    } else {
      var color_descripcion = arreglo.color_descripcion;
    }



    if (typeof arreglo.seguir_twitch === "undefined") {
      var seguir_twitch = "";
      //console.log(url_mixcloud);
    } else {
      seguir_twitch = (arreglo.seguir_twitch).toString();
    }


    if (typeof arreglo.omitir_twitch === "undefined") {
      var omitir_twitch = "";
      //console.log(url_mixcloud);
    } else {
      omitir_twitch = (arreglo.omitir_twitch).toString();
    }

    if (typeof arreglo.url_twitch === "undefined") {
      var url_twitch = "";
      //console.log(url_mixcloud);
    } else {
      url_twitch = (arreglo.url_twitch).toString();
    }

    if (typeof arreglo.seguir_applemusic === "undefined") {
      var seguir_applemusic = "";
      //console.log(url_mixcloud);
    } else {
      seguir_applemusic = (arreglo.seguir_applemusic).toString();
    }

    if (typeof arreglo.omitir_applemusic === "undefined") {
      var omitir_applemusic = "";
      //console.log(url_mixcloud);
    } else {
      omitir_applemusic = (arreglo.omitir_applemusic).toString();
    }

    if (typeof arreglo.url_applemusic === "undefined") {
      var url_applemusic = "";
      //console.log(url_mixcloud);
    } else {
      url_applemusic = (arreglo.url_applemusic).toString();
    }

    let now = new Date();
    id_usuario = arreglo.id_user;
    fecha = now;
    tema = "Oscuro";

    return new Promise((resolve, reject) => {
      Gates.findOne({
        where: {
          enlace_perzonalizado: arreglo.gate_link,
        },
      }).then((res) => {
        //console.log(res);
        if (!res) {
          // Item not found, create a new one
          Gates.create({
            id_usuario: id_usuario,
            tipo_create: arreglo.tipo_create,
            url_fuente: arreglo.url_demo,
            genero: arreglo.genero,
            archivo: arreglo.archivo1,
            nombre_artista: arreglo.artist_name,
            titulo: arreglo.music_title,
            descripcion: arreglo.music_desc,
            tema: titulo,
            imagen: arreglo.img_flyer,
            color: color,
            color_titulo: color_titulo,
            color_descrip: color_descripcion,
            privacidad: arreglo.privacity,
            fecha_programa: fecha_programa,
            otro_gender: other_gender,
            url_track: url_track,
            music_price: music_price,
            show_watermarker: show_watermarker,
            user_logo: user_logo,
            suscribir_youtube: suscribir_youtube,
            omitir_youtube: omitir_youtube,
            url_youtube: url_youtube,
            nombre_youtube: nombre_youtube,
            like_facebook: like_facebook,
            compartir_facebook: compartir_facebook,
            omitir_facebook: omitir_facebook,
            url_facebook: url_facebook,
            seguir_twitter: seguir_twitter,
            compartir_twitter: compartir_twitter,
            omitir_twitter: omitir_twitter,
            url_twitter: url_twitter,
            seguir_soundcloud: seguir_soundcloud,
            compartir_soundcloud: compartir_soundcloud,
            repost_souncloud: repost_souncloud,
            omitir_souncloud: omitir_souncloud,
            url_souncloud: url_souncloud,
            seguir_instagram: seguir_instagram,
            omitir_instagram: omitir_instagram,
            url_instagram: url_instagram,
            seguir_spotify: seguir_spotify,
            omitir_spotify: omitir_spotify,
            url_spotify: url_spotify,
            seguir_deezer: seguir_deezer,
            guardar_deezer: guardar_deezer,
            omitir_deezer: omitir_deezer,
            url_deezer: url_deezer,
            seguir_tiktok: seguir_tiktok,
            omitir_tiktok: omitir_tiktok,
            url_tiktok: url_tiktok,
            seguir_mixcloud: seguir_mixcloud,
            repost_mixcloud: repost_mixcloud,
            like_mixcloud: like_mixcloud,
            omitir_mixcloud: omitir_mixcloud,
            url_mixcloud: url_mixcloud,
             seguir_twitch: seguir_twitch,
             omitir_twitch: omitir_twitch,
            url_twitch: url_twitch,
             seguir_applemusic: seguir_applemusic,
              omitir_applemusic: omitir_applemusic,
             url_applemusic: url_applemusic,
            enlace_perzonalizado: arreglo.gate_link,
            fecha_registro: fecha,omitir_correo:omitir_correo
            
          })
            .then((gate) => {
              let gatees = JSON.stringify(gate);
              resolve(gatees);
              // //console.log(gatees);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        } else {
          resolve("0");
        }
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });
    });
  },

  updategates(arreglo) {
  
    if (typeof arreglo.other_gender === "undefined") {
      var other_gender = "";
      //console.log(other_gender);
    } else {
      other_gender = arreglo.other_gender;
    }
    if (typeof arreglo.fecha_programa === "undefined" || arreglo.fecha_programa =="") {
      var fecha_programa = null;
      //console.log(fecha_programa);
    } else {
      fecha_programa = arreglo.fecha_programa;
    }
    if (typeof arreglo.url_track === "undefined") {
      var url_track = "";
      //console.log(url_track);
    } else {
      url_track = arreglo.url_track;
    }
    if (typeof arreglo.music_price === "undefined") {
      var music_price = "";
      //console.log(music_price);
    } else {
      music_price = arreglo.music_price;
    }

    if (typeof arreglo.show_watermarker === "undefined") {
      var show_watermarker = "";
      //console.log(show_watermarker);
    } else {
      show_watermarker = arreglo.show_watermarker;
    }
    if (typeof arreglo.user_logo === "undefined") {
      var user_logo = "";
      //console.log(user_logo);
    } else {
      user_logo = arreglo.user_logo;
    }

    if (typeof arreglo.suscribir_youtube === "undefined") {
      var suscribir_youtube = "";
      //console.log(suscribir_youtube);
    } else {
      suscribir_youtube = arreglo.suscribir_youtube;
    }
    if (typeof arreglo.omitir_youtube === "undefined") {
      var omitir_youtube = "";
      //console.log(omitir_youtube);
    } else {
      omitir_youtube = arreglo.omitir_youtube;
    }
    if (typeof arreglo.url_youtube === "undefined") {
      var url_youtube = "";
      //console.log(url_youtube);
    } else {
      url_youtube = arreglo.url_youtube.toString();
      //console.log(url_youtube);
    }
    if (typeof arreglo.nombre_youtube === "undefined") {
      var nombre_youtube = "";
      //console.log(nombre_youtube);
    } else {
      nombre_youtube = arreglo.nombre_youtube;
    }
    if (typeof arreglo.like_facebook === "undefined") {
      var like_facebook = "";
      //console.log(like_facebook);
    } else {
      like_facebook = arreglo.like_facebook;
    }
    if (typeof arreglo.compartir_facebook === "undefined") {
      var compartir_facebook = "";
      //console.log(compartir_facebook);
    } else {
      compartir_facebook = arreglo.compartir_facebook;
    }
    if (typeof arreglo.omitir_facebook === "undefined") {
      var omitir_facebook = "";
      //console.log(omitir_facebook);
    } else {
      omitir_facebook = arreglo.omitir_facebook;
    }
    if (typeof arreglo.url_facebook === "undefined") {
      var url_facebook = "";
      //console.log(url_facebook);
    } else {
      url_facebook = (arreglo.url_facebook).toString();

    }
    if (typeof arreglo.seguir_twitter === "undefined") {
      var seguir_twitter = "";
      //console.log(seguir_twitter);
    } else {
      seguir_twitter = arreglo.seguir_twitter;
    }
    if (typeof arreglo.compartir_twitter === "undefined") {
      var compartir_twitter = "";
      //console.log(compartir_twitter);
    } else {
      compartir_twitter = arreglo.compartir_twitter;
    }
    if (typeof arreglo.omitir_twitter === "undefined") {
      var omitir_twitter = "";
      //console.log(omitir_twitter);
    } else {
      omitir_twitter = arreglo.omitir_twitter;
    }
    if (typeof arreglo.url_twitter === "undefined") {
      var url_twitter = "";
      //console.log(url_twitter);
    } else {
      url_twitter = (arreglo.url_twitter).toString();
    }
    if (typeof arreglo.seguir_soundcloud === "undefined") {
      var seguir_soundcloud = "";
      //console.log(seguir_soundcloud);
    } else {
      seguir_soundcloud = arreglo.seguir_soundcloud;
    }
    if (typeof arreglo.compartir_soundcloud === "undefined") {
      var compartir_soundcloud = "";
      //console.log(compartir_soundcloud);
    } else {
      compartir_soundcloud = arreglo.compartir_soundcloud;
    }
    if (typeof arreglo.repost_souncloud === "undefined") {
      var repost_souncloud = "";
      //console.log(repost_souncloud);
    } else {
      repost_souncloud = arreglo.repost_souncloud;
    }
    if (typeof arreglo.omitir_souncloud === "undefined") {
      var omitir_souncloud = "";
      //console.log(omitir_souncloud);
    } else {
      omitir_souncloud = arreglo.omitir_souncloud;
    }
    if (typeof arreglo.url_souncloud === "undefined") {
      var url_souncloud = "";
      //console.log(url_souncloud);
    } else {
      url_souncloud = (arreglo.url_souncloud).toString();
    }
    if (typeof arreglo.seguir_instagram === "undefined") {
      var seguir_instagram = "";
      //console.log(seguir_instagram);
    } else {
      seguir_instagram = arreglo.seguir_instagram;
    }
    if (typeof arreglo.omitir_instagram === "undefined") {
      var omitir_instagram = "";
      //console.log(omitir_instagram);
    } else {
      omitir_instagram = arreglo.omitir_instagram;
    }
    if (typeof arreglo.url_instagram === "undefined") {
      var url_instagram = "";
      //console.log(url_instagram);
    } else {
      url_instagram = (arreglo.url_instagram).toString();
    }
    if (typeof arreglo.seguir_spotify === "undefined") {
      var seguir_spotify = "";
      //console.log(seguir_spotify);
    } else {
      seguir_spotify = arreglo.seguir_spotify;
    }
    if (typeof arreglo.omitir_spotify === "undefined") {
      var omitir_spotify = "";
      //console.log(omitir_spotify);
    } else {
      omitir_spotify = arreglo.omitir_spotify;
    }
    if (typeof arreglo.url_spotify === "undefined") {
      var url_spotify = "";
      //console.log(url_spotify);
    } else {
      url_spotify = (arreglo.url_spotify).toString();
    }
    if (typeof arreglo.seguir_deezer === "undefined") {
      var seguir_deezer = "";
      //console.log(seguir_deezer);
    } else {
      seguir_deezer = arreglo.seguir_deezer;
    }
    if (typeof arreglo.guardar_deezer === "undefined") {
      var guardar_deezer = "";
      //console.log(guardar_deezer);
    } else {
      guardar_deezer = arreglo.guardar_deezer;
    }
    if (typeof arreglo.omitir_deezer === "undefined") {
      var omitir_deezer = "";
      //console.log(omitir_deezer);
    } else {
      omitir_deezer = arreglo.omitir_deezer;
    }

    if (typeof arreglo.url_deezer === "undefined") {
      var url_deezer = "";
      //console.log(url_deezer);
    } else {
      url_deezer = (arreglo.url_deezer).toString();
    }
    if (typeof arreglo.seguir_tiktok === "undefined") {
      var seguir_tiktok = "";
      //console.log(seguir_tiktok);
    } else {
      seguir_tiktok = arreglo.seguir_tiktok;
    }
    if (typeof arreglo.omitir_tiktok === "undefined") {
      var omitir_tiktok = "";
      //console.log(omitir_tiktok);
    } else {
      omitir_tiktok = arreglo.omitir_tiktok;
    }
    if (typeof arreglo.url_tiktok === "undefined") {
      var url_tiktok = "";
      //console.log(url_tiktok);
    } else {
      url_tiktok = (arreglo.url_tiktok).toString();
    }
    if (typeof arreglo.seguir_mixcloud === "undefined") {
      var seguir_mixcloud = "";
      //console.log(seguir_mixcloud);
    } else {
      seguir_mixcloud = arreglo.seguir_mixcloud;
    }
    if (typeof arreglo.repost_mixcloud === "undefined") {
      var repost_mixcloud = "";
      //console.log(repost_mixcloud);
    } else {
      repost_mixcloud = arreglo.repost_mixcloud;
    }
    if (typeof arreglo.like_mixcloud === "undefined") {
      var like_mixcloud = "";
      //console.log(like_mixcloud);
    } else {
      like_mixcloud = arreglo.like_mixcloud;
    }
    if (typeof arreglo.omitir_mixcloud === "undefined") {
      var omitir_mixcloud = "";
      //console.log(omitir_mixcloud);
    } else {
      omitir_mixcloud = arreglo.omitir_mixcloud;
    }
    if (typeof arreglo.url_mixcloud === "undefined") {
      var url_mixcloud = "";
      //console.log(url_mixcloud);
    } else {
      url_mixcloud = (arreglo.url_mixcloud).toString();
    }

    if (typeof arreglo.titulo === "undefined") {
      var titulo = "";
      //console.log(url_mixcloud);
    } else {
      titulo = arreglo.titulo;
    }

    if (arreglo.color === "#000000") {
      var color = "";
      //console.log(color);
    } else {
      var color = arreglo.color;
    }
    if (arreglo.color_titulo === "#000000") {
      var color_titulo = "";
      //console.log(color);
    } else {
      var color_titulo = arreglo.color_titulo;
    }
    if (arreglo.color_descripcion === "#000000") {
      var color_descripcion = "";
      //console.log(color_descripcion);
    } else {
      var color_descripcion = arreglo.color_descripcion;
    }



    if (typeof arreglo.seguir_twitch === "undefined") {
      var seguir_twitch = "";
      //console.log(url_mixcloud);
    } else {
      seguir_twitch = (arreglo.seguir_twitch).toString();
    }


    if (typeof arreglo.omitir_twitch === "undefined") {
      var omitir_twitch = "";
      //console.log(url_mixcloud);
    } else {
      omitir_twitch = (arreglo.omitir_twitch).toString();
    }

    if (typeof arreglo.url_twitch === "undefined") {
      var url_twitch = "";
      //console.log(url_mixcloud);
    } else {
      url_twitch = (arreglo.url_twitch).toString();
    }

    if (typeof arreglo.seguir_applemusic === "undefined") {
      var seguir_applemusic = "";
      //console.log(url_mixcloud);
    } else {
      seguir_applemusic = (arreglo.seguir_applemusic).toString();
    }

    if (typeof arreglo.omitir_applemusic === "undefined") {
      var omitir_applemusic = "";
      //console.log(url_mixcloud);
    } else {
      omitir_applemusic = (arreglo.omitir_applemusic).toString();
    }

    if (typeof arreglo.url_applemusic === "undefined") {
      var url_applemusic = "";
      //console.log(url_mixcloud);
    } else {
      url_applemusic = (arreglo.url_applemusic).toString();
    }
 if (typeof arreglo.omitir_correo === "undefined") {
      var omitir_correo = null;
      //console.log(url_mixcloud);
    } else {
      omitir_correo = (arreglo.omitir_correo).toString();
    }
    

    let now = new Date();
    id_usuario = arreglo.id_user;
    fecha = now;
    tema = "Oscuro";
console.log(arreglo.id_gate)
    return new Promise((resolve, reject) => {
      Gates.update(
        {
          id_usuario: id_usuario,
          tipo_create: arreglo.tipo_create,
          url_fuente: arreglo.url_demo,
          genero: arreglo.gender,
          archivo: arreglo.archivo1,
          nombre_artista: arreglo.artist_name,
          titulo: arreglo.music_title,
          descripcion: arreglo.music_desc,
          tema: tema,
          imagen: arreglo.img_flyer,
          color: color,
          color_titulo: color_titulo,
          color_descrip: color_descripcion,
          privacidad: arreglo.privacity,
          fecha_programa: fecha_programa,
          otro_gender: other_gender,
          url_track: url_track,
          music_price: music_price,
          show_watermarker: show_watermarker,
          user_logo: user_logo,
          suscribir_youtube: suscribir_youtube,
          omitir_youtube: omitir_youtube,
          url_youtube: url_youtube,
          nombre_youtube: nombre_youtube,
          like_facebook: like_facebook,
          compartir_facebook: compartir_facebook,
          omitir_facebook: omitir_facebook,
          url_facebook: url_facebook,
          seguir_twitter: seguir_twitter,
          compartir_twitter: compartir_twitter,
          omitir_twitter: omitir_twitter,
          url_twitter: url_twitter,
          seguir_soundcloud: seguir_soundcloud,
          compartir_soundcloud: compartir_soundcloud,
          repost_souncloud: repost_souncloud,
          omitir_souncloud: omitir_souncloud,
          url_souncloud: url_souncloud,
          seguir_instagram: seguir_instagram,
          omitir_instagram: omitir_instagram,
          url_instagram: url_instagram,
          seguir_spotify: seguir_spotify,
          omitir_spotify: omitir_spotify,
          url_spotify: url_spotify,
          seguir_deezer: seguir_deezer,
          guardar_deezer: guardar_deezer,
          omitir_deezer: omitir_deezer,
          url_deezer: url_deezer,
          seguir_tiktok: seguir_tiktok,
          omitir_tiktok: omitir_tiktok,
          url_tiktok: url_tiktok,
          seguir_mixcloud: seguir_mixcloud,
          repost_mixcloud: repost_mixcloud,
          like_mixcloud: like_mixcloud,
          omitir_mixcloud: omitir_mixcloud,
          url_mixcloud: url_mixcloud,
          seguir_twitch: seguir_twitch,
             omitir_twitch: omitir_twitch,
            url_twitch: url_twitch,
             seguir_applemusic: seguir_applemusic,
              omitir_applemusic: omitir_applemusic,
             url_applemusic: url_applemusic,
          enlace_perzonalizado: arreglo.gate_link,
          fecha_registro: fecha,omitir_correo:omitir_correo
        },
        {
          where: {
            id: arreglo.id_gate,
          },
        }
      )
        .then((gate) => {
          let gatees = JSON.stringify(gate);
          resolve(gatees);
          //console.log(gatees);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  guardarPlan(
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
    descuento,
    detalles
  ) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
      Planes.findOne({
        where: {
          modo: modo_plan,
          tipo_create: tipo_plan,
        },
      }).then((res) => {
        //console.log(res);
        if (!res) {
          // Item not found, create a new one
          Planes.create({
            id_usuario: id,
            tipo_create: tipo_plan,
            costo: costo_plan,
            modo: modo_plan,
            linea1: primera_linea,
            linea2: segunda_linea,
            linea3: tercera_linea,
            linea4: cuarta_linea,
            linea5: quinta_linea,
            linea6: sexta_linea,
            linea7: septima_linea,
            linea8: octava_linea,
            linea9: novena_linea,
            linea10: decima_linea,
            descuento: descuento,
            detalles: detalles,
          })
            .then((plan) => {
              let planes = JSON.stringify(plan);
              resolve(planes);
              //console.log(planes);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        } else {
          resolve("0");
        }
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });
    });
  },
  deletePlan(parametro_buscar) {
    return new Promise((resolve, reject) => {
      Planes.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });
    });
  },
  obtenerPlanforedit(id) {
    return new Promise((resolve, reject) => {
      Planes.findAll({
        where: {
          id: id,
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          //console.log(id);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  guardarPlanEdited(
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
  ) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
      Planes.update(
        {
          tipo_create: tipo_plan,
          costo: costo_plan,
          modo: modo_plan,
          linea1: primera_linea,
          linea2: segunda_linea,
          linea3: tercera_linea,
          linea4: cuarta_linea,
          linea5: quinta_linea,
          linea6: sexta_linea,
          linea7: septima_linea,
          linea8: octava_linea,
          linea9: novena_linea,
          linea10: decima_linea,
          descuento: descuento,
          detalles: detalles,
        },
        {
          where: {
            id: id,
          },
        }
      )
        .then((plan) => {
          let planes = JSON.stringify(plan);
          resolve(planes);
          //console.log(planes);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  //ABOUT
  totalaboutUs() {
    return new Promise((resolve, reject) => {
      Sobre_nosotros.findAll()
        .then((res) => {
          let about = JSON.stringify(res);
          resolve(about);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  guardaraboutus(
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
    apple_music
  ) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
      Sobre_nosotros.findOne({
        where: {
          id_usuario: id,
          telefono: telefono,
        },
      }).then((res) => {
        //console.log(res);
        if (!res) {
          // Item not found, create a new one
          Sobre_nosotros.create({
            id_usuario: id,
            telefono: telefono,
            ws: ws,
            facebook: facebook,
            instagram: instagram,
            souncloud: souncloud,
            mixcloud: mixcloud,
            youtube: youtube,
            correo: correo,
            twitter: twitter,
            spotify: spotify,
            tiktok: tiktok,
            deezer: deezer,
twitch: twitch,
apple_music: apple_music
          })
            .then((res) => {
              let about = JSON.stringify(res);
              resolve(about);
              //console.log(about);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        } else {
          resolve("0");
        }
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });
    });
  },
  obtenerAboutforedit(id) {
    return new Promise((resolve, reject) => {
      Sobre_nosotros.findAll({
        where: {
          id: id,
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          //console.log(id);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  saveEditedAbout(
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
    tiktok,
    deezer,
twitch,
apple_music
  ) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
      Sobre_nosotros.update(
        {
          telefono: telefono,
          ws: ws,
          facebook: facebook,
          instagram: instagram,
          soundcloud: soundcloud,
          mixcloud: mixcloud,
          youtube: youtube,
          correo: correo,
          twitter: twitter,
          spotify: spotify,
          tiktok: tiktok,
          deezer: deezer,
twitch: twitch,
apple_music: apple_music
        },
        {
          where: {
            id: id,
          },
        }
      )
        .then((about) => {
          let aboutes = JSON.stringify(about);
          resolve(aboutes);
          //console.log(aboutes);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  deleteAbout(parametro_buscar) {
    return new Promise((resolve, reject) => {
      Sobre_nosotros.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });
    });
  },

  //CUPONES
  totalcupones() {
    return new Promise((resolve, reject) => {
      Cupones.findAll()
        .then((res) => {
          let about = JSON.stringify(res);
          resolve(about);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  guardarCupon(
    id_usuario,
    nombre_cupon,
    valor,
    fecha_inicio,
    fecha_final,
    cantidad,
    tipo
  ) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
      Cupones.findOne({
        where: {
          nombre_cupon: nombre_cupon,
        },
      }).then((res) => {
        //console.log(res);
        if (!res) {
          // Item not found, create a new one
          Cupones.create({
            id_usuario: id_usuario,
            nombre_cupon: nombre_cupon,
            valor: valor,
            fecha_inicio: fecha_inicio,
            fecha_final: fecha_final,
            cantidad: cantidad,
            cantidad_actual: cantidad,
            tipo: tipo,
          })
            .then((res) => {
              let about = JSON.stringify(res);
              resolve(about);
             
              //console.log(about);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        } else {
          resolve("0");
        }
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });
    });
  },
  obtenerCuponforedit(id) {
    return new Promise((resolve, reject) => {
      Cupones.findAll({
        where: {
          id: id,
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          //console.log(id);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  saveEditedCupon(
    id,
    nombre_cupon,
    valor,
    fecha_inicio,
    fecha_final,
    cantidad,
    tipo
  ) {
    let now = new Date();
    fecha = now.toString();
    //console.log(fecha_inicio);
    //console.log(fecha_final);
    return new Promise((resolve, reject) => {
      Cupones.update(
        {
          nombre_cupon: nombre_cupon,
          valor: valor,
          fecha_inicio: fecha_inicio,
          fecha_final: fecha_final,
          cantidad: cantidad,
          cantidad_actual: cantidad,
          tipo: tipo,
        },
        {
          where: {
            id: id,
          },
        }
      )
        .then((about) => {
          let aboutes = JSON.stringify(about);
          resolve(aboutes);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  deleteCupon(parametro_buscar) {
    return new Promise((resolve, reject) => {
      Cupones.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });
    });
  },
  consultarCuponMembership(consultar) {
    return new Promise((resolve, reject) => {
      Cupones.findAll({
        where: {
          [Op.or]: [{ nombre_cupon: consultar }],
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          //console.log(ress);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  UpdateUsedCupon(id, cantidad) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
      Cupones.update(
        { cantidad_actual: cantidad },
        {
          where: {
            id: id,
          },
        }
      )
        .then((about) => {
          let aboutes = JSON.stringify(about);
          resolve(aboutes);
          //console.log(aboutes);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  CuponUsado(id_usuario, nombre_cupon, valor, fecha_uso, usado_en, tipo) {
    return new Promise((resolve, reject) => {
      Used_cupons.create({
        id_usuario: id_usuario,
        nombre_cupon: nombre_cupon,
        valor: valor,
        fecha_uso: fecha_uso,
        usado_en: usado_en,
        tipo: tipo,
      })
        .then((about) => {
          let aboutes = JSON.stringify(about);
          resolve(aboutes);
          // //console.log(aboutes);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  obtenerCuponesUsados(id_usuario) {
    return new Promise((resolve, reject) => {
      Used_cupons.findAll({
        where: {
          id_usuario: id_usuario,
        },
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["updatedAt", "DESC"],
        ],
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          ////console.log(id);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  guardarPago(
    id_usuario,
    status,
    numero_referencia,
    monto,
    tipo_compra,
    metodo
  ) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
      Pagos.findOne({
        where: {
          status: status,
          numero_referencia: numero_referencia,
          tipo_compra: tipo_compra,
          metodo_pago: metodo,
        },
      }).then((res) => {
        console.log(res);
        if (!res) {
          // Item not found, create a new one
          Pagos.create({
            id_usuario: id_usuario,
            status: status,
            numero_referencia: numero_referencia,
            monto: monto,
            tipo_compra: tipo_compra,
            metodo_pago: metodo,
            usuarioId: id_usuario
          })
            .then((res) => {
              let resultado = JSON.stringify(res);
              resolve(resultado);
              //console.log(resultado);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        } else {
          resolve("0");
        }
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });;
    });
  },
  guardarPagoVenta(
    id_usuario_comprador,
    status,
    numero_referencia,
    monto,
    tipo_compra,
    metodo,id_usuario
  ) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
          // Item not found, create a new one
          Pagos.create({
            id_usuario: id_usuario_comprador,
            status: status,
            numero_referencia: numero_referencia,
            monto: monto,
            tipo_compra: tipo_compra,
            metodo_pago: metodo,
            usuarioId: id_usuario
          })
            .then((res) => {
              let resultado = JSON.stringify(res);
              resolve(resultado);
              //console.log(resultado);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
    });
  },

  totalPagos() {
    return new Promise((resolve, reject) => {
      Pagos.findAll({include: [
        {
          association: Pagos.Usuarios,
        },
      ],})
        .then((res) => {
          let respuesta = JSON.stringify(res);
          resolve(respuesta);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  totalPagosbyId(id_user) {
    return new Promise((resolve, reject) => {
      Pagos.findAll({
        where: {
          id_usuario: id_user,
        },include: [
          {
            association: Pagos.Usuarios,
          },
        ],
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["updatedAt", "DESC"],
        ],
      })
        .then((res) => {
          let respuesta = JSON.stringify(res);
          resolve(respuesta);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  obtenerGateforDown(id) {
    return new Promise((resolve, reject) => {
      Gates.findAll({
        where: {
          id: id,
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          //console.log(id);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  actualizarGateDownload(id, descarga, mails) {
    return new Promise((resolve, reject) => {
    if (mails =="No cuenta") {
      Gates.update(
        { descargas: descarga},
        {
          where: {
            id: id,
          },
        }
      )
        .then((about) => {
          let aboutes = JSON.stringify(about);
          Gate_SoundC.update(
            { descargas: descarga },
            {
              where: {
                id_gate: id,
              },
            }
          ).then(() => {
            //console.log("aqui");
          }).catch((err) => {
            //console.log(err);
             reject(err)
          });
          resolve(aboutes);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    }else{
      Gates.update(
        { descargas: descarga, correos: mails },
        {
          where: {
            id: id,
          },
        }
      )
        .then((about) => {
          let aboutes = JSON.stringify(about);
          Gate_SoundC.update(
            { descargas: descarga },
            {
              where: {
                id_gate: id,
              },
            }
          ).then(() => {
            //console.log("aqui");
          }).catch((err) => {
            //console.log(err);
             reject(err)
          });
          resolve(aboutes);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    }
    });
  },
  actualizaGateView(id, view) {
    return new Promise((resolve, reject) => {
      Gates.update(
        { vista: view},
        {
          where: {
            id: id,
          },
        }
      )
        .then((about) => {
          let aboutes = JSON.stringify(about);
         
          resolve(aboutes);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    
    });
  },

  guardarBanner(id_usuario, link, photo, nombre) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
      Banner.findOne({
        where: {
          nombre: nombre,
          link: link,
        },
      }).then((res) => {
        //console.log(res);
        if (!res) {
          // Item not found, create a new one
          Banner.create({
            id_usuario: id_usuario,
            link: link,
            photo: photo,
            nombre: nombre,
          })
            .then((res) => {
              let respuesta = JSON.stringify(res);
              resolve(respuesta);
              //console.log(respuesta);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        } else {
          resolve("0");
        }
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });;
    });
  },
  obtenerBannerforedit(id) {
    return new Promise((resolve, reject) => {
      Banner.findAll({
        where: {
          id: id,
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          //console.log(id);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  saveEditedBanner(id, link, photo, nombre) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
      Banner.update(
        { link: link, photo: photo, nombre: nombre },
        {
          where: {
            id: id,
          },
        }
      )
        .then((res) => {
          let reses = JSON.stringify(res);
          resolve(reses);
          //console.log(reses);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  saveEditedPublicidad(id, link, nombre) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
      Banner.update(
        { link: link, nombre: nombre },
        {
          where: {
            id: id,
          },
        }
      )
        .then((res) => {
          let reses = JSON.stringify(res);
          resolve(reses);
          //console.log(reses);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  obtenerBanners() {
    return new Promise((resolve, reject) => {
      Banner.findAll({where:{
        tipo: null
      }})
        .then((res) => {
          let respuesta = JSON.stringify(res);
          resolve(respuesta);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  deleteBanner(parametro_buscar) {
    return new Promise((resolve, reject) => {
      Banner.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });
    });
  },

  obtenerPublicidad() {
    return new Promise((resolve, reject) => {
      Banner.findAll({where:{
        tipo: 'Publicidad'
      }})
        .then((res) => {
          let respuesta = JSON.stringify(res);
          resolve(respuesta);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  guardarPublicidad(id_usuario, link, nombre) {
    return new Promise((resolve, reject) => {
      Banner.findOne({
        where: {
          nombre: nombre,
          link: link,
          tipo: 'Publicidad'
        },
      }).then((res) => {
        //console.log(res);
        if (!res) {
          // Item not found, create a new one
          Banner.create({
            id_usuario: id_usuario,
            link: link,
            tipo: 'Publicidad',
            nombre: nombre,
          })
            .then((res) => {
              let respuesta = JSON.stringify(res);
              resolve(respuesta);
              //console.log(respuesta);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        } else {
          resolve("0");
        }
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });;
    });
  },
  deletePublicidad(parametro_buscar) {
    return new Promise((resolve, reject) => {
      Banner.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });
    });
  },

  guardarSuscripcion(tipo, correo) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
      Suscripciones.findOne({
        where: {
          tipo: tipo,
          correo: correo,
        },
      }).then((res) => {
        //console.log(res);
        if (!res) {
          // Item not found, create a new one
          Suscripciones.create({ tipo: tipo, correo: correo })
            .then((res) => {
              let respuesta = JSON.stringify(res);
              resolve(respuesta);
              ////console.log(respuesta);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        } else {
          resolve("0");
        }
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });
    });
  },
  guardarSuscripcionGate(tipo, correo, id_gate, id_usuario) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
      Suscripciones.findOne({
        where: {
          tipo: tipo,
          correo: correo,
          id_usuario: id_usuario,
        },
      }).then((res) => {
        //console.log(res);
        if (!res) {
          // Item not found, create a new one
          Suscripciones.create({
            tipo: tipo,
            correo: correo,
            id_gate: id_gate,
            id_usuario: id_usuario,
          })
            .then((res) => {
              let respuesta = JSON.stringify(res);
              resolve(respuesta);
              // //console.log(respuesta);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        } else {
          resolve("0");
        }
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });
    });
  },

  obtenerSuscripbyUserG(id) {
    return new Promise((resolve, reject) => {
      Suscripciones.findAll({
        where: {
          id_usuario: id,
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  obtenerSuscripAdmin(id) {
    return new Promise((resolve, reject) => {
      Suscripciones.findAll({
        where: {
          tipo: 'suscripcion_landing',
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  deleteFan(id) {
    return new Promise((resolve, reject) => {
      Suscripciones.destroy({
        where: {
          id: id,
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  //BACKCOIN
  obtenerBackcoinDataPay(id_user) {
    return new Promise((resolve, reject) => {
      Backcoin.findAll({
        where: {
          id_usuario: id_user,
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  saveDatosBackcoin(
    id_user,
    nombre_apellido,
    tipo_documento,
    n_documento,
    correo,
    save_pais,
    save_banco,
    cuenta
  ) {
    return new Promise((resolve, reject) => {
      Backcoin.findOne({
        where: {
          id_usuario: id_user,
        },
      }).then((res) => {
        //console.log(res);
        if (!res) {
          // Item not found, create a new one
          Backcoin.create({
            id_usuario: id_user,
            nombre_apellido: nombre_apellido,
            tipo_documento: tipo_documento,
            n_documento: n_documento,
            correo: correo,
            pais: save_pais,
            banco: save_banco,
            cuenta: cuenta,
          })
            .then((res) => {
              let respuesta = JSON.stringify(res);
              resolve(respuesta);
              ////console.log(respuesta);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        } else {
          Backcoin.update(
            {
              id_usuario: id_user,
              nombre_apellido: nombre_apellido,
              tipo_documento: tipo_documento,
              n_documento: n_documento,
              correo: correo,
              pais: save_pais,
              banco: save_banco,
              cuenta: cuenta,
            },
            {
              where: {
                id_usuario: id_user,
              },
            }
          )
            .then((resp) => {
              let res = JSON.stringify(resp);
              resolve(res);
              // //console.log(res);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        }
      });
    });
  },

  recargaBackcoin(id_user, monto) {
    console.log(id_user)
    console.log(monto)
    return new Promise((resolve, reject) => {
      Backcoin.findOne({
        where: {
          id_usuario: id_user,
        },
      }).then((restt) => {
        console.log(restt);
       console.log("aja");
        var monto_nuevo = parseInt(restt.dataValues.monto) + parseInt(monto);
        //console.log(monto_nuevo);
        //console.log(id_user + "usuario");
        // Item not found, create a new one
        Backcoin.update(
          { monto: monto_nuevo },
          {
            where: {
              id_usuario: id_user,
            },
          }
        )
          .then((resp) => {
            //console.log(resp);
            Usuarios.update(
              { backcoins: monto_nuevo },
              {
                where: {
                  id: id_user,
                },
              }
            )
              .then((respf) => {
                let res = JSON.stringify(respf);
                resolve(monto_nuevo);
                // //console.log(res);
              })
              .catch((err) => {
                //console.log(err);
                 reject(err)
              });
          })
          .catch((err) => {
            //console.log(err);
             reject(err)
          });
      });
    });
  },
  descontarBackcoin(id_user, monto) {
    return new Promise((resolve, reject) => {
      Backcoin.findOne({
        where: {
          id_usuario: id_user,
        },
      }).then((res) => {
        ////console.log(res.dataValues.monto);
        ////console.log("aja");
        var monto_nuevo = parseInt(res.dataValues.monto) - parseInt(monto);
        ////console.log(monto_nuevo);
        // Item not found, create a new one
        Backcoin.update(
          { monto: monto_nuevo },
          {
            where: {
              id_usuario: id_user,
            },
          }
        )
          .then((resp) => {
            Usuarios.update(
              { backcoins: monto_nuevo },
              {
                where: {
                  id: id_user,
                },
              }
            )
              .then((respf) => {
                let res = JSON.stringify(respf);
                resolve(monto_nuevo);
                // //console.log(res);
              })
              .catch((err) => {
                //console.log(err);
                 reject(err)
              });
          })
          .catch((err) => {
            //console.log(err);
             reject(err)
          });
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });
    });
  },

  devolverBackcoin(id_user, monto) {
    console.log(monto)
    return new Promise((resolve, reject) => {
      Backcoin.findOne({
        where: {
          id_usuario: id_user,
        },
      }).then((res) => {
        //console.log(res);
        console.log(res.dataValues.monto);
        var monto_nuevo = parseInt(res.dataValues.monto) + parseInt(monto);
        console.log(monto_nuevo);
        // Item not found, create a new one
        Backcoin.update(
          { monto: monto_nuevo },
          {
            where: {
              id_usuario: id_user,
            },
          }
        )
          .then((resp) => {
            Usuarios.update(
              { backcoins: monto_nuevo },
              {
                where: {
                  id: id_user,
                },
              }
            )
              .then((respf) => {
                let res = JSON.stringify(respf);
                resolve(monto_nuevo);
                // //console.log(res);
              })
              .catch((err) => {
                //console.log(err);
                 reject(err)
              });
          })
          .catch((err) => {
            //console.log(err);
             reject(err)
          });
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });;
    });
  },

  //NOTIFICACIONES
  obtenernotificaciones() {
    return new Promise((resolve, reject) => {
      Notificaciones.findAll({
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["updatedAt", "DESC"],
        ],
      })
        .then((res) => {
          let respuesta = JSON.stringify(res);
          resolve(respuesta);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  obtenernotificacionesbyLimit3() {
    return new Promise((resolve, reject) => {
      Notificaciones.findAll({
        limit: 2,
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["updatedAt", "DESC"],
        ],
      })
        .then((res) => {
          let respuesta = JSON.stringify(res);
          resolve(respuesta);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  saveDatosNotificaciones(
    id_usuario,
    nombre,
    estado,
    descripcion,
    fecha_inicio, fecha_final,
    destino,id_notificacion
  ) {
    return new Promise((resolve, reject) => {
      Notificaciones.findOne({
        where: {
          nombre: nombre,
        },
      }).then((res) => {
        //console.log(res);
        if (!res) {
          // Item not found, create a new one
          Notificaciones.create({
            id_usuario: id_usuario,
            nombre: nombre,
            estado: estado,
            descripcion: descripcion,
            fecha_inicio: fecha_inicio, fecha_final: fecha_final,
            destino: destino,
          })
            .then((res) => {
              let respuesta = JSON.stringify(res);
              resolve(respuesta);
              ////console.log(respuesta);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        } else {
          Notificaciones.update(
            {
              nombre: nombre,
              estado: estado,
              descripcion: descripcion,
              fecha_inicio: fecha_inicio, fecha_final: fecha_final,
              destino: destino,
            },
            {
              where: {
                id: id_notificacion,
              },
            }
          )
            .then((resp) => {
              let res = JSON.stringify(resp);
              resolve("0");
              // //console.log(res);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        }
      });
    });
  },

  obtenerNotificacionforedit(id) {
    return new Promise((resolve, reject) => {
      Notificaciones.findAll({
        where: {
          id: id,
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          //console.log(id);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  saveEditedNotificaciones(id, link, photo, nombre) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
      Notificaciones.update(
        { link: link, photo: photo, nombre: nombre },
        {
          where: {
            id: id,
          },
        }
      )
        .then((res) => {
          let reses = JSON.stringify(res);
          resolve(reses);
          //console.log(reses);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  deleteNotificaciones(parametro_buscar) {
    return new Promise((resolve, reject) => {
      Notificaciones.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });
    });
  },

    //Modal_land
    obtenerModalLand() {
      return new Promise((resolve, reject) => {
        Modal_land.findAll({
          order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ["createdAt", "DESC"],
          ],
        })
          .then((res) => {
            let respuesta = JSON.stringify(res);
            resolve(respuesta);
            ////console.log(JSON.stringify(users));
          })
          .catch((err) => {
            //console.log(err);
             reject(err)
          });
      });
    },
    obtenerModalLandAct() {
      return new Promise((resolve, reject) => {
        Modal_land.findOne({where:{estado: 'Activa'}},{
          order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ["createdAt", "DESC"],
          ],
        })
          .then((res) => {
            let respuesta = JSON.stringify(res);
            resolve(respuesta);
            ////console.log(JSON.stringify(users));
          })
          .catch((err) => {
            //console.log(err);
             reject(err)
          });
      });
    },
  
    saveDatosModal_land(id_user, titulo, estado, descripcion,img,link) {
      return new Promise((resolve, reject) => {
            // Item not found, create a new one
            Modal_land.create({
              id_usuario: id_user,
              titulo: titulo,
              estado: estado,
              descripcion: descripcion,
              img: img,link: link
            })
              .then((res) => {
                let respuesta = JSON.stringify(res);
                resolve(respuesta);
                ////console.log(respuesta);
              })
              .catch((err) => {
                //console.log(err);
                 reject(err)
              });
          
      });
    },
  
    obtenerModalforedit(id) {
      return new Promise((resolve, reject) => {
        Modal_land.findAll({
          where: {
            id: id,
          },
        })
          .then((res) => {
            let ress = JSON.stringify(res);
            resolve(ress);
            //console.log(id);
          })
          .catch((err) => {
            //console.log(err);
             reject(err)
          });
      });
    },
    saveEditedmodal(id_, titulo, estado, descripcion,img,link  ) {
      let now = new Date();
      fecha = now.toString();
      return new Promise((resolve, reject) => {
        Modal_land.update(
          { titulo: titulo,
            estado: estado,
            descripcion: descripcion,
            img: img,
          link: link},
          {
            where: {
              id: id_,
            },
          }
        )
          .then((res) => {
            let reses = JSON.stringify(res);
            resolve(reses);
            //console.log(reses);
          })
          .catch((err) => {
            //console.log(err);
             reject(err)
          });
      });
    },
  
    deleteNotificaciones(parametro_buscar) {
      return new Promise((resolve, reject) => {
        Modal_land.destroy({
          where: {
            id: parametro_buscar,
          },
        }).then(() => {
          //let gates= JSON.stringify(users)
          resolve("respuesta exitosa");
          ////console.log(JSON.stringify(users));
        }).catch((err) => {
          //console.log(err);
           reject(err)
        });
      });
    },

  guardarPlan_user(userid, producto, modo, metodo_pago) {
    Fecha_inicial = new Date(); //Fecha actual del sistema
    Hoy = new Date();
    var desde = Fecha_inicial.toISOString();
    //console.log(modo);
    if (modo == "Anual") {
      Hoy.setFullYear(Hoy.getFullYear() + 1);
      var Final = Hoy.toISOString();
    } else if (modo == "Mensual") {
      Hoy.setMonth(Hoy.getMonth() + 1);
      var Final = Hoy.toISOString();
    }
    return new Promise((resolve, reject) => {
      Usuarios.findOne({
        where: {
          id: userid,
        },
      }).then((res) => {
        Usuarios.update(
          {
            modo: modo,
            metodo_pago: metodo_pago,
            desde: Fecha_inicial,
            hasta: Final,
          },
          {
            where: {
              id: userid,
            },
          }
        )
          .then((resp) => {
            let res = JSON.stringify(resp);
            resolve("0");
            // //console.log(res);
          })
          .catch((err) => {
            //console.log(err);
             reject(err)
          });
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });;
    });
  },

  // TIPO DE CAMBIO

  obtenerTipo_cambio() {
    return new Promise((resolve, reject) => {
      Tipo_cambio.findAll({
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["updatedAt", "DESC"],
        ],
      })
        .then((res) => {
          let respuesta = JSON.stringify(res);
          resolve(respuesta);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  saveTipoCambio(id_user, tipo_cambio, id_tipo) {
    return new Promise((resolve, reject) => {
      Tipo_cambio.findOne({
        where: {
          id: id_tipo,
        },
      }).then((res) => {
        //console.log(res);
        if (!res) {
          // Item not found, create a new one
          Tipo_cambio.create({ id_usuario: id_user, tipo_cambio: tipo_cambio })
            .then((res) => {
              let respuesta = JSON.stringify(res);
              resolve(respuesta);
              ////console.log(respuesta);
            })
            .catch((err) => {
              //console.log(err);
            });
        } else {
          Tipo_cambio.update(
            { id_usuario: id_user, tipo_cambio: tipo_cambio },
            {
              where: {
                id: id_tipo,
              },
            }
          )
            .then((resp) => {
              let res = JSON.stringify(resp);
              resolve("0");
              // //console.log(res);
            })
            .catch((err) => {
              //console.log(err);
            });
        }
      });
    });
  },

  obtenerTipoCambioById(id) {
    return new Promise((resolve, reject) => {
      Tipo_cambio.findAll({
        where: {
          id: id,
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          //console.log(id);
        })
        .catch((err) => {
          //console.log(err);
        });
    });
  },

  deleteTipo_cambio(parametro_buscar) {
    return new Promise((resolve, reject) => {
      Tipo_cambio.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      });
    });
  },

  // AYUDA

  obtenerAyuda() {
    return new Promise((resolve, reject) => {
      Ayuda.findAll({
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["updatedAt", "DESC"],
        ],
      })
        .then((res) => {
          let respuesta = JSON.stringify(res);
          resolve(respuesta);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  saveAyuda(
    id_user,
    tipo,
    terminos,
    politicas_privacidad,
    pregunta,
    respuesta,
    id_tipo
  ) {
    return new Promise((resolve, reject) => {
      Ayuda.findOne({
        where: {
          id: id_tipo,
        },
      }).then((res) => {
        //console.log(res);
        if (!res) {
          // Item not found, create a new one
          Ayuda.create({
            id_usuario: id_user,
            tipo: tipo,
            terminos: terminos,
            politicas: politicas_privacidad,
            preguntas: pregunta,
            respuestas: respuesta,
          })
            .then((res) => {
              let respuesta = JSON.stringify(res);
              resolve(respuesta);
              ////console.log(respuesta);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        } else {
          Ayuda.update(
            {
              id_usuario: id_user,
              tipo: tipo,
              terminos: terminos,
              politicas: politicas_privacidad,
              preguntas: pregunta,
              respuestas: respuesta,
            },
            {
              where: {
                id: id_tipo,
              },
            }
          )
            .then((resp) => {
              let res = JSON.stringify(resp);
              resolve("0");
              // //console.log(res);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        }
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });;
    });
  },

  obtenerAyudaById(id) {
    return new Promise((resolve, reject) => {
      Ayuda.findAll({
        where: {
          id: id,
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          //console.log(id);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  deleteAyuda(parametro_buscar) {
    return new Promise((resolve, reject) => {
      Ayuda.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });;
    });
  },

  // SOUNDCLOUD SAVE DETALLES
  SaveSoundC(id_user, id_gate, title, id_track, permalink_url) {
    return new Promise((resolve, reject) => {
      Gate_SoundC.findOne({
        where: {
          id_gate: id_gate,
        },
      }).then((res) => {
        //console.log(res);
        if (!res) {
          // Item not found, create a new one
          Gate_SoundC.create({
            id_usuario: id_user,
            id_gate: id_gate,
            title: title,
            track_id: id_track,
            permalink_url: permalink_url,
          })
            .then((res) => {
              let respuesta = JSON.stringify(res);
              resolve(respuesta);
              ////console.log(respuesta);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        } else {
          Gate_SoundC.update(
            {
              id_usuario: id_user,
              id_gate: id_gate,
              title: title,
              track_id: id_track,
              permalink_url: permalink_url,
            },
            {
              where: {
                id_gate: id_gate,
              },
            }
          )
            .then((resp) => {
              let res = JSON.stringify(resp);
              resolve("update");
              // //console.log(res);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        }
      }).catch((err) => {
        //console.log(err);
         reject(err)
      });;
    });
  },
  UpdateRelationGate(id_save, id_gate) {
    return new Promise((resolve, reject) => {
      Gates.update(
        { gateSoundcId: id_save },
        {
          where: {
            id: id_gate,
          },
        }
      )
        .then((resp) => {
          let res = JSON.stringify(resp);
          resolve("update");
          // //console.log(res);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  obtenerSoundCD() {
    return new Promise((resolve, reject) => {
      Gates.findAll({
        where: {
          [Op.or]: [{ tipo_create: "filegate" }, { tipo_create: "bondgate" }],
        },
        include: [
          {
            association: Gates.Gate_SoundC,
          },
        ],limit: 100 ,
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["descargas", "DESC"],
        ],
      },)
        .then((res) => {
          let respuesta = JSON.stringify(res);
          resolve(respuesta);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  obtenerSoundNew() {
    return new Promise((resolve, reject) => {
      Gates.findAll({
        where: {
          tipo_create: "backstore",
        },
        include: [
          {
            association: Gates.Gate_SoundC,
          },
        ],
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["descargas", "DESC"],
        ],
      })
        .then((res) => {
          let respuesta = JSON.stringify(res);
          resolve(respuesta);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  // RETIROS
  saveRetiro(backcoinId, id_usuario, status, monto, fecha_solicitud) {
    return new Promise((resolve, reject) => {
      Retiros.create({
        id_usuario: id_usuario,
        status: status,
        monto: monto,
        fecha_solicitud: fecha_solicitud,
        backcoinId: backcoinId,
      })
        .then((res) => {
          let respuesta = JSON.stringify(res);
          resolve(respuesta);
          ////console.log(respuesta);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  obtenerRetiros1() {
    return new Promise((resolve, reject) => {
      Retiros.findAll({
        include: [
          {
            association: Retiros.Backcoin,
          },
        ],
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["status", "DESC"],
          ["fecha_solicitud", "DESC"],
        ],
      })
        .then((res) => {
          let respuesta = JSON.stringify(res);
          resolve(respuesta);
          //////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  obtenerRetirosbyId(id) {
    return new Promise((resolve, reject) => {
      Retiros.findAll({
        where: {
          id: id,
        },
        include: [
          {
            association: Retiros.Backcoin,
          },
        ],
      })
        .then((res) => {
          let respuesta = JSON.stringify(res);
          resolve(respuesta);
          //////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  obtenerRetirosbyUser(id) {
    return new Promise((resolve, reject) => {
      Retiros.findAll({
        where: {
          id_usuario: id,
        },
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["fecha_solicitud", "DESC"],
        ],
        include: [
          {
            association: Retiros.Backcoin,
          },
        ],
      })
        .then((res) => {
          let respuesta = JSON.stringify(res);
          resolve(respuesta);
          //////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  obtenerRetirosbyID(id) {
    return new Promise((resolve, reject) => {
      Retiros.findAll({
        where: {
          id: id,
        },
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["fecha_solicitud", "DESC"],
        ],
        include: [
          {
            association: Retiros.Backcoin,
          },
        ],
      })
        .then((res) => {
          let respuesta = JSON.stringify(res);
          resolve(respuesta);
          //////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

  RetirosSave_update(id, status, comprobante_photo, fecha_pago, observacion) {
    return new Promise((resolve, reject) => {
      Retiros.update(
        {
          id: id,
          status: status,
          comprobante_pago: comprobante_photo,
          fecha_pago: fecha_pago,
          observacion: observacion,
        },
        {
          where: {
            id: id,
          },
        }
      )
        .then((resp) => {
          let res = JSON.stringify(resp);
          resolve("update");
          // ////console.log(res);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },
  RetiroscancelarSave_update(id, monto, status) {
    return new Promise((resolve, reject) => {
      Retiros.update(
        {
          id: id,
          status: status,
        },
        {
          where: {
            id: id,
          },
        }
      )
        .then((resp) => {
          let rest = JSON.stringify(resp);
          resolve(rest);
          // ////console.log(res);
        })
        .catch((err) => {
          //console.log(err);
           reject(err)
        });
    });
  },

    // SOPORTE

    obtenerSoporte() {
      return new Promise((resolve, reject) => {
        Soporte.findAll({
          order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ["createdAt", "DESC"],
          ],
        })
          .then((res) => {
            let respuesta = JSON.stringify(res);
            resolve(respuesta);
            ////console.log(JSON.stringify(users));
          })
          .catch((err) => {
            //console.log(err);
             reject(err)
          });
      });
    },
  
    saveSoporte(correo,nombre,telefono,descripcion,adjunto,respuestas, userid, id_soporte) {
      return new Promise((resolve, reject) => {
        Soporte.findOne({
          where: {
            id: id_soporte,
          },
        }).then((res) => {
          //console.log(res);
          if (!res) {
            // Item not found, create a new one
            Soporte.create({
              correo: correo,
              nombre: nombre,
              telefono: telefono,
              descripcion: descripcion,
              adjunto: adjunto,
              respuestas: respuestas,
              usuarioId: userid
            })
              .then((res) => {
                let respuesta = JSON.stringify(res);
                resolve(respuesta);
                ////console.log(respuesta);
              })
              .catch((err) => {
                //console.log(err);
                 reject(err)
              });
          } else {
            Soporte.update(
              {
                correo: correo,
                nombre: nombre,
                telefono: telefono,
                descripcion: descripcion,
                adjunto: adjunto,
                respuestas: respuestas,
                usuarioId: userid
              },
              {
                where: {
                  id: id_soporte,
                },
              }
            )
              .then((resp) => {
                let res = JSON.stringify(resp);
                resolve("0");
                // //console.log(res);
              })
              .catch((err) => {
                //console.log(err);
                 reject(err)
              });
          }
        }).catch((err) => {
          //console.log(err);
           reject(err)
        });;
      });
    },
  
    obtenerSoporteById(id) {
      return new Promise((resolve, reject) => {
        Soporte.findAll({
          where: {
            id: id,
          },
        })
          .then((res) => {
            let ress = JSON.stringify(res);
            resolve(ress);
            //console.log(id);
          })
          .catch((err) => {
            //console.log(err);
             reject(err)
          });
      });
    },
  
    deleteSoporte(parametro_buscar) {
      return new Promise((resolve, reject) => {
        Soporte.destroy({
          where: {
            id: parametro_buscar,
          },
        }).then(() => {
          //let gates= JSON.stringify(users)
          resolve("respuesta exitosa");
          ////console.log(JSON.stringify(users));
        }).catch((err) => {
          //console.log(err);
           reject(err)
        });;
      });
    },
      // GENEROS

      obtenerGeneros() {
        return new Promise((resolve, reject) => {
          Generos.findAll({
            order: [
              // Will escape title and validate DESC against a list of valid direction parameters
              ["genero", "ASC"],
            ],
          })
            .then((res) => {
              let respuesta = JSON.stringify(res);
              resolve(respuesta);
              ////console.log(JSON.stringify(users));
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        });
      },
    
      saveGeneros(nombre, id, user) {
        return new Promise((resolve, reject) => {
          Generos.findOne({
            where: {
              id: id,
            },
          }).then((res) => {
            //console.log(res);
            if (!res) {
              // Item not found, create a new one
              Generos.create({genero: nombre,id_usuario:user
              })
                .then((res) => {
                  let respuesta = JSON.stringify(res);
                  resolve(respuesta);
                  ////console.log(respuesta);
                })
                .catch((err) => {
                  //console.log(err);
                   reject(err)
                });
            } else {
              Generos.update(
                {
                  genero: nombre,id_usuario:user
                },
                {
                  where: {
                    id: id,
                  },
                }
              )
                .then((resp) => {
                  let res = JSON.stringify(resp);
                  resolve("0");
                  // //console.log(res);
                })
                .catch((err) => {
                  //console.log(err);
                   reject(err)
                });
            }
          }).catch((err) => {
            //console.log(err);
             reject(err)
          });;
        });
      },
    
      obtenerGenerosById(id) {
        return new Promise((resolve, reject) => {
          Generos.findOne({
            where: {
              id: id,
            },
          })
            .then((res) => {
              let ress = JSON.stringify(res);
              resolve(ress);
              //console.log(id);
            })
            .catch((err) => {
              //console.log(err);
               reject(err)
            });
        });
      },
    
      deleteGeneros(parametro_buscar) {
        return new Promise((resolve, reject) => {
          Generos.destroy({
            where: {
              id: parametro_buscar,
            },
          }).then(() => {
            //let gates= JSON.stringify(users)
            resolve("respuesta exitosa");
            ////console.log(JSON.stringify(users));
          }).catch((err) => {
            //console.log(err);
             reject(err)
          });;
        });
      },
};
