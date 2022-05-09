const db = require('../services/db-shard.js'); // dp 裡的function 用ㄌㄞquery 和 改資料的
const listPerPage = 10



function createNewManager(data) {
  const { Email, Name, PhoneNum, ShopName } = data
  const result = db.run('INSERT INTO Manager (ManagerID, Name, PhoneNum) VALUES (@Email, @Name, @PhoneNum)', { Email, Name, PhoneNum });
  let ShopIDs = db.query(`SELECT Shop.ShopID
                          FROM Shop`, [])
  console.log(ShopIDs)
  let targetShopID = Math.max.apply(Math, ShopIDs.map(function (o) { return o.ShopID; }))
  targetShopID = targetShopID + 1



  let revenue = 0

  const shopResult = db.run('INSERT INTO Shop (ManagerID, ShopID, Name, TotalRevenue) VALUES (@Email, @targetShopID, @ShopName, @revenue)', { Email, targetShopID, ShopName, revenue });
  let error = '';
  if (result.changes && shopResult.changes) {
    let message = 'Manager created successfully';
    return { message, error }
  } else {
    error = 'Customer created fail'
    return { error }
  }


}


function checkManager(parameters) {
  const { email } = parameters
  const data = db.query(`SELECT ManagerID 
                          FROM Manager 
                          WHERE ManagerID = ?`, [email])
  console.log(data)
  return {
    exist: data.length > 0
  }
}

//  =========== nn manager ===============
// orderButton
function orderButton(data) {
  const { StoreHouseID, ShopManagerID, ProductSupplierID, ProductID, Num } = data;

  // find shopID
  var s = db.query(`SELECT ShopID
                    FROM Shop
                    WHERE ManagerID = ?`, [ShopManagerID]);
  var t = JSON.stringify(s[0].ShopID);
  const ShopID = JSON.parse(t);

  // find max orderHistoryID
  var o = db.query(`SELECT MAX(OrderHistoryID) as oo
                    FROM Order_History `, []);
  var s = JSON.stringify(o[0].oo);
  var OrderHistoryID = JSON.parse(s);
  OrderHistoryID = OrderHistoryID + 1;

  // add data to order history
  db.run(` INSERT INTO Order_History (ShopManagerID, ShopID, ProductSupplierID, ProductID,  OrderHistoryID, Num)
           VALUES (@ShopManagerID, @ShopID, @ProductSupplierID, @ProductID, @OrderHistoryID, @Num)`,
    { ShopManagerID, ShopID, ProductSupplierID, ProductID, OrderHistoryID, Num });

  // update have product number
  // if data doesn't exist in Have, new a row in Have, else update have product number
  const res = db.query(` SELECT *
                          FROM Have 
                          WHERE StoreHouseID = ? AND ShopManagerID = ? AND ProductSupplierID = ? AND
                          ProductID = ? ` , [StoreHouseID, ShopManagerID, ProductSupplierID, ProductID]);

  let error = 'Error in updating forSale product number.';
  if (res.length == 0) {
    const r = db.run(`INSERT INTO Have (StoreHouseID, ShopManagerID, ShopID, ProductSupplierID, ProductID, Num)
                      VALUES (@StoreHouseID, @ShopManagerID, @ShopID, @ProductSupplierID, @ProductID, @Num)`,
      { StoreHouseID, ShopManagerID, ShopID, ProductSupplierID, ProductID, Num });

    if (r.changes) {
      error = ''
    }

  } else {
    const result = db.run(` UPDATE Have
                          SET Num = Num + @Num
                          WHERE ShopManagerID = @ShopManagerID AND ProductSupplierID = @ProductSupplierID 
                          AND ProductID = @ProductID`, { Num, ShopManagerID, ProductSupplierID, ProductID });


    if (result.changes) {
      error = '';
    }
  }

  return { error };
}

// pageOrderHistory 
function pageOrderHistory(parameters) {
  const { ManagerID, page } = parameters
  const offset = (page - 1) * listPerPage;
  const data = db.query(` SELECT Time, OrderHistoryID, Product.Name AS ProductName, Supplier.Name AS SupplierName, Num
                          FROM ( Order_History LEFT JOIN Product ON Order_History.ProductSupplierID = Product.SupplierID 
                          AND Order_History.ProductID = Product.ProductID ) LEFT JOIN Supplier ON Product.SupplierID = Supplier.SupplierID
                          WHERE ShopManagerID = ?
                          LIMIT ?, ?` , [ManagerID, offset, listPerPage]);
  return { data };
}

// pageTradeHistory 
function pageTradeHistory(parameters) {
  const { ManagerID, page } = parameters
  const offset = (page - 1) * listPerPage;
  const data = db.query(` SELECT Time, HistoryID, Product.Name AS ProductName, Price, Num
                          FROM ( Trade_History LEFT JOIN Product ON Trade_History.ProductSupplierID = Product.SupplierID 
                          AND Trade_History.ProductID = Product.ProductID ) 
                          WHERE ShopManagerID = ?
                          LIMIT ?, ?` , [ManagerID, offset, listPerPage]);
  return { data }
}

// forSale 
function forSell(data) {
  const { StoreHouseID, ShopManagerID, ProductSupplierID, ProductID, Num, Price } = data;

  // find shopID
  var s = db.query(`SELECT ShopID
                    FROM Shop
                    WHERE ManagerID = ?`, [ShopManagerID]);
  var t = JSON.stringify(s[0].ShopID);
  const ShopID = JSON.parse(t);

  // check whether this product is forSell or not
  const r = db.query(`SELECT *
                      FROM For_Sell 
                      WHERE ShopManagerID = ? AND ProductSupplierID = ? AND ProductID = ? `
    , [ShopManagerID, ProductSupplierID, ProductID]);

  let error = 'Error in updating forSell product number.'

  // if r.length == 0 insert product, else update For_Sell num
  if (r.length == 0) {
    const t = db.run(`INSERT INTO For_Sell (ShopManagerID, ShopID, ProductSupplierID, ProductID, Price, Num)
                      VALUES (@ShopManagerID, @ShopID, @ProductSupplierID, @ProductID, @Price, @Num)`,
      { ShopManagerID, ShopID, ProductSupplierID, ProductID, Price, Num });

    if (t.changes) {
      error = ''
    }
  } else {
    const result = db.run(` UPDATE For_Sell
                            SET Num = @Num + Num
                            WHERE ShopManagerID = @ShopManagerID AND ProductSupplierID = @ProductSupplierID 
                                  AND ProductID = @ProductID`, { Num, ShopManagerID, ProductSupplierID, ProductID });

    error = 'Error in updating ForSell product number.';
    if (result.changes) {
      error = '';
    }
  }

  // decrease Have Num 
  db.run(`UPDATE Have
          SET Num = Num - @Num
          WHERE StoreHouseID = @StoreHouseID AND ShopManagerID = @ShopManagerID AND ProductSupplierID = @ProductSupplierID 
                AND ProductID = @ProductID`, { Num, StoreHouseID, ShopManagerID, ProductSupplierID, ProductID });


  return { error };
}

// deleteForSell 
function deleteForSell(data) {
  const { ShopManagerID, ProductSupplierID, ProductID } = data;

  // return ShopManagerID;
  const result = db.run(` DELETE
                          FROM For_Sell
                          WHERE ShopManagerID = @ShopManagerID AND ProductSupplierID = @ProductSupplierID
                                AND ProductID = @ProductID`, { ShopManagerID, ProductSupplierID, ProductID });

  let error = 'Error in deleting ForSell product number.';
  if (result.changes) {
    error = '';
  }

  return { error };
}

//===========上面田詠恩   下面倪靖揚＝＝＝＝＝＝＝



module.exports = {
  '/register/Manager': createNewManager,
  '/existManager': checkManager,
  '/orderButton': orderButton,
  '/pageOrderHistory': pageOrderHistory,
  '/pageTradeHistory': pageTradeHistory,
  '/forSell': forSell,
  '/deleteForSell': deleteForSell
}