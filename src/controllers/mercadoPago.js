// SDK de Mercado Pago
const mercadopago = require ('mercadopago');
const BD_conect = require('../models/modulos_');

exports.pasarela = async (req, res, next) => {
  const {amount, product } = req.body;
  const userId = res.locals.user.id;
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
  external_reference:userId+"/"+product+"/"+amount,
  // ...
  
};

mercadopago.preferences.create(preference)
.then(function(response){
// Este valor reemplazará el string "<%= global.id %>" en tu HTML
//global.id = response.body.id;

var global = response.body.id;
//console.log(response)
res.render('pasarela_de_pago', {
  pageName: "Pasarela",
  global,
  amount,
  product,
  dashboardPage: true,
});
  
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
        BD_conect.actualizarUserMembership(userid,producto).then(()=>{
          req.user.membership=producto;
          BD_conect.guardarPago(userid,status,numero_referencia,monto,producto,'MercadoPago').then(()=>{
            //req.user.membership=producto;
      
            
            res.render('complete_pay', {errores,product,dashboardPage:true});
         })
    //      res.render('complete_pay', {errores,product,dashboardPage:true});
       })
      }else{
        errores = true;
        res.render('complete_pay', {errores,product,dashboardPage:true});
      }


}