const MongoClient = require("mongodb").MongoClient;

async function getHistoryTest(UserId) {
	const client = await MongoClient.connect("mongodb://localhost:27017").catch(
		(err) => console.log(err, "coneecting")
	);
	if (!client) return;
	try {
		const db = client.db("dis_sys");
		const collection = db.collection("chat");
		const res = await collection.findOne({ _id: UserId.UserId });
		return res.msgs;
	} catch (err) {
		console.log(err, "query");
	} finally {
		client.close();
	}
}

module.exports = {
	"/getHistory": getHistoryTest,
};
