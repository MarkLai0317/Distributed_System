const db = require('../services/db-shard.js'); // dp 裡的function 用ㄌㄞquery 和 改資料的




function createNewManager(data){
  const {Email, Name, PhoneNum, ShopName} = data
  const result = db.run('INSERT INTO Manager (ManagerID, Name, PhoneNum) VALUES (@Email, @Name, @PhoneNum)', {Email, Name, PhoneNum});
  let ShopIDs = db.query(`SELECT Shop.ShopID
                          FROM Shop`, [])
  console.log(ShopIDs)
  let targetShopID = Math.max.apply(Math, ShopIDs.map(function(o) { return o.ShopID; }))
  targetShopID = targetShopID + 1
                         
  
  
  let revenue = 0

  const shopResult = db.run('INSERT INTO Shop (ManagerID, ShopID, Name, TotalRevenue) VALUES (@Email, @targetShopID, @ShopName, @revenue)',{Email, targetShopID, ShopName, revenue});
  let error = '';
  if (result.changes && shopResult.changes) {
    let message = 'Manager created successfully';
    return {message, error}
  }else{
    error = 'Customer created fail'
    return {error}
  }

  
}


function checkManager(parameters){
  const {email} = parameters
  const data = db.query(`SELECT ManagerID 
                          FROM Manager 
                          WHERE ManagerID = ?`, [email])
  console.log(data)
  return{
    exist: data.length > 0
  }
}


module.exports = {
  '/register/Manager':createNewManager,
  '/existManager':checkManager
}