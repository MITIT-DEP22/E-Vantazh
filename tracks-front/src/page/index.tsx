import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {RouterNames} from "../shared/enums/RouterNames";
import HomePage from "./HomePage/HomePage";
import AuthPage from "./AuthPage/AuthPage";
import CreateOrderPage from "./CreateOrderPage/CreateOrderPage";
import CurrentOrdersPage from "./CurrentOrdersPage/CurrentOrdersPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import OperatorsPage from "./OperatorsPage/OperatorsPage";
import OperatorPage from "./OperatorPage/OperatorPage";
import OrderDetail from "./OrderDetail/OrderDetail";
import {RequireAuth} from "../app/router/requireAuth";
import AuctionPage from "./AuctionPage/AuctionPage";

export const Routing = () => {
    return (
        <Routes>
            <Route path={RouterNames.HOME} element={<HomePage/>}/>
            <Route path={RouterNames.AUTH} element={<AuthPage/>}/>
            <Route path={RouterNames.NOT_FOUND} element={<div>404</div>}/>
            <Route path={RouterNames.CREATE_ORDER} element={<CreateOrderPage/>}/>
            <Route path={RouterNames.AUCTION} element={<AuctionPage/>}/>
            <Route path={RouterNames.ORDERS} element={<CurrentOrdersPage/>}/>
            <Route path={RouterNames.ORDERS + "/:id"} element={<OrderDetail/>}/>
            <Route path={RouterNames.PROFILE} element={<ProfilePage/>}/>
            <Route path={RouterNames.OPERATORS} element={<OperatorsPage/>}/>
            <Route path={RouterNames.OPERATOR} element={<OperatorPage/>}/>

            <Route element={<RequireAuth/>}>

            </Route>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
};
