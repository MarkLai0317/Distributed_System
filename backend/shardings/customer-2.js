const customer = require('../services/customer.js');

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:8888', {clientId: 'shardings/customer-2'});
var option = {
    qos: 2
}

client.on('connect', ()=>{
  console.log("connect success");
  client.subscribe('sharding/customer-2', option);
})

// data = {
//   serviceId: ''  // route
//   parameters:{},
//   transactionId:"1234"
// }

const requestHandler = (serviceId, transactionId,  parameters) =>{
  
  let result = customer[serviceId](parameters, transactionId)
//let result = customer[serviceId](parameters, transactionId)
  client.publish(transactionId, JSON.stringify(result))

}

client.on('message', (topic, message, packet)=>{
  let data = JSON.parse(message)
  console.log(JSON.parse(message))
  requestHandler(data.serviceId, data.transactionId, data.parameters)

})

