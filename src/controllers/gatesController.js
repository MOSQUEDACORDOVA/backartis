const Gates = require('../models/modulos_');
const Sequelize = require('sequelize');
const path = require('path');
let fs = require('fs');
//var mediaserver = require('mediaserver');
//var multer = require('multer');

exports.viewGate = (req, res) => {
	//console.log(req.user);
	let id_buscar = req.params.id;
	var id_user = req.user.id;

	Gates
		.obtenerUserforGate(id_user).then((resultado)=>{
			let parsed_user = JSON.parse(resultado)[0];
			let cont= parsed_user.length
			console.log(parsed_user);
		Gates.obtenerGate(id_buscar,id_user).then((resultado)=>{
			let parsed = JSON.parse(resultado)[0];
			let cont= parsed.length
			console.log(parsed);
			res.render('gate', {
				pageName: 'Gate',
				gate: parsed,
				user: parsed_user,
				cont_gates:cont,
				layout: false
			});			
		})
		})		

}
exports.viewGatePersonalizado = (req, res) => {
	
	let req_buscar = req.params.enlace;
//	var id_user = req.user.id;
console.log(req_buscar);
	Gates
		.obtenerGatePersonalizado(req_buscar).then((resultado)=>{
			let parsed = JSON.parse(resultado)[0];
			let id_user= parsed.id_usuario

			console.log(parsed);
		Gates.obtenerUserforGate(id_user).then((resultado)=>{
			let parsed_user = JSON.parse(resultado)[0];
			//let cont= parsed_user.length
			console.log(parsed_user);
			let bondGate = false;
			let backstore = false;
			if (parsed.tipo_create == "bondgate") {
				bondGate = true;
			}
			if (parsed.tipo_create == "backstore") {
				backstore = true;
			}

			res.render('gate', {
				pageName: parsed.titulo,
				gate: parsed,
				user: parsed_user,
				bondGate,backstore,
				layout: false
			});			
		})
		})		

}


exports.formCreateFileGate = (req, res) => {
	const user = res.locals.user;
	
	res.render('create-gate', {
		pageName: 'Crear File Gate',
		dashboardPage: true,
		fileGate: true,
		user
	});
}


exports.formEditFileGate = (req, res) => {
	const user = res.locals.user;
	const id_user = res.locals.user.id
	var parametro_buscar = req.params.id;
	var backstore,	fileGate,	bondGate  = false


	Gates
		.obtenerGate(parametro_buscar,id_user).then((resultado)=>{
			let parsed = JSON.parse(resultado)[0];
			let cont= parsed.length
			if (parsed.tipo_create ==="filegate") {
				fileGate = true	
			}
			if (parsed.tipo_create ==="bondgate") {
				bondGate = true				

			}
			if (parsed.tipo_create ==="backstore") {
				backstore = true			

			}
			console.log(parsed);
				res.render('create-gate-edit', {
					pageName: 'Edit File Gate',
					gate: parsed,
					dashboardPage: true,
					fileGate: true,
					user,
					backstore,	fileGate,	bondGate
					//cont_gates:total_gates,
				});

		})
}

exports.formCreateBondGate = (req, res) => {
	const user = res.locals.user;
	
	if(user.basic) {
		return res.redirect('/dashboard');
	}

	res.render('create-gate', {
		pageName: 'Crear Bond Gate',
		dashboardPage: true,
		bondGate: true,
		user
	});
}

exports.formBackstore = (req, res) => {
	const user = res.locals.user;

	if(!user.gold) {
		return res.redirect('dashboard');
	}

	res.render('create-gate', {
		pageName: 'BackStore',
		dashboardPage: true,
		backstore: true,
		user
	});
}

exports.createGate = (req, res) => {
	var id_user = req.user.id;
	const user = res.locals.user;
	 console.log(req.body);
	const {url_demo,gender,other_gender,url_track,artist_name,music_title,music_desc,music_price,color,color_titulo,color_descripcion,show_watermarker,desing_social,user_logo,privacity,gate_link,promotion,suscribir_youtube,omitir_youtube,url_youtube,nombre_youtube,like_facebook,compartir_facebook,omitir_facebook,url_facebook,seguir_twitter,compartir_twitter,omitir_twitter,url_twitter,seguir_soundcloud,compartir_soundcloud,repost_souncloud,omitir_souncloud,url_souncloud,seguir_instagram,omitir_instagram,url_instagram,seguir_spotify,omitir_spotify,url_spotify,seguir_deezer,guardar_deezer,omitir_deezer,url_deezer,seguir_tiktok,omitir_tiktok,url_tiktok,seguir_mixcloud,repost_mixcloud,like_mixcloud,omitir_mixcloud,url_mixcloud,nuevo_lanzamiento,archivo1,img_flyer,tipo_create} = req.body;

	//console.log(url_demo+"-"+gender+"-"+other_gender+"-"+url_track+"-"+artist_name+"-"+music_title+"-"+music_desc+"-"+music_price+"-"+color+"-"+show_watermarker+"-"+desing_social+"-"+user_logo+"-"+privacity+"-"+gate_link+"-"+promotion+"-"+suscribir_youtube+"-"+omitir_youtube+"-"+url_youtube+"-"+nombre_youtube+"-"+like_facebook+"-"+compartir_facebook+"-"+omitir_facebook+"-"+url_facebook+"-"+seguir_twitter+"-"+compartir_twitter+"-"+omitir_twitter+"-"+url_twitter+"-"+seguir_soundcloud+"-"+compartir_soundcloud+"-"+repost_souncloud+"-"+omitir_souncloud+"-"+url_souncloud+"-"+seguir_instagram+"-"+omitir_instagram+"-"+url_instagram+"-"+seguir_spotify+"-"+omitir_spotify+"-"+url_spotify+"-"+seguir_deezer+"-"+guardar_deezer+"-"+omitir_deezer+"-"+url_deezer+"-"+seguir_tiktok+"-"+omitir_tiktok+"-"+seguir_mixcloud+"-"+repost_mixcloud+"-"+like_mixcloud+"-"+omitir_mixcloud+"-"+url_mixcloud);

	Gates.insertargates(
			
		{url_demo,gender,other_gender,url_track,artist_name,music_title,music_desc,music_price,color,color_titulo,color_descripcion,show_watermarker,desing_social,user_logo,privacity,gate_link,promotion,suscribir_youtube,omitir_youtube,url_youtube,nombre_youtube,like_facebook,compartir_facebook,omitir_facebook,url_facebook,seguir_twitter,compartir_twitter,omitir_twitter,url_twitter,seguir_soundcloud,compartir_soundcloud,repost_souncloud,omitir_souncloud,url_souncloud,seguir_instagram,omitir_instagram,url_instagram,seguir_spotify,omitir_spotify,url_spotify,seguir_deezer,guardar_deezer,omitir_deezer,url_deezer,seguir_tiktok,omitir_tiktok,url_tiktok,seguir_mixcloud,repost_mixcloud,like_mixcloud,omitir_mixcloud,url_mixcloud,nuevo_lanzamiento,archivo1,img_flyer,tipo_create, id_user}
	
		).then((respuesta) => {
		//	console.log(respuesta);
			let backstore =  false;
			let bondGate = false;
			let fileGate =  false;
			if (tipo_create == "filegate") {
				fileGate = true
			}
			if (tipo_create == "bondgate") {
				bondGate = true
			}
			if (tipo_create == "backstore") {
				backstore = true
			}
		if (respuesta == "0") {
			let msg = "El enlace personalizado ya existe porfavor verifique el nombre, y vuelva a intentarlo";
			console.log(msg)
			res.render('create-gate', {
				pageName: 'BackStore',
				dashboardPage: true,
				fileGate,bondGate,backstore,user,
				msg
			});
		}else{
			res.redirect('/dashboard/filegate')			
		}
			
	})
		.catch(err => {
return res.status(500).send("Error actualizando"+err);
});

}
exports.updateGate = (req, res) => {
	var id_user = req.user.id;
	 console.log(req.body);
	const {id_gate,url_demo,gender,other_gender,url_track,artist_name,music_title,music_desc,music_price,color,color_titulo,color_descripcion,show_watermarker,desing_social,user_logo,privacity,gate_link,promotion,suscribir_youtube,omitir_youtube,url_youtube,nombre_youtube,like_facebook,compartir_facebook,omitir_facebook,url_facebook,seguir_twitter,compartir_twitter,omitir_twitter,url_twitter,seguir_soundcloud,compartir_soundcloud,repost_souncloud,omitir_souncloud,url_souncloud,seguir_instagram,omitir_instagram,url_instagram,seguir_spotify,omitir_spotify,url_spotify,seguir_deezer,guardar_deezer,omitir_deezer,url_deezer,seguir_tiktok,omitir_tiktok,url_tiktok,seguir_mixcloud,repost_mixcloud,like_mixcloud,omitir_mixcloud,url_mixcloud,nuevo_lanzamiento,archivo1,img_flyer,tipo_create} = req.body;

	//console.log(url_demo+"-"+gender+"-"+other_gender+"-"+url_track+"-"+artist_name+"-"+music_title+"-"+music_desc+"-"+music_price+"-"+color+"-"+show_watermarker+"-"+desing_social+"-"+user_logo+"-"+privacity+"-"+gate_link+"-"+promotion+"-"+suscribir_youtube+"-"+omitir_youtube+"-"+url_youtube+"-"+nombre_youtube+"-"+like_facebook+"-"+compartir_facebook+"-"+omitir_facebook+"-"+url_facebook+"-"+seguir_twitter+"-"+compartir_twitter+"-"+omitir_twitter+"-"+url_twitter+"-"+seguir_soundcloud+"-"+compartir_soundcloud+"-"+repost_souncloud+"-"+omitir_souncloud+"-"+url_souncloud+"-"+seguir_instagram+"-"+omitir_instagram+"-"+url_instagram+"-"+seguir_spotify+"-"+omitir_spotify+"-"+url_spotify+"-"+seguir_deezer+"-"+guardar_deezer+"-"+omitir_deezer+"-"+url_deezer+"-"+seguir_tiktok+"-"+omitir_tiktok+"-"+seguir_mixcloud+"-"+repost_mixcloud+"-"+like_mixcloud+"-"+omitir_mixcloud+"-"+url_mixcloud);

	Gates.updategates(
			
		{id_gate,url_demo,gender,other_gender,url_track,artist_name,music_title,music_desc,music_price,color,color_titulo,color_descripcion,show_watermarker,desing_social,user_logo,privacity,gate_link,promotion,suscribir_youtube,omitir_youtube,url_youtube,nombre_youtube,like_facebook,compartir_facebook,omitir_facebook,url_facebook,seguir_twitter,compartir_twitter,omitir_twitter,url_twitter,seguir_soundcloud,compartir_soundcloud,repost_souncloud,omitir_souncloud,url_souncloud,seguir_instagram,omitir_instagram,url_instagram,seguir_spotify,omitir_spotify,url_spotify,seguir_deezer,guardar_deezer,omitir_deezer,url_deezer,seguir_tiktok,omitir_tiktok,url_tiktok,seguir_mixcloud,repost_mixcloud,like_mixcloud,omitir_mixcloud,url_mixcloud,nuevo_lanzamiento,archivo1,img_flyer,tipo_create, id_user}
	
		).then((respuesta) => {
		//	console.log(respuesta);				
	})
		.catch(err => {
return res.status(500).send("Error actualizando"+err);
});
//redirect('/dashboard');
let msg =tipo_create+" actualizado con exito";
res.redirect('/dashb/'+msg)

}

exports.getGates = async (req, res) => {
	var photo = req.user.photo;
	let parametro_buscar = req.params.gates;
	let product = req.params.productUdpt;
	var id_user = req.user.id;
	let msg =false;
	let notPhoto = true;

	//console.log(req)

	if (req.params.msg) {
		msg =req.params.msg;
	}
	if (typeof product=== 'undefined') {
		product= false;
		
	}
	if (typeof parametro_buscar=== 'undefined') {
		parametro_buscar="filegate";
		
	}
	if (photo=="0") {
	notPhoto = false;	
	}
	var total_gates="";
	Gates.totalGates().then((res) =>{
			let parsed = JSON.parse(res);
			total_gates= parsed.length
	})
	//console.log(req.params.gates);
		Gates
		.obtenerGates(parametro_buscar,id_user).then((resultado)=>{
			Gates
		.obtenernotificacionesbyLimit3().then((resultado2)=>{
			let parsed_lmit = JSON.parse(resultado2);
			//let cont= parsed.length
			console.log(parsed_lmit);

			

		
			let parsed = JSON.parse(resultado);
			let cont= parsed.length
			//console.log(cont);
				res.render("dashboard", {
					gates: parsed,
					product,
					parsed_lmit,
					notificaciones: true,
					dashboardPage: true,
					cont_gates:total_gates,
					notPhoto,
					msg
				});
			})	

		})
}

exports.deleteGate = async (req, res) => {
	let parametro_buscar = req.params.id_;
	if (typeof parametro_buscar=== 'undefined') {
		parametro_buscar="filegate"
	}
	Gates
		.deleteGate(parametro_buscar).then((resultado)=>{
			//let parsed = JSON.parse(resultado);
			//let cont= parsed.length
			console.log(resultado);
			res.redirect('/dashboard/filegate');

		})
	
}

exports.downloadGate = (req, res) => {
	let archivo = req.params.id;
	var parametro_buscar = req.params.id_gate;
	var correo = req.params.correo;
	//console.log(parametro_buscar)
	var fileName = String(archivo); // The default name the browser will use
	//var filePath =__dirname + '/../public/assets/uploads/'; // Or format the path using the `id` rest param
	//console.log(fileName)
	var filePath = path.join(__dirname, '/../public/assets/uploads/', fileName)
	
    
	//let absPath = path.join(__dirname, '/my_files/', filename);
	console.log(filePath);
	Gates
    .guardarSuscripcionGate('suscripcion_gate',correo,parametro_buscar).then((resultado)=>{
        if (resultado=="0") {
            console.log("Email ya registrado en sistema");
        }
});
	Gates
	.obtenerGateforDown(parametro_buscar).then((resultado)=>{
		let parsed = JSON.parse(resultado)[0];
		let cont= parsed.length;
		let down = parsed.descargas;

		let cont_down = parseInt(down) + 1;
		console.log(cont_down);
		Gates
		.actualizarGateDownload(parametro_buscar,cont_down ).then((resultado)=>{
			
			res.download(filePath, (err) => {
				if (err) {
				  console.log(err);
				}
			});


		})
	})
	
    //res.download(filePath);    


	
}

