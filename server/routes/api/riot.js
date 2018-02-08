const router = require('express').Router();
const { User } = require('../../db/models/users');
const axios = require('axios');
require('../../../secrets');

//GET recent matches for a given summoner name
router.get('/:summonerName', async (req, res, next) => {
	try{
		const summoner = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${req.params.summonerName}?api_key=${process.env.RIOT}`);
		const matches = await axios.get(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${summoner.data.accountId}/recent?api_key=${process.env.RIOT}`)
		res.json(matches.data);
	}
	catch (err) { console.error(err)};
});

module.exports = router;