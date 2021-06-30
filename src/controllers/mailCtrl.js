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