const {Op} = require("sequelize");
const {OrderStatus, CargoType} = require("../models");

module.exports.statusHandler = (queryOptions, query) => {
    if (query) queryOptions["where"]["status"] = OrderStatus.getOrderStatusKey(query);
    return queryOptions;
};

module.exports.cargoTypeHandler = (queryOptions, query) => {
    if (query) queryOptions["where"]["$cargos.type$"] = CargoType.getCargoTypeKey(query);
    return queryOptions;
};

module.exports.rangeHandler = (queryOptions, query, key) => {
    queryOptions["where"][key] = {};
    if (typeof query === "object")
        if (query["start"] && query["end"])
            queryOptions["where"][key][Op.between] = [query["start"], query["end"]];
        else if (query["start"])
            queryOptions["where"][key][Op.gte] = query["start"];
        else if (query["end"])
            queryOptions["where"][key][Op.lte] = query["end"];
    return queryOptions;
};

module.exports.searchHandler = (queryOptions, query) => {
    queryOptions["where"][Op.or] = [
        {"$order.title$": {[Op.like]: `%${query}%`}},
        {"$order.description$": {[Op.like]: `%${query}%`}},
        {"$cargos.title$": {[Op.like]: `%${query}%`}},
        {"$cargos.description$": {[Op.like]: `%${query}%`}},
        {"$requirements.requirement$": {[Op.like]: `%${query}%`}},
    ];
    return queryOptions;
};

module.exports.rangeDateHandler = (queryOptions, query) => {
    queryOptions["where"]["$route.route_from$"] = {};
    if (typeof query === "object")
        if (query["start"] && query["end"]) {
            queryOptions["where"]["$route.route_from$"] =
                query["start"] === query["end"]
                    ? {[Op.eq]: query["end"]}
                    : {[Op.between]: [query["start"], query["end"]]};
        } else if (query["start"])
            queryOptions["where"]["$route.route_from$"][Op.gte] = query["start"];
        else if (query["end"])
            queryOptions["where"]["$route.route_from$"][Op.lte] = query["end"];
    return queryOptions;
};