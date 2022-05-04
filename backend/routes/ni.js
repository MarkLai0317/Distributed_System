const express = require('express');
const router = express.Router();
const ni = require('../services/ni');

router.get('/Revenue', function(req, res, next) {
    try {
      res.json(ni.Revenue(req.query.ManagerID));
    } catch(err) {
      console.error(`Error while getting revenue `, err.message);
      next(err);
    }
  });
router.get('/TradeHistory', function(req, res, next) {
    try {
    res.json(ni.TradeHistory(req.query.ManagerID,req.query.page));
    } catch(err) {
    console.error(`Error while getting trade_history `, err.message);
    next(err);
    }  
});
router.get('/Shop', function(req, res, next) {
    try {
    res.json(ni.Shop(req.query.ManagerID));
    } catch(err) {
    console.error(`Error while getting shop `, err.message);
    next(err);
    }  
});
router.get('/OrderHistory', function(req, res, next) {
    try {
    res.json(ni.OrderHistory(req.query.ManagerID,req.query.page));
    } catch(err) {
    console.error(`Error while getting order_history `, err.message);
    next(err);
    }  
});
router.get('/Order', function(req, res, next) {
    try {
    res.json(ni.Order());
    } catch(err) {
    console.error(`Error while getting order `, err.message);
    next(err);
    }  
});
router.post('/register/Manager', function(req, res, next) {
  try {
    res.json(ni.CreateNewManager(req.body));
  } catch(err) {
    console.error(`Error while adding Manager `, err.message);
    next(err);
  }
});
router.get('/GetStoreHouseID', function(req, res, next) {
  try {
  res.json(ni.GetStoreHouseID(req.query.ManagerID));
  } catch(err) {
  console.error(`Error while getting StoreHouseID `, err.message);
  next(err);
  }  
});
router.get('/GetHave', function(req, res, next) {
  try {
  res.json(ni.GetHave(req.query.ManagerID));
  } catch(err) {
  console.error(`Error while getting Have `, err.message);
  next(err);
  }  
});
router.get('/GetForsale', function(req, res, next) {
  try {
  res.json(ni.GetForSale(req.query.ManagerID));
  } catch(err) {
  console.error(`Error while getting ForSale `, err.message);
  next(err);
  }  
});
router.post('/PriceChange', function(req, res, next) {
  try {
    res.json(ni.PriceChange(req.body));
  } catch(err) {
    console.error(`Error while changing price `, err.message);
    next(err);
  }
});
module.exports = router;
