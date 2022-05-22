const manager_ = require('../services/manager.js');

(async function () {
  const { database_config } = require('../config');


  var mysql = require('mysql2/promise');
  var connection = await mysql.createConnection(database_config)

  const manager = manager_(connection);

  const requestHandler = async (serviceId, transactionId, parameters) => {

    let result = await manager[serviceId](parameters)
    //let result = customer[serviceId](parameters, transactionId)
    console.log(result)
  }

  //參數自己寫
  parameters = {'ManagerID':'108703043@nccu.edu.tw'}
  requestHandler('/GetForsale',111, parameters)

})()