const passport = require("passport");
const Usuarios = require("../models/Usuarios");
const database = require("../models/modulos_");
const router = require("express").Router();
const dashboardController = require("../controllers/dashboardController");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt-nodejs");
const Op = Sequelize.Op;
const crypto = require("crypto");
const moment = require('moment-timezone');
// Formulario de inicio de sesión
exports.formLogin = async (req, res) => {
  const { error } = res.locals.messages;
  if (req.params.token) {
    const usuario = await Usuarios.findOne({
      where: {
        token: req.params.token,
      },
    });
    if (!usuario) {
    req.flash("error", "Token No válido o  Vencido, favor coloque su correo para reenviar el token de confirmación");
   return res.redirect("/search-account-token");
    }
    usuario.validado="ok"
    await usuario.save();
    req.flash("success", "Token valido, inicie sesion ahora");
    return res.redirect("/login");
  }

  res.render("login", {
    pageName: "Login",
    layout: "page-form",
    error,
  });
};

exports.formLoginBack = (req, res) => {
  const { error } = res.locals.messages;
  var product = req.params.product;
  var monto = req.params.monto;
  var modo = req.params.modo;
  console.log(modo);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
    ////console.log(msg);
  }

  res.render("login_back", {
    pageName: "Login",
    layout: "page-form",
    modo,
    monto,
    product,
    error,
    msg,
  });
};

// Iniciar sesión
exports.loginUser = passport.authenticate("local", {
  successRedirect: "/validate_membership",
 // successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true,
  badRequestMessage: "Ambos campos son obligatorios",
});

exports.loginUserBack = (req, res) => {
  console.log(req.body);
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log(user.dataValues.id);
      return res.redirect(
        "/pagar_backcoins/" +
          user.dataValues.id +
          "/" +
          req.body.producto +
          "/" +
          req.body.monto +
          "/back_pay/" +
          req.body.modo
      );
    });
  })(req, res);
};

// Formulario de registro
exports.formCreateUser = (req, res) => {
  res.render("register", {
    pageName: "Registrate",
    layout: "page-form",
  });
};

// Crear usuario en la base de datos
exports.createUser = async (req, res) => {
  const { name, lastName, email, password, confirmPassword } = req.body;
var hoy = moment()
  // La contraseña y cofirmar contraseña no son iguales
  if (password !== confirmPassword) {
    req.flash("error", "Las contraseñas no son iguales");

    return res.render("register", {
      pageName: "Registrate",
      layout: "page-form",
      messages: req.flash(),
    });
  }
  try {
    await Usuarios.create({
      name,
      lastName,
      email,
      password,
      desde:hoy,
      hasta:hoy
    });

   // res.redirect("/mailBienvenida/"+email);
  } catch (err) {
    console.log(err);
    if (err.errors) {
      req.flash(
        "error",
        err.errors.map((error) => error.message)
      );
    } else {
      req.flash("error", "Error desconocido");
    }
    res.render("register", {
      pageName: "Registrate",
      layout: "page-form",
      messages: req.flash(),
    });
  }

  const usuario = await Usuarios.findOne({ where: { email } });

  if (!usuario) {

    req.flash("error", "No existe esa cuenta");
    console.log("error")
    //res.redirect("/search-account");
  }

  // Usuario existe
  usuario.token = crypto.randomBytes(20).toString("hex");
  usuario.expiration = Date.now() + 3600000;

  // Guardarlos en la BD
  await usuario.save();
  const resetUrl = `https://${req.headers.host}/login/${usuario.token}`;
  res.redirect("/mailBienvenida/"+email+"/" + usuario.token);
  console.log(resetUrl);
  //res.redirect("/resetpass/" + usuario.token + "/" + email);
};

// Formulario de buscar cuenta
exports.formSearchAccount = (req, res) => {

  res.render("search-account", {
    pageName: "Buscar Cuenta",
    layout: "page-form",
  });

};
exports.formSearchAccountToken = (req, res) => {

  res.render("search-account", {
    pageName: "Buscar Cuenta",
    layout: "page-form",
    token:true
  });

};


// Enviar token si el usuario es valido
exports.sendToken = async (req, res) => {
  // verificar si el usuario existe
  const { email } = req.body;
  const usuario = await Usuarios.findOne({ where: { email } });

  if (!usuario) {
    req.flash("error", "No existe esa cuenta");
    res.redirect("/search-account");
  }

  // Usuario existe
  usuario.token = crypto.randomBytes(20).toString("hex");
  usuario.expiration = Date.now() + 3600000;

  // Guardarlos en la BD
  await usuario.save();

  // Url de reset
  const resetUrl = `https://${req.headers.host}/search-account/${usuario.token}`;

  res.redirect("/resetpass/" + usuario.token + "/" + email);
  console.log(resetUrl);
};

exports.sendTokenValidate = async (req, res) => {
  // verificar si el usuario existe
  const { email } = req.body;
  const usuario = await Usuarios.findOne({ where: { email } });

  if (!usuario) {
    req.flash("error", "No existe esa cuenta");
    res.redirect("/search-account-token");
  }

  // Usuario existe
  usuario.token = crypto.randomBytes(20).toString("hex");
  usuario.expiration = Date.now() + 3600000;

  // Guardarlos en la BD
  await usuario.save();

  // Url de reset
  const resetUrl = `https://${req.headers.host}/login/${usuario.token}`;
  res.redirect("/mailBienvenida/"+email+"/" + usuario.token);
  console.log(resetUrl);
};
exports.resetPasswordForm = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
    },
  });

  // no se encontro el usuario
  if (!usuario) {
    req.flash("error", "No válido");
    res.redirect("/search-account");
  }

  // Formulario para generar password
  res.render("reset-password", {
    pageName: "Restablecer contraseña",
    layout: "page-form",
  });
};

// Cambiar el password
exports.updatePassword = async (req, res) => {
  // Verifica token y fecha de expiracion-
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
      expiration: {
        [Op.gte]: Date.now(),
      },
    },
  });

  if (!usuario) {
    req.flash("error", "No valido");
    res.redirect("search-account");
  }

  // Hashear el password
  usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  usuario.token = null;
  usuario.expiration = null;

  // Guardamos el nuevo password
  await usuario.save();

  req.flash("success", "Tu contraseña se modifico correctamente");
  res.redirect("/login");
};

// Cerrar sesión
exports.closeSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

// Actualizar usuario en la base de datos
exports.UpdateUser = async (req, res) => {
  let tipo = req.user.tipo;
  const {
    id,
    name,
    lastName,
    userName,
    email,
    password,
    confirmpassword,
    photo1,
  } = req.body;

  if (!password && !confirmpassword) {
    database.actualizarUser(id, name, lastName, userName, email, photo1, tipo)
      .then((rs) => {
        console.log(rs);
        res.locals.user.name = name
    res.locals.user.lastName = lastName
    res.locals.user.userName = userName
    res.locals.user.email = email
    res.locals.user.photo = photo1
    res.redirect("/dashboard");
      })
      .catch((err) => {
        console.log(err.errors.map((error) => error.message)) 
        if (err.errors) {
          req.flash(
            "error",
            err.errors.map((error) => error.message)
          );
        } else {
          req.flash("error", "Error desconocido");
        }
        let msg = (err.errors.map((error) => error.message)).toString();
        console.log(msg)
        res.redirect('/update-profile/'+msg)
      });
    //redirect('/dashboard');
    const usuario = await Usuarios.findOne({ where: { email } });
    // "user" is the user with newly updated info
    //const user = res.locals.user;
    console.log(req.user);
    req.user.name = name;
    req.user.lastName = lastName;
    req.user.userName = userName;
    req.user.email = email;
    req.user.photo = photo1;

    
    
  } else {
    if (password !== confirmpassword) {
      req.flash("error", "Las contraseñas no son iguales");

      return res.render("update-profile", {
        pageName: "Actualizar Perfil",
        dashboardPage: true,
        messages: req.flash(),
      });
    } else {
      database.actualizarpassW(id, password)
        .then(() => {})
        .catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/?msg=" + msg);
        });
      //redirect('/dashboard');
      const usuario = await Usuarios.findOne({ where: { email } });

      res.redirect("/dashboard");
    }
  }
};

exports.upload = function (req, res) {
  res.render("upload", {
    title: "ejemplo de subida de imagen por HispaBigData",
  });
};

exports.soporte = (req, res) => {
  const { error } = res.locals.messages;
//const {nombre,  telefono, email, descripcion} = req.body
  let msg = false;
  let user_id = false;
  if (req.params.msg) {
    msg = req.params.msg;
    ////console.log(msg);
  }
  if (req.params.id) {
    user_id = req.params.id;
    ////console.log(msg);
  }

  res.render("soporte", {
    pageName: "Ayuda",
    layout: "soporte_l",
    msg,
    user_id
  });
};
exports.soportesave = (req, res) => {
const { error } = res.locals.messages;
const {nombre,  telefono, email, descripcion} = req.body
  let msg = false;
  let user_id = false;
  if (req.params.msg) {
    msg = req.params.msg;
    ////console.log(msg);
  }
  if (req.body.userid =="false") {
    user_id = null;
    ////console.log(msg);
  }else{
    user_id =req.body.userid
  }
  database.saveSoporte(email,nombre,telefono,descripcion, '','',user_id,'0').then((resp)=>{
    console.log(resp)
    
    res.redirect(`/soportemail/${email}/${nombre}/${descripcion}/${telefono}`)
  })
};
