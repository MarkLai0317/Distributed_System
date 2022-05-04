const db = require('../services/db'); // dp 裡的function 用ㄌㄞquery 和 改資料的
const listPerPage = 10

//manager revenue
function Revenue(ManagerID){
  // return ManagerID;

  const data= db.query(`SELECT Time,Price
                        from Trade_History
                        where ShopManagerID= ?
                        ORDER BY Time`,[ManagerID]);
  return {data};
}
//manager tradehistory
function TradeHistory(ManagerID,page=1){
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
function Shop(ManagerID){
  const data=db.query(`select Product.Name as ProductName,Product.SupplierID,For_Sell.Num
                       ,For_Sell.Price from Product,
                       For_Sell where For_Sell.ProductSupplierID=Product.SupplierID and 
                       For_Sell.ProductID=Product.ProductID and For_Sell.ShopManagerID= ?`,[ManagerID])
  return{data};
}
// manager OrderHistory
function OrderHistory(ManagerID){
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
function GetHave(ManagerID){
  const data = db.query(`SELECT Have.ProductID,Have.ProductSupplierID as SupplierID,Product.Name as ProductName
                         ,Have.Num,Have.StoreHouseID
                         from Have,Product
                         where Have.ShopManagerID= ? and Have.ProductSupplierID=Product.SupplierID
                         and Have.ProductID=Product.ProductID`,[ManagerID])
  return {data};
}
function GetForSale(ManagerID){
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

module.exports = {
  Revenue,
  TradeHistory,
  Shop,
  OrderHistory,
  Order,
  CreateNewManager,
  GetStoreHouseID,
  GetHave,
  GetForSale,
  PriceChange
}
