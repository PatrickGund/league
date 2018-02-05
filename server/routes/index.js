const router = require('express').Router();
const users = require('./users');
const passport = require('passport');

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
