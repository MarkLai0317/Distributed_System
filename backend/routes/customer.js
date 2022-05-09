const express = require('express');
const router = express.Router();


// shard(0) or shard(1)

module.exports = function (globalVariables) {

  const shard = globalVariables.shard

  // original mark/searchProduct
  router.get('/searchProduct', async function (req, res, next) {
    try {
      //res.json(mark.searchProduct(req.query.shopID, req.query.type ,req.query.page));

      let keyNum = Math.floor(Math.random() * 2) % 2
      let result = await shard(keyNum, '/searchProduct', { shopID: req.query.shopID, type: req.query.type, page: req.query.page })
      res.json(result)

    } catch (err) {
      console.error(`Error while getting product `, err.message);
      next(err);
    }
  });

  //original mark/register/Customer
  router.post('/register/Customer', async function (req, res, next) {
    try {
      let keyNum = Math.floor(Math.random() * 2) % 2
      let result = await shard(keyNum, '/register/Customer', req.body)
      res.json(result);

    } catch (err) {
      console.error(`Error while adding customer `, err.message);
      next(err);
    }
  });

  //original mark/existCustomer
  router.get('/existCustomer', async function (req, res, next) {
    try {
      let keyNum = Math.floor(Math.random() * 2) % 2
      let result = await shard(keyNum, '/existCustomer', { email: req.query.email })
      res.json(result)
    }

    catch (err) {
      console.error(`email exist `, err.message);
      next(err);
    }

  })

  //  ---- nn customer ----
  //  Customer: show all shopID and shopName 
  router.get('/getShopList', async function (req, res, next) {
    try {
      let keyNum = Math.floor(Math.random() * 2) % 2
      let result = await shard(keyNum, '/getShopList', null)
      res.json(result)
    } catch (err) {
      console.error(`Error while getting product `, err.message);
      next(err);
    }
  });

  // Customer: show all product.type
  router.get('/getType', async function (req, res, next) {
    try {
      let keyNum = Math.floor(Math.random() * 2) % 2;
      let result = await shard(keyNum, '/getType', null)
      res.json(result);
    } catch (err) {
      console.error(`Error while getting product `, err.message);
      next(err);
    }
  });

  //  customer maxPage
  router.get('/maxPage', async function (req, res, next) {
    try {
      let keyNum = Math.floor(Math.random() * 2) % 2
      let result = await shard(keyNum, '/maxPage', { ShopID: req.query.ShopID, Type: req.query.Type })
      res.json(result);
    } catch (err) {
      console.error(`Error while getting product `, err.message);
      next(err);
    }
  });

  //   Customer: search product
  router.get('/searchProduct', async function (req, res, next) {
    try {
      let keyNum = Math.floor(Math.random() * 2) % 2
      let result = await shard(keyNum, '/searchProduct', { ShopID: req.query.ShopID, Type: req.query.Type, page: req.query.page })
      res.json(result);
    } catch (err) {
      console.error(`Error while getting product `, err.message);
      next(err);
    }
  });

  // Customer: click Cart
  router.get('/clickCart', async function (req, res, next) {
    try {
      let keyNum = Math.floor(Math.random() * 2) % 2
      let result = await shard(keyNum, '/maxPage', { CustomerID: req.query.CustomerID })
      res.json(result);
    } catch (err) {
      console.error(`Error while getting product `, err.message);
      next(err);
    }
  });

  // Customer: add to Cart
  router.post('/add', async function (req, res, next) {
    try {
      let keyNum = Math.floor(Math.random() * 2) % 2
      let result = await shard(keyNum, '/add', req.body)
      res.json(result);
    } catch (err) {
      console.error(`Error while adding product `, err.message);
      next(err);
    }
  });

  // Customer: delete product in Cart
  router.post('/deleteCart', async function (req, res, next) {
    try {
      let keyNum = Math.floor(Math.random() * 2) % 2
      let result = await shard(keyNum, '/deleteCart', req.body)
      res.json(result);
    } catch (err) {
      console.error(`Error while adding product `, err.message);
      next(err);
    }
  });

  // Customer: getHistoryNum
  router.get('/getHistoryNum', async function (req, res, next) {
    try {
      let keyNum = Math.floor(Math.random() * 2) % 2
      let result = await shard(keyNum, '/getHistoryNum', { CustomerID: req.query.CustomerID })
      res.json(result);
    } catch (err) {
      console.error(`Error while getting historyNum `, err.message);
      next(err);
    }
  });

  // Customer: history
  router.get('/history', async function (req, res, next) {
    try {
      let keyNum = Math.floor(Math.random() * 2) % 2
      let result = await shard(keyNum, '/history', { CustomerID: req.query.CustomerID, page: req.query.page })
      res.json(result);
    } catch (err) {
      console.error(`Error while getting tradeHistory `, err.message);
      next(err);
    }
  });

  // Customer: +(cart)
  router.post('/addProductNumInCart', async function (req, res, next) {
    try {
      let keyNum = Math.floor(Math.random() * 2) % 2
      let result = await shard(keyNum, '/addProductNumInCart', req.body)
      res.json(result);
    } catch (err) {
      console.error(`Error while adding product `, err.message);
      next(err);
    }
  });

  // Customer: -(cart)
  router.post('/subtractProductNumInCart', async function (req, res, next) {
    try {
      let keyNum = Math.floor(Math.random() * 2) % 2
      let result = await shard(keyNum, '/subtractProductNumInCart', req.body)
      res.json(result);
    } catch (err) {
      console.error(`Error while adding product `, err.message);
      next(err);
    }
  });

  // Customer: buy
  router.post('/buy', async function (req, res, next) {
    try {
      let keyNum = Math.floor(Math.random() * 2) % 2
      let result = await shard(keyNum, '/buy', req.body)
      res.json(result);
    } catch (err) {
      console.error(`Error while adding product `, err.message);
      next(err);
    }
  });



  //===========上面田詠恩   下面倪靖揚＝＝＝＝＝＝＝




  return router

}