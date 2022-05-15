const customer_ = require('../services/customer.js');
(async function () {
  const { database_config } = require('../config');

  // async function()
  var mysql = require('mysql2/promise');
  var connection = await mysql.createConnection(database_config)

  const customer = customer_(connection);

  const requestHandler = async (serviceId, transactionId, parameters) => {

    let result = await customer[serviceId](parameters)

    //let result = customer[serviceId](parameters, transactionId)
    console.log(result)
  }

  //參數自己寫
  parameters = { 'CustomerID': '108703029@nccu.edu.tw' }
  // parameters = { 'CustomerID': 'test1', 'Name': 'test', 'PhoneNum': 'test' }
  // parameters = {}
  requestHandler('/existCustomer', 111, parameters)

})()