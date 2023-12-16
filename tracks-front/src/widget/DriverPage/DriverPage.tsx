import React, {useEffect, useState} from 'react';
import DriverCard from "../DriverCard/DriverCard";
import {Driver} from "../../entities/driver/model/driver";
import driverStore from "../../entities/driver/store/driverStore";
import userStore from "../../entities/user/store/userStore";
import ModalDriverCreate from "../../feature/ModalDriverCreate/ModalDriverCreate";

const DriverPage = () => {
    const [driverShow, setDriverShow] = useState(false);
    const [drivers, setDrivers] = useState<Driver[]>([])


    useEffect(() => {
        driverStore.getDrivers().then(res => {
            res && setDrivers(res)
        })
    },[])
    return (
        <div>

        </div>
    );
};

export default DriverPage;