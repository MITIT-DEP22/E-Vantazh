const {findAllOrders} = require("../services/order.service");
const {getQueryOptions} = require("../../utils/order.filter");

module.exports.getAllOrders = async (req, res) => {
    const query = req.query;
    const queryOptions = getQueryOptions(query);

    try {
        const orders = await findAllOrders(queryOptions);
        orders.length > 0
            ? res.status(200).json(orders)
            : res.status(404).json({message: "Orders not found"});
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).json({message: err.message});
    }
}