const {
    User,
    OrderRequirement,
    Cargo,
    Route,
    RouteDistance,
    RouteDuration,
    Point,
    Location,
    Address
} = require("../models");

module.exports.userInclude = [
    {model: User, as: "customer"},
    {model: User, as: "winner"},
];

module.exports.requirementInclude = [
    {model: OrderRequirement, as: "requirements"},
];

module.exports.cargoInclude = [
    {model: Cargo, as: "cargos"},
];

module.exports.routeInclude = [
    {
        model: Route,
        as: "route",
        include: [
            {model: RouteDistance, as: "route_distance"},
            {model: RouteDuration, as: "route_duration"},
            {
                model: Point,
                as: "points",
                include: [
                    {model: Location, as: "location"},
                    {model: Address, as: "point_address"},
                ],
            },
        ],
    },
];
