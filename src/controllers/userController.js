const passport = require("passport");
const Usuarios = require("../models/Usuarios");
const UpdUser = require("../models/modulos_");
const router = require("express").Router();
const dashboardController = require("../controllers/dashboardController");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt-nodejs");
const Op = Sequelize.Op;
const crypto = require("crypto");

// Formulario de inicio de sesión
exports.formLogin = (req, res) => {
  const { error } = res.locals.messages;
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

  res.render("login_back", {
    pageName: "Login",
    layout: "page-form",
    modo,
    monto,
    product,
    error,
  });
};

// Iniciar sesión
exports.loginUser = passport.authenticate("local", {
  successRedirect: "/dashboard",
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
    });

    res.redirect("/login");
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
};

// Formulario de buscar cuenta
exports.formSearchAccount = (req, res) => {
  res.render("search-account", {
    pageName: "Buscar Cuenta",
    layout: "page-form",
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

  res.redirect("/sendMail/" + usuario.token + "/" + email);
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
    last_name,
    user_name,
    email,
    password,
    confirmpassword,
    photo1,
  } = req.body;

  if (!password && !confirmpassword) {
    UpdUser.actualizarUser(id, name, last_name, user_name, email, photo1, tipo)
      .then(() => {
        //console.log(result);
      })
      .catch((err) => {
        return res.status(500).send("Error actualizando" + err);
      });
    //redirect('/dashboard');
    const usuario = await Usuarios.findOne({ where: { email } });
    // "user" is the user with newly updated info
    //const user = res.locals.user;
    console.log(req.user);
    req.user.name = name;
    req.user.last_name = last_name;
    req.user.userName = user_name;
    req.user.email = email;
    req.user.photo = photo1;
    console.log(req.user.name);
    res.redirect("/dashboard");
  } else {
    if (password !== confirmpassword) {
      req.flash("error", "Las contraseñas no son iguales");

      return res.render("update-profile", {
        pageName: "Actualizar Perfil",
        dashboardPage: true,
        messages: req.flash(),
      });
    } else {
      UpdUser.actualizarpassW(id, password)
        .then(() => {})
        .catch((err) => {
          return res.status(500).send("Error actualizando" + err);
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
