const db = require('../services/db-shard.js'); // dp 裡的function 用ㄌㄞquery 和 改資料的

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


function searchProduct(parameters){
  const {shopID, type, page} = parameters
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

function checkCustomer(parameters){
  const {email} = parameters
  const data = db.query(`SELECT CustomerID 
                          FROM Customer 
                          WHERE CustomerID = ?`, [email])
  console.log(data)
  return{
    exist: data.length > 0
  }
}


module.exports = {
  '/register/Customer':createNewCustomer,
  '/searchProduct':searchProduct,
  '/existCustomer':checkCustomer,
}




