const Sequelize = require('sequelize');
const db = require('../db');
const crypto = require('crypto');
const _ = require('lodash');


const User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	google_id: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING
	},
	salt: {
		type: Sequelize.STRING
	}
}, {
	hooks: {
		beforeCreate: setSaltAndPassword,
		beforeUpdate: setSaltAndPassword
	}
});

User.prototype.correctPassword = function(candidatePassword) {
	return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
};

User.prototype.sanitize = function () {
	return _.omit(this.toJSON(), ['password', 'salt']);
};

User.generateSalt = function() {
	return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
	const hash = crypto.createHash('sha1');
	hash.update(plainText);
	hash.update(salt);
	return hash.digets('hex');

};

const setSaltAndPassword = user => {
	if (user.changed('password')) {
		user.salt = User.generateSalt();
		user.password = User.encryptPassword(user.password, user.salt);
	}

};

module.exports = User;
