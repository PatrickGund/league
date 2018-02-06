const router = require('express').Router();
const { User } = require('../../db/models/users');

router.get('/', (req, res, next) => {
	User.findAll({
		attributes: { exclude: ['password', 'salt', 'googleId'] }
	})
		.then(users => res.json(users))
		.catch(next);
});

module.exports = router;