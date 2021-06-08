const Modulo_BD = require('../models/modulos_');


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
		res.render('membership', {
			pageName: 'Membresía',
			dashboardPage: true,
			plan_basico_Mensual,
				plan_VIP_Anual,
				plan_Gold_Anual,
				plan_VIP_Mensual,
				plan_Gold_mensual,
			user,msg
		})

	})
	
}

exports.changeMembershipCupon = (req, res) => {
	const user = res.locals.user;
	const {cupon} = req.body;
	Modulo_BD
	.consultarCuponMembership(cupon).then((resultado)=>{
		let parsed = JSON.parse(resultado)[0];

		//Comprobamos que tenga formato correcto
		var Fecha_aux = parsed.fecha_final.split("-");
		var Fecha1 = new Date(parseInt(Fecha_aux[0]),parseInt(Fecha_aux[1]-1),parseInt(Fecha_aux[2]));
		//console.log(Fecha1)
		Hoy = new Date();//Fecha actual del sistema
		var AnyoFecha = Fecha1.getFullYear();
		var MesFecha = Fecha1.getMonth();
		var DiaFecha = Fecha1.getDate();
 
		var AnyoHoy = Hoy.getFullYear();
		var MesHoy = Hoy.getMonth();
		var DiaHoy = Hoy.getDate();

		if (parsed.cantidad == 0) {
			let msg = "Cupon agotado"
			res.redirect('/membership/'+msg)	
			
		}else {
			if (AnyoFecha >= AnyoHoy && MesFecha >= MesHoy && DiaFecha >= DiaHoy){
							 console.log("Has introducido la fecha de Hoy");
							 var cantidad_act = parsed.cantidad - 1;
							 var id_cupon = parsed.id;
							 Modulo_BD
							 .UpdateUsedCupon(id_cupon,cantidad_act).then((resultado)=>{
								 let parsed = JSON.parse(resultado)[0];
								 console.log(parsed);
					 
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
							let msg = "Cupon fuera de fecha"
								res.redirect('/membership/'+msg)
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
