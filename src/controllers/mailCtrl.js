const Modulo_BD = require("../models/modulos_");
const nodemailer = require("nodemailer");
const Usuarios = require("../models/Usuarios");
var moment = require('moment-timezone');
let fs = require("fs");
var pdf = require('html-pdf');
// email sender function
exports.sendEmail = function (req, res) {
  const { email } = req.body;
  
        // Definimos el transporter
        var transporter = nodemailer.createTransport({
          host: "mail.smtp2go.com",
          port: 465,
          secure: true,
          auth: {
            user: "backartist",
            pass: "MnU3MzQ1Zm5pMjQw",
          },
        });
        // Definimos el email
        var mailOptions = {
          from: "Backartist@backartist.com",
          to: email,
          subject: "Suscribción",
          text: "Gracias por suscribirte, pronto recibiras noticias nuestras en tu correo.",          
    html: `<html>
    <head>	
    </head>
    <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">
    <div style="width: 90%; margin-left: auto; margin-right: auto;">
      <div  style="font-weight: bold;display: inline-block; padding-top: .3125rem;padding-bottom: .3125rem; margin-right: 1rem;font-size: 1.25rem;   line-height: inherit;white-space: nowrap; "> 
        <img src="https://josea.mosquedacordova.com/assets/img/logo-ba.png" style="vertical-align: middle; border-style: none;" alt="..." width="70px" />Backartist
      </div>
        <div style="text-align: center"> 
          <label style="font-size: 1.8rem;font-weight: bold;color: darkgoldenrod;"><i class="fas fa-exclamation-circle"></i> Gracias!!</label><br>
        </div>	
        <div style="text-align: left"> 
          <p style="line-height: 1.5;">Gracias por suscribirte, pronto recibiras noticias nuestras en tu correo. !!</p>
        </div>	
        <div style="text-align: center"> 
          <a style="color: white;border: none; font-size: 1em; border-radius: 15px; padding: 0.5em 1.5em;text-decoration:none; background-color:#dc3545" href="https://www.backartist.com/">Visitar Web</a><br>
        </div>		
      </div>
    </body>
  
  </html>`
        };
        // Enviamos el email
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            // let msg = "Error al enviar Mensaje";
            let msg = "Mensaje enviado*";
            res.redirect("/?msg=" + msg);
            // res.send(500, err.message);
          } else {
            Modulo_BD.guardarSuscripcion("suscripcion_landing", email).then(
            (resultado) => {
              if (resultado == "0") {
                console.log("Email ya registrado en sistema");
                let msg = "Email ya registrado en sistema.";
                res.redirect("/?msg=" + msg);
              } else {
            console.log("Email sent fine");
            let msg =
              "Gracias por suscribirte, pronto recibiras noticias nuestras en tu correo.";
            res.redirect("/?msg=" + msg);

            //  res.status(200).jsonp(req.body);
          }
        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/?msg=" + msg);
        });;
      }
    }
  )
};


exports.sendEmailResetPass = function (req, res) {
  //const {email} = req.body;
  var token = req.params.token;
  var mail = req.params.mail;
  const resetUrl = `http://${req.headers.host}/search-account/${token}`;

  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 465,
    secure: true,
    auth: {
      user: "backartist",
      pass: "MnU3MzQ1Zm5pMjQw",
    },
  });
  // Definimos el email
  var mailOptions = {
    from: "Support@backartist.com",
    to: mail,
    subject: "Reset Password",
    text: "Click al siguiente enlace para resetear tu contraseña " + resetUrl,
    html: `<html>
    <head>	
    </head>
    <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">
    <div style="width: 90%; margin-left: auto; margin-right: auto;">
      <div  style="font-weight: bold;display: inline-block; padding-top: .3125rem;padding-bottom: .3125rem; margin-right: 1rem;font-size: 1.25rem;   line-height: inherit;white-space: nowrap; "> 
        <img src="https://josea.mosquedacordova.com/assets/img/logo-ba.png" style="vertical-align: middle; border-style: none;" alt="..." width="70px" />Backartist
      </div>
      <div style="text-align: center"> 
      <label style="font-size: 1.8rem;font-weight: bold;color: darkgoldenrod;"><i class="fas fa-exclamation-circle"></i> Hola</label><br>
    </div>	
    <div style="text-align: left"> 
      <p style="line-height: 1.5;">Recibimos una solicitud para restablecer tu contraseña de backartist.!</p>
      <p style="line-height: 1.5;">Puedes cambiar la contraseña directamente, haciendo click en el siguiente botón.
</p>
    </div>	
    <div style="text-align: center"> 
      <a style="color: white;border: none; font-size: 1em; border-radius: 15px; padding: 0.5em 1.5em;text-decoration:none; background-color:#dc3545" href="${resetUrl}">Cambiar Contraseña</a><br>
    </div>				
		</div>
	</body>
  
  </html>`
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      // let msg = "Error al enviar Mensaje";
      let msg = "Mensaje enviado*";
      res.redirect("/?msg=" + msg);
      // res.send(500, err.message);
    } else {
      console.log("Email sent fine");
      let msg =
        "A su correo se ha enviado el link para resetear su contraseña. Recuerde revisar su correo no deseado";
      res.redirect("/?msg=" + msg);

      //  res.status(200).jsonp(req.body);
    }
  });
};

exports.sendEmailFansPromotion = function (req, res) {
  const promocionar_musica = req.params.gate_link;
  const id_user = req.params.id_user;
  const usuario = res.locals.user;

  console.log("usuarios"+usuario);
  const resetUrl = `http://${req.headers.host}/track/${promocionar_musica}`;

  Modulo_BD.obtenerSuscripbyUserG(id_user).then((respuesta) => {
    let parsed = JSON.parse(respuesta);
    let array = [];
    for (let i = 0; i < parsed.length; i++) {
      const correo = parsed[i].correo;
      array.push(correo);
      //console.log(parsed)
    }
    console.log(array);
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
      host: "mail.smtp2go.com",
      port: 465,
      secure: true,
      auth: {
        user: "backartist",
        pass: "MnU3MzQ1Zm5pMjQw",
      },
    });
    // Definimos el email
    var mailOptions = {
      from: "Backartist@backartist.com",
      to: array,
      subject: "Música nueva en Backartis",
      text:
        "Tenemos una nueva musica para ti, encuentrala en el siguiente enlace " +
        resetUrl,
        html: `<html>
    <head>	
    </head>
    <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">
    <div style="width: 90%; margin-left: auto; margin-right: auto;">
      <div  style="font-weight: bold;display: inline-block; padding-top: .3125rem;padding-bottom: .3125rem; margin-right: 1rem;font-size: 1.25rem;   line-height: inherit;white-space: nowrap; "> 
        <img src="https://josea.mosquedacordova.com/assets/img/logo-ba.png" style="vertical-align: middle; border-style: none;" alt="..." width="70px" />Backartist
      </div>
			<div style="text-align: center"> 
				<label style="font-size: 1.8rem;font-weight: bold;color: darkgoldenrod;"><i class="fas fa-exclamation-circle"></i> Yeeeaahh!!<span>${usuario.userName}<span> tiene música nueva para ti</label><br>
			</div>	
			<div style="text-align: left"> 
				<p style="line-height: 1.5;">Haz click en el boton, para acceder a la nueva pista de <span>${usuario.userName}<span>; recuerda realizar todos los pasos, para obtener este nuevo éxito del momento!!</p>
			</div>	
			<div style="text-align: center"> 
				<a style="color: white;border: none; font-size: 1em; border-radius: 15px; padding: 0.5em 1.5em;text-decoration:none; background-color:#dc3545" href="${resetUrl}">Confirmar</a><br>
			</div>		
		</div>
	</body>
  
  </html>`
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        // let msg = "Error al enviar Mensaje";
        let msg = "Mensaje enviado*";
        res.redirect("/dashb/" + msg);
        // res.send(500, err.message);
      } else {
        console.log("Email sent fine");
        let msg =
          "Se envio con exito la musica seleccionada a los correos suscritos";
        res.redirect("/dashb/" + msg);

        //  res.status(200).jsonp(req.body);
      }
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });;
};

exports.sendEmailFans = function (req, res) {
  const { correo, promocionar_musica } = req.body;
  console.log(correo);
  console.log(promocionar_musica);
  const usuario = res.locals.user;
  
  console.log(usuario);
  const resetUrl = `http://${req.headers.host}/track/${promocionar_musica}`;

  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 465,
    secure: true,
    auth: {
      user: "backartist",
      pass: "MnU3MzQ1Zm5pMjQw",
    },
  });
  // Definimos el email
  var mailOptions = {
    from: "Backartist@backartist.com",
    to: correo,
    subject: "Música nueva en Backartis",
    text:
      "Tenemos una nueva musica para ti, encuentrala en el siguiente enlace " +
      resetUrl,
      html: `<html>
    <head>	
    </head>
    <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">
    <div style="width: 90%; margin-left: auto; margin-right: auto;">
      <div  style="font-weight: bold;display: inline-block; padding-top: .3125rem;padding-bottom: .3125rem; margin-right: 1rem;font-size: 1.25rem;   line-height: inherit;white-space: nowrap; "> 
        <img src="https://josea.mosquedacordova.com/assets/img/logo-ba.png" style="vertical-align: middle; border-style: none;" alt="..." width="70px" />Backartist
      </div>
			<div style="text-align: center"> 
				<label style="font-size: 1.8rem;font-weight: bold;color: darkgoldenrod;"><i class="fas fa-exclamation-circle"></i> Yeeeaahh!!<span>${usuario.userName}<span> tiene música nueva para ti</label><br>
			</div>	
			<div style="text-align: left"> 
				<p style="line-height: 1.5;">Haz click en el boton, para acceder a la nueva pista de <span>${usuario.userName}<span>; recuerda realizar todos los pasos, para obtener este nuevo éxito del momento!!</p>
			</div>	
			<div style="text-align: center"> 
				<a style="color: white;border: none; font-size: 1em; border-radius: 15px; padding: 0.5em 1.5em;text-decoration:none; background-color:#dc3545" href="${resetUrl}">Confirmar</a><br>
			</div>		
		</div>
	</body>
  
  </html>`
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      // let msg = "Error al enviar Mensaje";
      let msg = "Mensaje enviado*";
      res.redirect("/fans/" + msg);
      // res.send(500, err.message);
    } else {
      console.log("Email sent fine");
      let msg =
        "Se envio con exito la musica seleccionada a los correos indicados";
      res.redirect("/fans/" + msg);

      //  res.status(200).jsonp(req.body);
    }
  });
};

exports.sendEmailFans_admin = function (req, res) {
  var { correo, mensaje, img_url } = req.body;
  console.log(correo);
  console.log(mensaje);
  console.log(img_url);
  const usuario = res.locals.user;
  
  console.log(usuario);
if (img_url!="") {
  mensaje=`<img src="https://www.backartist.com/${img_url}"/><br>`
}
console.log(mensaje);
  // Definimos el transporter
  var transporter = nodemailer.createTransport({
     host: "mail.smtp2go.com",
     port: 465,
     secure: true,
     auth: {
       user: "backartist",
       pass: "MnU3MzQ1Zm5pMjQw",
     },
    // service: "Gmail",
    // auth: {
    //     user: "josearzolay287@gmail.com",
    //     pass: "lucblfrdktkkcnlh"
    // }
  });
  // Definimos el email
  var mailOptions = {
    from: "Backartist@backartist.com",
    to: correo,
    subject: "Backartis Suscripciones",
    text:mensaje,
      html: `<html>
    <head>	
    </head>
    <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">
    <div style="width: 90%; margin-left: auto; margin-right: auto;">
      <div  style="font-weight: bold;display: inline-block; padding-top: .3125rem;padding-bottom: .3125rem; margin-right: 1rem;font-size: 1.25rem;   line-height: inherit;white-space: nowrap; "> 
        <img src="https://josea.mosquedacordova.com/assets/img/logo-ba.png" style="vertical-align: middle; border-style: none;" alt="..." width="70px" />Backartist
      </div>	
			<div style="text-align: left"> 
				<p style="line-height: 1.5;">${mensaje}<span></p>
			</div>		
		</div>
	</body>
  
  </html>`
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      // let msg = "Error al enviar Mensaje";
      let msg = "Mensaje enviado*";
      res.redirect("/fans_admin/" + msg);
      // res.send(500, err.message);
    } else {
      console.log("Email sent fine");
      let msg =
        "Se envio con éxito el mensaje los correos indicados";
      res.redirect("/fans_admin/" + msg);

      //  res.status(200).jsonp(req.body);
    }
  });
};
exports.sendEmail_borra_cuenta = function (req, res) {
  const correo = req.user.email;
  const id_user = req.user.id;
  const resetUrl = `http://${req.headers.host}/borrar_user/${id_user}/ext`;

  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: "mail.smtp2go.com",
          port: 465,
          secure: true,
          auth: {
            user: "backartist",
            pass: "MnU3MzQ1Zm5pMjQw",
          },
  });
  console.log(correo)
  // Definimos el email
  var mailOptions = {
    from: "Support@backartist.com",
    to: correo,
    subject: "Borrar Cuenta",
    text:
      "Nos informaste que deseas borrar tu cuenta con nosotros, para confirmar haz click al siguiente enlace; recuerda que perderas TODA la informacion " +
      resetUrl,
    html: `<html>
    <head>	
    </head>
    <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">
     <div style="width: 90%; margin-left: auto; margin-right: auto;">
       <div  style="font-weight: bold;display: inline-block; padding-top: .3125rem;padding-bottom: .3125rem; margin-right: 1rem;font-size: 1.25rem;   line-height: inherit;white-space: nowrap; "> 
         <img src="https://josea.mosquedacordova.com/assets/img/logo-ba.png" style="vertical-align: middle; border-style: none;" alt="..." width="70px" />Backartist
       </div>
        <div style="text-align: center"> 
          <label style="font-size: 1.8rem;font-weight: bold;color: darkgoldenrod;"><i class="fas fa-exclamation-circle"></i> Hola!!</label><br>
        </div>	
        <div style="text-align: left"> 
          <p style="line-height: 1.5;">Nos informaste que deseas borrar tu cuenta con nosotros, para confirmar haz click en <span>confirmar<span>; recuerda que perderas <strong>TODA</strong> la informacion !!</p>
        </div>	
        <div style="text-align: center"> 
          <a style="color: white;border: none; font-size: 1em; border-radius: 15px; padding: 0.5em 1.5em;text-decoration:none; background-color:#dc3545" href="${resetUrl}">Confirmar</a><br>
        </div>		
      </div>
    </body>
  
  </html>`
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      // let msg = "Error al enviar Mensaje";
      let msg = "Mensaje enviado*";
      res.redirect("/dashb/" + msg);
      // res.send(500, err.message);
    } else {
      console.log("Email sent fine borrar cuenta");
      let msg =
        "Se envio un correo con el enlace para confirmar la eliminacion de tu cuenta";
      res.redirect("/dashb/" + msg);

      //  res.status(200).jsonp(req.body);
    }
  });
};

exports.sendEmail_get_retiro = function (req, res) {
  const user_name = req.user.userName;
  const nombre = req.user.name + " " + req.user.lastName;
  const correo = req.user.email;
  const id_user = req.user.id;
  var ref_num = req.params.ref_num;
  var monto = req.params.monto;
  var status = req.params.status;
  //const resetUrl = `http://${req.headers.host}/borrar_user/${id_user}/ext`;
  let mails = [correo, "jkey_09@hotmail.com"];
  Modulo_BD.obtenerBackcoinDataPay(id_user).then((respuesta) => {
    let parsed = JSON.parse(respuesta)[0];
    Modulo_BD.obtenerRetirosbyID(ref_num).then((response) => {
      let parsed_r = JSON.parse(response)[0];
      let observacion = parsed_r.observacion;
      console.log(observacion)
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
      host: "mail.smtp2go.com",
      port: 465,
      secure: true,
      auth: {
        user: "backartist",
        pass: "MnU3MzQ1Zm5pMjQw",
      },
    });
    // Definimos el email
    var mailOptions = {
      from: "Backartist@backartist.com",
      to: mails,
      subject: "Solicitud de retiro",
      text:
        nombre +
        " nos informó que desea retirar: $" +
        monto +
        " de su billetera Backcoin, quedando actualmente en estado: " +
        status +
        " y referendcia numero: " +
        ref_num +
        ". \n Dicho monto será acreditado a la cuenta: " +
        parsed.cuenta +
        " del banco: " +
        parsed.banco +
        " a nombre de: " +
        parsed.nombre_apellido +
        " documento de identidad: " +
        parsed.tipo_documento +
        " " +
        parsed.n_documento,
     html: `<html>
     <head>
     
     </head>
     <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">
     <div style="width: 90%; margin-left: auto; margin-right: auto;">
       <div  style="font-weight: bold;display: inline-block; padding-top: .3125rem;padding-bottom: .3125rem; margin-right: 1rem;font-size: 1.25rem;   line-height: inherit;white-space: nowrap; "> 
         <img src="https://josea.mosquedacordova.com/assets/img/logo-ba.png" style="vertical-align: middle; border-style: none;" alt="..." width="70px" />Backartist
       </div>
       <div style="text-align: center"> 
         <label style="font-size: 1.8rem;font-weight: bold;color: darkgoldenrod;"><i class="fas fa-exclamation-circle"></i> ${nombre}</label><br>
         <h1>Solicitud de Retiro de Backcoins!!</h1>
       </div>			
   <table style="border-collapse: collapse;width: 100%;max-width: 100%;margin-bottom: 1rem; background-color: transparent;">
   <thead >
     <tr>
       <th scope="col" style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom; border-bottom: 2px solid #dee2e6;padding: .75rem;
     vertical-align: top; border-top: 1px solid #dee2e6;">Monto</th>
       <th scope="col"  style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom;border-bottom: 2px solid #dee2e6;padding: .75rem;
     vertical-align: top; border-top: 1px solid #dee2e6;">Status</th>
	 <th scope="col"  style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom;border-bottom: 2px solid #dee2e6;padding: .75rem;
     vertical-align: top; border-top: 1px solid #dee2e6;">Observación</th>
       <th scope="col" style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom;border-bottom: 2px solid #dee2e6;padding: .75rem;
     vertical-align: top; border-top: 1px solid #dee2e6;">Referencia</th>
       <th scope="col" style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom; border-bottom: 2px solid #dee2e6;padding: .75rem;
     vertical-align: top; border-top: 1px solid #dee2e6;">A  cuenta</th>
	 <th scope="col" style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom; border-bottom: 2px solid #dee2e6;padding: .75rem;
     vertical-align: top; border-top: 1px solid #dee2e6;">Banco</th>
	  <th scope="col" style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom; border-bottom: 2px solid #dee2e6;padding: .75rem;
     vertical-align: top; border-top: 1px solid #dee2e6;">A nombre de</th>
	 <th scope="col" style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom; border-bottom: 2px solid #dee2e6;padding: .75rem;
     vertical-align: top; border-top: 1px solid #dee2e6;">Documento</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <th scope="row" style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6;">$ ${monto}</th>
       <td style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;">${status}</td>
	   <td style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;">${observacion}</td>
       <td style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;">${ref_num}</td>
       <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;">${parsed.cuenta}</td>
	   <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;">${parsed.banco}</td>
	   <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;">${ parsed.nombre_apellido}</td>
	   <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;">${parsed.tipo_documento} ${parsed.n_documento}</td>
     </tr>
     <tr class="subtotal">
       <th  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" scope="row"></th>
	   <th  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" scope="row"></th>
	   <th  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" scope="row"></th>
	  <th  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" scope="row"></th>
	  <th  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" scope="row"></th>
       <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" colspan="2"  style="text-align: right;">Subtotal:</td>
       <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" class="cell_center">$ ${monto}</td>
     </tr>
     <tr class="total">
       <th  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6;" scope="row"></th>
	   <th  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" scope="row"></th>
	  <th  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" scope="row"></th>
	  <th  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" scope="row"></th>
	  <th  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" scope="row"></th>
       <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6;" colspan="2"  style="text-align: right;">Total</td>
       <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6;color: darkgoldenrod; font-weight: bold;font-size: 1.2em;text-align: center;">$ ${monto}</td>
     </tr>
   </tbody>
 </table>
 </div>
   </body>
   
   </html>`
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        // let msg = "Error al enviar Mensaje";
        let msg = "Mensaje enviado*";
        res.redirect("/dashb/" + msg);
        // res.send(500, err.message);
      } else {
        console.log("Email sent fine");
        let msg = "Se envio un correo con los detalles de su retiro";
        res.redirect("/dashb/" + msg);

        //  res.status(200).jsonp(req.body);
      }
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/?msg=" + msg);
});
};

exports.actualizo_membresia = function (req, res) {
  const user_name = req.user.userName;
  const nombre = req.user.name + " " + req.user.lastName;
  const correo = req.user.email;
  const id_user = req.user.id;
  var producto = req.params.producto;
  var monto = req.params.monto;
  var modo = req.params.modo;
  var fech = moment().format('DD/MM/YYYY')
  var contenido = `<html>
  <head>
  
  </head>
  <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">
  <div style="width: 100%;margin-left: auto;margin-right: auto;padding: 25px;">
    

    <div>
    <div  style="font-weight: bold;display: inline-flex; padding-top: .3125rem;padding-bottom: .3125rem; margin-right: 1rem;font-size: 3rem;   line-height: inherit;white-space: nowrap;align-items: center; "> 
      <img src="https://josea.mosquedacordova.com/assets/img/logo-ba.png" style="vertical-align: middle; border-style: none;width: 9rem;" alt="..." />
      <div>
          Backartist
      </div>
    </div>
      <div style="top: -100px;position: relative;left: 450px;width: 30%;border: solid 1px;margin: 0;padding: 1rem;border-radius: 15px;">
          Fecha: ${fech}
      </div>
    </div>
    <h3>INFORMACIÓN DEL CLIENTE</h3>
    <div style="border: solid 1px;border-radius: 15px;padding: 1rem;width: 90%;">
        
<div style="margin-bottom: 10px;">Nombre: <span>${nombre}</span></div>
<div style="margin-bottom: 10px;">Usuario: <span>${user_name}</span></div>
<div>Correo: <span>${correo}</span></div>
    </div>
    <div style="text-align: center; margin-top: 20px;"> 
      <!-- <label style="font-size: 1.8rem;font-weight: bold;color: darkgoldenrod;"><i class="fas fa-exclamation-circle"></i> Gracias!!</label><br> -->
      <h1>Su membresia a sido renovada!!</h1>
    </div>			
<table style="border-collapse: collapse;width: 88%;max-width: 100%;margin-bottom: 1rem;background-color: transparent;">
<thead >
  <tr>
    <th scope="col" style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom; border-bottom: 2px solid #dee2e6;padding: .75rem;
  vertical-align: top; border-top: 1px solid #dee2e6;">Producto</th>
    <th scope="col"  style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom;border-bottom: 2px solid #dee2e6;padding: .75rem;
  vertical-align: top; border-top: 1px solid #dee2e6;">Cantidad</th>
    <th scope="col" style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom;border-bottom: 2px solid #dee2e6;padding: .75rem;
  vertical-align: top; border-top: 1px solid #dee2e6;">Duracion</th>
    <th scope="col" style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom; border-bottom: 2px solid #dee2e6;padding: .75rem;
  vertical-align: top; border-top: 1px solid #dee2e6;">Costo</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th scope="row" style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6;">${producto}</th>
    <td style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;">1</td>
    <td style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;">${modo}</td>
    <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;">$ ${monto}</td>
  </tr>
  <tr class="subtotal">
    <th  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" scope="row"></th>
    <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" colspan="2"  style="text-align: right;">Subtotal:</td>
    <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" class="cell_center">$ ${monto}</td>
  </tr>
  <tr class="total">
    <th  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6;" scope="row"></th>
    <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6;" colspan="2"  style="text-align: right;">Total</td>
    <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6;color: darkgoldenrod; font-weight: bold;font-size: 1.2em;text-align: center;">$ ${monto}</td>
  </tr>
</tbody>
</table>
<div style="text-align: center; margin-top: 20px;"> 
      <label style="font-size: 1.8rem;font-weight: bold;color: darkgoldenrod;"><i class="fas fa-exclamation-circle"></i> Gracias!!</label><br> 
    </div>
</div>
</body>

</html>
`;

let fechaaa=Number(moment())
pdf.create(contenido).toFile(`./sa${fechaaa}.pdf`, function(err, rest) {
    if (err){
        console.log(err);
    } else {
        console.log(rest);
    }
});
console.log(correo)
  //const resetUrl = `http://${req.headers.host}/borrar_user/${id_user}/ext`;
  Modulo_BD.obtenerGatesbyUser(id_user).then((respuesta) => {
    let parsed = JSON.parse(respuesta)[0];
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
      host: "mail.smtp2go.com",
      port: 465,
      secure: true,
      auth: {
        user: "backartist",
        pass: "MnU3MzQ1Zm5pMjQw",
      },
    });
    // Definimos el email
    var mailOptions = {
      from: "Backartist@backartist.com",
      to: correo,
      subject: "Actualización de membresia",
      text:"Solicitud de retiro",
     html: `<html>
     <head>
     
     </head>
     <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">
     <div style="width: 90%; margin-left: auto; margin-right: auto;">
       <div  style="font-weight: bold;display: inline-block; padding-top: .3125rem;padding-bottom: .3125rem; margin-right: 1rem;font-size: 1.25rem;   line-height: inherit;white-space: nowrap; "> 
         <img src="https://josea.mosquedacordova.com/assets/img/logo-ba.png" style="vertical-align: middle; border-style: none;" alt="..." width="70px" />Backartist
       </div>
       <div style="text-align: center"> 
         <label style="font-size: 1.8rem;font-weight: bold;color: darkgoldenrod;"><i class="fas fa-exclamation-circle"></i> Gracias!!</label><br>
         <h1>Su membresia a sido renovada!!</h1>
       </div>			
   <table style="border-collapse: collapse;width: 100%;max-width: 100%;margin-bottom: 1rem; background-color: transparent;">
   <thead >
     <tr>
       <th scope="col" style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom; border-bottom: 2px solid #dee2e6;padding: .75rem;
     vertical-align: top; border-top: 1px solid #dee2e6;">Producto</th>
       <th scope="col"  style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom;border-bottom: 2px solid #dee2e6;padding: .75rem;
     vertical-align: top; border-top: 1px solid #dee2e6;">Cantidad</th>
       <th scope="col" style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom;border-bottom: 2px solid #dee2e6;padding: .75rem;
     vertical-align: top; border-top: 1px solid #dee2e6;">Duracion</th>
       <th scope="col" style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom; border-bottom: 2px solid #dee2e6;padding: .75rem;
     vertical-align: top; border-top: 1px solid #dee2e6;">Costo</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <th scope="row" style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6;">${producto}</th>
       <td style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;">1</td>
       <td style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;">${modo}</td>
       <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;">$ ${monto}</td>
     </tr>
     <tr class="subtotal">
       <th  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" scope="row"></th>
       <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" colspan="2"  style="text-align: right;">Subtotal:</td>
       <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" class="cell_center">$ ${monto}</td>
     </tr>
     <tr class="total">
       <th  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6;" scope="row"></th>
       <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6;" colspan="2"  style="text-align: right;">Total</td>
       <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6;color: darkgoldenrod; font-weight: bold;font-size: 1.2em;text-align: center;">$ ${monto}</td>
     </tr>
   </tbody>
 </table>
 </div>
   </body>
   
   </html>`,
   attachments: [  
    {  filename: 'salida.pdf',
    path: './salida.pdf'

                 }   
    ]   
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        // let msg = "Error al enviar Mensaje";
        let msg = "Mensaje enviado*";
        res.redirect("/dashb/" + msg);
        // res.send(500, err.message);
      } else {
        console.log("Email sent fine");
        let msg = "Se envio un correo con los detalles de su retiro";
        res.redirect("/dashb/" + msg);

        //  res.status(200).jsonp(req.body);
      }
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/?msg=" + msg);
  });
};

exports.bienvenidaMail = async function (req, res) {
  //const {email} = req.body;
  //var token = req.params.mail;
  var mail = req.params.mail;
  var token = req.params.token;
  const resetUrl = `https://${req.headers.host}/login/${token}`;

  const usuario = await Usuarios.findOne({ where: { email: mail } });
  console.log(usuario.name)
  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 465,
    secure: true,
    auth: {
      user: "backartist",
      pass: "MnU3MzQ1Zm5pMjQw",
    },
  });
  // Definimos el email
  var mailOptions = {
    from: "Backartist@backartist.com",
    to: mail,
    subject: "Bienvenido a Backartist",
    text: "Bienvenido a backartist " + resetUrl,
    html: `<html>
    <head>	
    </head>
    <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">
    <div style="width: 90%; margin-left: auto; margin-right: auto;">
      <div  style="font-weight: bold;display: inline-block; padding-top: .3125rem;padding-bottom: .3125rem; margin-right: 1rem;font-size: 1.25rem;   line-height: inherit;white-space: nowrap; "> 
        <img src="https://josea.mosquedacordova.com/assets/img/logo-ba.png" style="vertical-align: middle; border-style: none;" alt="..." width="70px" />Backartist
      </div>
			<div style="text-align: center"> 
				<label style="font-size: 1.8rem;font-weight: bold;color: darkgoldenrod;"><i class="fas fa-exclamation-circle"></i> Hola <span>${usuario.name}<span> </label><br>
			</div>	
			<div style="text-align: left"> 
				<p style="line-height: 1.5;">Bienvenido a la familia backartist.!</p>
				<p style="line-height: 1.5;">Para finalizar tu registro, haz click en el siguiente botón, inicia tu sesión y comienza a compartir tus gates.
 </p>
			</div>	
			<div style="text-align: center"> 
				<a style="color: white;border: none; font-size: 1em; border-radius: 15px; padding: 0.5em 1.5em;text-decoration:none; background-color:#dc3545" href="${resetUrl}">Validar Registro</a><br>
			</div>		
		</div>
	</body>
  
  </html>`
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      // let msg = "Error al enviar Mensaje";
      let msg = "Mensaje enviado*";
      res.redirect("/?msg=" + msg);
      // res.send(500, err.message);
    } else {
      console.log("Email sent fine");
      let msg =
        "Se envio un email, para validar y confirmar su cuenta";
      res.redirect("/?msg=" + msg);

      //  res.status(200).jsonp(req.body);
    }
  });
};

exports.support = function (req, res) {
  //const {email} = req.body;
  var email = req.params.email;
  var nombre = req.params.nombre;
var descripcion = req.params.descripcion;
  var telefono = req.params.telefono;
  
  //const resetUrl = `http://${req.headers.host}/search-account/${token}`;

  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 465,
    secure: true,
    auth: {
      user: "backartist",
      pass: "MnU3MzQ1Zm5pMjQw",
    },
  });
  // Definimos el email
  var correos=[email, "backartist@backartist.com"]
  var mailOptions = {
    from: "Support@backartist.com",
    to: correos,
    subject: "Solicitud de ayuda",
    text: "Alguien a solicitado ayuda ",
    html: `<html>
    <head>	
    </head>
    <body style="font-family: 'Poppins', sans-serif; font-size: 1.4em;">
    <div style="width: 90%; margin-left: auto; margin-right: auto;">
      <div  style="font-weight: bold;display: inline-block; padding-top: .3125rem;padding-bottom: .3125rem; margin-right: 1rem;font-size: 1.25rem;   line-height: inherit;white-space: nowrap; "> 
        <img src="https://josea.mosquedacordova.com/assets/img/logo-ba.png" style="vertical-align: middle; border-style: none;" alt="..." width="70px" />Backartist
      </div>
      <div style="text-align: center"> 
      <label style="font-size: 1.8rem;font-weight: bold;color: darkgoldenrod;"><i class="fas fa-exclamation-circle"></i> Hola</label><br>
    </div>	
    <div style="text-align: left"> 
      <p style="line-height: 1.5;">Recibimos una solicitud ayuda o soporte, de ${nombre}!</p>
      <p style="line-height: 1.5;">Correo del solicitante: ${email}.</p>
      <p style="line-height: 1.5;">Teléfono del solicitante: ${telefono}.</p>
      <p style="line-height: 1.5;">Descripción: ${descripcion}.</p>
    </div>					
		</div>
	</body>
  
  </html>`
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      // let msg = "Error al enviar Mensaje";
      let msg = "Mensaje enviado*";
      res.redirect("/?msg=" + msg);
      // res.send(500, err.message);
    } else {
      console.log("Email sent fine");
      let msg =
        "Su solicitud de ayuda o soporte se envio con éxito, espere pronto nuestra respuesta";
      res.redirect("/?msg=" + msg);

      //  res.status(200).jsonp(req.body);
    }
  });
};

