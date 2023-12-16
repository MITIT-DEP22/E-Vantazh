import React from "react";
import AuthForm from "./AuthForm";


interface Route {
    path: string;
    Component: React.ComponentType;
}

export const routes: Route[] = [
    {
        path: "/auth",
        Component: AuthForm
    }
]