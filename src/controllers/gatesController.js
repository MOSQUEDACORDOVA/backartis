const Gates = require('../models/modulos_');
const Sequelize = require('sequelize');

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
			
			res.render('gate', {
				pageName: 'Gate',
				gate: parsed,
				user: parsed_user,
				//cont_gates:cont,
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
	 console.log(req.body);
	const {url_demo,gender,other_gender,url_track,artist_name,music_title,music_desc,music_price,color,color_titulo,color_descripcion,show_watermarker,desing_social,user_logo,privacity,gate_link,promotion,suscribir_youtube,omitir_youtube,url_youtube,nombre_youtube,like_facebook,compartir_facebook,omitir_facebook,url_facebook,seguir_twitter,compartir_twitter,omitir_twitter,url_twitter,seguir_soundcloud,compartir_soundcloud,repost_souncloud,omitir_souncloud,url_souncloud,seguir_instagram,omitir_instagram,url_instagram,seguir_spotify,omitir_spotify,url_spotify,seguir_deezer,guardar_deezer,omitir_deezer,url_deezer,seguir_tiktok,omitir_tiktok,seguir_mixcloud,repost_mixcloud,like_mixcloud,omitir_mixcloud,url_mixcloud,nuevo_lanzamiento,archivo1,img_flyer,tipo_create} = req.body;

	//console.log(url_demo+"-"+gender+"-"+other_gender+"-"+url_track+"-"+artist_name+"-"+music_title+"-"+music_desc+"-"+music_price+"-"+color+"-"+show_watermarker+"-"+desing_social+"-"+user_logo+"-"+privacity+"-"+gate_link+"-"+promotion+"-"+suscribir_youtube+"-"+omitir_youtube+"-"+url_youtube+"-"+nombre_youtube+"-"+like_facebook+"-"+compartir_facebook+"-"+omitir_facebook+"-"+url_facebook+"-"+seguir_twitter+"-"+compartir_twitter+"-"+omitir_twitter+"-"+url_twitter+"-"+seguir_soundcloud+"-"+compartir_soundcloud+"-"+repost_souncloud+"-"+omitir_souncloud+"-"+url_souncloud+"-"+seguir_instagram+"-"+omitir_instagram+"-"+url_instagram+"-"+seguir_spotify+"-"+omitir_spotify+"-"+url_spotify+"-"+seguir_deezer+"-"+guardar_deezer+"-"+omitir_deezer+"-"+url_deezer+"-"+seguir_tiktok+"-"+omitir_tiktok+"-"+seguir_mixcloud+"-"+repost_mixcloud+"-"+like_mixcloud+"-"+omitir_mixcloud+"-"+url_mixcloud);

	Gates.insertargates(
			
		{url_demo,gender,other_gender,url_track,artist_name,music_title,music_desc,music_price,color,color_titulo,color_descripcion,show_watermarker,desing_social,user_logo,privacity,gate_link,promotion,suscribir_youtube,omitir_youtube,url_youtube,nombre_youtube,like_facebook,compartir_facebook,omitir_facebook,url_facebook,seguir_twitter,compartir_twitter,omitir_twitter,url_twitter,seguir_soundcloud,compartir_soundcloud,repost_souncloud,omitir_souncloud,url_souncloud,seguir_instagram,omitir_instagram,url_instagram,seguir_spotify,omitir_spotify,url_spotify,seguir_deezer,guardar_deezer,omitir_deezer,url_deezer,seguir_tiktok,omitir_tiktok,seguir_mixcloud,repost_mixcloud,like_mixcloud,omitir_mixcloud,url_mixcloud,nuevo_lanzamiento,archivo1,img_flyer,tipo_create, id_user}
	
		).then((respuesta) => {
		//	console.log(respuesta);				
	})
		.catch(err => {
return res.status(500).send("Error actualizando"+err);
});
//redirect('/dashboard');

res.redirect('/dashboard/filegate')

}

exports.getGates = async (req, res) => {
	let parametro_buscar = req.params.gates;
	let product = req.params.productUdpt;
	var id_user = req.user.id;

	if (typeof product=== 'undefined') {
		product= false;
		
	}
	if (typeof parametro_buscar=== 'undefined') {
		parametro_buscar="filegate";
		
	}
	var total_gates="";
	Gates.totalGates().then((res) =>{
			let parsed = JSON.parse(res);
			total_gates= parsed.length
	})
	//console.log(req.params.gates);
		Gates
		.obtenerGates(parametro_buscar,id_user).then((resultado)=>{
			let parsed = JSON.parse(resultado);
			let cont= parsed.length
			//console.log(cont);
				res.render("dashboard", {
					gates: parsed,
					product,
					dashboardPage: true,
					cont_gates:total_gates,
				});

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
