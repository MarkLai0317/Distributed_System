var mqtt=require('mqtt')
const client=mqtt.connect('mqtt://localhost:8887')
topic='/chat/1'
client.on('connect', function () {
    console.log('Connected')
    client.subscribe('/chat/1',function(){
        console.log('Subscribe to topic')
    })
    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString())
    })
})

   