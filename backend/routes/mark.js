const express = require('express');
const router = express.Router();


module.exports = function(globalVariables){

  // shard function
  const shard = globalVariables.shard 


  router.get('/searchProduct', async function(req, res, next) {
    try {
      //res.json(mark.searchProduct(req.query.shopID, req.query.type ,req.query.page));

      //let keyNum = Math.floor(Math.random()*2)%2
      let result = await shard(0, '/searchProduct', { shopID:req.query.shopID, type:req.query.type , page:req.query.page})
      res.json(result)

    } catch(err) {
      console.error(`Error while getting product `, err.message);
      next(err);
    }
  });


  router.post('/register/Customer', async function(req, res, next) {
    try {
      let result = await shard(0, '/register/Customer',req.body)
      res.json(result);
      
    } catch(err) {
      console.error(`Error while adding customer `, err.message);
      next(err);
    }
  });

  // router.post('/register/Manager', function(req, res, next) {
  //   try {
  //     res.json(mark.createNewManager(req.body));
  //   } catch(err) {
  //     console.error(`Error while adding Manager `, err.message);
  //     next(err);
  //   }
  // });

  // router.get('/existCustomer', function(req, res, next) {
  //   try{
  //     res.json(mark.checkCustomer(req.query.email))
  //   }
    
  //   catch(err) {
  //     console.error(`email exist `, err.message);
  //     next(err);
  //   }
    
  // })

  router.get('/existManager', async function(req, res, next) {
    try{
     // res.json(mark.checkManager(req.query.email))
     let result = await shard(0, '/existManager', { email:req.query.email })
     res.json(result)
    }
    
    catch(err) {
      console.error(`email exist `, err.message);
      next(err);
    }
    
  })

  return router

}



