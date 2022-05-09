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




  return router

}