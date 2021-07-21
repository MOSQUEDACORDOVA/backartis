const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const dashboardController = require('../controllers/dashboardController');
const gatesController = require('../controllers/gatesController');
const landingController = require('../controllers/landingController');
const walletController = require('../controllers/walletController');
const adminDash = require('../controllers/adminDash');
const passport = require('passport');
const FileController = require('../models/upload');
const fileController = new FileController();
const {Niubiz} = require('@curiosity/niubiz');
const EmailCtrl = require('../controllers/mailCtrl');
const visa = new Niubiz({
  user: 'integraciones@niubiz.com.pe',
  password: '_7z3@8fF',
  merchantId: '456879853',
  env: 'dev',
});
const mercadopago = require('../controllers/mercadoPago');
const paypal = require('../controllers/paypal');



// Landing Page
router.get('/', landingController.showLandingPage);
router.get('/ranking', landingController.showRank);
router.get('/ranking/:id/:id_gate/:id_usuario/:correo/:modo', landingController.showRankDown);
// Landing Page


//router.get('//:msg', landingController.showLandingPage);

// Iniciar sesión
router.get('/login', userController.formLogin);
router.get('/login/:product/:monto/:modo', userController.formLoginBack);
router.post('/login', userController.loginUser);
router.post('/login_back', userController.loginUserBack);

// Cerrar Sesión
router.get('/close-session', userController.closeSesion);

// Crear cuenta
router.get('/register', userController.formCreateUser);
router.post('/register', userController.createUser);


//email route
router.post('/subscribe', EmailCtrl.sendEmail);
router.get('/sendMail/:token/:mail', EmailCtrl.sendEmailResetPass);
router.get('/sendMail/:gate_link/:id_user/:msg', EmailCtrl.sendEmailFansPromotion);
router.get('/borra_cuenta/:id_user', EmailCtrl.sendEmail_borra_cuenta);
router.get('/send_retirar_fondos/:ref_num/:monto/:status', EmailCtrl.sendEmail_get_retiro);


// Buscar cuenrta
router.get('/search-account', userController.formSearchAccount);
router.post('/search-account', userController.sendToken);
router.get('/search-account/:token', userController.resetPasswordForm);
router.post('/search-account/:token', userController.updatePassword);

// Dashboard
router.get('/dashboard', authController.authenticatedUser, gatesController.getGates);
router.get('/dashb/', gatesController.getGates);
router.get('/dashb/:msg', authController.authenticatedUser, gatesController.getGates);
router.get('/dashboard/:gates', authController.authenticatedUser, gatesController.getGates);
router.get('/dashboard/:gates/:productUdpt', authController.authenticatedUser, gatesController.getGates);
router.post('/dashboard', authController.authenticatedUser, gatesController.createGate);
router.get('/borrar/:id_', authController.authenticatedUser,gatesController.deleteGate);
router.get('/editar_/:id', authController.authenticatedUser,gatesController.formEditFileGate);
router.post('/guardar_gate_edit', authController.authenticatedUser, gatesController.updateGate);
router.get('/mix', authController.authenticatedUser,dashboardController.mixcloud);


// Dashboard Admin
router.get('/admin_dash', authController.authenticatedUser, adminDash.dashboard);
router.get('/planes', authController.authenticatedUser, adminDash.planes);
router.get('/admin_dash/:msg', authController.authenticatedUser, adminDash.dashboard);
router.get('/planes/:msg', authController.authenticatedUser, adminDash.planes);

router.get('/borrar_user/:id', authController.authenticatedUser, adminDash.deleteUser);
router.get('/borrar_user/:id/:ext', adminDash.deleteUser);
router.get('/editar_user/:id', authController.authenticatedUser, adminDash.updateProfile);
router.post('/actualizar_usuario', authController.authenticatedUser, adminDash.UpdateUser);
router.get('/agregar_plan', authController.authenticatedUser, adminDash.addplanes);
router.post('/guardar_plan', authController.authenticatedUser, adminDash.savePlan);
router.get('/borrar_plan/:id', authController.authenticatedUser, adminDash.deletePlan);
router.get('/editar_plan/:id', authController.authenticatedUser, adminDash.editPlan);
router.post('/guardar_edit_plan', authController.authenticatedUser, adminDash.savePlanEdited);

router.get('/aboutus', authController.authenticatedUser, adminDash.aboutUs);
router.get('/aboutus/:msg', authController.authenticatedUser, adminDash.aboutUs);
router.get('/aboutus_create', authController.authenticatedUser, adminDash.addAboutUs);
router.post('/save_aboutus', authController.authenticatedUser, adminDash.save_aboutus);
router.get('/edit_aboutus/:id', authController.authenticatedUser, adminDash.editabout);
router.post('/save_edit_aboutus', authController.authenticatedUser, adminDash.saveaboutEdited);
router.get('/borrar_about/:id', authController.authenticatedUser, adminDash.deleteAbout);


router.get('/banner', authController.authenticatedUser, adminDash.bannersGet);
router.get('/banner/:msg', authController.authenticatedUser, adminDash.bannersGet);
router.get('/banner_create', authController.authenticatedUser, adminDash.addBanner);
router.post('/banner_save', authController.authenticatedUser, adminDash.save_banner);
router.get('/edit_banner/:id', authController.authenticatedUser, adminDash.editBanner);
router.post('/save_edit_banner', authController.authenticatedUser, adminDash.sEditedBanner);
router.get('/borrar_banner/:id', authController.authenticatedUser, adminDash.deleteBanner);


router.get('/notificaciones', authController.authenticatedUser, adminDash.notificacionesGet);
router.get('/notificaciones/:msg', authController.authenticatedUser, adminDash.notificacionesGet);
router.get('/notificaciones_create', authController.authenticatedUser, adminDash.addnotificaciones);
router.post('/notificaciones_save', authController.authenticatedUser, adminDash.save_notificaciones);
router.get('/edit_notificaciones/:id', authController.authenticatedUser, adminDash.editNotificaciones);
router.post('/save_edit_notificaciones', authController.authenticatedUser, adminDash.save_notificaciones);
router.get('/borrar_notificaciones/:id', authController.authenticatedUser, adminDash.deletenotificaciones);


router.get('/tipo_cambio', authController.authenticatedUser, adminDash.tipo_cambio);
router.get('/tipo_cambio/:msg', authController.authenticatedUser, adminDash.tipo_cambio);
router.get('/tipo_cambio_create', authController.authenticatedUser, adminDash.tipo_cambio_add);
router.post('/tipo_cambio_save', authController.authenticatedUser, adminDash.tipo_cambio_save);
router.get('/edit_tipo_cambio/:id', authController.authenticatedUser, adminDash.tipo_cambio_edit);
router.post('/save_edit_tipo_cambio', authController.authenticatedUser, adminDash.tipo_cambio_save);
router.get('/borrar_tipo_cambio/:id', authController.authenticatedUser, adminDash.tipo_cambio_delete);


router.get('/terminos_ayuda', authController.authenticatedUser, adminDash.terminos_ayuda);
router.get('/terminos_ayuda/:msg', authController.authenticatedUser, adminDash.terminos_ayuda);
router.get('/terminos_ayuda_create', authController.authenticatedUser, adminDash.terminos_ayuda_add);
router.post('/ayudas_save', authController.authenticatedUser, adminDash.terminos_ayuda_save);
router.get('/edit_ayuda/:id', authController.authenticatedUser, adminDash.terminos_ayuda_edit);
router.get('/borrar_ayuda/:id', authController.authenticatedUser, adminDash.terminos_ayuda_delete);


router.get('/retiros', authController.authenticatedUser, adminDash.retiros);
router.get('/retiros/:msg', authController.authenticatedUser, adminDash.retiros);
router.get('/edit_retiros/:id', authController.authenticatedUser, adminDash.retiros_edit);
router.post('/retiros_save', authController.authenticatedUser, adminDash.retiros_save);



router.get('/ventas', authController.authenticatedUser, adminDash.getPagos);


//CUPONES
router.get('/cupones', authController.authenticatedUser, adminDash.getCupones);
router.get('/cupones/:msg', authController.authenticatedUser, adminDash.getCupones);
router.get('/cupones_create', authController.authenticatedUser, adminDash.addCupon);
router.post('/save_cupon', authController.authenticatedUser, adminDash.save_cupon);
router.get('/borrar_cupon/:id', authController.authenticatedUser, adminDash.deleteCupon);
router.post('/save_cupon_edited', authController.authenticatedUser, adminDash.saveCuponEdited);
router.get('/edit_cupon/:id', authController.authenticatedUser, adminDash.editCupon);
router.get('/cupones_usados/:id/:username', authController.authenticatedUser, adminDash.verCupones);





// Compartir música
router.get('/share-music', authController.authenticatedUser, dashboardController.shareMusic);

// Cambiar membresía
router.get('/membership', authController.authenticatedUser, dashboardController.changeMembership);
router.get('/membership/:msg', authController.authenticatedUser, dashboardController.changeMembership);
router.post('/membershipCupon', authController.authenticatedUser, dashboardController.changeMembershipCupon);

// Paserela
router.post('/change-membership/:tipo', authController.authenticatedUser, mercadopago.pasarela);
router.get('/visa/respuesta/success',  mercadopago.pagar);
router.get('/visa/respuesta/failure',  mercadopago.pagar);
router.get('/visa/respuesta/pending',  mercadopago.pagar);

//PAGO PAYPAR PASERALA
router.post('/my-api/create-payment/', authController.authenticatedUser, paypal.crearpago);
router.post('/my-api/execute-payment/', authController.authenticatedUser, paypal.procesar);

//RECARGAR SALDO
router.post('/recargar_mi_saldo', authController.authenticatedUser, mercadopago.pasarela);
router.post('/create-order/:token/:product/:amount',  paypal.crearOrden);
router.post('/handle-approve/:id/:token/:product/:amount/:id_user/:modo',  paypal.aprobarOrden);
router.post('/handle-approve/:id/:token/:product/:amount/:id_user',  paypal.aprobarOrden);


router.get('/backstore_sell/:archivo/:id_gate/:user_id/:costo/:tipo/:correo', mercadopago.pasarela);



// Actualizar Perfil
router.get('/update-profile', authController.authenticatedUser, dashboardController.updateProfile);
router.post('/update-profile', authController.authenticatedUser, userController.UpdateUser);
router.post('/update-profile/:archivo', fileController.subirArchivo);
// User Gate
router.get('/create-file-gate', authController.authenticatedUser, gatesController.formCreateFileGate);
router.post('/create-file-gate/:archivo', fileController.subirArchivo);
router.get('/create-bond-gate', authController.authenticatedUser, gatesController.formCreateBondGate);
router.get('/backstore', authController.authenticatedUser, gatesController.formBackstore);
router.post('/create-gate', authController.authenticatedUser, gatesController.createGate);

router.get('/downgate/:id/:id_gate/:id_usuario/:correo/:modo',  gatesController.downloadGate);

router.get('/gate/:id', gatesController.viewGate);
router.get('/track/:enlace', gatesController.viewGatePersonalizado);


// Billetera
router.get('/wallet', authController.authenticatedUser, walletController.walletDashboard);
router.get('/wallet/:msg', authController.authenticatedUser, walletController.walletDashboard);
router.get('/datos_wallet', authController.authenticatedUser, walletController.datos_pagos);
router.post('/guardar_datos_pago_wallet', authController.authenticatedUser, walletController.saveDatos);
router.get('/recargar_backcoin', authController.authenticatedUser, walletController.recargar_backcoin);
router.get('/pagar_backcoins/:id/:product/:amount/:modo', authController.authenticatedUser, walletController.descontar_backcoin);
router.get('/pagar_backcoins/:id/:product/:amount/:modo/:back_pay', authController.authenticatedUser, walletController.descontar_backcoin);
router.get('/retirar_fondos', authController.authenticatedUser, walletController.retirar_fondos_form);
router.post('/retirar_fondos', authController.authenticatedUser, walletController.retirar_fondos_save);
router.get('/mis_retiros', authController.authenticatedUser, walletController.retiros);




// Fans
router.get('/fans', authController.authenticatedUser, dashboardController.fansPage);
router.get('/fans/:msg', authController.authenticatedUser, dashboardController.fansPage);
router.post('/fans', authController.authenticatedUser, EmailCtrl.sendEmailFans);

// Inicio de sesión con Facebook
router.get('/auth/facebook', 
  passport.authenticate('facebook', { scope : 'email' }
));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/dashboard',
    failureRedirect : '/'
  })
);
 
//incio sesion con google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }), function(req, res) {
    console.log("aqui")
  });

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', 
  passport.authenticate('google', {
    successRedirect : '/dashboard',
   failureRedirect: '/login',
  failureFlash: 'Invalid Google credentials.' }),
  function(req, res) {
    res.redirect('/dashboard');
  });
// router.get('/auth/facebook/callback',
 //	passport.authenticate('facebook', { failureRedirect: '/login' }),
 //	function(req, res) {
//		res.redirect('/dashboard');
//	}
//);

router.get('/auth/mixcloud',
  passport.authenticate('mixcloud'));

router.get('/auth/mixcloud/callback', 
  passport.authenticate('mixcloud', { 
    successRedirect : '/dashboard',
    failureRedirect: '/login',
    failureFlash: 'Invalid Google credentials.' }),
  function(req, res) {
    // Successful authentication, redirect home.
    
    res.redirect('/dashboard');
  });

module.exports = router;