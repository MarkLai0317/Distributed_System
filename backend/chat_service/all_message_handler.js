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
    msg.to = topic.split('/')[2]

    // msg should be a JSON object:
    // {
    //     "from": "clientId",
    //     "to": topic.split('/')[2]
    //     "msg" : "msg content...",
    //     "timestamp" : "UTC 1234"
    // }

    saveMsg(msg.from, msg.to, msg.msg, msg.timestamp)
})