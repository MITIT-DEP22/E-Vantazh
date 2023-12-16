import React from 'react';
import {withProviders} from "./providers";
import {Routing} from "../page";
import {Header} from "../widget/Header";

const App = () => {
    return (
        <>
            <Header/>
            <Routing/>
        </>
    )
}

export default withProviders(App);
