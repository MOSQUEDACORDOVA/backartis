const Modulo_BD = require('../models/modulos_');
const scdl = require('soundcloud-downloader').default
const fs = require('fs');
const path = require('path');
const Swal = require('sweetalert2');
//const {getStreamUrls} = require('mixcloud-audio')

exports.dashboard = (req, res) => {
	const user = res.locals.user;
	console.log(req);
	res.render('dashboard', {
		pageName: 'Dashboard',
		dashboardPage: true,
		user
	});
}

exports.shareMusic = (req, res) => {
	const user = res.locals.user;

	res.render('share-music', {
		pageName: 'Compartir mi Música',
		dashboardPage: true,
		user
	})
}

exports.changeMembership = (req, res) => {
	const user = res.locals.user;
	let msg =false;
	if (req.params.msg) {
		msg =req.params.msg;
	}
	Modulo_BD
	.totalPlanes().then((resultado)=>{
		let parsed = JSON.parse(resultado);
		let cont= parsed.length
		let planes = true;
		//console.log(parsed);
		let plan_basico_Mensual =[];
		let plan_VIP_Anual =[];
		let plan_VIP_Mensual =[];
		let plan_Gold_Anual =[];
		let plan_Gold_mensual = [];
		for (let i = 0; i < cont; i++) {
			if (parsed[i].tipo_create === "Basic" && parsed[i].modo === "Mensual") {
				plan_basico_Mensual.push(parsed[i])
			}
			if (parsed[i].tipo_create === "VIP" && parsed[i].modo === "Anual") {
				plan_VIP_Anual.push(parsed[i])
			}
			if (parsed[i].tipo_create === "VIP" && parsed[i].modo === "Mensual") {
				plan_VIP_Mensual.push(parsed[i])
			}
			if (parsed[i].tipo_create === "Gold" && parsed[i].modo === "Anual") {
				plan_Gold_Anual.push(parsed[i])
			}
			if (parsed[i].tipo_create === "Gold" && parsed[i].modo === "Mensual") {
				plan_Gold_mensual.push(parsed[i])
			}
			//console.log(plan_basico_Mensual)
			//const element = array[index];
			
		}
		Modulo_BD.obtenerGatesbyUser(user.id).then((respuesta) =>{
			let parsed_g = JSON.parse(respuesta);
			total_gates= parsed_g.length
			console.log(total_gates);	
			let total_descargas = 0
			for (let i = 0; i < total_gates; i++) {
				total_descargas += parseInt(parsed_g[i].descargas) 
				//console.log(plan_basico_Mensual)
				//const element = array[index];
				
			}

			Modulo_BD.obtenerSuscripbyUserG(user.id).then((data) =>{
				let parsed_s = JSON.parse(data);
				total_sus= parsed_s.length
		res.render('membership', {
			pageName: 'Membresía',
			dashboardPage: true,
			plan_basico_Mensual,plan_VIP_Anual,	plan_Gold_Anual,plan_VIP_Mensual,plan_Gold_mensual,
			total_descargas,
			total_gates,
			user,msg,total_sus
		})
	})
		})
	})
	
}

exports.changeMembershipCupon = (req, res) => {
	const user = res.locals.user;
	const {cupon} = req.body;

	Modulo_BD
	.consultarCuponMembership(cupon).then((resultado)=>{
		let parsed = JSON.parse(resultado)[0];
		console.log (parsed)

		if (typeof parsed === 'undefined') {
			let msg = "El cupón no existe favor verificar"
			res.redirect('/membership/'+msg)
		}else{
			
		
		//Comprobamos que tenga formato correcto

		var Fecha_aux = parsed.fecha_final.split("-");
		//var Fecha1 = new Date(parseInt(Fecha_aux[0]),parseInt(Fecha_aux[1]-1),parseInt(Fecha_aux[2]));
		var Fecha1 = new Date(parsed.fecha_final);
		console.log(Fecha1)
		Hoy = new Date();//Fecha actual del sistema
		var AnyoFecha = Fecha1.getFullYear();
		var MesFecha = Fecha1.getMonth();
		var DiaFecha = Fecha1.getDate();
 
		var AnyoHoy = Hoy.getFullYear();
		var MesHoy = Hoy.getMonth();
		var DiaHoy = Hoy.getDate();
		var horaHoy = Hoy.getHours();
		var minutosHoy = Hoy.getMinutes();
			console.log(horaHoy)

		console.log(minutosHoy)

		var horafinal = Fecha1.getHours();
		var minutosfinal = Fecha1.getMinutes();
		console.log(horafinal)

		console.log(minutosfinal)
		if (parsed.cantidad == 0) {
			let msg = "Cupon agotado"
			res.redirect('/membership/'+msg)	
			
		}else {
			if (AnyoFecha >= AnyoHoy && MesFecha >= MesHoy && DiaFecha >= DiaHoy &&  horaHoy<=horafinal  &&  minutosHoy<=minutosfinal ){
							 console.log("Has introducido la fecha de Hoy");
							 var cantidad_act = parsed.cantidad - 1;
							 var id_cupon = parsed.id;
							 var valor = parsed.valor;
							 var nombre_cupon = parsed.nombre_cupon;
							 var tipo = parsed.tipo;
							 var fecha_uso = Hoy.toISOString()
							 Modulo_BD
							 .UpdateUsedCupon(id_cupon,cantidad_act).then((resultado)=>{
								 let parsed = JSON.parse(resultado)[0];
								
								 Modulo_BD.CuponUsado(user.id,nombre_cupon,valor,fecha_uso,'Membresia',tipo).then((resultadoaqui) => {
									 console.log(resultadoaqui); 
								 })

					 
							 })
							 Modulo_BD
						 .totalPlanes().then((resultado)=>{
							 let parsed_plsn = JSON.parse(resultado);
							 let cont= parsed_plsn.length
							 let planes = true;
							 //console.log(parsed);
							 let plan_basico_Mensual =[];
							 let plan_VIP_Anual =[];
							 let plan_VIP_Mensual =[];
							 let plan_Gold_Anual =[];
							 let plan_Gold_mensual = [];
							 for (let i = 0; i < cont; i++) {
								 if (parsed_plsn[i].tipo_create === "Basic" && parsed_plsn[i].modo === "Mensual") {
									 plan_basico_Mensual.push(parsed_plsn[i])
								 }
								 if (parsed_plsn[i].tipo_create === "VIP" && parsed_plsn[i].modo === "Anual") {
									 plan_VIP_Anual.push(parsed_plsn[i])
								 }
								 if (parsed_plsn[i].tipo_create === "VIP" && parsed_plsn[i].modo === "Mensual") {
									 plan_VIP_Mensual.push(parsed_plsn[i])
								 }
								 if (parsed_plsn[i].tipo_create === "Gold" && parsed_plsn[i].modo === "Anual") {
									 plan_Gold_Anual.push(parsed_plsn[i])
								 }
								 if (parsed_plsn[i].tipo_create === "Gold" && parsed_plsn[i].modo === "Mensual") {
									 plan_Gold_mensual.push(parsed_plsn[i])
								 }
								 //console.log(plan_basico_Mensual)
								 //const element = array[index];			
							 }
							 if (parsed.tipo == "descuento") {
								 var descuento_anual_vip = (parsed.valor * plan_VIP_Anual[0].costo)/100;
								 var monto_anual_vip = plan_VIP_Anual[0].costo-descuento_anual_vip
					 
								 var descuento_mensual_vip = (parsed.valor * plan_VIP_Mensual[0].costo)/100;
								 var monto_mensual_vip = plan_VIP_Mensual[0].costo-descuento_mensual_vip
					 
								 var descuento_anual_gold = (parsed.valor * plan_Gold_Anual[0].costo)/100;
								 var monto_anual_gold = plan_Gold_Anual[0].costo-descuento_anual_gold
					 
								 var descuento_mensual_gold = (parsed.valor * plan_Gold_mensual[0].costo)/100;
								 var monto_mensual_gold = plan_Gold_mensual[0].costo-descuento_mensual_gold
								 console.log(monto_mensual_gold);
							 }


							 res.render('membership_cupon', {
								 pageName: 'Membresía',
								 dashboardPage: true,
								 plan_basico_Mensual,
									 plan_VIP_Anual,
									 plan_Gold_Anual,
									 plan_VIP_Mensual,
									 plan_Gold_mensual,
									 monto_anual_vip,monto_mensual_vip,monto_anual_gold,monto_mensual_gold,
								 user
							 })


					 
						 })
						}
						else{
							let msg = "Cupon fuera de fecha u hora"
								res.redirect('/membership/'+msg)
						}	
		}
	}
	})
	
}

exports.updateProfile = (req, res) => {
	
	const user = res.locals.user;
	//console.log(res);
	res.render('update-profile', {
		pageName: 'Actualizar Perfil',
		dashboardPage: true,
		user,
		
	});
}

exports.fansPage = (req, res) => {
	const user = res.locals.user;

	res.render('fans', {
		pageName: 'Fans',
		dashboardPage: true,
		user
	});
}


exports.mixcloud = (req, res) => {
	const user = res.locals.user;
	const SOUNDCLOUD_URL = 'https://soundcloud.com/sandro-nicho-543892063/dj-dani-dj-hardrrix-rompe-jaula'
	//const CLIENT_ID = 'asdhkalshdkhsf'
	scdl.getInfo(SOUNDCLOUD_URL).then(stream => {
		var titulo = stream.title
		//stream.pipe(fs.createWriteStream('audio.mp3'))
		console.log(stream)
	scdl.download(SOUNDCLOUD_URL).then(stream2 => {
		//console.log(req.headers)
		//stream.download()
		var filePath = path.join(__dirname, '/../public/assets/uploads/', titulo+'.mp3')
		const file = fs.createWriteStream(filePath);
		var len = 0;
		console.log("aqui");
			stream2.on("data", function(chunk) {
		
				len += chunk.length;
	
				// percentage downloaded is as follows
			var percent = (len / 1000) * 100;
				//console.log(percent)
				});
		stream2.pipe(file);
		file.on("finish", function() {
		//	res.download(filePath, (err) => {
		//		if (err) {
			//	  console.log(err);
		//		}
			//	fs.unlinkSync(filePath)
			//	console.log('File removed')
				  
				
		//	});

			file.close(() => {
			 console.log("Listo")
			 let msg ="Archivo creadop";
			res.redirect('/dashb/'+msg)
			});
		   });
	})	
	})

	
}



