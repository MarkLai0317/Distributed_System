const express = require('express');
const router = express.Router();


//shard(2)


module.exports = function(globalVariables){

  const shard = globalVariables.shard 

  // original mark/register/Manager
  router.post('/register/Manager', async function(req, res, next) {
    try {

      let result = await shard(2, '/register/Manager', req.body)
      res.json(result);
    } catch(err) {
      console.error(`Error while adding Manager `, err.message);
      next(err);
    }
  });

  // original mark/existManager
  router.get('/existManager', async function(req, res, next) {
    try{
     // res.json(mark.checkManager(req.query.email))
     let result = await shard(2, '/existManager', { email:req.query.email })
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