const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook');
//var GoogleStrategy = require('passport-google-oauth20').Strategy;
var MixCloudStrategy = require('passport-mixcloud').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let fs = require("fs");
const moment = require('moment-timezone');
var hoy = moment();
// Modelo a auntenticar
const Usuarios = require('../models/Usuarios');

// Loca strategy - Login con credenciales propios
passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback : true
		},
		async (req,email, password, done) => {
			try {
				const usuario = await Usuarios.findOne({
					where: {email}
				});
				if(!usuario.verifyPassword(password)) {
					return done(null, false, {
						message: 'Contrase帽a incorrecta'
					});
				}
				// if(usuario.validado == "" || usuario.validado == null) {
				// 	console.log(usuario.validado)
				// 	return done(null, false, {
				// 		message: 'Usuario no validado, favor verique token en su correo'
				// 	});
				// }
				return done(null, usuario);
			}catch(err) {
				return done(null, false, {
					message: 'Esa cuenta no existe'
				});
			}
		}
	)
);

/* C贸digo 100% funcional */
passport.use('facebook',
	new FacebookStrategy({
		clientID: 'ClientID de meta',
 		clientSecret: 'clientSecret',
 		callbackURL: "https://www.backartist.com/auth/facebook/callback",
 		profileFields: ['id', 'displayName', 'photos', 'email']
 },
 	async (accessToken, refreshToken, profile, done) => {
 console.log(profile._json);
 const {id, name, email}=profile._json
 if (typeof email == "undefined"){
	let fecha = new Date()
	fs.writeFile('./error'+Number(fecha)+'.txt', 'Error en facebook no trajo el correo de: ' +name, error => {
	  if (error)
		console.log(error);
	  else
		console.log('El archivo fue creado');
	});
	return done(null);
 }
 	 usuario = await Usuarios.findOne({where: {email: email}});
		if (!usuario) {
			console.log("No hay:"+ usuario);
			usuario = await Usuarios.create({
				name: name,
				lastName: name,
				email: email,
				password: id,
				validado: "ok",
				desde:hoy,
				hasta:hoy
			});	
			usuario.save(function(err) {
				if (err) console.log(err);
				return done(null, usuario);
			});
		}
 	return done(null, usuario);
 	}
 ));


 //inicio con google
 passport.use('google',new GoogleStrategy({
    clientID: 'googleID',
    clientSecret: 'secret google',
    callbackURL: "https://www.backartist.com/auth/g/call"
  },
  async (token, tokenSecret, profile, done) =>{
   console.log("🚀 ~ file: passport.js ~ line 97 ~ tokenSecret", tokenSecret)
   console.log("🚀 ~ file: passport.js ~ line 97 ~ token", token)
   console.log("🚀 ~ file: passport.js ~ line 99 ~ profile._json", profile._json)
	  const {sub, email, name, given_name, family_name}=profile._json
	   usuario = await Usuarios.findOne({where: {email: email}});
	  if (!usuario) {
		  console.log("No hay:"+ usuario);
		 usuario=  await Usuarios.create({
			  name: given_name,
			  lastName: family_name,
			  email: email,
			  password: sub,
			  validado: "ok",
			  desde:hoy,
			  hasta:hoy
		  })
		  
		  usuario.save(function(err) {
			if (err) console.log(err);
			return done(null, usuario);
		});
		  //return done(null, newuser);
	  }
   return done(null, usuario);
  }
));



passport.use('mixcloud',new MixCloudStrategy({
    clientID: '',
    clientSecret: '',
	callbackURL: "https://www.backartist.com/auth/mixcloud/callback"
  },
 async function(accessToken, refreshToken, profile, done) {
	console.log(profile._json);
	const {name, username,key, pictures}=profile._json
	console.log(pictures.medium)
	const usuario = await Usuarios.findOne({where: {email: username+"@algo.com"}});
	if (!usuario) {
		console.log("No hay:"+ usuario);
		await Usuarios.create({
			name: name,
			lastName: key,
			email: username+"@algo.com",
			password: username,
			validado: "ok",
			desde:hoy,
			hasta:hoy
			//photo: pictures.medium
			
		});	
		return done(null, usuario);
	}

     return done(null, usuario);
  }
));
// Serializar el usuario
passport.serializeUser((usuario, callback) => {
	callback(null, usuario);
});

// Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
	callback(null, usuario);
});

module.exports = passport;
