const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const dashboardController = require('../controllers/dashboardController');
const pasarelacontroller = require('../controllers/pasarelacontroller');
const gatesController = require('../controllers/gatesController');
const landingController = require('../controllers/landingController');
const walletController = require('../controllers/walletController');
const adminDash = require('../controllers/adminDash');
const passport = require('passport');
const FileController = require('../models/upload');
const fileController = new FileController();
const {Niubiz} = require('@curiosity/niubiz');
//const EmailCtrl = require('../controllers/mailCtrl');
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
//router.get('//:msg', landingController.showLandingPage);

// Iniciar sesión
router.get('/login', userController.formLogin);
router.post('/login', userController.loginUser);

// Cerrar Sesión
router.get('/close-session', userController.closeSesion);

// Crear cuenta
router.get('/register', userController.formCreateUser);
router.post('/register', userController.createUser);


//email route
//router.post('/subscribe', EmailCtrl.sendEmail);
// Buscar cuenrta
router.get('/search-account', userController.formSearchAccount);
router.post('/search-account', userController.sendToken);
router.get('/search-account/:token', userController.resetPasswordForm);
router.post('/search-account/:token', userController.updatePassword);

// Dashboard
router.get('/dashboard', authController.authenticatedUser, gatesController.getGates);
router.get('/dashb/:msg', authController.authenticatedUser, gatesController.getGates);
router.get('/dashboard/:gates', authController.authenticatedUser, gatesController.getGates);
router.get('/dashboard/:gates/:productUdpt', authController.authenticatedUser, gatesController.getGates);
router.post('/dashboard', authController.authenticatedUser, gatesController.createGate);
router.get('/borrar/:id_', authController.authenticatedUser,gatesController.deleteGate);
router.get('/editar_/:id', authController.authenticatedUser,gatesController.formEditFileGate);
router.post('/guardar_gate_edit', authController.authenticatedUser, gatesController.updateGate);


// Dashboard Admin
router.get('/admin_dash', authController.authenticatedUser, adminDash.dashboard);
router.get('/planes', authController.authenticatedUser, adminDash.planes);
router.get('/admin_dash/:msg', authController.authenticatedUser, adminDash.dashboard);
router.get('/planes/:msg', authController.authenticatedUser, adminDash.planes);

router.get('/borrar_user/:id', authController.authenticatedUser, adminDash.deleteUser);
router.get('/editar_user/:id', authController.authenticatedUser, adminDash.updateProfile);
router.post('/actualizar_usuario', authController.authenticatedUser, adminDash.UpdateUser);
router.get('/agregar_plan', authController.authenticatedUser, adminDash.addplanes);
router.post('/guardar_plan', authController.authenticatedUser, adminDash.savePlan);
router.get('/borrar_plan/:id', authController.authenticatedUser, adminDash.deletePlan);
router.get('/editar_plan/:id', authController.authenticatedUser, adminDash.editPlan);
router.post('/guardar_edit_plan', authController.authenticatedUser, adminDash.savePlanEdited);

router.get('/aboutus', authController.authenticatedUser, adminDash.aboutUs);
router.get('/aboutus/:msg', authController.authenticatedUser, adminDash.planes);
router.get('/aboutus_create', authController.authenticatedUser, adminDash.addAboutUs);
router.post('/save_aboutus', authController.authenticatedUser, adminDash.save_aboutus);
router.get('/edit_aboutus/:id', authController.authenticatedUser, adminDash.editabout);
router.post('/save_edit_aboutus', authController.authenticatedUser, adminDash.savePlanEdited);
router.get('/borrar_about/:id', authController.authenticatedUser, adminDash.deleteAbout);


router.get('/banner', authController.authenticatedUser, adminDash.bannersGet);
router.get('/banner/:msg', authController.authenticatedUser, adminDash.bannersGet);
router.get('/banner_create', authController.authenticatedUser, adminDash.addBanner);
router.post('/banner_save', authController.authenticatedUser, adminDash.save_banner);
router.get('/edit_banner/:id', authController.authenticatedUser, adminDash.editBanner);
router.post('/save_edit_banner', authController.authenticatedUser, adminDash.sEditedBanner);
router.get('/borrar_banner/:id', authController.authenticatedUser, adminDash.deleteBanner);


router.get('/ventas', authController.authenticatedUser, adminDash.getPagos);


//CUPONES
router.get('/cupones', authController.authenticatedUser, adminDash.getCupones);
router.get('/cupones/:msg', authController.authenticatedUser, adminDash.getCupones);
router.get('/cupones_create', authController.authenticatedUser, adminDash.addCupon);
router.post('/save_cupon', authController.authenticatedUser, adminDash.save_cupon);
router.get('/borrar_cupon/:id', authController.authenticatedUser, adminDash.deleteCupon);
router.post('/save_cupon_edited', authController.authenticatedUser, adminDash.saveCuponEdited);
router.get('/edit_cupon/:id', authController.authenticatedUser, adminDash.editCupon);





// Compartir música
router.get('/share-music', authController.authenticatedUser, dashboardController.shareMusic);

// Cambiar membresía
router.get('/membership', authController.authenticatedUser, dashboardController.changeMembership);
router.get('/membership/:msg', authController.authenticatedUser, dashboardController.changeMembership);
router.post('/membershipCupon', authController.authenticatedUser, dashboardController.changeMembershipCupon);

// Paserela
//router.get('/change-membership/vip', authController.authenticatedUser, pasarelacontroller.changeMembership);
router.post('/change-membership/:tipo', authController.authenticatedUser, mercadopago.pasarela);
router.get('/visa/respuesta/success', authController.authenticatedUser, mercadopago.pagar);
router.get('/visa/respuesta/failure', authController.authenticatedUser, mercadopago.pagar);
router.get('/visa/respuesta/pending', authController.authenticatedUser, mercadopago.pagar);


router.post('/my-api/create-payment/', authController.authenticatedUser, paypal.crearpago);
router.post('/my-api/execute-payment/', authController.authenticatedUser, paypal.procesar);




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

router.get('/downgate/:id/:id_gate', authController.authenticatedUser, gatesController.downloadGate);

router.get('/gate/:id', gatesController.viewGate);
router.get('/track/:enlace', gatesController.viewGatePersonalizado);


// Billetera
router.get('/wallet', authController.authenticatedUser, walletController.walletDashboard);

// Fans
router.get('/fans', authController.authenticatedUser, dashboardController.fansPage);

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
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
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
  passport.authenticate('mixcloud', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    
    res.redirect('/dashboard');
  });

module.exports = router;
