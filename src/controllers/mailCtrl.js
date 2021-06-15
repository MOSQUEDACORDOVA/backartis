const Modulo_BD = require('../models/modulos_');
const nodemailer = require('nodemailer');
// email sender function
exports.sendEmail = function(req, res){
	const {email} = req.body;
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
};
