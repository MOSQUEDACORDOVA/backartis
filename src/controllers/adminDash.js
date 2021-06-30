const Modulo_BD = require('../models/modulos_');

exports.dashboard = (req, res) => {
	//console.log(req.params.gates);
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	let msg =false;
	if (req.params.msg) {
		msg =req.params.msg;
	}
	var total_gates="";
	let admin_dash1= true;
	Modulo_BD.totalGates().then((res) =>{
		let parsed = JSON.parse(res);
		total_gates= parsed.length
})
	Modulo_BD
		.obtenerUsuarios().then((resultado)=>{
			
			let parsed = JSON.parse(resultado);
			let cont= parsed.length
			//console.log(parsed);
				res.render("index_admin", {
					usuarios: parsed,
					dashboardPage: true,
					cont_user:cont,
					cont_gates:total_gates,
					admin_dash1,notPhoto,
					msg
				});

		})
}

exports.verCupones = (req, res) => {
	let userID = req.params.id;
	let username = req.params.username
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	//console.log(req.params.gates);
	let msg =false;
	if (req.params.msg) {
		msg =req.params.msg;
	}
	console.log(username)

	Modulo_BD
		.obtenerCuponesUsados(userID).then((resultado)=>{
			
			let parsed = JSON.parse(resultado);
			console.log(parsed);
				res.render("index_admin", {
					cupones_usados: parsed,
					dashboardPage: true,
					usuarios: true,
					admin_dash1: true,
					username,notPhoto,
					msg
				});

		})
}


exports.updateProfile = (req, res) => {
	let id_buscar = req.params.id;
//	var id_user = req.user.id;
let admin_dash1= true;
	Modulo_BD
		.obtenerUserforGate(id_buscar).then((resultado)=>{
			let parsed_user = JSON.parse(resultado)[0];
			let cont= parsed_user.length
		console.log(parsed_user);

	res.render('editar_usuario', {
		pageName: 'Actualizar Perfil del Usuario',
		dashboardPage: true,
		parsed_user,
		admin_dash1
		
	});

		})
}

// Actualizar usuario en la base de datos
exports.UpdateUser = async (req, res) => {
	const {id,name, last_name,user_name, email, password, confirmpassword, photo1, tipo,membresia} = req.body;	

	if (!password && !confirmpassword) {
		Modulo_BD.actualizarUser(
			
			id,
			name,
			last_name,
			user_name,
			email,
			photo1,
			tipo,membresia
			).then(() => {
				//console.log(result);
				
		})
			.catch(err => {
	return res.status(500).send("Error actualizando"+err);
});
//redirect('/dashboard');
//const usuario = await Usuarios.findOne({where: {email}});
// "user" is the user with newly updated info
//const user = res.locals.user;
let msg ="Usuario guardado con exito";
res.redirect('/admin_dash/'+msg)	

	}else{
		if(password !== confirmpassword) {
			req.flash('error', 'Las contraseñas no son iguales');
	
			return res.render('editar_usuario', {
				pageName: 'Actualizar Perfil del Usuario',
				dashboardPage: true,
				messages: req.flash()
			});
		}else{
			Modulo_BD.actualizarpassW(
			
				id,
				password
			
				).then(() => {
									
			})
				.catch(err => {
		return res.status(500).send("Error actualizando"+err);
	});
	//redirect('/dashboard');
	//const usuario = await Usuarios.findOne({where: {email}});
	
	res.redirect('/admin_dash')		
		}

		
	}
}
exports.deleteUser = async (req, res) => {
	let parametro_buscar = req.params.id;

	Modulo_BD
		.deleteUsuario(parametro_buscar).then((resultado)=>{
			//let parsed = JSON.parse(resultado);
			//let cont= parsed.length
			console.log(resultado);
			
			res.redirect('/admin_dash');

		})
	
}

// PLANES
exports.planes = (req, res) => {
	//console.log(req.params.gates);
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	let msg =false;
	if (req.params.msg) {
		msg =req.params.msg;
	}
	var total_gates="";
	let admin_dash1= true;
	Modulo_BD.totalGates().then((res) =>{
		let parsed = JSON.parse(res);
		total_gates= parsed.length
})
	Modulo_BD
		.totalPlanes().then((resultado)=>{
			let parsed = JSON.parse(resultado);
			let cont= parsed.length
			let planes = true;
			//console.log(parsed);
				res.render("index_admin", {
					//usuarios: parsed,
					dashboardPage: true,
					cont_user:cont,
					planes_parsed: parsed,
					planes,
					cont_gates:total_gates,
					admin_dash1,notPhoto,
					msg,
				});

		})
}

exports.addplanes = (req, res) => {
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	let userID = req.user.id;
	console.log(userID);
	//Modulo_BD
		//.obtenerUsuarios().then((resultado)=>{
		//	let parsed = JSON.parse(resultado);
		//	let cont= parsed.length
			//console.log(parsed);
				res.render("crear_planes", {
					pageName: "Crear Plan",
					dashboardPage: true,
					userID,notPhoto,
				});

		//})
}

// Actualizar usuario en la base de datos
exports.savePlan = async (req, res) => {
	const {id,tipo_plan,costo_plan,modo_plan,primera_linea,segunda_linea,tercera_linea,cuarta_linea,quinta_linea,sexta_linea,septima_linea,octava_linea,novena_linea,decima_linea,descuento} = req.body;	
		var msg ="";
		Modulo_BD.guardarPlan(id,tipo_plan,costo_plan,modo_plan,primera_linea,segunda_linea,tercera_linea,cuarta_linea,quinta_linea,sexta_linea,septima_linea,octava_linea,novena_linea,decima_linea,descuento).then((result) => {
				console.log(result);
				if (result==="0") {
					msg ="El plan ya existe, porfavor verifique";
				}else{
					msg ="Plan guardado con exito";	
				}
				res.redirect('/planes/'+msg)
		})
			.catch(err => {
	return res.status(500).send("Error actualizando"+err);
});
	

}
exports.deletePlan = async (req, res) => {
	let parametro_buscar = req.params.id;

	Modulo_BD
		.deletePlan(parametro_buscar).then((resultado)=>{
			//let parsed = JSON.parse(resultado);
			//let cont= parsed.length
			console.log(resultado);
			Modulo_BD
		.totalPlanes().then((resultado)=>{
			let msg ="Plan eliminado con exito";
			res.redirect('/planes/'+msg)	

		})

		})
	
}

exports.editPlan = (req, res) => {
	let id_buscar = req.params.id;
//	var id_user = req.user.id;
var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
let admin_dash1= true;

	Modulo_BD
		.obtenerPlanforedit(id_buscar).then((resultado)=>{
			let parsed_plan = JSON.parse(resultado)[0];
			let cont= parsed_plan.length
		console.log(parsed_plan);

	res.render('edit_plan', {
		pageName: 'Editar Plan',
		dashboardPage: true,
		parsed_plan,notPhoto,
		admin_dash1
		
	});

		})
}

exports.savePlanEdited = async (req, res) => {
	const {id,tipo_plan,costo_plan,modo_plan,primera_linea,segunda_linea,tercera_linea,cuarta_linea,quinta_linea,sexta_linea,septima_linea,octava_linea,novena_linea,decima_linea,descuento} = req.body;	

		Modulo_BD.guardarPlanEdited(id,tipo_plan,costo_plan,modo_plan,primera_linea,segunda_linea,tercera_linea,cuarta_linea,quinta_linea,sexta_linea,septima_linea,octava_linea,novena_linea,decima_linea,descuento).then((result) => {
				console.log(result);
				
		})
			.catch(err => {
	return res.status(500).send("Error actualizando"+err);
});
let msg ="Plan actualizado con exito";
res.redirect('/admin_dash/'+msg)	

}



//ABOUT US
exports.aboutUs = (req, res) => {
	//console.log(req.params.gates);
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	let msg =false;
	if (req.params.msg) {
		msg =req.params.msg;
	}
	var total_gates="";
	let admin_dash1= true;
	Modulo_BD.totalGates().then((res) =>{
		let parsed = JSON.parse(res);
		total_gates= parsed.length
})
	Modulo_BD
		.totalaboutUs().then((resultado)=>{
			let parsed = JSON.parse(resultado);
			let cont= parsed.length
			let aboutUs = true;
			//console.log(parsed);
				res.render("index_admin", {
					//usuarios: parsed,
					dashboardPage: true,
					cont_user:cont,
					aboutUs_parsed: parsed,
					aboutUs,notPhoto,
					cont_gates:total_gates,
					admin_dash1,
					msg,
				});

		})
}

exports.addAboutUs = (req, res) => {
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	let userID = req.user.id;
	//console.log(userID);
	//Modulo_BD
		//.obtenerUsuarios().then((resultado)=>{
		//	let parsed = JSON.parse(resultado);
		//	let cont= parsed.length
			//console.log(parsed);
				res.render("create_about", {
					pageName: "Crear Sobre Nosotros",
					dashboardPage: true,
					userID,notPhoto
				});

		//})
}

exports.save_aboutus = async (req, res) => {
	const {id,telefono,ws,facebook,instagram,souncloud,mixcloud,youtube,correo,twitter,spotify,tiktok} = req.body;	
		var msg ="";
		Modulo_BD.guardaraboutus(id,telefono,ws,facebook,instagram,souncloud,mixcloud,youtube,correo,twitter,spotify,tiktok).then((result) => {
				console.log(result);
				if (result==="0") {
					msg ="Ya existe el telefono, porfavor verifique";
				}else{
					msg ="Sobre nosotros guardado con exito";	
				}
				res.redirect('/aboutus/'+msg)
		})
			.catch(err => {
	return res.status(500).send("Error actualizando"+err);
});
	
}

exports.editabout = (req, res) => {
	let id_buscar = req.params.id;
//	var id_user = req.user.id;
	let admin_dash1= true;
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}

	Modulo_BD
		.obtenerAboutforedit(id_buscar).then((resultado)=>{
			let parsed_about = JSON.parse(resultado)[0];
			let cont= parsed_about.length
		console.log(parsed_about);

	res.render('edit_about', {
		pageName: 'Editar Plan',
		dashboardPage: true,
		parsed_about,notPhoto,
		admin_dash1
		
	});

		})
}

exports.saveaboutEdited = async (req, res) => {
	const {id,telefono,ws,facebook,instagram,soundcloud,mixcloud,youtube,correo,twitter,spotify,tiktok} = req.body;	

		Modulo_BD.saveEditedAbout(id,telefono,ws,facebook,instagram,soundcloud,mixcloud,youtube,correo,twitter,spotify,tiktok).then((result) => {
				console.log(result);
				
		})
			.catch(err => {
	return res.status(500).send("Error actualizando"+err);
});
let msg ="Sobre nosotros actualizado con exito";
res.redirect('/aboutus/'+msg)	

}
exports.deleteAbout = async (req, res) => {
	let parametro_buscar = req.params.id;

	Modulo_BD
		.deleteAbout(parametro_buscar).then((resultado)=>{
			//let parsed = JSON.parse(resultado);
			//let cont= parsed.length
			console.log(resultado);
			
			let msg ="Sobre nosotros eliminado con exito";
			res.redirect('/aboutus/'+msg)	

		})
	
}


// CUPONES
exports.getCupones = (req, res) => {
	//console.log(req.params.gates);
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	let msg =false;
	if (req.params.msg) {
		msg =req.params.msg;
	}
	var total_gates="";
	let admin_dash1= true;
	Modulo_BD.totalGates().then((res) =>{
		let parsed = JSON.parse(res);
		total_gates= parsed.length
})
	Modulo_BD
		.totalcupones().then((resultado)=>{
			let parsed = JSON.parse(resultado);
			let cont= parsed.length
			let cupones = true;
			//console.log(parsed);
				res.render("index_admin", {
					//usuarios: parsed,
					dashboardPage: true,
					cont_user:cont,
					cuponoes_parsed: parsed,
					cupones,notPhoto,
					cont_gates:total_gates,
					admin_dash1,
					msg,
				});

		})
}

exports.addCupon = (req, res) => {
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	let userID = req.user.id;
	//console.log(userID);
	//Modulo_BD
		//.obtenerUsuarios().then((resultado)=>{
		//	let parsed = JSON.parse(resultado);
		//	let cont= parsed.length
			//console.log(parsed);
				res.render("create_cupon", {
					pageName: "Crear Cupón",
					dashboardPage: true,
					userID,notPhoto
				});

		//})
}

exports.save_cupon = async (req, res) => {
	const {id,nombre_cupon,valor_cupon,	cantidad,tipo_cupon,fecha_inicio,fecha_final} = req.body;	
		var msg ="";
		Modulo_BD.guardarCupon(id,nombre_cupon,valor_cupon,fecha_inicio,fecha_final,cantidad,tipo_cupon).then((result) => {
				console.log(result);
				if (result==="0") {
					msg ="Ya existe el cupón, porfavor verifique";
				}else{
					msg ="Cupón guardado con exito";	
				}
				res.redirect('/cupones/'+msg)
		})
			.catch(err => {
	return res.status(500).send("Error actualizando"+err);
});
	
}

exports.editCupon = (req, res) => {
	let id_buscar = req.params.id;
//	var id_user = req.user.id;
	let admin_dash1= true;
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	Modulo_BD
		.obtenerCuponforedit(id_buscar).then((resultado)=>{
			let parsed_cupon = JSON.parse(resultado)[0];
			let cont= parsed_cupon.length
		console.log(parsed_cupon);

	res.render('edit_cupon', {
		pageName: 'Editar Cupón',
		dashboardPage: true,
		parsed_cupon,
		admin_dash1,notPhoto
		
	});

		})
}

exports.saveCuponEdited = async (req, res) => {
	const {id,nombre_cupon,valor_cupon,	cantidad,tipo_cupon,	fecha_inicio,fecha_final} = req.body;	

		Modulo_BD.saveEditedCupon(id,nombre_cupon,valor_cupon,fecha_inicio,fecha_final,cantidad,tipo_cupon).then((result) => {
				console.log(result);
				
		})
			.catch(err => {
	return res.status(500).send("Error actualizando"+err);
});
let msg ="Cupón actualizado con exito";
res.redirect('/cupones/'+msg)	

}
exports.deleteCupon = async (req, res) => {
	let parametro_buscar = req.params.id;

	Modulo_BD
		.deleteCupon(parametro_buscar).then((resultado)=>{
			//let parsed = JSON.parse(resultado);
			//let cont= parsed.length
			console.log(resultado);
			
			let msg ="Cupón eliminado con exito";
			res.redirect('/cupones/'+msg)	

		})
	
}


//VENTAS
exports.getPagos = (req, res) => {
	//console.log(req.params.gates);
	let msg =false;
	if (req.params.msg) {
		msg =req.params.msg;
	}
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	var total_gates="";
	let admin_dash1= true;
	Modulo_BD.totalGates().then((res) =>{
		let parsed = JSON.parse(res);
		total_gates= parsed.length
})
	Modulo_BD
		.totalPagos().then((resultado)=>{
			let parsed = JSON.parse(resultado);
			let cont= parsed.length
			let ventas = true;
			
			if (parsed.tipo_compra === 'Gold' || parsed.tipo_compra === 'VIP' ) {
				pre = true;
			}
			//console.log(parsed);
				res.render("index_admin", {
					//usuarios: parsed,
					dashboardPage: true,
					cont_user:cont,
					ventas_parsed: parsed,
					ventas,notPhoto,
					cont_gates:total_gates,
					admin_dash1,
					msg,
				});

		})
}


// BANNER
exports.bannersGet = (req, res) => {
	//console.log(req.params.gates);
	let msg =false;
	if (req.params.msg) {
		msg =req.params.msg;
	}
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	let admin_dash1= true;
	Modulo_BD
		.obtenerBanners().then((resultado)=>{
			let parsed = JSON.parse(resultado);
			let cont= parsed.length
			let banners = true;
			//console.log(parsed);
				res.render("index_admin", {
					//usuarios: parsed,
					dashboardPage: true,
					cont_user:cont,
					banners_parsed: parsed,
					banners,notPhoto,
					admin_dash1,
					msg,
				});

		})
}

exports.addBanner = (req, res) => {
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	let userID = req.user.id;
				res.render("create_banner", {
					pageName: "Crear Banner",
					dashboardPage: true,
					userID,notPhoto
				});
}

exports.save_banner = async (req, res) => {
	const {id,link,	photo1,	nombre} = req.body;	
		var msg ="";
		Modulo_BD.guardarBanner(id,link,	photo1,	nombre).then((result) => {
				console.log(result);
				if (result==="0") {
					msg ="Ya banner existe, porfavor verifique";
				}else{
					msg ="Banner guardado con exito";	
				}
				res.redirect('/banner/'+msg)
		})
			.catch(err => {
	return res.status(500).send("Error actualizando"+err);
});
	
}

exports.editBanner = (req, res) => {
	let id_buscar = req.params.id;
//	var id_user = req.user.id;
	let admin_dash1= true;
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	Modulo_BD
		.obtenerBannerforedit(id_buscar).then((resultado)=>{
			let parsed_banner = JSON.parse(resultado)[0];
			let cont= parsed_banner.length
		console.log(parsed_banner);

	res.render('edit_banner', {
		pageName: 'Editar Banner',
		dashboardPage: true,
		parsed_banner,notPhoto,
		admin_dash1
		
	});

		})
}

exports.sEditedBanner = async (req, res) => {
	const {id,link,	photo1,	nombre} = req.body;	

		Modulo_BD.saveEditedBanner(id,link,	photo1,	nombre).then((result) => {
				console.log(result);
				
		})
			.catch(err => {
	return res.status(500).send("Error actualizando"+err);
});
let msg ="Banner actualizado con exito";
res.redirect('/banner/'+msg)	

}
exports.deleteBanner = async (req, res) => {
	let parametro_buscar = req.params.id;

	Modulo_BD
		.deleteBanner(parametro_buscar).then((resultado)=>{
			//let parsed = JSON.parse(resultado);
			//let cont= parsed.length
			console.log(resultado);
			
			let msg ="Banner eliminado con exito";
			res.redirect('/banner/'+msg)	

		})
	
}

// NOTIFICACIONES
exports.notificacionesGet = (req, res) => {
	//console.log(req.params.gates);
	let msg =false;
	if (req.params.msg) {
		msg =req.params.msg;
	}
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	Modulo_BD
		.obtenernotificaciones().then((resultado)=>{
			let parsed = JSON.parse(resultado);
			//let cont= parsed.length
			Modulo_BD
		.obtenernotificacionesbyLimit3().then((resultado2)=>{
			let parsed_lmit = JSON.parse(resultado2);
			//let cont= parsed.length
			console.log(parsed_lmit);
			
		
			console.log(parsed);
				res.render("index_admin", {
					//usuarios: parsed,
					dashboardPage: true,
					notificaciones_parsed: parsed,
					parsed_lmit,
					notificaciones: true,
					admin_dash1: true,
					msg,notPhoto
				});

		})

		})
}

exports.addnotificaciones = (req, res) => {
	let userID = req.user.id;
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	Modulo_BD
	.obtenerUsuarios().then((resultado)=>{
		let parsed = JSON.parse(resultado);
		let cont= parsed.length
		//console.log(parsed);
			res.render("notificaciones", {
				pageName: "Crear Notificacion",
				usuarios_parsed: parsed,
				dashboardPage: true,notPhoto,
				admin_dash1:true,userID
			});

	})
}

exports.save_notificaciones = async (req, res) => {
	const {id_user,nombre,estado,descripcion,fecha_publicacion,destino} = req.body;	
		var msg ="";
		Modulo_BD.saveDatosNotificaciones(id_user,nombre,estado,descripcion,fecha_publicacion,destino).then((result) => {
				console.log(result);
				if (result==="0") {
					msg ="El nombre de la notificacion existe y se actualizado con éxito";
				}else{
					msg ="Notificacion guardado con exito";	
				}
				res.redirect('/notificaciones/'+msg)
		})
			.catch(err => {
	return res.status(500).send("Error actualizando"+err);
});
	
}

exports.editNotificaciones = (req, res) => {
	let id_buscar = req.params.id;
	let userID = req.user.id;
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	Modulo_BD
		.obtenerNotificacionforedit(id_buscar).then((resultado)=>{
			let parsed_notificacion = JSON.parse(resultado)[0];
			let cont= parsed_notificacion.length
		console.log(parsed_notificacion);

	res.render('notificaciones', {
		pageName: 'Editar Notificacion',
		dashboardPage: true,
		parsed_notificacion,notPhoto,
		admin_dash1: true,userID

		
	});

		})
}

exports.deletenotificaciones = async (req, res) => {
	let parametro_buscar = req.params.id;

	Modulo_BD
		.deleteNotificaciones(parametro_buscar).then((resultado)=>{
			//let parsed = JSON.parse(resultado);
			//let cont= parsed.length
			console.log(resultado);
			
			let msg ="Notificacion eliminada con exito";
			res.redirect('/notificaciones/'+msg)	

		})
	
}


//TIPO DE CAMBIO
exports.tipo_cambio = (req, res) => {
	//console.log(req.params.gates);
	let msg =false;
	if (req.params.msg) {
		msg =req.params.msg;
	}
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	Modulo_BD
		.obtenerTipo_cambio().then((resultado)=>{
			let parsed_tipo_cambio = JSON.parse(resultado);
			//let cont= parsed.length
			Modulo_BD
		.obtenernotificacionesbyLimit3().then((resultado2)=>{
			let parsed_lmit = JSON.parse(resultado2);
			//let cont= parsed.length
			console.log(parsed_lmit);
			
				res.render("index_admin", {
					//usuarios: parsed,
					dashboardPage: true,
					parsed_tipo_cambio,
					parsed_lmit,
					tipo_cambio: true,
					admin_dash1: true,
					msg,notPhoto
				});

		})

		})
}

exports.tipo_cambio_add = (req, res) => {
	let userID = req.user.id;
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	
		//console.log(parsed);
			res.render("tipo_cambio", {
				pageName: "Crear Tipo de Cambio",
				dashboardPage: true,
				notPhoto,
				admin_dash1:true,
				userID
			});
}

exports.tipo_cambio_save = async (req, res) => {
	const {id_user,tipo_cambio} = req.body;
	var id_tipo = req.body.id_tipo
	console.log(id_tipo)
	if (typeof id_tipo === 'undefined') {
		id_tipo = 1
		}
		console.log(id_tipo)
		var msg ="";
		Modulo_BD.saveTipoCambio(id_user,tipo_cambio,id_tipo).then((result) => {
				console.log(result);
				if (result==="0") {
					msg ="Se actualizó con exito el tipo de cambio";
				}else{
					msg ="Tipo de Cambio guardado con exito";	
				}
				res.redirect('/tipo_cambio/'+msg)
		})
			.catch(err => {
	return res.status(500).send("Error actualizando"+err);
});
	
}

exports.tipo_cambio_edit = (req, res) => {
	let id_buscar = req.params.id;
	let userID = req.user.id;
	var photo = req.user.photo;
	let notPhoto = true;
	if (photo=="0") {
		notPhoto = false;	
		}
	Modulo_BD
		.obtenerTipoCambioById(id_buscar).then((resultado)=>{
			let parsed_Tipo_cambio = JSON.parse(resultado)[0];
			let cont= parsed_Tipo_cambio.length
		console.log(parsed_Tipo_cambio);

	res.render('tipo_cambio', {
		pageName: 'Editar Tipo de Cambio',
		dashboardPage: true,
		parsed_Tipo_cambio,notPhoto,
		admin_dash1: true,userID

		
	});

		})
}

exports.tipo_cambio_delete = async (req, res) => {
	let parametro_buscar = req.params.id;

	Modulo_BD
		.deleteTipo_cambio(parametro_buscar).then((resultado)=>{
			//let parsed = JSON.parse(resultado);
			//let cont= parsed.length
			console.log(resultado);
			
			let msg ="Tipo de cambio eliminado con éxito";
			res.redirect('/tipo_cambio/'+msg)	

		})
	
}