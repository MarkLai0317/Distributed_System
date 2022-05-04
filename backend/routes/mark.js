const express = require('express');
const router = express.Router();
const mark = require('../services/mark');

router.get('/searchProduct', function(req, res, next) {
  try {
    res.json(mark.searchProduct(req.query.shopID, req.query.type ,req.query.page));
  } catch(err) {
    console.error(`Error while getting product `, err.message);
    next(err);
  }
});


router.post('/register/Customer', function(req, res, next) {
  try {
    res.json(mark.createNewCustomer(req.body));
  } catch(err) {
    console.error(`Error while adding customer `, err.message);
    next(err);
  }
});

router.post('/register/Manager', function(req, res, next) {
  try {
    res.json(mark.createNewManager(req.body));
  } catch(err) {
    console.error(`Error while adding Manager `, err.message);
    next(err);
  }
});

router.get('/existCustomer', function(req, res, next) {
  try{
    res.json(mark.checkCustomer(req.query.email))
  }
  
  catch(err) {
    console.error(`email exist `, err.message);
    next(err);
  }
  
})

router.get('/existManager', function(req, res, next) {
  try{
    res.json(mark.checkManager(req.query.email))
  }
  
  catch(err) {
    console.error(`email exist `, err.message);
    next(err);
  }
  
})


module.exports = router;