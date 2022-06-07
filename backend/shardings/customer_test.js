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
  parameters = { 'CustomerID': 'test' }
  // parameters = { 'CustomerID': 'test', 'Name': 'test', 'PhoneNum': 'test' }
  // parameters = { ShopID: 90, Type: 'fruit' }
  // parameters = { Type: 'fruit', page: 1 }
  // parameters = { CustomerID: '108703029@nccu.edu.tw', ShopID: 94, ProductSupplierID: 72, ProductID: 83 }
  // requestHandler('/add', 111, parameters)
  requestHandler('/existCustomer', 111, parameters)

})()