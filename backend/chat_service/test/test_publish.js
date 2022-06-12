// @房子豪
const mqtt = require('mqtt')

var opt = {
    port: 8887,
    //埠號
    clientId: 'pub'
}

//用戶端ID
var client = mqtt.connect ('mqtt: //192.168.1.19', opt)

client.on('connect', function () {
    console.log ('connected')
})

function test(){
    console.log("pub")
    client.publish('/chat/91', "hello")
}

test()