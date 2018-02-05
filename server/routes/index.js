const router = require('express').Router();
const users = require('./users');

router.use('/users', users);

router.use('/', (req, res, next) => {
	const err = new Error('Page Not Found');
	err.status = 404;
	next(err);
});

module.exports = router;
