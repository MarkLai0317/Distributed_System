const express = require('express');
const router = express.Router();


//shard(2)


module.exports = function (globalVariables) {

  const shard = globalVariables.shard

  // original mark/register/Manager
  router.post('/register/Manager', async function (req, res, next) {
    try {

      let result = await shard(2, '/register/Manager', req.body)
      res.json(result);
    } catch (err) {
      console.error(`Error while adding Manager `, err.message);
      next(err);
    }
  });

  // original mark/existManager
  router.get('/existManager', async function (req, res, next) {
    try {
      // res.json(mark.checkManager(req.query.email))
      let result = await shard(2, '/existManager', { email: req.query.email })
      res.json(result)
    }

    catch (err) {
      console.error(`email exist `, err.message);
      next(err);
    }

  })


  // ------- nn manager ---------
  // Manager: orderButton
  router.post('/orderButton', async function (req, res, next) {
    try {
      let result = await shard(2, '/orderButton', req.body)
      res.json(result);
    } catch (err) {
      console.error(`Error while adding product `, err.message);
      next(err);
    }
  });

  // Manager: pageOrderHistory
  router.get('/pageOrderHistory', async function (req, res, next) {
    try {
      let result = await shard(2, '/pageOrderHistory', { ManagerID: req.query.ManagerID, page: req.query.page })
      res.json(result);
    } catch (err) {
      console.error(`Error while getting product `, err.message);
      next(err);
    }
  });

  // Manager: pageTradeHistory
  router.get('/pageTradeHistory', async function (req, res, next) {
    try {
      let result = await shard(2, '/pageTradeHistory', { ManagerID: req.query.ManagerID, page: req.query.page })
      res.json(result);
    } catch (err) {
      console.error(`Error while getting product `, err.message);
      next(err);
    }
  });

  // Manager: forSale
  router.post('/forSell', async function (req, res, next) {
    try {
      let result = await shard(2, '/forSell', req.body)
      res.json(result);
    } catch (err) {
      console.error(`Error while adding product `, err.message);
      next(err);
    }
  });

  // Manager: deleteForSell
  router.post('/deleteForSell', async function (req, res, next) {
    try {
      let result = await shard(2, '/deleteForSell', req.body)
      res.json(result);
    } catch (err) {
      console.error(`Error while adding product `, err.message);
      next(err);
    }
  });





  //===========上面田詠恩   下面倪靖揚＝＝＝＝＝＝＝

  router.get('/Revenue', async function(req, res, next) {
    try {
      let result = await shard(2, '/Revenue', { ManagerID: req.query.ManagerID})
      res.json(result);
    } catch(err) {
      console.error(`Error while getting revenue `, err.message);
      next(err);
    }
  });

  router.get('/TradeHistory', async function(req, res, next) {
    try {
      let result = await shard(2, '/TradeHistory', { ManagerID: req.query.ManagerID, page: req.query.page})
      res.json(result);
    } catch(err) {
    console.error(`Error while getting trade_history `, err.message);
    next(err);
    }  
  });

  router.get('/Shop', async function(req, res, next) {
    try {
      let result = await shard(2, '/Shop', { ManagerID: req.query.ManagerID})
      res.json(result);
    } catch(err) {
    console.error(`Error while getting shop `, err.message);
    next(err);
    }  
  });

  router.get('/OrderHistory',async function(req, res, next) {
    try {
      let result = await shard(2, '/OrderHistory', { ManagerID: req.query.ManagerID})
      res.json(result);
    } catch(err) {
    console.error(`Error while getting order_history `, err.message);
    next(err);
    }  
  });

  router.get('/Order', async function(req, res, next) {
    try {
      let result = await shard(2, '/Order', null)
      res.json(result);
    } catch(err) {
    console.error(`Error while getting order `, err.message);
    next(err);
    }  
  });

  router.post('/register/Manager', async function(req, res, next) {
  try {
    let result = await shard(2, '/register/Manager', req.body)
    res.json(result);
  } catch(err) {
    console.error(`Error while adding Manager `, err.message);
    next(err);
  }
  });

  router.get('/GetStoreHouseID',async function(req, res, next) {
  try {
    let result = await shard(2, '/GetStoreHouseID', null)
    res.json(result);
  } catch(err) {
  console.error(`Error while getting StoreHouseID `, err.message);
  next(err);
  }  
  });

  router.get('/GetHave',async function(req, res, next) {
  try {
    let result = await shard(2, '/GetHave', { ManagerID: req.query.ManagerID})
    res.json(result);
  } catch(err) {
  console.error(`Error while getting Have `, err.message);
  next(err);
  }  
  });

  router.get('/GetForsale',async function(req, res, next) {
  try {
    let result = await shard(2, '/GetForsale', { ManagerID: req.query.ManagerID})
    res.json(result);
  } catch(err) {
  console.error(`Error while getting ForSale `, err.message);
  next(err);
  }  
  });

  router.post('/PriceChange',async function(req, res, next) {
  try {
    let result = await shard(2, '/PriceChange', req.body)
    res.json(result);
  } catch(err) {
    console.error(`Error while changing price `, err.message);
    next(err);
  }
  });


  return router

}
