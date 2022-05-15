//const db = require('../services/db-shard.js'); // dp 裡的function 用ㄌㄞquery 和 改資料的


module.exports = function (connection) {


  const listPerPage = 10


  async function createNewCustomer(data) {
    const { CustomerID, Name, PhoneNum } = data
    try {
      const [result, fields] = await connection.execute('INSERT INTO Customer (CustomerID, Name, PhoneNum) VALUES (?, ?, ?)', [CustomerID, Name, PhoneNum]);
      let error = '';
      return new Promise((resolve, reject) =>
        resolve({ error })
      )
    } catch (err) {
      let error = 'Customer created fail';
      return new Promise((resolve, reject) =>
        resolve({ error })
      )
    }
  }


  // async function searchProduct(parameters) {
  //   const { shopID, type, page } = parameters
  //   const offset = (page - 1) * listPerPage;
  //   const [data, fields] = await connection.execute(`SELECT  Product.ProductID,Product.SupplierID,  For_Sell.ShopID, Product.Name as ProductName, Shop.Name as ShopName
  //                           FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
  //                           INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
  //                                               AND Product.SupplierID = For_Sell.ProductSupplierID
  //                           WHERE Type = ? AND Shop.ShopID = ?
  //                           LIMIT ?, ?`, [type, shopID, offset, listPerPage])
  //   const meta = { page };
  //   return new Promise((resolve, reject) =>
  //     resolve({ data, meta })
  //   );
  // }

  async function checkCustomer(parameters) {
    const { CustomerID } = parameters
    const [data, fields] = await connection.execute(`SELECT CustomerID 
                            FROM Customer 
                            WHERE CustomerID = ?`, [CustomerID])
    // console.log(data)
    return new Promise((resolve, reject) =>
      resolve({ exist: data.length > 0 })
    )
  }

  //  ------- nn customer ---------

  // customer show all shopName 
  async function getShopList() {
    const [data, fields] = await connection.execute(`SELECT distinct ShopID, Name as ShopName 
                          FROM Shop`, []);
    return new Promise((resolve, reject) =>
      resolve({ data })
    );
  }

  // customre: getType  
  async function getType() {
    const [data, fields] = await connection.execute(`SELECT distinct  Type 
                          FROM For_Sell LEFT JOIN Product ON Product.ProductID = For_Sell.ProductID 
                          AND Product.SupplierID = For_Sell.ProductSupplierID`, []);
    return new Promise((resolve, reject) =>
      resolve({ data })
    );
  }

  // customer maxPage 
  function maxPage(parameters) {
    const { ShopID, Type } = parameters
    //  have no shopid and type
    if (!ShopID && !Type) {
      const data = db.query(`SELECT  COUNT(Product.SupplierID AND Product.ProductID ) AS temp                       
                            FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                            INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                                AND Product.SupplierID = For_Sell.ProductSupplierID
                            `, []);
      var s = JSON.stringify(data[0].temp);
      const page = Math.ceil(JSON.parse(s) / 10);
      return { page };



      // only have type
    } else if (!ShopID) {
      const data = db.query(`SELECT COUNT( Product.SupplierID AND Product.ProductID) AS temp                         
                            FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                            INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                                AND Product.SupplierID = For_Sell.ProductSupplierID
                            WHERE Type = ?`, [Type]);
      var s = JSON.stringify(data[0].temp);
      const page = Math.ceil(JSON.parse(s) / 10);
      return { page };


      // only have shopID
    } else if (!Type) {
      const data = db.query(`SELECT  COUNT( Product.SupplierID AND Product.ProductID) AS temp                         
                            FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                            INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                                AND Product.SupplierID = For_Sell.ProductSupplierID
                            WHERE Shop.ShopID = ?`, [ShopID]);
      var s = JSON.stringify(data[0].temp);
      const page = Math.ceil(JSON.parse(s) / 10);
      return { page };

    } else {
      const data = db.query(`SELECT  COUNT( Product.SupplierID AND Product.ProductID) AS temp                         
                            FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                            INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                                AND Product.SupplierID = For_Sell.ProductSupplierID
                            WHERE Type = ? AND Shop.ShopID = ?`, [Type, ShopID]);
      var s = JSON.stringify(data[0].temp);
      const page = Math.ceil(JSON.parse(s) / 10);
      return { page };
    }

  }


  // customer search product  
  function searchProduct(parameters) {
    const { ShopID, Type, page } = parameters
    const offset = (page - 1) * listPerPage;

    //  have no shopid and type
    if (!ShopID && !Type) {
      const data = db.query(`SELECT  Product.ProductID as ProductID, Product.SupplierID as SupplierID, 
                            For_Sell.ShopID as ShopID, Product.Name as ProductName, Shop.Name as ShopName,
                            Product.Type as Type, For_Sell.Num AS RemainNumber, For_Sell.Price as Price                         
                            FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                            INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                                AND Product.SupplierID = For_Sell.ProductSupplierID
                            
                            LIMIT ?, ?`, [offset, listPerPage]);
      // const meta = { page };
      return { data };



      // only have type
    } else if (!ShopID) {
      const data = db.query(`SELECT  Product.ProductID as ProductID, Product.SupplierID as SupplierID, 
                            For_Sell.ShopID as ShopID, Product.Name as ProductName, Shop.Name as ShopName,
                            Product.Type as Type, For_Sell.Num AS RemainNumber, For_Sell.Price as Price                        
                            FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                            INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                                AND Product.SupplierID = For_Sell.ProductSupplierID
                            WHERE Type = ? 
                            LIMIT ?, ?`, [Type, offset, listPerPage]);
      // const meta = { page };

      return { data };


      // only have shopID
    } else if (!Type) {
      const data = db.query(`SELECT  Product.ProductID as ProductID, Product.SupplierID as SupplierID, 
                            For_Sell.ShopID as ShopID, Product.Name as ProductName, Shop.Name as ShopName,
                            Product.Type as Type, For_Sell.Num AS RemainNumber, For_Sell.Price as Price                        
                            FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                            INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                                AND Product.SupplierID = For_Sell.ProductSupplierID
                            WHERE Shop.ShopID = ?
                            LIMIT ?, ?`, [ShopID, offset, listPerPage]);
      const meta = { page };
      return { data };

    } else {







      const data = db.query(`SELECT  Product.ProductID as ProductID, Product.SupplierID as SupplierID, 
                            For_Sell.ShopID as ShopID, Product.Name as ProductName, Shop.Name as ShopName,
                            Product.Type as Type, For_Sell.Num AS RemainNumber, For_Sell.Price as Price                        
                            FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                            INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                                AND Product.SupplierID = For_Sell.ProductSupplierID
                            WHERE Type = ? AND Shop.ShopID = ?
                            LIMIT ?, ?`, [Type, ShopID, offset, listPerPage]);
      // const meta = { page };
      return { data };
    }
  }

  // customer click Cart  
  function clickCart(parameters) {
    const { CustomerID } = parameters
    const data = db.query(`SELECT Product.Name AS Name, Cart.ProductID, Cart.ProductSupplierID, Cart.Price AS Price, Cart.ShopID, Cart.Num AS NumberInCart, 
                                  For_Sell.Num AS RemainNumber
                            FROM Cart LEFT JOIN For_Sell ON For_Sell.ShopID = Cart.ShopID 
                                  AND For_Sell.ProductSupplierID = Cart.ProductSupplierID
                                  AND For_Sell.ProductID = Cart.ProductID 
                                  LEFT JOIN Product ON Cart.ProductSupplierID = Product.SupplierID AND Cart.ProductID = Product.ProductID
                            WHERE Cart.CustomerID = ?` , [CustomerID]);
    return { data };
  }

  // add prouduct to cart 
  function add(addObj) {
    const { CustomerID, ShopID, ProductSupplierID, ProductID } = addObj;
    const mid = db.query(`SELECT ManagerID
                          FROM Shop 
                          WHERE ShopID = ?`, [ShopID]);
    const price = db.query(`SELECT Price
                            FROM For_Sell
                            WHERE ShopID = ? AND ProductSupplierID = ? 
                            AND ProductID = ?`, [ShopID, ProductSupplierID, ProductID]);

    // let object to string
    var s = JSON.stringify(mid[0].ManagerID);
    const ShopManagerID = JSON.parse(s);

    var s = JSON.stringify(price[0].Price);
    const Price = JSON.parse(s);

    const res1 = db.query(`SELECT ShopID
                            FROM Cart
                            WHERE CustomerID = ? AND ShopManagerID = ? AND ProductSupplierID = ? AND ProductID = ?`, [CustomerID, ShopManagerID, ProductSupplierID, ProductID]);
    // return res1[0];
    if (res1[0] != undefined) {
      let error = 'Product exist already.';
      return { error };
    }
    const Num = 1;
    const result = db.run(`INSERT INTO Cart (CustomerID, ShopManagerID, ShopID, ProductSupplierID, ProductID, Num, Price)
                          VALUES (@CustomerID, @ShopManagerID, @ShopID, @ProductSupplierID, @ProductID, @Num, @Price)`
      , { CustomerID, ShopManagerID, ShopID, ProductSupplierID, ProductID, Num, Price });

    let error = 'Error in adding product.';
    if (result.changes) {
      error = '';
    }

    return { error };
  }

  // delete cart  
  function deleteCart(deleteObj) {
    const { CustomerID, ShopID, ProductSupplierID, ProductID } = deleteObj;

    const result = db.run(` DELETE
                            FROM Cart
                            WHERE CustomerID = @CustomerID AND ShopID = @ShopID AND ProductSupplierID = @ProductSupplierID AND ProductID = @ProductID`,
      { CustomerID, ShopID, ProductSupplierID, ProductID });

    let error = 'Error in deleting product in cart.'
    if (result.changes) {
      error = '';
    }
    return { error };
  }

  // hisNumber 
  function getHistoryNum(parameters) {
    const { CustomerID } = parameters
    var numHid = db.query(` SELECT  COUNT(DISTINCT HistoryID) AS temp
                            FROM  Trade_History 
                            WHERE CustomerID = ?` , [CustomerID]);
    var s = JSON.stringify(numHid[0].temp);
    numHid = JSON.parse(s);

    return { numHid };
  }

  // history ( page : 1 ~ x ) 
  function history(parameters) {
    const { CustomerID, page } = parameters
    // count HistoryID index
    const index = page - 1;

    // get HistoryID's number
    const numHid = getHistoryNum({ CustomerID: CustomerID });

    // take specified HistoryID
    const res = db.query(`  SELECT  distinct HistoryID
                            FROM  Trade_History 
                            WHERE CustomerID = ?
                            ORDER BY HistoryID DESC` , [CustomerID]);
    const hid = res[index].HistoryID;

    // count totalPrice & get Time
    var tp_time = db.query(`SELECT  SUM(Num * Price) AS tp, Time
                            FROM  Trade_History 
                            WHERE CustomerID = ? AND HistoryID = ?` , [CustomerID, hid]);
    var s = JSON.stringify(tp_time[0].tp);
    var totalPrice = JSON.parse(s);
    s = JSON.stringify(tp_time[0].Time);
    var Time = JSON.parse(s);

    const temp_data = db.query(`  SELECT Product.Name AS ProductName, Shop.Name AS ShopName, Num, Price
                                  FROM ( Trade_History LEFT JOIN Product ON Trade_History.ProductSupplierID = Product.SupplierID 
                                        AND Trade_History.ProductID = Product.ProductID ) LEFT JOIN Shop ON Trade_History.ShopID = Shop.ShopID
                                  WHERE CustomerID = ? AND HistoryID = ?` , [CustomerID, hid]);

    // creat the return data
    var data = [];
    var r = [];
    r = (temp_data);

    data.push({
      HistoryID: hid,
      Time: Time,
      TotalPrice: totalPrice,
      PurchaseHistory: r
    });


    return { data };
  }

  // +(cart) 
  function addProductNumInCart(data) {
    const { CustomerID, ShopID, ProductSupplierID, ProductID } = data;

    const result = db.run(` UPDATE Cart
                            SET Num = ( Num + 1 )
                            WHERE CustomerID = @CustomerID AND ShopID = @ShopID AND ProductSupplierID = @ProductSupplierID 
                            AND ProductID = @ProductID`, { CustomerID, ShopID, ProductSupplierID, ProductID });

    let error = 'Error in increasing number of product.';
    if (result.changes) {
      error = '';
    }

    return { error };
  }

  // -(cart) 
  function subtractProductNumInCart(data) {
    const { CustomerID, ShopID, ProductSupplierID, ProductID } = data;

    const result = db.run(` UPDATE Cart
                            SET Num = ( Num - 1 )
                            WHERE CustomerID = @CustomerID AND ShopID = @ShopID AND ProductSupplierID = @ProductSupplierID 
                            AND ProductID = @ProductID`, { CustomerID, ShopID, ProductSupplierID, ProductID });

    let error = 'Error in decreasing number of product.';
    if (result.changes) {
      error = '';
    }

    return { error };
  }

  // buy 
  function buy(data) {
    const { CustomerID } = data;
    let error = 'You have nothing in your cart.';

    // take all the products of this customer in cart 
    const res1 = db.query(` SELECT *
                            FROM Cart 
                            WHERE CustomerID = ?` , [CustomerID]);
    if (res1.length == 0) {
      return { error };
    }

    // find max hid
    var h = db.query(`SELECT MAX(HistoryID) as hh
                      FROM Trade_History `, []);
    var s = JSON.stringify(h[0].hh);
    var hid = JSON.parse(s);
    hid = hid + 1;

    for (i = 0; i < res1.length; i++) {
      cid = res1[i].CustomerID;
      mid = res1[i].ShopManagerID;
      shopid = res1[i].ShopID;
      supplierid = res1[i].ProductSupplierID;
      pid = res1[i].ProductID;
      num = res1[i].Num;
      price = res1[i].Price;


      // add to Trade History
      const result = db.run(` INSERT INTO Trade_History (CustomerID, ShopManagerID, ShopID, ProductSupplierID, ProductID,  HistoryID, Num, Price)
                              VALUES (@cid, @mid, @shopid, @supplierid, @pid, @hid, @num, @price)`,
        { cid, mid, shopid, supplierid, pid, hid, num, price });

      // delete data in cart
      db.run(`DELETE
              FROM Cart
              WHERE CustomerID = @cid AND ShopID = @shopid AND ProductSupplierID = @supplierid AND ProductID = @pid`,
        { cid, shopid, supplierid, pid });

      // update for_sell.num
      db.run(`UPDATE For_Sell
              SET Num = (Num - @num)
              WHERE  ShopID = @shopid AND ProductSupplierID = @supplierid 
              AND ProductID = @pid`, { num, shopid, supplierid, pid });

      // update shop.totalRevenue
      db.run(`UPDATE Shop
              SET TotalRevenue = (TotalRevenue + (@num * @price) )
              WHERE  ShopID = @shopid `, { num, price, shopid });



    }
    error = '';
    return { error };

  }

  //===========上面田詠恩   下面倪靖揚＝＝＝＝＝＝＝

  return {
    '/register/Customer': createNewCustomer,
    // '/searchProduct': searchProduct,
    '/existCustomer': checkCustomer,
    '/getShopList': getShopList,
    '/getType': getType,
    '/maxPage': maxPage,
    '/searchProduct': searchProduct,
    '/clickCart': clickCart,
    '/add': add,
    '/deleteCart': deleteCart,
    '/getHistoryNum': getHistoryNum,
    '/history': history,
    '/addProductNumInCart': addProductNumInCart,
    '/subtractProductNumInCart': subtractProductNumInCart,
    '/buy': buy
  }

}




