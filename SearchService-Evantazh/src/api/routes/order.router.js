const router = require("express").Router();
const OrderController = require("../controllers/order.controller");

router.get("/", OrderController.getAllOrders);

module.exports = router;