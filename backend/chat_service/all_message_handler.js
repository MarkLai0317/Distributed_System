// @房子豪
import { saveMsg } from "mongo_op.js"

const mqtt = require('mqtt')

var opt = {
    port: 8887,
    //埠號
    clientId: 'handler'
}

//用戶端ID
var client = mqtt.connect ('mqtt://localhost', opt)

client.on('connect', function () {
    console.log ('connected')
    client.subscribe('/chat/#')
})

client.on('message', function (topic, msg) {
    console.log("topic: " + topic + "訊息:  " + msg.tostring)

    // 使用 saveMsg

    // saveMsg()
})