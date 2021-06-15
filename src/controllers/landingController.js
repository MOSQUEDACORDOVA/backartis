const Modulo_BD = require('../models/modulos_');

exports.showLandingPage = (req, res) => {
	let msg =false;
	if (req.query.msg) {
		msg =req.query.msg;
	}
	Modulo_BD
		.obtenerBanners().then((resultado)=>{
			const parsedBanner = JSON.parse(resultado);

		
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
				
				//const element = array[index];
				
			}
			console.log(parsedBanner)
			res.render('home', {
				pageName: 'Inicio',
				landingPage: true,
				plan_basico_Mensual,
				plan_VIP_Anual,
				plan_Gold_Anual,
				plan_VIP_Mensual,
				plan_Gold_mensual,
				msg,
				parsedBanner,
				layout: false
			});

		})
	})
}