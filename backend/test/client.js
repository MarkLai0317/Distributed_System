var mqtt = require('mqtt');
var client1 = mqtt.connect('mqtt://localhost:8888', {clientId: 'shardings/customer-1'});
var option = {
    qos: 2
}

var client2 = mqtt.connect('mqtt://localhost:8888', {clientId: 'shardings/customer-2'});
var option = {
    qos: 2
}
client1.on('connect', ()=>{
  client1.publish('sharding', 'Hi')
})

client2.on('connect', ()=>{
  client2.publish('sharding2', 'Hi')
})
