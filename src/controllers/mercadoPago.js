// SDK de Mercado Pago
const mercadopago = require ('mercadopago');
const BD_conect = require('../models/modulos_');
var request = require('request');
var CLIENT_ID = 'AQEp93PNKe5pQUGK4bMiah30CZzi_9YYP5pw1LqnWELnymhFyIvEQgjYT782ChQrqmSy8tUb81WNMcBF';
var SECRET = 'EB5Wbz_NTICPraelJFn-5rK1T0tbp87DTmF8TvaQRjL3xckJyYIU4aC_Xbj41KqosgbKk5M4YIjuk__W';
var PAYPAL_API = 'https://api-m.sandbox.paypal.com';

exports.pasarela = async (req, res, next) => {
  var archivo = false
  var id_gate = false
  var amount = false
  var product = false
  var backstore_sell = false
  var correo = false
if (req.params.archivo) {
  archivo = req.params.archivo
  id_gate = req.params.id_gate
  amount = req.params.costo
  product = req.params.tipo
  correo = req.params.correo
  var userId =  req.params.user_id
  backstore_sell = true
  console.log(product)

}else{
  //const {amount, product } = req.body;
  amount = req.body.amount
  product = req.body.product
  var userId = res.locals.user.id;

}

  
// Agrega credenciales
mercadopago.configure({
  access_token: 'TEST-7704156678097466-010904-a33b280de26eb4d1e747cf84848e3706-696588363'
});
console.log(parseFloat(amount))
// Crea un objeto de preferencia
var payer = {
  name: "Charles",
  surname: "Luevano",
  email: "charles@hotmail.com",
  date_created: "2015-06-02T12:58:41.425-04:00",
 
  identification: {
    type: "DNI",
    number: "12345678"
  },
}
let preference = {
  items: [
    {
      id: userId,
      title: product,
      unit_price: parseFloat(amount),
      quantity: 1,
      //currency_id: 'USD',
    }
  ],
   // ...
  back_urls: {
     "success": "localhost:3000/visa/respuesta/success",
     "failure": "localhost:3000/visa/respuesta/failure",
     "pending": "localhost:3000/visa/respuesta/pending"
  //auto_return: "approved",
  },
  external_reference: userId+"/"+product+"/"+amount,
  // ...
  
};


mercadopago.preferences.create(preference)
.then(function(response){
// Este valor reemplazará el string "<%= global.id %>" en tu HTML
//global.id = response.body.id;
request.post(PAYPAL_API + '/v1/oauth2/token',
    {
		headers: {
			"Accept": "application/json",
			"Accept-Language": "en_US",
			"content-type": "application/x-www-form-urlencoded"
		},
		auth: {
		'user': CLIENT_ID,
		'pass': SECRET,
		// 'sendImmediately': false
	  },
	  form: {
		"grant_type": "client_credentials"
	  }
    }, function(err, response)
    {
      if (err)
      {
        console.error(err);
        return res.sendStatus(500);
      }
	  let parsed1 = JSON.parse(response.body)
	 //console.log(parsed1.access_token)
	  const access_token = parsed1.access_token;
	  request.post(PAYPAL_API + '/v1/identity/generate-token',
    {
		headers: {
			"Accept": "application/json",
			"Accept-Language": "en_US",
			"Authorization": "Bearer "+ access_token,
		},
		
    }, function(err, response2)
    {
      if (err)
      {
        console.error(err);
        return res.sendStatus(500);
      }
	  let parsed2 = JSON.parse(response2.body)
	 console.log(userId)
	  const clien_token = parsed2.client_token;
    var Backcoin = false

	  if (product  == "Backcoin") {
      Backcoin = true
    }
    if (product  == "backstore") {
      res.render('pasarela_de_pago', {
        pageName: 'Pasarela',
        dashboardPage: true,
        layout: false,
        recargar_backcoin: true,
        clien_token,
        access_token,
        CLIENT_ID,
        global,
      amount, 
      product, 
      archivo,
      id_gate,  
      Backcoin,
      correo,
      backstore_sell,userId
        //user
      });
    }else{

      res.render('pasarela_de_pago', {
		pageName: 'Pasarela',
	  dashboardPage: true,
		recargar_backcoin: true,
		clien_token,
		access_token,
		CLIENT_ID,
    global,
  amount, 
  product, 
  archivo,
  id_gate,  
  Backcoin,
  backstore_sell,userId
		//user
	});
    }
	  


    });
    });
var global = response.body.id;
//console.log(response)
/*res.render('pasarela_de_pago', {
  pageName: "Pasarela",
  global,
  amount,
  product,
  dashboardPage: true,
});*/
  
}).catch(function(error){
  console.log(error);
});
}

exports.pagar = async (req, res, next) => {

     

      var aux = req.query.external_reference.split("/");
      let userid = aux[0];
      let producto = aux[1];
      let monto = aux[2];
      let status = req.query.status
      console.log(req.query);
      let product = false;
      let errores = false;
      if (status === "approved") {
        product = true
        var numero_referencia = req.query.payment_id

        if (producto == 'Backcoin' || product == "backstore") {
          BD_conect.recargaBackcoin(userid,monto).then((res)=>{
            console.log(res);
            //req.user.backcoins=res;
            if (product == "backstore") {
            
            }else{
            req.user.backcoins=res;
            console.log(req.user.backcoins);
            }
         })
          BD_conect.guardarPago(userid,status,numero_referencia,monto,producto,'MercadoPago').then(()=>{

                res.render('complete_pay', {errores,product,dashboardPage:true});            
            
         })

        }else{
          BD_conect.actualizarUserMembership(userid,producto).then(()=>{
            req.user.membership=producto;
            BD_conect.guardarPago(userid,status,numero_referencia,monto,producto,'MercadoPago').then(()=>{
             
              
              res.render('complete_pay', {errores,product,dashboardPage:true});
           })
      //      res.render('complete_pay', {errores,product,dashboardPage:true});
         })

        }

      }else{
        errores = true;
        res.render('complete_pay', {errores,product,dashboardPage:true});
      }


}