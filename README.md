# Online_Shopping_System
## 系統說明
- 線上購物系統
- 買家可以註冊帳號並在網站上選購商品
- 賣家可從生產商進貨，並上架賣給消費者，並有後台管理系統可以管理自己的商城

## 系統功能需求
- 買家
  1. 可以在賣場搜尋商品種類，商家名稱，並把商品加入購物車
  2.	可從購物車刪除已選擇的商品
  3.	在購物車裡可以選擇商品數量並購買
  4.	購買後的商品可在歷史紀錄裡查看
  5. 可以與賣家溝通
<br/><br/>
- 賣家
  1.	可訂商品到指定倉庫
  2.	可從倉庫選擇商品上架販賣
  3.	可確認倉庫和架上貨品狀態
  4.	可查看出售紀錄
  5.	可以查看時間內營業額
  6.  可以與買家溝通
<br/><br/>

## Use Case Diagram
![use case diagram](./image/use_case_diagram.png)

## Architecture Diagram
![architecture](./image/architecture.png)

## Package Diagram
![package](./image/shard_express.png)
![chat_pak_diagram](./image/chat_pak_diagram.png)

## Sequence Diagram
![chat_seq_diagram](./image/chat_seq_diagram.png)


## 系統操作

- 主頁 (Home)
![home](./image/home.png)

- 買家登入 
![buylist](./image/customerLogin.png)

- 選購商品
![](./image/product.png)

- 購物車
![](./image/cart.png)

- 購買紀錄
![](./image/customerBuyHistory.png)
<br/><br/><br/>

- 賣家登入
![](./image/managerLogin.png)

- 倉儲管理
![](./image/productManage.png)

- 訂貨紀錄
![](./image/orderHistory.png)

- 交易紀錄
![](./image/tradeHistory.png)

- 向生產商進貨
![](./image/orderList.png)

- 查看營業額
![](./image/revenue.png)

<br/><br/><br/>
## ER Model
![](./image/er-model.jpeg)

<br/><br/><br/>
## Relational Schema
![](./image/relationalSchema.png)

<br/><br/><br/>

# 安裝執行
- create database of MySQL 
<br/> 
  by running the script below
  ```
  some script
  ```

- go to backend/config.js to set your MySQL setting
  ```javascript
  database_config:{
      host: 'localhost',
      user: 'root',
      password:  'yourPassword',
      database: 'relation'
    }
  ```

- create database of mongoDB 
<br/>

  first, insall mongodb
  ```console
  brew install mongodb
  ```
  second, create db named dis_sys in mongodb
  ```console
  > use dis_sys
    switched to db dis_sys
  ```
  running the script below
  ```console
  node ./backend/chat_service/test/insert_data_for_test.js
  ```
  and you should have a collection in "dis_sys" which name is "chat"

- first install PM2 globally
  <br/>
  run as root
  ```
  npm i -g pm2
  ```
  or if user is sudo-er
  ```
  sudo npm i -g pm2
  ```
- go to backend directory and run
  ```
  npm install
  ```
  after installing the modules, run command below in backend
  ```
  pm2 start process.json
  ```
  



