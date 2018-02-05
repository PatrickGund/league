const router = require('express').Router();
const users = require('./users');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oath').OAuth2Strategy;
const User = require('../db/models/users');
require('../../secrets');

const googleConfig = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: '/auth/google/callback'
};

const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
	const googleId = profile.id;
	const name = profile.displayName;
	const email = profile.emails[0].value;

	User.findOne({where: { googleId: googleId }})
		.then(user => {
			if (!user) {
				return User.create({ name, email, googleId })
					.then(createdUser => done(null, createdUser));
			} else {
				done(null, user);
			}
		})
		.catch(done);
});

passport.use(strategy);

router.use('/users', users);
router.get('/auth/google', passport.authenticate('google', { scope: 'email'}));
router.get('/auth/google/callback', passport.authenticate('google', {
	successRedirect: '/',
	failureRedirect: '/login'
}));

router.use('/', (req, res, next) => {
	const err = new Error('Page Not Found');
	err.status = 404;
	next(err);
});

module.exports = router;
