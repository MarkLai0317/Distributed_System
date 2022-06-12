const MongoClient = require("mongodb").MongoClient;

async function getHistoryTest(parameters) {
	const client = await MongoClient.connect("mongodb://localhost:27017").catch(
		(err) => console.log("Error while connecting to MongoDB", err)
	);
	if (!client) {
		console.log("Unknown error while connect to MongoDB");
		return;
	}
	try {
		const db = client.db("dis_sys");
		const collection = db.collection("chat");
		const res = await collection.findOne({ _id: parameters.UserId });
		if(res==null) {return {};}
		return res.msgs;
	} catch (err) {
		console.log("Error while fetching chat history", err);
	} finally {
		client.close();
	}
}

async function register(body) {
	const client = await MongoClient.connect("mongodb://localhost:27017").catch(
		(err) => console.log(err, "connecting")
	);
	if (!client) return;
	try {
		const db = client.db("dis_sys");
		const collection = db.collection("chat");

		const obj = {
			_id: body.userId,
			msgs: {},
		};
		const res = await collection.insertOne(obj);

		return res.insertedId;
	} catch (err) {
		console.log(err);
		return err;
	} finally {
		client.close();
	}
}

module.exports = {
	"/getHistory": getHistoryTest,
	"/register": register,
};
