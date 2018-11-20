const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
//5bc9c1a9a79cb0389cdb77ee
const OrdersController = require('../controllers/orders')
router.get('/',OrdersController.orders_get_all);

router.post('/',OrdersController.orders_create_order);

router.get('/:orderId',OrdersController.orders_get_order);

router.delete('/:orderId',checkAuth,OrdersController.orders_delete_order);
module.exports = router;