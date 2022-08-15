const Modulo_BD = require("../models/modulos_");
const scdl = require("soundcloud-downloader").default;

exports.showLandingPage = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  Modulo_BD.obtenerBanners().then((resultado) => {
    const parsedBanner = JSON.parse(resultado);

    Modulo_BD.totalPlanes().then((resultado) => {
      let parsed = JSON.parse(resultado);
      let cont = parsed.length;
      let planes = true;
      //console.log(parsed);
      let plan_basico_Mensual = [];
      let plan_VIP_Anual = [];
      let plan_VIP_Mensual = [];
      let plan_Gold_Anual = [];
      let plan_Gold_mensual = [];
      for (let i = 0; i < cont; i++) {
        if (parsed[i].tipo_create === "Basic" && parsed[i].modo === "Mensual") {
          plan_basico_Mensual.push(parsed[i]);
        }
        if (parsed[i].tipo_create === "VIP" && parsed[i].modo === "Anual") {
          plan_VIP_Anual.push(parsed[i]);
        }
        if (parsed[i].tipo_create === "VIP" && parsed[i].modo === "Mensual") {
          plan_VIP_Mensual.push(parsed[i]);
        }
        if (parsed[i].tipo_create === "Gold" && parsed[i].modo === "Anual") {
          plan_Gold_Anual.push(parsed[i]);
        }
        if (parsed[i].tipo_create === "Gold" && parsed[i].modo === "Mensual") {
          plan_Gold_mensual.push(parsed[i]);
        }

        //const element = array[index];
      }
      Modulo_BD.totalaboutUs().then((data) => {
        let parsed_about = JSON.parse(data)[0];
        //	console.log(parsed_about)
        Modulo_BD.obtenerUsuarios().then((usuarios)=>{
          let parsed_users = JSON.parse(usuarios);
        let count_users = parsed_users.length
        console.log(count_users)
        res.render("home", {
          pageName: "Inicio",
          landingPage: true,
          plan_basico_Mensual,
          plan_VIP_Anual,
          plan_Gold_Anual,
          plan_VIP_Mensual,
          plan_Gold_mensual,
          msg,
          parsedBanner,
          parsed_about,count_users,
          layout: false,
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

exports.showRank = (req, res) => {
  Modulo_BD.obtenerSoundCD().then((resultadoS) => {
    var parsedSound = JSON.parse(resultadoS);
    //console.log(parsedSound)
    Modulo_BD.totalaboutUs().then((data) => {
      let parsed_about = JSON.parse(data)[0];
      //	console.log(parsed_about)
    Modulo_BD.obtenerSoundNew().then((resultadoT) => {
      Modulo_BD.obtenerPublicidad().then((resultadopubli) => {
        var parsed_publi = JSON.parse(resultadopubli)[0];
        if (typeof parsed_publi === "undefined") {
          var parsed_new = JSON.parse(resultadoT);
          console.log(parsed_new)
          res.render("ranking", {
            pageName: "Inicio",
            landingPage: true,
            parsed_new,
            parsedSound,
            layout: false,
            parsed_about,
            
          });
        }else{
          var link_publicidad =parsed_publi.link
      
          scdl.getInfo(link_publicidad).then((stream) => {
            var id_track = stream.id;
            console.log(parsedSound)
          var parsed_new = JSON.parse(resultadoT);
          
          res.render("ranking", {
            pageName: "Inicio",
            landingPage: true,
            parsed_new,
            parsedSound,
            layout: false,
            id_track,
            parsed_about
          });
        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/?msg=" + msg);
        });;
        }
       
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
exports.showRank2 = (req, res) => {
  Modulo_BD.obtenerSoundCD().then((resultadoS) => {
    var parsedSound = JSON.parse(resultadoS);
    //console.log(parsedSound)
    Modulo_BD.totalaboutUs().then((data) => {
      let parsed_about = JSON.parse(data)[0];
  console.log(parsedSound)
  let array_file=[], array_bond = []
  for (let i = 0; i < parsedSound.length; i++) {
   if (parsedSound[i].tipo_create == 'bondgate') {
    array_bond.push(parsedSound[i])
   }
   if (parsedSound[i].tipo_create == 'filegate') {
    array_file.push(parsedSound[i])
  }
  }
      Modulo_BD.obtenerPublicidad().then((resultadopubli) => {
        var parsed_publi = JSON.parse(resultadopubli)[0];
        if (typeof parsed_publi === "undefined") {
          var parsed_new = [];
          res.render("ranking2", {
            pageName: "Ranking",
            landingPage: true,
            array_bond,
            array_file,
            layout: false,
            parsed_about,
            
          });
        }else{
          var link_publicidad =parsed_publi.link
      
          scdl.getInfo(link_publicidad).then((stream) => {
            var id_track = stream.id;
           // console.log(parsedSound)
          
          res.render("ranking2", {
            pageName: "Ranking",
            landingPage: true,
            array_bond,
            array_file,
            layout: false,
            id_track,
            parsed_about
          });
        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/?msg=" + msg);
        });;
        }
       
 

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
exports.showRankDown = (req, res) => {
  //console.log(req.params)
  let modo = req.params.modo;
  let archivo = req.params.id;
  var parametro_buscar = req.params.id_gate;
  var correo = req.params.correo;
  var id_usuario = req.params.id_usuario;
  Modulo_BD.obtenerSoundCD().then((resultadoS) => {
    var parsedSound = JSON.parse(resultadoS);
    //console.log(parsedSound)
    Modulo_BD.obtenerSoundNew().then((resultadoT) => {
      var parsed_new = JSON.parse(resultadoT);
      Modulo_BD.obtenerGateforDown(parametro_buscar).then((data) => {
        var gate = JSON.parse(data)[0];
        var URL_fuente = gate.url_fuente
        console.log(gate)

      Modulo_BD.obtenerPublicidad().then((resultadopubli) => {
        var parsed_publi = JSON.parse(resultadopubli)[0];
        if (typeof parsed_publi === "undefined") {
              console.log(modo)
        let bond = false
        if ( modo == "bondgate" || modo == "URL") {
          bond = true
        }
        console.log("idgate:"+ parametro_buscar)
             res.render("ranking", {
            pageName: "Ranking",
            parsed_new,
            parsedSound,
            landingPage: true,
            archivo,
            parametro_buscar,
            correo,
            bond,
            URL_fuente,
            id_usuario,
            layout: false,
            //id_track,
          });
            
        }else{
             var link_publicidad =parsed_publi.link
        console.log("Entro aqui")
      console.log(modo)
        let bond = false
        if ( modo == "bondgate" || modo == "URL") {
          bond = true
        }
      scdl.getInfo(link_publicidad).then((stream) => {
          var id_track = stream.id;
          res.render("ranking", {
            pageName: "Ranking",
            parsed_new,
            parsedSound,
            landingPage: true,
            archivo,
            parametro_buscar,
            correo,
            bond,
            URL_fuente,
            id_usuario,
            layout: false,
            id_track,
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
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/?msg=" + msg);
    });;
};


exports.showTerminos = (req, res) => {
  Modulo_BD.obtenerAyuda().then((resultadoS) => {
    var parsed = JSON.parse(resultadoS);
    Modulo_BD.totalaboutUs().then((data) => {
      let parsed_about = JSON.parse(data)[0];
      //	console.log(parsed_about)
    console.log(parsed)
      res.render("terminos", {
        pageName: "Terminos y condiciones",
        landingPage: true,
        layout: false,
        terminos:true,
        parsed,
        parsed_about
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

exports.showprivacidad = (req, res) => {
  Modulo_BD.obtenerAyuda().then((resultadoS) => {
    var parsed = JSON.parse(resultadoS);
    Modulo_BD.totalaboutUs().then((data) => {
      let parsed_about = JSON.parse(data)[0];
      //	console.log(parsed_about)
    console.log(parsed)
      res.render("terminos", {
        pageName: "Políticas de privacidad",
        landingPage: true,
        layout: false,
        privacidad:true,
        parsed,
        parsed_about
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

exports.showPreguntas = (req, res) => {
  Modulo_BD.obtenerAyuda().then((resultadoS) => {
    var parsed = JSON.parse(resultadoS);
    Modulo_BD.totalaboutUs().then((data) => {
      let parsed_about = JSON.parse(data)[0];
      //	console.log(parsed_about)
    console.log(parsed)
      res.render("preguntas", {
        pageName: "Preguntas",
        landingPage: true,
        layout: false,
        preguntas:true,
        parsed,
        parsed_about
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
