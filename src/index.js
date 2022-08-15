const express = require('express');
const router = express.Router();
const exphbs = require('express-handlebars');
const path = require('path');
const db = require('./config/db');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const fileupload = require('express-fileupload');
const FileController = require('./models/upload');
const fileController = new FileController();
// Conectar con la base de datos
db.sync()
	.then(() => {
		console.log('Base de datos conectada');
	})
	.catch(err => {
		console.log('Error: ', err);
	});

require('./models/Usuarios');
require('./models/Gate');
require('./models/Planes');
require('./models/Sobre_nosotros');
require('./models/Cupones');
require('./models/Pagos');
require('./models/Banner');
require('./models/Suscripciones');
require('./models/Notificaciones');
require('./models/Gate_SoundC');

// Crear el servidor de express
const app = express();

// Habilitar body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileupload());

app.use('/api', router);
// Configuraciones de expressnp
app.set('port', process.env.PORT || 3005);

// Directiorio de las vistas
app.set('views', path.resolve(__dirname, './views'));

// Configurar template engine
app.engine('.hbs', exphbs({
	layoutsDir: path.resolve(app.get('views'), 'layouts'),
	partialsDir: path.resolve(app.get('views'), 'partials'),
	defaultLayout: 'main',
	extname: '.hbs',
	helpers: require('./libs/handlebars')
}));

app.set('view engine', '.hbs');

// Habilitar directiorio publico
app.use(express.static(path.resolve(__dirname, './public')));

// Agregar Flash Messages
app.use(flash());

app.use(cookieParser());

// Sesiones
app.use(session({
	secret: 'super-secret',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.locals.messages = req.flash();

//console.log(res);
	if(req.user) {
		req.user.basic = req.user.membership === 'Basic' ? true : false;
		req.user.vip = req.user.membership === 'VIP' ? true : false;
		req.user.gold = req.user.membership === 'Gold' ? true : false;
		req.user.admin = req.user.tipo === 'Administrador' ? true : false;
	}

	res.locals.user = {...req.user} || null;
	
	next();
});

// Habilitar las rutas
app.use('/', require('./routes'));

// Iniciar el servidor
app.listen(app.get('port'), () => {
	console.log(`Servidor en el puerto ${app.get('port')}`);
});