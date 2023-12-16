import React, {FC} from 'react';
import {Driver} from "../../entities/driver/model/driver";
import driverStore from "../../entities/driver/store/driverStore";

interface IDriverCard {
    driver:Driver
    deleteDriver:(driver:Driver) => void
}

const DriverCard:FC<IDriverCard> = ({driver, deleteDriver}) => {
    console.log(driver)
    return (
        <div className={'col-3 border-success rounded-3 border h-auto' +
            ' d-flex flex-column gap-2 align-items-center justify-content-center p-4'}>
            <i className="bi bi-person-fill display-1 text-success"></i>
            <div><strong>Прізвище:</strong>{` ${driver.surname}`}</div>
            <div><strong>Ім'я:</strong>{` ${driver.name}`}</div>
            <div><strong>Тип ліцензії:</strong>{` ${driver.typeOfLicense}`}</div>
            <button type="button" className="btn btn-outline-success rounded-pill px-4" onClick={() => deleteDriver(driver)}>Видалити</button>
        </div>
    );
};

export default DriverCard;