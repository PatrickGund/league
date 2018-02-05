const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
const port = process.env.PORT || 8080;
const db = require('./db');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({db});
const passport = require('passport');
const User = require('./routes/users.js');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	try {
		done(null, user.id);
	} catch (err) {
		done(err);
	}
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => done(null, user))
		.catch(done);
});

dbStore.sync();

app.use(session({
	secret: process.env.SESSION_SECRET,
	store: dbStore,
	resave: false,
	saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, './public')));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/', routes);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public')));

app.use((err, req, res, next) => {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

db.sync()
	.then(() => app.listen(port, () => {
		console.log(`listening on ${port}`);
	}));

