const express = require('express');
const router = express.Router();
const { Order } = require('../models/order');

router.get('/get', (req, res, next) => {
    const user = req.query.user;
    Order.find({user})
        .then(orders => {
            res.status(200).json({
                message: 'Orders fetched successfully',
                orders: orders
            });
            console.log(orders);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Fetching orders failed'
            });
        });
});

module.exports = router;