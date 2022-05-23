//const db = require('../services/db-shard.js'); // dp 裡的function 用ㄌㄞquery 和 改資料的
module.exports = function (connection) {
  
  
  const listPerPage = 10


  /*async function createNewManager(data) {
    const { Email, Name, PhoneNum, ShopName } = data
    try{
    const [result,fields] = await connection.execute('INSERT INTO Manager (ManagerID, Name, PhoneNum) VALUES (?, ?, ?)', [ Email, Name, PhoneNum ]);
    const [ShopIDs,fields] = await connection.execute(`SELECT Shop.ShopID
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
      error = 'Manager created fail'
      return { error }
    }


  }*/


  async function checkManager(parameters) {
    const { email } = parameters
    const [data,fields] = await connection.execute(`SELECT ManagerID 
                          FROM Manager 
                          WHERE ManagerID = ?`, [email])
    //console.log(data)
    return new Promise((resolve, reject) =>
    resolve({ exist: data.length > 0 })
    )
  }

  //  =========== nn manager ===============
  // orderButton
  async function orderButton(data) {
    const { StoreHouseID, ShopManagerID, ProductSupplierID, ProductID, Num } = data;
    await connection.beginTransaction();
    try{
      // find shopID
      var [s,fields] = await connection.execute(`SELECT ShopID
                      FROM Shop
                      WHERE ManagerID = ?`, [ShopManagerID]);
      var t = JSON.stringify(s[0].ShopID);
      const ShopID = JSON.parse(t);

      // find max orderHistoryID
      var [o,fields1] = db.query(`SELECT MAX(OrderHistoryID) as oo
                      FROM Order_History `, []);
      var s = JSON.stringify(o[0].oo);
      var OrderHistoryID = JSON.parse(s);
      OrderHistoryID = OrderHistoryID + 1;

      // add data to order history
      await connection.execute(` INSERT INTO Order_History (ShopManagerID, ShopID, ProductSupplierID, ProductID,  OrderHistoryID, Num)
            VALUES (?,?,?,?,?,?)`,
        [ ShopManagerID, ShopID, ProductSupplierID, ProductID, OrderHistoryID, Num ]);

      // update have product number
      // if data doesn't exist in Have, new a row in Have, else update have product number
      const [res,fields2] = await connection.execute(` SELECT *
                            FROM Have 
                            WHERE StoreHouseID = ? AND ShopManagerID = ? AND ProductSupplierID = ? AND
                            ProductID = ? ` , [StoreHouseID, ShopManagerID, ProductSupplierID, ProductID]);

      let error = 'Error in updating forSale product number.';
      if (res.length == 0) {
        const [r,fields3] = await connection.execute(`INSERT INTO Have (StoreHouseID, ShopManagerID, ShopID, ProductSupplierID, ProductID, Num)
                        VALUES (?,?,?,?,?,?)`,
          [StoreHouseID, ShopManagerID, ShopID, ProductSupplierID, ProductID, Num ]);

        if (r!= undefined) {
          error = ''
        }

      } else {
        const [result,fields4] = await connection.execute(` UPDATE Have
                            SET Num = Num + ?
                            WHERE ShopManagerID = ? AND ProductSupplierID = ?
                            AND ProductID = ?`, [ Num, ShopManagerID, ProductSupplierID, ProductID ]);


        if (result!= undefined) {
          error = '';
        }
      }

      await connection.commit();
      return new Promise((resolve, reject) =>
        resolve({ error })
      );
    }catch (err) {

      connection.rollback();
      let error = 'Error in orderButton.';
      return new Promise((resolve, reject) =>
        resolve({ error })
      );
    }
  }

  // pageOrderHistory 
  async function pageOrderHistory(parameters) {
    const { ManagerID, page } = parameters
    const offset = (page - 1) * listPerPage;
    const [data,fields] = await connection.execute(` SELECT Time, OrderHistoryID, Product.Name AS ProductName, Supplier.Name AS SupplierName, Num
                          FROM ( Order_History LEFT JOIN Product ON Order_History.ProductSupplierID = Product.SupplierID 
                          AND Order_History.ProductID = Product.ProductID ) LEFT JOIN Supplier ON Product.SupplierID = Supplier.SupplierID
                          WHERE ShopManagerID = ?
                          LIMIT ${offset}, ${listPerPage}` , [ManagerID]);
    return new Promise((resolve, reject) =>
        resolve({ data })
      );
  }

  // pageTradeHistory 
  async function pageTradeHistory(parameters) {
    const { ManagerID, page } = parameters
    const offset = (page - 1) * listPerPage;
    const [data,fields] = await connection.execute(` SELECT Time, HistoryID, Product.Name AS ProductName, Price, Num
                          FROM ( Trade_History LEFT JOIN Product ON Trade_History.ProductSupplierID = Product.SupplierID 
                          AND Trade_History.ProductID = Product.ProductID ) 
                          WHERE ShopManagerID = ?
                          LIMIT ${offset}, ${listPerPage}` , [ManagerID]);
    return new Promise((resolve, reject) =>
        resolve({ data })
      );
  }

  // forSale 
  async function forSell(data) {
    const { StoreHouseID, ShopManagerID, ProductSupplierID, ProductID, Num, Price } = data;
    let error = 'Error in updating forSell product number.'
    await connection.beginTransaction();
    try{
      // find shopID
      var [s,fields] = await connection.execute(`SELECT ShopID
                      FROM Shop
                      WHERE ManagerID = ?`, [ShopManagerID]);
      var t = JSON.stringify(s[0].ShopID);
      const ShopID = JSON.parse(t);

      // check whether this product is forSell or not
      var [r,fields1] = await connection.execute(`SELECT *
                        FROM For_Sell 
                        WHERE ShopManagerID = ? AND ProductSupplierID = ? AND ProductID = ? `
        , [ShopManagerID, ProductSupplierID, ProductID]);

      

      // if r.length == 0 insert product, else update For_Sell num
      if (r.length == 0) {
        const [t,fields2] = await connection.execute(`INSERT INTO For_Sell (ShopManagerID, ShopID, ProductSupplierID, ProductID, Price, Num)
                        VALUES (?,?,?,?,?,?)`,
          [ ShopManagerID, ShopID, ProductSupplierID, ProductID, Price, Num ]);

        if (t!=undefined) {
          error = ''
        }
      } else {
        const [result,fields3] = await connection.execute(` UPDATE For_Sell
                              SET Num = @Num + Num
                              WHERE ShopManagerID = ? AND ProductSupplierID = ?
                                    AND ProductID = ?`, [ Num, ShopManagerID, ProductSupplierID, ProductID ]);

        error = 'Error in updating ForSell product number.';
        if (result!= undefined) {
          error = '';
        }
      }

      // decrease Have Num 
      await connection.execute(`UPDATE Have
            SET Num = Num - @Num
            WHERE StoreHouseID = ? AND ShopManagerID = ? AND ProductSupplierID = ?
            AND ProductID = ?`, [ Num, StoreHouseID, ShopManagerID, ProductSupplierID, ProductID ]);
      await connection.commit();    
      return new Promise((resolve, reject) =>
          resolve({ error })
      );
    }catch (err) {
      connection.rollback();
      let error = 'Error in forsell.';
      return new Promise((resolve, reject) =>
        resolve({ error })
      );
    }
  }

  // deleteForSell 
  async function deleteForSell(data) {
    const { ShopManagerID, ProductSupplierID, ProductID } = data;

    // return ShopManagerID;
    const [result,fields] = await connection.execute(` DELETE
                          FROM For_Sell
                          WHERE ShopManagerID = ? AND ProductSupplierID = ?
                                AND ProductID = ?`, [ ShopManagerID, ProductSupplierID, ProductID ]);

    let error = 'Error in deleting ForSell product number.';
    if (result != undefined) {
      error = '';
    }

    return new Promise((resolve, reject) =>
      resolve({ error })
    );
  }

  //===========上面田詠恩   下面倪靖揚＝＝＝＝＝＝＝

  //manager revenue
  async function Revenue(parameters) {
    // return ManagerID;
    const { ManagerID } = parameters
    const [data,fields] = await connection.execute(`SELECT Time,Price
                        from Trade_History
                        where ShopManagerID= ?
                        ORDER BY Time`, [ManagerID]);
    return new Promise((resolve, reject) =>
      resolve({ data })
    );
  }
  //manager tradehistory
  async function TradeHistory(parameters) {
    const { ManagerID, page } = parameters
    const offset = (page - 1) * listPerPage;
    await connection.beginTransaction();
    try{
      var data = [];
      //var hid=[]
      var [hid,fields] = await connection.execute(`select Trade_History.HistoryID
                          ,Trade_History.Price,Trade_History.CustomerID,Trade_History.Num
                          from Trade_History,Product
                          where Trade_History.ShopManagerID= ? and 
                          Trade_History.ProductSupplierID=Product.SupplierID and 
                          Trade_History.ProductID=Product.ProductID
                          GROUP BY Trade_History.HistoryID
                          `, [ManagerID])
      //hid = (mgrid)
      for (i = 0; i < hid.length; i++) {

        var HID = JSON.stringify(hid[i].HistoryID);
        //Integer.parseInt(jsonObj.get("data[i].HistoryID"));
        var [product,fields1] = await connection.execute(`select Trade_History.Time,Product.Name as ProductName,Trade_History.Num
                              ,Price
                              from Trade_History,
                              Product where Trade_History.ShopManagerID= ? and 
                              Trade_History.ProductSupplierID=Product.SupplierID and 
                              Trade_History.ProductID=Product.ProductID and Trade_History.HistoryID= ? `
          , [ManagerID, HID])
        var price = 0;
        for (j = 0; j < product.length; j++) {
          price += product[j].Price * product[j].Num;
        }
        data.push({
          HistoryID: hid[i].HistoryID,
          TotalPrice: price,
          CustomerID: hid[i].CustomerID,
          Receipt: []
        })
        data[i].Receipt = product

      }
      //const meta = {page};  
      await connection.commit();
        return new Promise((resolve, reject) =>
          resolve({ data })
        );
    }catch (err) {
      connection.rollback();
      let error = 'Error in tradehistory.';
      return new Promise((resolve, reject) =>
        resolve({ error })
      );
    }

  }
  //manager shop
  async function Shop(parameters) {
    const { ManagerID } = parameters
    const [data,fields] = await connection.execute(`select Product.Name as ProductName,Product.SupplierID,For_Sell.Num
                       ,For_Sell.Price from Product,
                       For_Sell where For_Sell.ProductSupplierID=Product.SupplierID and 
                       For_Sell.ProductID=Product.ProductID and For_Sell.ShopManagerID= ?`, [ManagerID])
    return new Promise((resolve, reject) =>
      resolve({ data })
    );
  }
  // manager OrderHistory
  async function OrderHistory(parameters) {
    const { ManagerID } = parameters
    const [data,fields] = await connection.execute(`select OrderHistoryID,Order_History.Time,Product.Name as ProductName
                        ,Order_History.Num,Supplier.Name as SupplierName
                        from Order_History,Product,Supplier
                        where Order_History.ProductSupplierID=Product.SupplierID and 
                        Order_History.ProductID=Product.ProductID and Product.SupplierID=Supplier.SupplierID and ShopManagerID= ?
                        ORDER BY OrderHistoryID DESC
                         `, [ManagerID])
    return new Promise((resolve, reject) =>
      resolve({ data })
    );
  }
  //manager order
  async function Order() {
    const [data,fields] = await connection.execute(`select *
                        from Product
                        `, [])
    //const meta={page};
    return new Promise((resolve, reject) =>
      resolve({ data })
    );
  }

  //manager create account
  async function CreateNewManager(data) {

    const { Email, Name, PhoneNum, ShopName } = data;
    await connection.beginTransaction();
    try{
      const [count, fields] = await connection.execute(`select * from Manager `, []);
      const [shopp,fields1] = await connection.execute(`select * from Shop`, []);
      for (i = 0; i < count.length; i++) {
        if (Email == count[i].ManagerID) {
          let error = 'This Email exists already.';
          return { error };
        }
        if (Name == count[i].Name) {
          let error = 'This Name exists already.';
          return { error };
        }
        if (PhoneNum == count[i].PhoneNum) {
          let error = 'This Phone Number exists already.';
          return { error };
        }

      }
      for (i = 0; i < shopp.length; i++) {
        if (ShopName == shopp[i].Name) {
          let error = 'This Shop-Name exists already.';
          return { error };
        }
      }//
      const [result,fields2] = await connection.execute(`INSERT INTO Manager (ManagerID, Name, PhoneNum) VALUES (?,?,?)`
        , [ Email, Name, PhoneNum ]);


      var [max,fields3] = await connection.execute(`SELECT MAX(ShopID) as mm from Shop`, [])
      var s = JSON.stringify(max[0].mm);
      var ShopID = JSON.parse(s);
      ShopID = ShopID + 1;
      await connection.execute(`INSERT INTO Shop(ManagerID,ShopID,Name,TotalRevenue) VALUES (?,?,?, 0)`
        , [Email, ShopID, ShopName ]);  

      if (result!= undefined) {
        error = '';
      }
      await connection.commit()
      return new Promise((resolve, reject) =>
          resolve({ message, error })
        )
    }catch (err) {
      connection.rollback();
      let error = 'Error in creating Manager';
      return new Promise((resolve, reject) =>
        resolve({ error })
      )
    }
  }
  async function GetStoreHouseID() {
    const [data,fields] = await connection.execute(`SELECT StoreHouseID
                                                    from Store_House                        
                                                    `, [])
    return new Promise((resolve, reject) =>
      resolve({ data })
    );
  }
  async function GetHave(parameters) {
    const { ManagerID } = parameters
    const [data,fields] = await connection.execute(`SELECT Have.ProductID,Have.ProductSupplierID as SupplierID,Product.Name as ProductName
                         ,Have.Num,Have.StoreHouseID
                         from Have,Product
                         where Have.ShopManagerID= ? and Have.ProductSupplierID=Product.SupplierID
                         and Have.ProductID=Product.ProductID`, [ManagerID])
    return new Promise((resolve, reject) =>
      resolve({ data })
    );
  }
  async function GetForSale(parameters) {
    const { ManagerID } = parameters
    const [data,fields] = await connection.execute(`SELECT For_Sell.ProductID,For_Sell.ProductSupplierID as SupplierID
                         ,Product.Name as ProductName,For_Sell.Price,For_Sell.Num
                         from For_Sell,Product
                         where For_Sell.ShopManagerID= ? and For_Sell.ProductSupplierID=Product.SupplierID
                         and For_Sell.ProductID=Product.ProductID`, [ManagerID])
    return new Promise((resolve, reject) =>
      resolve({ data })
    );
  }
  async function PriceChange(data) {
    const { ManagerID, ProductID, SupplierID, Price } = data;
    const [result, fields] = await connection.execute(`UPDATE For_Sell SET Price= ? 
          where ShopManagerID= ? and ProductSupplierID= ? and ProductID= ?
          `, [ Price, ManagerID, SupplierID, ProductID ])
    let error = 'Error in changing price';

    if (result != undefined) {
      error = '';
    }

    return new Promise((resolve, reject) =>
      resolve({ error })
    );

  }

  return {
    '/register/Manager': CreateNewManager,
    '/existManager': checkManager,//ok
    '/orderButton': orderButton,//ok
    '/pageOrderHistory': pageOrderHistory,//ok
    '/pageTradeHistory': pageTradeHistory,//ok
    '/forSell': forSell,//ok
    '/deleteForSell': deleteForSell,//ok
    '/Revenue': Revenue,//ok
    '/TradeHistory': TradeHistory,//ok
    '/Shop': Shop,//ok
    '/Order_History': OrderHistory,//ok
    '/Order': Order,//ok
    '/GetStoreHouseID': GetStoreHouseID,     //ok
    '/GetHave': GetHave,             //ok 
    '/GetForsale': GetForSale,       //ok
    '/PriceChange': PriceChange      //ok
  }
}