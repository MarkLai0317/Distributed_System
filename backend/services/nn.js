const db = require('../services/db'); // dp 裡的function 用ㄌㄞquery 和 改資料的
const listPerPage = 10;

// customer show all shopName ------------------
function getShopList() {
  const data = db.query(`SELECT distinct ShopID, Name as ShopName 
                         FROM Shop`, []);
  return { data };
}

// customre: getType  -------------------------
function getType() {
  const data = db.query(`SELECT distinct  Type 
                         FROM For_Sell LEFT JOIN Product ON Product.ProductID = For_Sell.ProductID 
                         AND Product.SupplierID = For_Sell.ProductSupplierID`, []);
  return { data };
}

// customer maxPage --------------------------
function maxPage(ShopID, Type) {

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


// customer search product  ---------------------------
function searchProduct(ShopID, Type, page = 1) {
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

// customer click Cart  -------------------------
function clickCart(CustomerID) {
  const data = db.query(`SELECT Product.Name AS Name, Cart.ProductID, Cart.ProductSupplierID, Cart.Price AS Price, Cart.ShopID, Cart.Num AS NumberInCart, 
                                For_Sell.Num AS RemainNumber
                          FROM Cart LEFT JOIN For_Sell ON For_Sell.ShopID = Cart.ShopID 
                                AND For_Sell.ProductSupplierID = Cart.ProductSupplierID
                                AND For_Sell.ProductID = Cart.ProductID 
                                LEFT JOIN Product ON Cart.ProductSupplierID = Product.SupplierID AND Cart.ProductID = Product.ProductID
                          WHERE Cart.CustomerID = ?` , [CustomerID]);
  return { data };
}

// add prouduct to cart ----------------------
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

// delete cart  ------------------------------
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

// hisNumber -------------------------------
function getHistoryNum(CustomerID) {
  var numHid = db.query(` SELECT  COUNT(DISTINCT HistoryID) AS temp
                          FROM  Trade_History 
                          WHERE CustomerID = ?` , [CustomerID]);
  var s = JSON.stringify(numHid[0].temp);
  numHid = JSON.parse(s);

  return numHid;
}

// history ( page : 1 ~ x ) ---------------------
function history(CustomerID, page) {
  // count HistoryID index
  const index = page - 1;

  // get HistoryID's number
  const numHid = getHistoryNum(CustomerID);

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

// +(cart) -------------------------------------------
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

// -(cart) -----------------------------------------
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

// buy -----------------------------------------
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

// ---------------------------------------- Manager Part -----------------------------------------------------
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

// pageOrderHistory ---------------------------------
function pageOrderHistory(ManagerID, page = 1) {
  const offset = (page - 1) * listPerPage;
  const data = db.query(` SELECT Time, OrderHistoryID, Product.Name AS ProductName, Supplier.Name AS SupplierName, Num
                          FROM ( Order_History LEFT JOIN Product ON Order_History.ProductSupplierID = Product.SupplierID 
                          AND Order_History.ProductID = Product.ProductID ) LEFT JOIN Supplier ON Product.SupplierID = Supplier.SupplierID
                          WHERE ShopManagerID = ?
                          LIMIT ?, ?` , [ManagerID, offset, listPerPage]);
  return { data };
}

// pageTradeHistory ---------------------------------
function pageTradeHistory(ManagerID, page = 1) {
  const offset = (page - 1) * listPerPage;
  const data = db.query(` SELECT Time, HistoryID, Product.Name AS ProductName, Price, Num
                          FROM ( Trade_History LEFT JOIN Product ON Trade_History.ProductSupplierID = Product.SupplierID 
                          AND Trade_History.ProductID = Product.ProductID ) 
                          WHERE ShopManagerID = ?
                          LIMIT ?, ?` , [ManagerID, offset, listPerPage]);
  return { data }
}

// forSale -------------------------------------
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

// deleteForSell -------------------------------
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

module.exports = {
  getShopList, getType, getHistoryNum, maxPage, deleteCart,
  searchProduct, clickCart, add, history, addProductNumInCart, subtractProductNumInCart, buy,
  orderButton, pageOrderHistory, pageTradeHistory, forSell,
  deleteForSell
}
