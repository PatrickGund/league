const router = require('express').Router();
const User = require('../db/models/users');

router.post('/login', (req, res, next) => {
	User.findOne({
		where: {
			emai: req.body.email
		}
	})
		.then(user => {
			if (!user) {res.status(401).send('User not found');}
			else if (!user.hasMatchingPassword(req.body.password)) {res.status(401).send('Incorrect Password');}
			else {
				req.login(user, err => {
					if (err) next(err);
					else res.json(user);
				});
			}
		})
		.catch(next);
});

module.exports = router;
