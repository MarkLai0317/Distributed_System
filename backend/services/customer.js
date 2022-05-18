//const db = require('../services/db-shard.js'); // dp 裡的function 用ㄌㄞquery 和 改資料的


module.exports = function (connection) {


  const listPerPage = 10


  async function createNewCustomer(data) {
    const { CustomerID, Name, PhoneNum } = data
    try {
      const [result, fields] = await connection.execute('INSERT INTO Customer (CustomerID, Name, PhoneNum) VALUES (?, ?, ?)', [CustomerID, Name, PhoneNum]);
      let message = 'Customer created successfully';
      let error = '';
      return new Promise((resolve, reject) =>
        resolve({ message, error })
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
    const { email } = parameters
    const [data, fields] = await connection.execute(`SELECT CustomerID 
                            FROM Customer 
                            WHERE CustomerID = ?`, [email])
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
  async function maxPage(parameters) {
    const { ShopID, Type } = parameters
    //  have no shopid and type
    if (!ShopID && !Type) {
      const [data, fields] = await connection.execute(`SELECT  COUNT(Product.SupplierID AND Product.ProductID ) AS temp                       
                                                      FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                                                      INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                                            AND Product.SupplierID = For_Sell.ProductSupplierID`, []);

      var s = JSON.stringify(data[0].temp);
      const page = Math.ceil(JSON.parse(s) / 10);
      return new Promise((resolve, reject) =>
        resolve({ page })
      );




      // only have type
    } else if (!ShopID) {
      const [data, fields] = await connection.execute(`SELECT COUNT( Product.SupplierID AND Product.ProductID) AS temp                         
                            FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                            INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                                AND Product.SupplierID = For_Sell.ProductSupplierID
                            WHERE Type = ?`, [Type]);

      var s = JSON.stringify(data[0].temp);
      const page = Math.ceil(JSON.parse(s) / 10);
      return new Promise((resolve, reject) =>
        resolve({ page })
      );


      // only have shopID
    } else if (!Type) {
      const [data, fields] = await connection.execute(`SELECT  COUNT( Product.SupplierID AND Product.ProductID) AS temp                         
                            FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                            INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                                AND Product.SupplierID = For_Sell.ProductSupplierID
                            WHERE Shop.ShopID = ?`, [ShopID]);

      var s = JSON.stringify(data[0].temp);
      const page = Math.ceil(JSON.parse(s) / 10);
      return new Promise((resolve, reject) =>
        resolve({ page })
      );

    } else {
      const [data, fields] = await connection.execute(`SELECT  COUNT( Product.SupplierID AND Product.ProductID) AS temp                         
                            FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                            INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                                AND Product.SupplierID = For_Sell.ProductSupplierID
                            WHERE Type = ? AND Shop.ShopID = ?`, [Type, ShopID]);

      var s = JSON.stringify(data[0].temp);
      const page = Math.ceil(JSON.parse(s) / 10);
      return new Promise((resolve, reject) =>
        resolve({ page })
      );
    }

  }


  // customer search product  
  async function searchProduct(parameters) {
    const { ShopID, Type, page } = parameters
    const offset = (page - 1) * listPerPage;

    //  have no shopid and type
    if (!ShopID && !Type) {
      const [data, fields] = await connection.execute(`SELECT  Product.ProductID as ProductID, Product.SupplierID as SupplierID, 
                                                          For_Sell.ShopID as ShopID, Product.Name as ProductName, Shop.Name as ShopName,
                                                          Product.Type as Type, For_Sell.Num AS RemainNumber, For_Sell.Price as Price                         
                                                      FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                                                          INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                                          AND Product.SupplierID = For_Sell.ProductSupplierID
                                                      LIMIT ${offset}, ${listPerPage}`, []);
      // const meta = { page };
      return new Promise((resolve, reject) =>
        resolve({ data })
      );



      // only have type
    } else if (!ShopID) {
      const [data, fields] = await connection.execute(`SELECT Product.ProductID as ProductID, Product.SupplierID as SupplierID, 
                                                          For_Sell.ShopID as ShopID, Product.Name as ProductName, Shop.Name as ShopName,
                                                          Product.Type as Type, For_Sell.Num AS RemainNumber, For_Sell.Price as Price                        
                                                      FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                                                          INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                                          AND Product.SupplierID = For_Sell.ProductSupplierID
                                                      WHERE Type = ? 
                                                      LIMIT ${offset}, ${listPerPage}`, [Type]);
      // const meta = { page };

      return new Promise((resolve, reject) =>
        resolve({ data })
      );


      // only have shopID
    } else if (!Type) {
      const [data, fields] = await connection.execute(`SELECT  Product.ProductID as ProductID, Product.SupplierID as SupplierID, 
                                                          For_Sell.ShopID as ShopID, Product.Name as ProductName, Shop.Name as ShopName,
                                                          Product.Type as Type, For_Sell.Num AS RemainNumber, For_Sell.Price as Price                        
                                                      FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                                                          INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                                          AND Product.SupplierID = For_Sell.ProductSupplierID
                                                      WHERE Shop.ShopID = ?
                                                      LIMIT ${offset}, ${listPerPage}`, [ShopID]);
      const meta = { page };
      return new Promise((resolve, reject) =>
        resolve({ data })
      );

    } else {
      const [data, fields] = await connection.execute(`SELECT  Product.ProductID as ProductID, Product.SupplierID as SupplierID, 
                                                          For_Sell.ShopID as ShopID, Product.Name as ProductName, Shop.Name as ShopName,
                                                          Product.Type as Type, For_Sell.Num AS RemainNumber, For_Sell.Price as Price                        
                                                      FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                                                          INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                                          AND Product.SupplierID = For_Sell.ProductSupplierID
                                                      WHERE Type = ? AND Shop.ShopID = ?
                                                      LIMIT ${offset}, ${listPerPage}`, [Type, ShopID]);
      // const meta = { page };
      return new Promise((resolve, reject) =>
        resolve({ data })
      );
    }
  }

  // customer click Cart  
  async function clickCart(parameters) {
    const { CustomerID } = parameters
    const [data, fields] = await connection.execute(`SELECT Product.Name AS Name, Cart.ProductID, Cart.ProductSupplierID, Cart.Price AS Price, Cart.ShopID, Cart.Num AS NumberInCart, 
                                                        For_Sell.Num AS RemainNumber
                                                    FROM Cart LEFT JOIN For_Sell ON For_Sell.ShopID = Cart.ShopID 
                                                        AND For_Sell.ProductSupplierID = Cart.ProductSupplierID
                                                        AND For_Sell.ProductID = Cart.ProductID 
                                                        LEFT JOIN Product ON Cart.ProductSupplierID = Product.SupplierID AND Cart.ProductID = Product.ProductID
                                                    WHERE Cart.CustomerID = ?` , [CustomerID]);
    return new Promise((resolve, reject) =>
      resolve({ data })
    );
  }

  // add prouduct to cart 
  async function add(addObj) {
    const { CustomerID, ShopID, ProductSupplierID, ProductID } = addObj;

    await connection.beginTransaction();
    try {
      const [mid, fields] = await connection.execute(`SELECT ManagerID
                          FROM Shop 
                          WHERE ShopID = ?`, [ShopID]);
      const [price, fields1] = await connection.execute(`SELECT Price
                            FROM For_Sell
                            WHERE ShopID = ? AND ProductSupplierID = ? 
                            AND ProductID = ?`, [ShopID, ProductSupplierID, ProductID]);

      // let object to string
      var s = JSON.stringify(mid[0].ManagerID);
      const ShopManagerID = JSON.parse(s);
      // console.log(ShopManagerID)

      var s = JSON.stringify(price[0].Price);
      const Price = JSON.parse(s);
      // console.log(Price)

      const [res1, fields2] = await connection.execute(`SELECT ShopID
                            FROM Cart
                            WHERE CustomerID = ? AND ShopManagerID = ? AND ProductSupplierID = ? AND ProductID = ?`
        , [CustomerID, ShopManagerID, ProductSupplierID, ProductID]);

      // return res1[0];
      if (res1[0] != undefined) {
        let error = 'Product exist already.';
        return new Promise((resolve, reject) =>
          resolve({ error })
        );
      }
      const Num = 1;

      const [result, fields3] = await connection.execute('INSERT INTO Cart (CustomerID, ShopManagerID, ShopID, ProductSupplierID, ProductID, Num, Price) VALUES (?, ?, ?, ?, ?, ?, ? )'
        , [CustomerID, ShopManagerID, ShopID, ProductSupplierID, ProductID, Num, Price]);
      await connection.commit();

      return new Promise((resolve, reject) =>
        resolve({ error: '' })
      );
    } catch (err) {
      connection.rollback();
      let error = 'Error in adding product.';
      return new Promise((resolve, reject) =>
        resolve({ error })
      );
    }
  }

  // delete cart  
  async function deleteCart(deleteObj) {
    const { CustomerID, ShopID, ProductSupplierID, ProductID } = deleteObj;

    const [result, fields] = await connection.execute(` DELETE
                            FROM Cart
                            WHERE CustomerID = ? AND ShopID = ? AND ProductSupplierID = ? AND ProductID = ?`,
      [CustomerID, ShopID, ProductSupplierID, ProductID]);


    let error = 'Error in deleting product in cart.'
    if (result != undefined) {
      error = '';
    }
    return new Promise((resolve, reject) =>
      resolve({ error })
    );
  }

  // hisNumber 
  async function getHistoryNum(parameters) {
    const { CustomerID } = parameters
    var [numHid, fields] = await connection.execute(` SELECT  COUNT(DISTINCT HistoryID) AS temp
                            FROM  Trade_History 
                            WHERE CustomerID = ?` , [CustomerID]);
    var s = JSON.stringify(numHid[0].temp);
    numHid = JSON.parse(s);

    return new Promise((resolve, reject) =>
      resolve({ numHid })
    );
  }

  // history ( page : 1 ~ x ) 
  async function history(parameters) {
    const { CustomerID, page } = parameters
    // count HistoryID index
    const index = page - 1;

    // get HistoryID's number
    // const numHid = await getHistoryNum({ CustomerID: CustomerID });

    await connection.beginTransaction();
    try {
      // take specified HistoryID
      const [res, fields] = await connection.execute(`  SELECT  distinct HistoryID
                            FROM  Trade_History 
                            WHERE CustomerID = ?
                            ORDER BY HistoryID DESC` , [CustomerID]);
      const hid = res[index].HistoryID;

      // count totalPrice & get Time
      var [tp_time, fields1] = await connection.execute(`SELECT  SUM(Num * Price) AS tp, DATE_FORMAT(Time, '%Y-%m-%d %H:%i:%s') as Time
                            FROM  Trade_History 
                            WHERE CustomerID = ? AND HistoryID = ?
                            GROUP BY Time` , [CustomerID, hid]);
      // console.log(tp_time)
      var s = JSON.stringify(tp_time[0].tp);
      var totalPrice = JSON.parse(s);
      s = JSON.stringify(tp_time[0].Time);
      var Time = JSON.parse(s);

      const [temp_data, fields2] = await connection.execute(`  SELECT Product.Name AS ProductName, Shop.Name AS ShopName, Num, Price
                                  FROM ( Trade_History LEFT JOIN Product ON Trade_History.ProductSupplierID = Product.SupplierID 
                                        AND Trade_History.ProductID = Product.ProductID ) LEFT JOIN Shop ON Trade_History.ShopID = Shop.ShopID
                                  WHERE CustomerID = ? AND HistoryID = ?` , [CustomerID, hid]);
      // console.log(temp_data)
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

      await connection.commit();
      return new Promise((resolve, reject) =>
        resolve({ data })
      );
    } catch (err) {
      connection.rollback();
      let error = 'Error in history.';
      return new Promise((resolve, reject) =>
        resolve({ error })
      );
    }
  }

  // +(cart) 
  async function addProductNumInCart(data) {
    const { CustomerID, ShopID, ProductSupplierID, ProductID } = data;

    const [result, fields] = await connection.execute(` UPDATE Cart
                            SET Num = ( Num + 1 )
                            WHERE CustomerID = ? AND ShopID = ? AND ProductSupplierID = ? 
                            AND ProductID = ?`, [CustomerID, ShopID, ProductSupplierID, ProductID]);

    let error = 'Error in increasing number of product.';
    if (result != undefined) {
      error = '';
    }
    return new Promise((resolve, reject) =>
      resolve({ error })
    );
  }

  // -(cart) 
  async function subtractProductNumInCart(data) {
    const { CustomerID, ShopID, ProductSupplierID, ProductID } = data;

    const [result, fields] = await connection.execute(` UPDATE Cart
                            SET Num = ( Num - 1 )
                            WHERE CustomerID = ? AND ShopID = ? AND ProductSupplierID = ? 
                            AND ProductID = ?`, [CustomerID, ShopID, ProductSupplierID, ProductID]);

    let error = 'Error in decreasing number of product.';
    if (result != undefined) {
      error = '';
    }
    return new Promise((resolve, reject) =>
      resolve({ error })
    );
  }

  // buy 
  async function buy(data) {
    const { CustomerID } = data;
    let error = 'You have nothing in your cart.';

    await connection.beginTransaction();
    try {
      // take all the products of this customer in cart 
      const [res1, fields] = await connection.execute(` SELECT *
                            FROM Cart 
                            WHERE CustomerID = ?` , [CustomerID]);
      if (res1.length == 0) {
        return { error };
      }

      // find max hid
      var [h, fields1] = await connection.execute(`SELECT MAX(HistoryID) as hh
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
        await connection.execute(` INSERT INTO Trade_History (CustomerID, ShopManagerID, ShopID, ProductSupplierID, ProductID,  HistoryID, Num, Price)
                              VALUES (?,?,?,?,?,?,?,?)`,
          [cid, mid, shopid, supplierid, pid, hid, num, price]);

        // delete data in cart
        await connection.execute(`DELETE
              FROM Cart
              WHERE CustomerID = ? AND ShopID = ? AND ProductSupplierID = ? AND ProductID = ?`,
          [cid, shopid, supplierid, pid]);

        // update for_sell.num
        await connection.execute(`UPDATE For_Sell
              SET Num = (Num - ?)
              WHERE  ShopID = ? AND ProductSupplierID = ? 
              AND ProductID = ?`, [num, shopid, supplierid, pid]);

        // update shop.totalRevenue
        await connection.execute(`UPDATE Shop
              SET TotalRevenue = (TotalRevenue + (? * ?) )
              WHERE  ShopID = ? `, [num, price, shopid]);



      }
      await connection.commit();
      error = '';
      return new Promise((resolve, reject) =>
        resolve({ error })
      );

    } catch (err) {

      connection.rollback();
      let error = 'Error in buying product.';
      return new Promise((resolve, reject) =>
        resolve({ error })
      );
    }

  }

  //===========上面田詠恩   下面倪靖揚＝＝＝＝＝＝＝

  return {
    '/register/Customer': createNewCustomer,
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



