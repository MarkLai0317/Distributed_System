// @吳尚恩
const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const httpServer = require('http').createServer()
const ws = require('websocket-stream')
const port = 8887;
const wsPort = 8083;

// create server
server.listen(port, (err, res) => {
	if (err) {
		console.error(err);
	}
	console.log("server started and listening on port ", port);
});

ws.createServer({
	server: httpServer
  }, aedes.handle)

httpServer.listen(wsPort, function () {
	console.log('websocket server listening on port', wsPort)
})  

// client on connect
aedes.on("client", (client) => {
	console.log("New client connect: ", client.id);
});

// client on ready
aedes.on("clientReady", (client) => {
	console.log(client.id, " is ready");
});

//client on subscribe
aedes.on("subscribe", (subscriptions, client) => {
	console.log(client.id, " subscribe on ", subscriptions[0].topic);
});

// handle publish
aedes.on("publish", (packet, client) => {
	// print out the message
	if(client == null)
		client = { id: '' }
	console.log(client.id, " publish on ", packet.topic, ": ", packet.payload.toString());
});
// msg published should be a JSON object:
// {
//     "from": "clientId",
//     "msg" : "msg content...",
//     "timestamp" : "UTC 1234"
// }
