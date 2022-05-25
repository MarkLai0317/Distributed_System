// var DB = require('../services/d-shard.js')
// const db = new DB()

const manager_ = require('../services/manager.js');

(async function () {
  const { database_config } = require('../config');


  var mysql = require('mysql2/promise');
  var connection = await mysql.createConnection(database_config)

  const manager = manager_(connection);

  var mqtt = require('mqtt');
  var client = mqtt.connect('mqtt://localhost:8888', { clientId: 'shardings/manager-1' });
  var option = {
    qos: 2
  }

  client.on('connect', () => {
    console.log("connect success");
    client.subscribe('sharding/manager-1', option);
  })

  // data = {
  //   serviceId: ''  // route
  //   parameters:{},
  //   transactionId:"1234"
  // }

  const requestHandler = async (serviceId, transactionId, parameters) => {

    let result = await manager[serviceId](parameters)
    //let result = customer[serviceId](parameters, transactionId)
    client.publish(transactionId, JSON.stringify(result))

  }

  client.on('message', (topic, message, packet) => {
    let data = JSON.parse(message)
    console.log(JSON.parse(message))
    requestHandler(data.serviceId, data.transactionId, data.parameters)

  })

})()