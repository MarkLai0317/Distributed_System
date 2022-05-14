//const db = require('../services/db-shard.js'); // dp 裡的function 用ㄌㄞquery 和 改資料的



module.exports = function (connection) {

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

  //manager revenue
  function Revenue(parameters){
    // return ManagerID;
    const { ManagerID} = parameters
    const data= db.query(`SELECT Time,Price
                          from Trade_History
                          where ShopManagerID= ?
                          ORDER BY Time`,[ManagerID]);
    return {data};
  }
  //manager tradehistory
  function TradeHistory(parameters){
    const { ManagerID, page } = parameters
    const offset = (page - 1) * listPerPage;
    let data=[];
    const hid= db.query(`select Trade_History.HistoryID
                          ,Trade_History.Price,Trade_History.CustomerID,Trade_History.Num
                          from Trade_History,Product
                          where Trade_History.ShopManagerID= ? and 
                          Trade_History.ProductSupplierID=Product.SupplierID and 
                          Trade_History.ProductID=Product.ProductID
                          GROUP BY Trade_History.HistoryID
                          `,[ManagerID])
    for(i=0;i<hid.length;i++){
      
      var HID=JSON.stringify(hid[i].HistoryID);
      //Integer.parseInt(jsonObj.get("data[i].HistoryID"));
      let product= db.query(`select Trade_History.Time,Product.Name as ProductName,Trade_History.Num
                              ,Price
                              from Trade_History,
                              Product where Trade_History.ShopManagerID= ? and 
                              Trade_History.ProductSupplierID=Product.SupplierID and 
                              Trade_History.ProductID=Product.ProductID and Trade_History.HistoryID= ? `
                              ,[ManagerID,HID])
      var price=0;
      for(j=0;j<product.length;j++){
        price+=product[j].Price*product[j].Num;
      }                         
      data.push({HistoryID:hid[i].HistoryID,
      TotalPrice:price,
      CustomerID:hid[i].CustomerID,
      Receipt:[]
      })                         
      data[i].Receipt=product
    
    }
    //const meta = {page};  
    return {data};
    
  }
  //manager shop
  function Shop(parameters){
    const { ManagerID} = parameters
    const data=db.query(`select Product.Name as ProductName,Product.SupplierID,For_Sell.Num
                        ,For_Sell.Price from Product,
                        For_Sell where For_Sell.ProductSupplierID=Product.SupplierID and 
                        For_Sell.ProductID=Product.ProductID and For_Sell.ShopManagerID= ?`,[ManagerID])
    return{data};
  }
  // manager OrderHistory
  function OrderHistory(parameters){
    const { ManagerID} = parameters
    const data= db.query(`select OrderHistoryID,Order_History.Time,Product.Name as ProductName
                          ,Order_History.Num,Supplier.Name as SupplierName
                          from Order_History,Product,Supplier
                          where Order_History.ProductSupplierID=Product.SupplierID and 
                          Order_History.ProductID=Product.ProductID and Product.SupplierID=Supplier.SupplierID and ShopManagerID= ?
                          ORDER BY OrderHistoryID DESC
                          `,[ManagerID])
    return{data}
  }
  //manager order
  function Order(){
    const data= db.query(`select *
                          from Product
                          `,[])
    //const meta={page};
    return{data}
  }

  //manager create account
  function CreateNewManager(data){
    
    const {Email,Name, PhoneNum,ShopName} = data;
    const count=db.query(`select * from Manager `,[]);
    const shopp=db.query(`select * from Shop`,[]);
    for(i=0;i<count.length;i++){
      if(Email==count[i].ManagerID){
        let error='This Email exists already.';
        return {error};
      }
      if(Name==count[i].Name){
        let error='This Name exists already.';
        return {error};
      }
      if(PhoneNum==count[i].PhoneNum){
        let error='This Phone Number exists already.';
        return {error};
      }
      
    }
    for(i=0;i<shopp.length;i++){
      if(ShopName==shopp[i].Name){
        let error='This Shop-Name exists already.';
        return {error};
      }}//
    const result = db.run(`INSERT INTO Manager (ManagerID, Name, PhoneNum) VALUES (@Email, @Name, @PhoneNum)`
                          ,{Email,Name, PhoneNum});
    
    
    var max =db.query(`SELECT MAX(ShopID) as mm from Shop`,[])
    var s = JSON.stringify(max[0].mm);
    var ShopID = JSON.parse(s);
    ShopID=ShopID+1;
    db.run(`INSERT INTO Shop(ManagerID,ShopID,Name,TotalRevenue) VALUES (@Email,@ShopID,@ShopName, 0)`
                            ,{Email,ShopID,ShopName});
    let error='Error in creating Manager';
    
      if (result.changes) {
        error='';
    }
    return {error};
  }
  function GetStoreHouseID(){
    const data = db.query(`SELECT StoreHouseID
                          from Store_House
                          
                          `,[])
    return {data};
  }
  function GetHave(parameters){
    const { ManagerID } = parameters
    const data = db.query(`SELECT Have.ProductID,Have.ProductSupplierID as SupplierID,Product.Name as ProductName
                          ,Have.Num,Have.StoreHouseID
                          from Have,Product
                          where Have.ShopManagerID= ? and Have.ProductSupplierID=Product.SupplierID
                          and Have.ProductID=Product.ProductID`,[ManagerID])
    return {data};
  }
  function GetForSale(parameters){
    const { ManagerID} = parameters
    const data = db.query(`SELECT For_Sell.ProductID,For_Sell.ProductSupplierID as SupplierID
                          ,Product.Name as ProductName,For_Sell.Price,For_Sell.Num
                          from For_Sell,Product
                          where For_Sell.ShopManagerID= ? and For_Sell.ProductSupplierID=Product.SupplierID
                          and For_Sell.ProductID=Product.ProductID`,[ManagerID])
    return {data};
  }
  function PriceChange(data){
    const{ManagerID,ProductID,SupplierID,Price}=data;
    const result=db.run(`UPDATE For_Sell SET Price= @Price 
            where ShopManagerID= @ManagerID and ProductSupplierID= @SupplierID and ProductID= @ProductID
            `,{Price,ManagerID,SupplierID,ProductID})
    let error='Error in changing price';
    
      if (result.changes) {
        error='';
    }
    return {error};
    
  }

  return {
    '/register/Manager': createNewManager,
    '/existManager': checkManager,
    '/orderButton': orderButton,
    '/pageOrderHistory': pageOrderHistory,
    '/pageTradeHistory': pageTradeHistory,
    '/forSell': forSell,
    '/deleteForSell': deleteForSell,
    '/Revenue' : Revenue,
    '/TradeHistory' : TradeHistory,
    '/Shop' : Shop,
    '/Order_History' : OrderHistory,
    '/Order' : Order,
    '/GetStoreHouseID' : GetStoreHouseID,
    '/GetHave' : GetHave,
    '/GetForsale' : GetForSale,
    '/PriceChange' : PriceChange
  }

}
