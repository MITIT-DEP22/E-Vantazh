const router = require("express").Router();

router.use("/orders", require("./order.router"));

module.exports = router;