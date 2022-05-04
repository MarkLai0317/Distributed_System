const db = require('../services/db'); // dp 裡的function 用ㄌㄞquery 和 改資料的

const listPerPage = 10

function createNewCustomer(data){
  const {Email, Name, PhoneNum} = data
  const result = db.run('INSERT INTO Customer (CustomerID, Name, PhoneNum) VALUES (@Email, @Name, @PhoneNum)', {Email, Name, PhoneNum});
  let error = '';
  if (result.changes) {
    let message = 'Customer created successfully';
    return {message, error}
  }else{
    error = 'Customer created fail'
    return {error}
  }

  
}

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




function searchProduct(shopID, type, page){
  const offset = (page - 1) * listPerPage;
  const data = db.query(`SELECT  Product.ProductID,Product.SupplierID,  For_Sell.ShopID, Product.Name as ProductName, Shop.Name as ShopName
                          FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                          INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                              AND Product.SupplierID = For_Sell.ProductSupplierID
                          WHERE Type = ? AND Shop.ShopID = ?
                          LIMIT ?, ?`, [type, shopID, offset, listPerPage])
  const meta = {page};
  return {
    data,
    meta
  }
}

function checkCustomer(email){
  const data = db.query(`SELECT CustomerID 
                          FROM Customer 
                          WHERE CustomerID = ?`, [email])
  console.log(data)
  return{
    exist: data.length > 0
  }
}

function checkManager(email){
  const data = db.query(`SELECT ManagerID 
                          FROM Manager 
                          WHERE ManagerID = ?`, [email])
  console.log(data)
  return{
    exist: data.length > 0
  }
}


module.exports = {
  createNewCustomer,
  createNewManager,
  searchProduct,
  checkCustomer,
  checkManager
}