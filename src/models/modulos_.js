const { Op } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Gates = require('../models/Gate');
const Usuarios = require('../models/Usuarios');
const Planes = require('../models/Planes');
const Sobre_nosotros = require('../models/Sobre_nosotros');
const Cupones = require('../models/Cupones');
const Pagos = require('../models/Pagos');
module.exports = {
	
	actualizarUser(id, nombre, apellido, userN,mail,photo, tipo,membresia) { //Actualizar datos del usuario
		let sql = "UPDATE usuarios SET name ='"+nombre+"', lastName ='"+apellido+"',membership ='"+membresia+"',tipo ='"+tipo+"', userName ='"+userN+"', email ='"+mail+"', photo='"+photo+"' WHERE id ='"+id+"'";
		return new Promise((resolve, reject) => {
			db.query(sql,
				(err, result) => {
					if (err) reject(err);
					else resolve();
				})
			//console.log("aquimira");
			resolve();
				//res.redirect("/dashboard");
		});
	},
	actualizarpassW(id, password) { //Actualizar clave
		password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
		console.log(password);
		let sql = "UPDATE usuarios SET password ='"+password+"' WHERE id ='"+id+"'";
		return new Promise((resolve, reject) => {
			db.query(sql,
				(err, result) => {
					if (err) reject(err);
					else resolve();
				})
			resolve();
		});
	},
	actualizarUserMembership(userid, membershipUpdt) { //Actualizar datos del usuario
		//console.log("hola")
		let sql = "UPDATE usuarios SET membership ='"+membershipUpdt+"' WHERE id ='"+userid+"'";
		return new Promise((resolve, reject) => {
			db.query(sql,
				(err, result) => {
					if (err) reject(err);
					else resolve();
				})
			resolve();
		});
	},
	deleteUsuario(parametro_buscar) {
		let sql = "DELETE FROM gates WHERE id ='"+parametro_buscar+"'";
		return new Promise((resolve, reject) => {


			Usuarios.destroy({
				where: {
					id:parametro_buscar
				}
			}).then(() => {
				//let gates= JSON.stringify(users)
				resolve("respuesta exitosa");
			  //console.log(JSON.stringify(users));
			})
	});
    },
	obtenerUserforGate(id_usuario) {
		return new Promise((resolve, reject) => {

		Usuarios.findAll({ 
			where: {
				id: id_usuario,
			} }
		)
		.then(users => {
			let userss= JSON.stringify(users)
			resolve(userss);
		  console.log(id_usuario);
		})
		.catch(err => {
		  console.log(err)
		})
	});
    },
	obtenerGates(parametro_buscar,id_usuario) {
		return new Promise((resolve, reject) => {

		Gates.findAll({ 
			where: {
				tipo_create: parametro_buscar,
				id_usuario: id_usuario
			} }
		)
		.then(users => {
			let gates= JSON.stringify(users)
			resolve(gates);
		  //console.log(JSON.stringify(users));
		})
		.catch(err => {
		  console.log(err)
		})
	});
    },
	totalGates() {
		return new Promise((resolve, reject) => {

		Gates.findAll()
		.then(res => {
			let gates= JSON.stringify(res)
			resolve(gates);
		  //console.log(JSON.stringify(users));
		})
		.catch(err => {
		  console.log(err)
		})
	});
    },
	totalPlanes() {
		return new Promise((resolve, reject) => {

		Planes.findAll()
		.then(res => {
			let planes= JSON.stringify(res)
			resolve(planes);
		  //console.log(JSON.stringify(users));
		})
		.catch(err => {
		  console.log(err)
		})
	});
    },
	obtenerUsuarios() {
		return new Promise((resolve, reject) => {

		Usuarios.findAll()
		.then(users => {
			let usuarios= JSON.stringify(users)
			resolve(usuarios);
		  //console.log(JSON.stringify(users));
		})
		.catch(err => {
		  console.log(err)
		})
	});
    },
	obtenerGate(parametro_buscar,id_usuario) {
		return new Promise((resolve, reject) => {

		Gates.findAll({ 
			where: {
				id: parametro_buscar,
				id_usuario: id_usuario
			} }
		)
		.then(users => {
			let gates= JSON.stringify(users)
			resolve(gates);
		  //console.log(JSON.stringify(users));
		})
		.catch(err => {
		  console.log(err)
		})
	});
    },
	obtenerGatePersonalizado(parametro_buscar) {
		return new Promise((resolve, reject) => {

		Gates.findAll({ 
			where: {
				enlace_perzonalizado: parametro_buscar,
			} }
		)
		.then(res => {
			let gate= JSON.stringify(res)
			resolve(gate);
		  //console.log(JSON.stringify(users));
		})
		.catch(err => {
		  console.log(err)
		})
	});
    },
	deleteGate(parametro_buscar) {
		let sql = "DELETE FROM gates WHERE id ='"+parametro_buscar+"'";
		return new Promise((resolve, reject) => {


			Gates.destroy({
				where: {
					id:parametro_buscar
				}
			}).then(() => {
				//let gates= JSON.stringify(users)
				resolve("respuesta exitosa");
			  //console.log(JSON.stringify(users));
			})
	});
    },
	insertargates(arreglo) {

if (typeof arreglo.other_gender=== 'undefined') {
	var other_gender=""
	console.log(other_gender);
	}else{
	other_gender=arreglo.other_gender;
	}
if (typeof arreglo.nuevo_lanzamiento=== 'undefined') {
	var nuevo_lanzamiento=""
	console.log(nuevo_lanzamiento);
}else{
	nuevo_lanzamiento=arreglo.nuevo_lanzamiento;
}
if (typeof arreglo.url_track=== 'undefined') {
	var url_track=""
	console.log(url_track);
}else{
	url_track=arreglo.url_track;
}
if (typeof arreglo.music_price=== 'undefined') {
	var music_price=""
	console.log(music_price);
}else{
	music_price=arreglo.music_price;
}

if (typeof arreglo.show_watermarker=== 'undefined') {
	var show_watermarker=""
	console.log(show_watermarker);
}else{
	show_watermarker=arreglo.show_watermarker;
}
if (typeof arreglo.user_logo=== 'undefined') {
	var user_logo=""
	console.log(user_logo);
}else{
	user_logo=arreglo.user_logo;
}

if (typeof arreglo.suscribir_youtube=== 'undefined') {
	var suscribir_youtube=""
	console.log(suscribir_youtube);
}else{
	suscribir_youtube=arreglo.suscribir_youtube;
}
if (typeof arreglo.omitir_youtube=== 'undefined') {
	var omitir_youtube=""
	console.log(omitir_youtube);
}else{
	omitir_youtube=arreglo.omitir_youtube;
}
if (typeof arreglo.url_youtube=== 'undefined') {
	var url_youtube=""
	console.log(url_youtube);
}else{
	url_youtube=arreglo.url_youtube;
}
if (typeof arreglo.nombre_youtube=== 'undefined') {
	var nombre_youtube=""
	console.log(nombre_youtube);
}else{
	nombre_youtube=arreglo.nombre_youtube;
}
if (typeof arreglo.like_facebook=== 'undefined') {
	var like_facebook=""
	console.log(like_facebook);
}else{
	like_facebook=arreglo.like_facebook;
}
if (typeof arreglo.compartir_facebook=== 'undefined') {
	var compartir_facebook=""
	console.log(compartir_facebook);
}else{
	compartir_facebook=arreglo.compartir_facebook;
}
if (typeof arreglo.omitir_facebook=== 'undefined') {
	var omitir_facebook=""
	console.log(omitir_facebook);
}else{
	omitir_facebook=arreglo.omitir_facebook;
}
if (typeof arreglo.url_facebook=== 'undefined') {
	var url_facebook=""
	console.log(url_facebook);
}else{
	url_facebook=arreglo.url_facebook;
}
if (typeof arreglo.seguir_twitter=== 'undefined') {
	var seguir_twitter=""
	console.log(seguir_twitter);
}else{
	seguir_twitter=arreglo.seguir_twitter;
}
if (typeof arreglo.compartir_twitter=== 'undefined') {
	var compartir_twitter=""
	console.log(compartir_twitter);
}else{
	compartir_twitter=arreglo.compartir_twitter;
}
if (typeof arreglo.omitir_twitter=== 'undefined') {
	var omitir_twitter=""
	console.log(omitir_twitter);
}else{
	omitir_twitter=arreglo.omitir_twitter;
}
if (typeof arreglo.url_twitter=== 'undefined') {
	var url_twitter=""
	console.log(url_twitter);
}else{
	url_twitter=arreglo.url_twitter;
}
if (typeof arreglo.seguir_soundcloud=== 'undefined') {
	var seguir_soundcloud=""
	console.log(seguir_soundcloud);
}else{
	seguir_soundcloud=arreglo.seguir_soundcloud;
}
if (typeof arreglo.compartir_soundcloud=== 'undefined') {
	var compartir_soundcloud=""
	console.log(compartir_soundcloud);
}else{
	compartir_soundcloud=arreglo.compartir_soundcloud;
}
if (typeof arreglo.repost_souncloud=== 'undefined') {
	var repost_souncloud=""
	console.log(repost_souncloud);
}else{
	repost_souncloud=arreglo.repost_souncloud;
}
if (typeof arreglo.omitir_souncloud=== 'undefined') {
	var omitir_souncloud=""
	console.log(omitir_souncloud);
}else{
	omitir_souncloud=arreglo.omitir_souncloud;
}
if (typeof arreglo.url_souncloud=== 'undefined') {
	var url_souncloud=""
	console.log(url_souncloud);
}else{
	url_souncloud=arreglo.url_souncloud;
}
if (typeof arreglo.seguir_instagram=== 'undefined') {
	var seguir_instagram=""
	console.log(seguir_instagram);
}else{
	seguir_instagram=arreglo.seguir_instagram;
}if (typeof arreglo.omitir_instagram=== 'undefined') {
	var omitir_instagram=""
	console.log(omitir_instagram);
}else{
	omitir_instagram=arreglo.omitir_instagram;
}
if (typeof arreglo.url_instagram=== 'undefined') {
	var url_instagram=""
	console.log(url_instagram);
}else{
	url_instagram=arreglo.url_instagram;
}if (typeof arreglo.seguir_spotify=== 'undefined') {
	var seguir_spotify=""
	console.log(seguir_spotify);
}else{
	seguir_spotify=arreglo.seguir_spotify;
}
if (typeof arreglo.omitir_spotify=== 'undefined') {
	var omitir_spotify=""
	console.log(omitir_spotify);
}else{
	omitir_spotify=arreglo.omitir_spotify;
}if (typeof arreglo.url_spotify=== 'undefined') {
	var url_spotify=""
	console.log(url_spotify);
}else{
	url_spotify=arreglo.url_spotify;
}
if (typeof arreglo.seguir_deezer=== 'undefined') {
	var seguir_deezer=""
	console.log(seguir_deezer);
}else{
	seguir_deezer=arreglo.seguir_deezer;
}if (typeof arreglo.guardar_deezer=== 'undefined') {
	var guardar_deezer=""
	console.log(guardar_deezer);
}else{
	guardar_deezer=arreglo.guardar_deezer;
}
if (typeof arreglo.omitir_deezer=== 'undefined') {
	var omitir_deezer=""
	console.log(omitir_deezer);
}else{
	omitir_deezer=arreglo.omitir_deezer;
}

if (typeof arreglo.url_deezer=== 'undefined') {
	var url_deezer=""
	console.log(url_deezer);
}else{
	url_deezer=arreglo.url_deezer;
}
if (typeof arreglo.seguir_tiktok=== 'undefined') {
	var seguir_tiktok=""
	console.log(seguir_tiktok);
}else{
	seguir_tiktok=arreglo.seguir_tiktok;
}
if (typeof arreglo.omitir_tiktok=== 'undefined') {
	var omitir_tiktok=""
	console.log(omitir_tiktok);
}else{
	omitir_tiktok=arreglo.omitir_tiktok;
}
if (typeof arreglo.seguir_mixcloud=== 'undefined') {
	var seguir_mixcloud=""
	console.log(seguir_mixcloud);
}else{
	seguir_mixcloud=arreglo.seguir_mixcloud;
}
if (typeof arreglo.repost_mixcloud=== 'undefined') {
	var repost_mixcloud=""
	console.log(repost_mixcloud);
}else{
	repost_mixcloud=arreglo.repost_mixcloud;
}
if (typeof arreglo.like_mixcloud=== 'undefined') {
	var like_mixcloud=""
	console.log(like_mixcloud);
}else{
	like_mixcloud=arreglo.like_mixcloud;
}
if (typeof arreglo.omitir_mixcloud=== 'undefined') {
	var omitir_mixcloud=""
	console.log(omitir_mixcloud);
}else{
	omitir_mixcloud=arreglo.omitir_mixcloud;
}
if (typeof arreglo.url_mixcloud=== 'undefined') {
	var url_mixcloud=""
	console.log(url_mixcloud);
}else{
	url_mixcloud=arreglo.url_mixcloud;
}

if (arreglo.color=== '#000000') {
	var color=""
	console.log(color);
}else{
	color=arreglo.color;
}
if (arreglo.color_titulo=== '#000000') {
	var color_titulo=""
	console.log(color);
}else{
	color_titulo=arreglo.color_titulo;
}
if (arreglo.color_descripcion=== '#000000') {
	var color_descripcion=""
	console.log(color_descripcion);
}else{
	color_descripcion=arreglo.color_descripcion;
}


let now= new Date();
id_usuario=arreglo.id_user;
fecha=now;
tema="Oscuro";



return new Promise((resolve, reject) => {



			Gates.create({ id_usuario: id_usuario,tipo_create: arreglo.tipo_create,url_fuente: arreglo.url_demo,	genero: arreglo.gender, archivo: arreglo.archivo1,	nombre_artista: arreglo.artist_name,	titulo: arreglo.music_title,	descripcion: arreglo.music_desc,tema: tema,imagen: arreglo.img_flyer,color: color,color_titulo: color_titulo,color_descrip: color_descripcion,	privacidad: arreglo.privacity,	nuevo_lanzamiento: nuevo_lanzamiento,otro_gender: other_gender,	url_track: url_track,music_price: music_price,		show_watermarker: show_watermarker,user_logo: user_logo,	suscribir_youtube:suscribir_youtube,	omitir_youtube:omitir_youtube,	url_youtube:url_youtube,nombre_youtube:nombre_youtube,	like_facebook:like_facebook,compartir_facebook:compartir_facebook,omitir_facebook:omitir_facebook,url_facebook:url_facebook,		seguir_twitter:seguir_twitter,	compartir_twitter:compartir_twitter,	omitir_twitter: omitir_twitter,url_twitter: url_twitter,	seguir_soundcloud: seguir_soundcloud,compartir_soundcloud: compartir_soundcloud,	repost_souncloud: repost_souncloud,	omitir_souncloud: omitir_souncloud,url_souncloud: url_souncloud,	seguir_instagram: seguir_instagram,	omitir_instagram: omitir_instagram,url_instagram: url_instagram,	seguir_spotify:seguir_spotify,	omitir_spotify:omitir_spotify,	url_spotify:url_spotify,seguir_deezer:seguir_deezer,	guardar_deezer:guardar_deezer,	omitir_deezer:omitir_deezer,	url_deezer:url_deezer,		seguir_tiktok:seguir_tiktok,	omitir_tiktok:omitir_tiktok,	seguir_mixcloud:seguir_mixcloud,repost_mixcloud:repost_mixcloud,like_mixcloud:like_mixcloud,	omitir_mixcloud:omitir_mixcloud,url_mixcloud:url_mixcloud, enlace_perzonalizado:arreglo.gate_link,fecha_registro:fecha })
		.then(gate => {
			let gatees= JSON.stringify(gate)
			resolve(gatees);
		  console.log(gatees);
		})
		.catch(err => {
		  console.log(err)
		})


      });
    },

	guardarPlan(id,tipo_plan,costo_plan,modo_plan,primera_linea,segunda_linea,tercera_linea,cuarta_linea,quinta_linea,sexta_linea,septima_linea,octava_linea,novena_linea,decima_linea,descuento) {
		let now= new Date();
		fecha=now.toString();
		return new Promise((resolve, reject) => {
			Planes.findOne({ 
				where: {
					modo: modo_plan,
					tipo_create: tipo_plan
				} }
			)
			.then(res => {
				console.log(res);
				if (!res) {
					// Item not found, create a new one
					Planes.create({ id_usuario: id, tipo_create: tipo_plan,costo: costo_plan, modo: modo_plan,linea1: primera_linea, linea2: segunda_linea,linea3: tercera_linea, linea4: cuarta_linea,linea5: quinta_linea, linea6: sexta_linea,linea7: septima_linea, linea8: octava_linea,linea9: novena_linea, linea10: decima_linea,descuento: descuento, fecha_registro: fecha })
		.then(plan => {
			let planes= JSON.stringify(plan)
			resolve(planes);
		  console.log(planes);
		})
		.catch(err => {
		  console.log(err)
		})
				}else{
					resolve ("0")
				}
			})
		
	});
    },deletePlan(parametro_buscar) {
		return new Promise((resolve, reject) => {


			Planes.destroy({
				where: {
					id:parametro_buscar
				}
			}).then(() => {
				//let gates= JSON.stringify(users)
				resolve("respuesta exitosa");
			  //console.log(JSON.stringify(users));
			})
	});
    },
	obtenerPlanforedit(id) {
		return new Promise((resolve, reject) => {

		Planes.findAll({ 
			where: {
				id: id,
			} }
		)
		.then(res => {
			let ress= JSON.stringify(res)
			resolve(ress);
		  console.log(id);
		})
		.catch(err => {
		  console.log(err)
		})
	});
    },
	guardarPlanEdited(id,tipo_plan,costo_plan,modo_plan,primera_linea,segunda_linea,tercera_linea,cuarta_linea,quinta_linea,sexta_linea,septima_linea,octava_linea,novena_linea,decima_linea,descuento) {
		let now= new Date();
		fecha=now.toString();
		return new Promise((resolve, reject) => {

		Planes.update({ tipo_create: tipo_plan,costo: costo_plan, modo: modo_plan,linea1: primera_linea, linea2: segunda_linea,linea3: tercera_linea, linea4: cuarta_linea,linea5: quinta_linea, linea6: sexta_linea,linea7: septima_linea, linea8: octava_linea,linea9: novena_linea, linea10: decima_linea,descuento: descuento, fecha_registro: fecha }, {
			where: {
				id: id,
			}})
		.then(plan => {
			let planes= JSON.stringify(plan)
			resolve(planes);
		  console.log(planes);
		})
		.catch(err => {
		  console.log(err)
		})
	});
    },


	//ABOUT
	totalaboutUs() {
		return new Promise((resolve, reject) => {

		Sobre_nosotros.findAll()
		.then(res => {
			let about= JSON.stringify(res)
			resolve(about);
		  //console.log(JSON.stringify(users));
		})
		.catch(err => {
		  console.log(err)
		})
	});
    },
	guardaraboutus(id,telefono,ws,facebook,instagram,souncloud,mixcloud,youtube,correo,twitter,spotify,tiktok) {
		let now= new Date();
		fecha=now.toString();
		return new Promise((resolve, reject) => {
			Sobre_nosotros.findOne({ 
				where: {
					id_usuario: id,
					telefono: telefono
				} }
			)
			.then(res => {
				console.log(res);
				if (!res) {
					// Item not found, create a new one
					Sobre_nosotros.create({ id_usuario: id,telefono:telefono,ws:ws,facebook: facebook,instagram:instagram,souncloud: souncloud,mixcloud: mixcloud,youtube: youtube,correo: correo,twitter: twitter,spotify: spotify,tiktok: tiktok })
		.then(res => {
			let about= JSON.stringify(res)
			resolve(about);
		  console.log(about);
		})
		.catch(err => {
		  console.log(err)
		})
				}else{
					resolve ("0")
				}
			})
		
	});
},
obtenerAboutforedit(id) {
	return new Promise((resolve, reject) => {

	Sobre_nosotros.findAll({ 
		where: {
			id: id,
		} }
	)
	.then(res => {
		let ress= JSON.stringify(res)
		resolve(ress);
	  console.log(id);
	})
	.catch(err => {
	  console.log(err)
	})
});
},
saveEditedAbout(id,telefono,ws,facebook,instagram,souncloud,mixcloud,youtube,correo,twitter,spotify,tiktok) {
	let now= new Date();
	fecha=now.toString();
	return new Promise((resolve, reject) => {

	Sobre_nosotros.update({ telefono:telefono,ws:ws,facebook: facebook,instagram:instagram,souncloud: souncloud,mixcloud: mixcloud,youtube: youtube,correo: correo,twitter: twitter,spotify: spotify,tiktok: tiktok }, {
		where: {
			id: id,
		}})
	.then(about => {
		let aboutes= JSON.stringify(about)
		resolve(aboutes);
	  console.log(aboutes);
	})
	.catch(err => {
	  console.log(err)
	})
});
},
deleteAbout(parametro_buscar) {
	return new Promise((resolve, reject) => {


		Sobre_nosotros.destroy({
			where: {
				id:parametro_buscar
			}
		}).then(() => {
			//let gates= JSON.stringify(users)
			resolve("respuesta exitosa");
		  //console.log(JSON.stringify(users));
		})
});
},



//CUPONES
totalcupones() {
	return new Promise((resolve, reject) => {

	Cupones.findAll()
	.then(res => {
		let about= JSON.stringify(res)
		resolve(about);
	  //console.log(JSON.stringify(users));
	})
	.catch(err => {
	  console.log(err)
	})
});
},
guardarCupon(id_usuario,nombre_cupon,numero_cupon,valor,fecha_inicio,fecha_final,cantidad,tipo) {
	let now= new Date();
	fecha=now.toString();
	return new Promise((resolve, reject) => {
		Cupones.findOne({ 
			where: {
				nombre_cupon:nombre_cupon,
				numero_cupon: numero_cupon
			} }
		)
		.then(res => {
			console.log(res);
			if (!res) {
				// Item not found, create a new one
				Cupones.create({ id_usuario: id_usuario,nombre_cupon:nombre_cupon,numero_cupon: numero_cupon,valor:valor,fecha_inicio: fecha_inicio,fecha_final: fecha_final,cantidad: cantidad,tipo: tipo })
	.then(res => {
		let about= JSON.stringify(res)
		resolve(about);
	  console.log(about);
	})
	.catch(err => {
	  console.log(err)
	})
			}else{
				resolve ("0")
			}
		})
	
});
},
obtenerCuponforedit(id) {
return new Promise((resolve, reject) => {

Cupones.findAll({ 
	where: {
		id: id,
	} }
)
.then(res => {
	let ress= JSON.stringify(res)
	resolve(ress);
  console.log(id);
})
.catch(err => {
  console.log(err)
})
});
},
saveEditedCupon(id,	nombre_cupon,	numero_cupon,	valor,	fecha_inicio,	fecha_final,	cantidad,	tipo) {
let now= new Date();
fecha=now.toString();
return new Promise((resolve, reject) => {

Cupones.update({ nombre_cupon:nombre_cupon,numero_cupon: numero_cupon,valor:valor,fecha_inicio: fecha_inicio,fecha_final: fecha_final,cantidad: cantidad,tipo: tipo}, {
	where: {
		id: id,
	}})
.then(about => {
	let aboutes= JSON.stringify(about)
	resolve(aboutes);
  console.log(aboutes);
})
.catch(err => {
  console.log(err)
})
});
},
deleteCupon(parametro_buscar) {
return new Promise((resolve, reject) => {


	Cupones.destroy({
		where: {
			id:parametro_buscar
		}
	}).then(() => {
		//let gates= JSON.stringify(users)
		resolve("respuesta exitosa");
	  //console.log(JSON.stringify(users));
	})
});
},
consultarCuponMembership(consultar) {
	return new Promise((resolve, reject) => {
	
	Cupones.findAll({ 
		where: {
			[Op.or]: [
				{ nombre_cupon: consultar},
				{ numero_cupon: consultar }
			  ]
			
		} }
	)
	.then(res => {
		let ress= JSON.stringify(res)
		resolve(ress);
	  console.log(ress);
	})
	.catch(err => {
	  console.log(err)
	})
	});
	},
	UpdateUsedCupon(id,	cantidad) {
		let now= new Date();
		fecha=now.toString();
		return new Promise((resolve, reject) => {
		
		Cupones.update({ cantidad: cantidad}, {
			where: {
				id: id,
			}})
		.then(about => {
			let aboutes= JSON.stringify(about)
			resolve(aboutes);
		  console.log(aboutes);
		})
		.catch(err => {
		  console.log(err)
		})
		});
		},
		guardarPago(id_usuario,status,numero_referencia,monto,tipo_compra, metodo) {
			let now= new Date();
			fecha=now.toString();
			return new Promise((resolve, reject) => {
				Pagos.findOne({ 
					where: {
						status:status,
						numero_referencia: numero_referencia,
						tipo_compra: tipo_compra,
						metodo_pago:  metodo
					} }
				)
				.then(res => {
					console.log(res);
					if (!res) {
						// Item not found, create a new one
						Pagos.create({ id_usuario: id_usuario,status: status,numero_referencia: numero_referencia,monto: monto,tipo_compra: tipo_compra, metodo_pago: metodo })
			.then(res => {
				let resultado= JSON.stringify(res)
				resolve(resultado);
			 console.log(resultado);
			})
			.catch(err => {
			  console.log(err)
			})
					}else{
						resolve ("0")
					}
				})
			
		});
		},

		totalPagos() {
			return new Promise((resolve, reject) => {
		
			Pagos.findAll()
			.then(res => {
				let respuesta= JSON.stringify(res)
				resolve(respuesta);
			  //console.log(JSON.stringify(users));
			})
			.catch(err => {
			  console.log(err)
			})
		});
		},


		obtenerGateforDown(id) {
			return new Promise((resolve, reject) => {
			
			Gates.findAll({ 
				where: {
					id: id,
				} }
			)
			.then(res => {
				let ress= JSON.stringify(res)
				resolve(ress);
			  console.log(id);
			})
			.catch(err => {
			  console.log(err)
			})
			});
			},
		actualizarGateDownload(id,descarga) {
			let now= new Date();
			fecha=now.toString();
			return new Promise((resolve, reject) => {
		
			Gates.update({ descargas:descarga }, {
				where: {
					id: id,
				}})
			.then(about => {
				let aboutes= JSON.stringify(about)
				resolve(aboutes);
			  console.log(aboutes);
			})
			.catch(err => {
			  console.log(err)
			})
		});
		},
	}
