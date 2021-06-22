module.exports = {
	showAlerts: (message = {}, alerts) => {
		const categoria = Object.keys(message);

		let html = '';

		if(categoria.length) {
			html += '<div class="form-message-container">';
			message[categoria].forEach(error => {
				html += `<p class="form-message form-message-${categoria}">${error}</p>`;
			});
			html += '</div>';
		}

		return alerts.fn().html = html;
	},
	showCurrentMembership: (str1, str2) => {
		if(str1 === str2) {
			return '(actual)';
		}
	},
	showBtnMembership: (str1, str2, btnClass, url, monto) => {
		if(str1 !== str2) {
			return `
			<form action="${url}" method="post">
			<input type="hidden"   name="amount" value="${monto}" id="monto_plan">
			<input type="hidden"   name="product" value="${str2}" id="tipo_plan">
			<input type="submit"   class="btn btn-block btn-${btnClass}" value="Obtener Plan">
			</form>
			`;
		}
	},
	showBtnMembershipCupon: (str1, str2, btnClass, url) => {
		if(str1 !== str2) {
			return `
			<form action="${url}" method="post" style="display: grid;grid-template-columns: 1fr 1fr;">
			<input type="text"   name="cupon" class="form-control-steps" style="width: 90%;	height: 50px;margin-top: 2rem !important;" placeholder="Cupón" required>
			<input type="submit"   class="btn btn-block btn-${btnClass}" value="Aplicar Cupón">
			</form>
			`;
		}
	},
	getMembershipDesc: (membership) => {
		switch(membership.toLowerCase()) {
			case 'gold':
				return '¡Eres todo un maestro!';
				break;
			case 'vip':
				return '¡Eres todo un experto!';
				break;
			default:
				return '¡Conviértete en experto!';
				break;
		}
	},
	acceptFiles(membership, accept) {
		if(accept) {
			return membership.toLowerCase() !== 'basic' ? 'audio/*, .zip' : '.zip';
		}
		return membership.toLowerCase() !== 'basic' ? '.mp3, .wav, .aiff, .zip' : '.zip';
	},
	URLRSS: (str1, class1, text) => {
	var aux = str1.split(",");
	 let cont =	aux.length;
	 console.log(cont)
	 var out = "";
	 for (let i = 0; i < cont; i++) {
	//	console.log(aux[i])
		out += `<a class="${class1} div_share" id="div_share" >${text}</a>
		<label class="label_url" hidden>${aux[i]}</label>`
		 
	 }
	 return out;
	},
	URLRSS2: (str1, class1, text, social) => {
		var aux = str1.split(",");
		 let cont =	aux.length;
		 console.log(cont)
		 var out = "";
		 if (text == "Compartir" && class1 == "tweet"){
			var share_tw ="http://twitter.com/share?text=Gracias por compartir"
			}

		 for (let i = 0; i < cont; i++) {
		//	console.log(aux[i])
		if (text == "soundcloud"){
			out += `<div class="soundc"><a class="div_share" id="div_share" ><i class="fab fa-${social}" style="padding-right: 16px;"></i>${text}</a>
			<label class="label_url" hidden>${share_tw} ${aux[i]}</label> </div>`
			}else{
			out += `<a class="${class1} div_share" id="div_share" ><i class="fab fa-${social}" style="padding-right: 16px;"></i>${text}</a>
			<label class="label_url" hidden>${share_tw} ${aux[i]}</label>`	
			}
			
			
			 
		 }
		 return out;
		},

		notificaciones: (arreglo, user) => {
			//var aux = JSON.stringify(arreglo);
			let cont =	arreglo.length;
			 console.log(cont)
			var out = "";
			//Comprobamos que tenga formato correcto
	
 			Hoy = new Date();//Fecha actual del sistema
			var AnyoHoy = Hoy.getFullYear();
			var MesHoy = Hoy.getMonth();
			var DiaHoy = Hoy.getDate();
			 for (let i = 0; i < cont; i++) {
				var Fecha_aux = arreglo[i].fecha_publicacion.split("-");
				var Fecha1 = new Date(parseInt(Fecha_aux[0]),parseInt(Fecha_aux[1]-1),parseInt(Fecha_aux[2]));
				//console.log(Fecha1)
					
					var AnyoFecha = Fecha1.getFullYear();
					var MesFecha = Fecha1.getMonth();
					var DiaFecha = Fecha1.getDate();

				
				 if (arreglo[i].estado == "Activa") {
					
					if (AnyoFecha == AnyoHoy && MesFecha == MesHoy && DiaFecha == DiaHoy){
						out +=		`<li class="list-notifications__item">${arreglo[i].descripcion}</li>`
					 }
				 }
				}
			/*	console.log(aux[i])
			if (text == "soundcloud"){
				 `<div class="soundc"><a class="div_share" id="div_share" ><i class="fab fa-${social}" style="padding-right: 16px;"></i>${text}</a>
				<label class="label_url" hidden>${share_tw} ${aux[i]}</label> </div>`
				}else{
				out += `<a class="${class1} div_share" id="div_share" ><i class="fab fa-${social}" style="padding-right: 16px;"></i>${text}</a>
				<label class="label_url" hidden>${share_tw} ${aux[i]}</label>`	
				}
					
				 
			 }*/
			 return out;
			},
	
}