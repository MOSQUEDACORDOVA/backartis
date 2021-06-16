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
	}
	
}