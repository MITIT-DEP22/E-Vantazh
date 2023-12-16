import React, {FC} from "react";
import {Navigate, Outlet} from "react-router-dom";
import userStore from "../../entities/user/store/userStore";
import {observer} from "mobx-react-lite";
import {RouterNames} from "../../shared/enums/RouterNames";

export const RequireAuth: FC = observer(() => {
    const {isAuth} = userStore
    return (
        isAuth
            ?
            <Outlet/>
            :
            <Navigate to={RouterNames.AUTH}/>
    )
});
