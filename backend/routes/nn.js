const express = require('express');
const router = express.Router();
const nn = require('../services/nn');

//  Customer: show all shopID and shopName 
router.get('/getShopList', function (req, res, next) {
    try {
        res.json(nn.getShopList());
    } catch (err) {
        console.error(`Error while getting product `, err.message);
        next(err);
    }
});
// Customer: show all product.type
router.get('/getType', function (req, res, next) {
    try {
        res.json(nn.getType());
    } catch (err) {
        console.error(`Error while getting product `, err.message);
        next(err);
    }
});

//  customer maxPage
router.get('/maxPage', function (req, res, next) {
    try {
        res.json(nn.maxPage(req.query.ShopID, req.query.Type));
    } catch (err) {
        console.error(`Error while getting product `, err.message);
        next(err);
    }
});

//   Customer: search product
router.get('/searchProduct', function (req, res, next) {
    try {
        res.json(nn.searchProduct(req.query.ShopID, req.query.Type, req.query.page));
    } catch (err) {
        console.error(`Error while getting product `, err.message);
        next(err);
    }
});

// Customer: click Cart
router.get('/clickCart', function (req, res, next) {
    try {
        res.json(nn.clickCart(req.query.CustomerID));
    } catch (err) {
        console.error(`Error while getting product `, err.message);
        next(err);
    }
});

// Customer: add to Cart
router.post('/add', function (req, res, next) {
    try {
        res.json(nn.add(req.body));
    } catch (err) {
        console.error(`Error while adding product `, err.message);
        next(err);
    }
});

// Customer: delete product in Cart
router.post('/deleteCart', function (req, res, next) {
    try {
        res.json(nn.deleteCart(req.body));
    } catch (err) {
        console.error(`Error while adding product `, err.message);
        next(err);
    }
});

// Customer: getHistoryNum
router.get('/getHistoryNum', function (req, res, next) {
    try {
        res.json(nn.getHistoryNum(req.query.CustomerID));
    } catch (err) {
        console.error(`Error while getting historyNum `, err.message);
        next(err);
    }
});

// Customer: history
router.get('/history', function (req, res, next) {
    try {
        res.json(nn.history(req.query.CustomerID, req.query.page));
    } catch (err) {
        console.error(`Error while getting tradeHistory `, err.message);
        next(err);
    }
});

// Customer: +(cart)
router.post('/addProductNumInCart', function (req, res, next) {
    try {
        res.json(nn.addProductNumInCart(req.body));
    } catch (err) {
        console.error(`Error while adding product `, err.message);
        next(err);
    }
});

// Customer: -(cart)
router.post('/subtractProductNumInCart', function (req, res, next) {
    try {
        res.json(nn.subtractProductNumInCart(req.body));
    } catch (err) {
        console.error(`Error while adding product `, err.message);
        next(err);
    }
});

// Customer: buy
router.post('/buy', function (req, res, next) {
    try {
        res.json(nn.buy(req.body));
    } catch (err) {
        console.error(`Error while adding product `, err.message);
        next(err);
    }
});

// ----------------------------------------------------------------------------
// Manager: orderButton
router.post('/orderButton', function (req, res, next) {
    try {
        res.json(nn.orderButton(req.body));
    } catch (err) {
        console.error(`Error while adding product `, err.message);
        next(err);
    }
});

// Manager: pageOrderHistory
router.get('/pageOrderHistory', function (req, res, next) {
    try {
        res.json(nn.pageOrderHistory(req.query.ManagerID, req.query.page));
    } catch (err) {
        console.error(`Error while getting product `, err.message);
        next(err);
    }
});

// Manager: pageTradeHistory
router.get('/pageTradeHistory', function (req, res, next) {
    try {
        res.json(nn.pageTradeHistory(req.query.ManagerID, req.query.page));
    } catch (err) {
        console.error(`Error while getting product `, err.message);
        next(err);
    }
});

// Manager: forSale
router.post('/forSell', function (req, res, next) {
    try {
        res.json(nn.forSell(req.body));
    } catch (err) {
        console.error(`Error while adding product `, err.message);
        next(err);
    }
});

// Manager: deleteForSell
router.post('/deleteForSell', function (req, res, next) {
    try {
        res.json(nn.deleteForSell(req.body));
    } catch (err) {
        console.error(`Error while adding product `, err.message);
        next(err);
    }
});


module.exports = router;