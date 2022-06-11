// @房子豪
const op = require('./mongo_op.js')

const mqtt = require('mqtt')

var opt = {
    port: 8887,
    clientId: 'handler'
}

var client = mqtt.connect ('mqtt://localhost', opt)

client.on('connect', function () {
    console.log ('connected')
    client.subscribe('/chat/#')
})

client.on('message', function (topic, msg) {
    console.log("topic: " + topic + "訊息:  " + msg.toString())

    // parse id from topic and set to msg
    var newMsg = JSON.parse(msg.toString())
    newMsg.to =  topic.split('/')[2];
    console.log(newMsg)
    // msg should be a JSON object:
    // {
    //     "from": "clientId",
    //     "to": topic.split('/')[2]
    //     "msg" : "msg content...",
    //     "timestamp" : "UTC 1234"
    // }

    op.saveMsg(newMsg.From, newMsg.to, newMsg.Msg, newMsg.Date)
})