import React from 'react';
import css from "./Logo.module.css"
const Logo = () => {
    return (
        <div className={css.container}>
            <img className={css.img} src={require("../../../../assets/images/logo.png")} alt=""/>
        </div>
    );
};

export default Logo;