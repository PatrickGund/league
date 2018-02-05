const Sequelize = require('sequelize');
const server = process.env.DB_URL || 'postgress://localhost:5432/league';
const db = new Sequelize(server, {
	logging: false
});

module.exports = db;
