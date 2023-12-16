const {
    User,
    Order,
    OrderRequirement,
    Cargo,
    Route,
    RouteDuration,
    RouteDistance,
    Point,
    Location,
    Address,
} = require("../models");

OrderRequirement.belongsTo(Order, {foreignKey: "order_id"});
Order.hasMany(OrderRequirement, {foreignKey: "order_id", as: "requirements"});

Cargo.belongsTo(Order, {foreignKey: "order_id"});
Order.hasMany(Cargo, {foreignKey: "order_id", as: "cargos"});

Order.belongsTo(User, {foreignKey: "customer_id", as: "customer"});
Order.belongsTo(User, {foreignKey: "winner_id", as: "winner"});
User.hasMany(Order, {foreignKey: "customer_id", as: "ordersAsCustomer"});
User.hasMany(Order, {foreignKey: "winner_id", as: "ordersAsWinner"});

Route.belongsTo(Order, {foreignKey: "order_id", as: "route"});
Order.hasOne(Route, {foreignKey: "order_id"});

RouteDistance.belongsTo(Route, {foreignKey: "route_id"});
RouteDuration.belongsTo(Route, {foreignKey: "route_id"});
Route.hasOne(RouteDistance, {foreignKey: "route_id", as: "route_distance"});
Route.hasOne(RouteDuration, {foreignKey: "route_id", as: "route_duration"});

Point.belongsTo(Route, {foreignKey: "route_id"});
Point.belongsTo(Location, {foreignKey: "location_id", as: "location"});
Point.belongsTo(Address, {foreignKey: "address_id", as: "point_address"});
Route.hasMany(Point, {foreignKey: "route_id", as: "points"});
Location.hasOne(Point, {foreignKey: "location_id"});
Address.hasOne(Point, {foreignKey: "address_id"});