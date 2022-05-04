const express = require('express');
const router = express.Router();


// shard(0) or shard(1)

module.exports = function(globalVariables){

  const shard = globalVariables.shard 

  // original mark/searchProduct
  router.get('/searchProduct', async function(req, res, next) {
    try {
      //res.json(mark.searchProduct(req.query.shopID, req.query.type ,req.query.page));

      let keyNum = Math.floor(Math.random()*2)%2
      let result = await shard(keyNum, '/searchProduct', { shopID:req.query.shopID, type:req.query.type , page:req.query.page})
      res.json(result)

    } catch(err) {
      console.error(`Error while getting product `, err.message);
      next(err);
    }
  });

  //original mark/register/Customer
  router.post('/register/Customer', async function(req, res, next) {
    try {
      let keyNum = Math.floor(Math.random() *2)%2
      let result = await shard(keyNum, '/register/Customer',req.body)
      res.json(result);
      
    } catch(err) {
      console.error(`Error while adding customer `, err.message);
      next(err);
    }
  });

  //original mark/existCustomer
  router.get('/existCustomer', async function(req, res, next) {
    try{
      let keyNum = Math.floor(Math.random() *2)%2
      let result = await shard(keyNum, '/existCustomer', {email: req.query.email})
      res.json(result)
    }
    
    catch(err) {
      console.error(`email exist `, err.message);
      next(err);
    }
    
  })





//===========上面田詠恩   下面倪靖揚＝＝＝＝＝＝＝




  return router

}