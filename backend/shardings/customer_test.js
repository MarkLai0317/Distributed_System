const { database_config } = require('../config');


var mysql = require('mysql2/promise');
var connection = await this.mysql.createConnection(database_config)

const customer = require('../services/customer.js')(connection);

const requestHandler = async (serviceId, transactionId,  parameters) =>{
  
  let result = await customer[serviceId](parameters)
//let result = customer[serviceId](parameters, transactionId)
  console.log(result)


//參數自己寫
requestHandler(serviceId, transactionId, parameters)
