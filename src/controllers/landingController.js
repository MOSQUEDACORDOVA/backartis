const Modulo_BD = require('../models/modulos_');

exports.showLandingPage = (req, res) => {

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
			res.render('home', {
				pageName: 'Inicio',
				landingPage: true,
				plan_basico_Mensual,
				plan_VIP_Anual,
				plan_Gold_Anual,
				plan_VIP_Mensual,
				plan_Gold_mensual,
				layout: false
			});

		})

}