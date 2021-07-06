const Modulo_BD = require('../models/modulos_');
const nodemailer = require('nodemailer');


// email sender function
exports.sendEmail = function(req, res){
	const {email} = req.body;
    Modulo_BD
    .guardarSuscripcion('suscripcion_landing',email).then((resultado)=>{
        if (resultado=="0") {
            console.log("Email ya registrado en sistema");
            let msg="Email ya registrado en sistema.";
        res.redirect('/?msg='+msg)
        }else{
          
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: 'josearzolay287@gmail.com',
            pass: 'geekjjaa2012'
        }
    });
// Definimos el email
var mailOptions = {
    from: 'Remitente',
    to: email,
    subject: 'Suscribcion',
    text: 'Correo de bienvenida de prueba'
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
		let msg="Error al enviar Mensaje";
		res.redirect('/?msg='+msg)
       // res.send(500, err.message);
    } else {
        console.log("Email sent fine");
        let msg="Gracias por suscribirte, pronto recibiras noticias nuestras en tu correo.";
        res.redirect('/?msg='+msg)	 
     
        
      //  res.status(200).jsonp(req.body);
    }
});

}
});
};


exports.sendEmailResetPass = function(req, res){
	//const {email} = req.body;
    var token = req.params.token
    var mail = req.params.mail
    const resetUrl = `http://${req.headers.host}/search-account/${token}`;
          
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: 'josearzolay287@gmail.com',
            pass: 'geekjjaa2012'
        }
    });
// Definimos el email
var mailOptions = {
    from: 'Remitente',
    to: mail,
    subject: 'Reset Password',
    text:'Click al siguiente enlace para resetear tu contraseña ' +  resetUrl
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
		let msg="Error al enviar Mensaje";
		res.redirect('/?msg='+msg)
       // res.send(500, err.message);
    } else {
        console.log("Email sent fine");
        let msg="A su correo se ha enviado el link para resetear su contraseña. Recuerde revisar su correo no deseado";
        res.redirect('/?msg='+msg)	 
     
        
      //  res.status(200).jsonp(req.body);
    }
});
};

exports.sendEmailFansPromotion = function(req, res){
	const promocionar_musica = req.params.gate_link;
    const id_user = req.params.id_user;

    console.log(promocionar_musica)
    const tUrl = `http://${req.headers.host}/track/${promocionar_musica}`;


    Modulo_BD.obtenerSuscripbyUserG(id_user).then((respuesta) =>{
        let parsed = JSON.parse(respuesta);
		let array = []
		for (let i = 0; i < parsed.length; i++) {
			const correo = parsed[i].correo;
			array.push(correo)
			//console.log(parsed)
			
		}
        console.log(array)
// Definimos el transporter
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'josearzolay287@gmail.com',
        pass: 'geekjjaa2012'
    }
});
// Definimos el email
var mailOptions = {
from: 'Remitente',
to: array,
subject: 'Música nueva en Backartis',
text:'Tenemos una nueva musica para ti, encuentrala en el siguiente enlace ' +  tUrl
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
if (error){
    console.log(error);
    let msg="Error al enviar Mensaje";
    res.redirect('/dashb/'+msg)
   // res.send(500, err.message);
} else {
    console.log("Email sent fine");
    let msg="Se envio con exito la musica seleccionada a los correos suscritos";
    res.redirect('/dashb/'+msg)	 
 
    
  //  res.status(200).jsonp(req.body);
}
});


    });

};

exports.sendEmailFans = function(req, res){
	const {correo,promocionar_musica} = req.body;
    console.log(correo)
    console.log(promocionar_musica)
    const resetUrl = `http://${req.headers.host}/track/${promocionar_musica}`;
// Definimos el transporter
  var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: 'josearzolay287@gmail.com',
            pass: 'geekjjaa2012'
        }
    });
// Definimos el email
var mailOptions = {
    from: 'Remitente',
    to: correo,
    subject: 'Música nueva en Backartis',
    text:'Tenemos una nueva musica para ti, encuentrala en el siguiente enlace ' +  resetUrl
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
		let msg="Error al enviar Mensaje";
		res.redirect('/fans/'+msg)
       // res.send(500, err.message);
    } else {
        console.log("Email sent fine");
        let msg="Se envio con exito la musica seleccionada a los correos indicados";
        res.redirect('/fans/'+msg)	 
     
        
      //  res.status(200).jsonp(req.body);
    }
});
};