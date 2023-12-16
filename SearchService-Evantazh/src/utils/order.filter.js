const {statusHandler, cargoTypeHandler, rangeHandler, searchHandler, rangeDateHandler} = require("./filter.handler");
const includeModels = require("./include.model");

const mapOptions = {
    "status": (queryOptions, query) => statusHandler(queryOptions, query),
    "cargoType": (queryOptions, query) => cargoTypeHandler(queryOptions, query),
    "rangePrice": (queryOptions, query) => rangeHandler(queryOptions, query, "price"),
    "rangeMinimalStep": (queryOptions, query) => rangeHandler(queryOptions, query, "minimal_step"),
    "rangeDate": (queryOptions, query) => rangeDateHandler(queryOptions, query),
    "_search": (queryOptions, query) => searchHandler(queryOptions, query),
};

const getQueryOptions = (query) => {
    let queryOptions = {
        include: Object.values(includeModels).flat(),
        where: {}
    };

    Object.keys(query)
        .map(queryKey => mapOptions[queryKey]
            ? Object.assign(queryOptions, mapOptions[queryKey](queryOptions, query[queryKey]))
            : {}
        );

    return queryOptions;
};

module.exports = {getQueryOptions};