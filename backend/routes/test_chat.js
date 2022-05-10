// This is for testing
const express = require("express");
const router = express.Router();

//shard(2)
module.exports = function (globalVariables) {
	const shard = globalVariables.shard;

	router.get("/getHistory", async function (req, res, next) {
		try {
			const SHARD_KEY = 3;
			let result = await shard(SHARD_KEY, "/getHistory", {
				UserId: req.query.UserId,
			});
			res.json(result);
		} catch (err) {
			console.error(`Error while getting msg history test `, err.message);
			next(err);
		}
	});
	return router;
};
