var express = require('express');
var request = require('request');
const BD_conect = require('../models/modulos_');
// Add your credentials:
// Add your client ID and secret
var CLIENT =
  'AUJoKVGO3q1WA1tGgAKRdY6qx0qQNIQ6vl6D3k7y64T4qh5WozIQ7V3dl3iusw5BwXYg_T5FzLCRguP8';
var SECRET =
  'EOw8LNwDhM7esrQ3nHfzKc7xiWnJc83Eawln4YLfUgivfx1LGzu9Mj0F5wlarilXDqdK9Q5aHVo-VGjJ';
var PAYPAL_API = 'https://api-m.sandbox.paypal.com';
express()
  // Set up the payment:
  // 1. Set up a URL to handle requests from the PayPal button
  exports.crearpago = async (req, res, next) => {
    const {amount, product, userId} = req.body;
   // console.log(product)
    // 2. Call /v1/payments/payment to set up the payment
    request.post(PAYPAL_API + '/v1/payments/payment',
    {
      auth:
      {
        user: CLIENT,
        pass: SECRET
      },
      body:
      {
        intent: 'sale',
        payer:
        {
          payment_method: 'paypal'
        },
        transactions: [
        {
          amount:
          {
            total: parseFloat(amount),
            currency: 'USD'
          }
        }],
        redirect_urls:
        {
          return_url: 'https://example.com',
          cancel_url: 'https://example.com'
        }
      },
      json: true
    }, function(err, response)
    {
      if (err)
      {
        console.error(err);
        return res.sendStatus(500);
      }
      // 3. Return the payment ID to the client
      res.json(
      {
        id: response.body.id
      });
    });
  }
  // Execute the payment:
  // 1. Set up a URL to handle requests from the PayPal button.
  exports.procesar = async (req, res, next) => {
    const {amount, product} = req.body;
    const userId = res.locals.user.id;
    console.log(userId)
    // 2. Get the payment ID and the payer ID from the request body.
    var paymentID = req.body.paymentID;
    var payerID = req.body.payerID;
    // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
    request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID +
      '/execute',
      {
        auth:
        {
          user: CLIENT,
          pass: SECRET
        },
        body:
        {
          payer_id: payerID,
          transactions: [
          {
            amount:
            {
              total: parseFloat(amount),
              currency: 'USD'
            }
          }]
        },
        json: true
      },
      function(err, response)
      {
        if (err)
        {
          console.error(err);
          return res.sendStatus(500);
        }
        // 4. Return a success response to the client
        res.json(
        {
          status: 'success'
        });
        console.log(amount);
        let status = response.body.state;
        let numero_referencia = response.body.id;
        BD_conect.actualizarUserMembership(userId,product).then(()=>{
          res.locals.user.membership=product;
          //res.render('complete_pay', {product, dashboardPage:true});
         BD_conect.guardarPago(userId,status,numero_referencia,amount,product, 'Paypal').then(()=>{
            //req.user.membership=producto;
      
            
            res.render('complete_pay', {product, dashboardPage:true});
        })
        })
        //console.log(response)
      });
  }
// Run `node ./server.js` in your terminal