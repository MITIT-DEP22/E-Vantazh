import React, {useEffect, useState} from 'react';
import {Tabs, Tab, Row, Col, Table} from "react-bootstrap";
import {Driver} from "../../entities/driver/model/driver";
import driverStore from "../../entities/driver/store/driverStore";
import DriverCard from "../../widget/DriverCard/DriverCard";
import ModalDriverCreate from "../../feature/ModalDriverCreate/ModalDriverCreate";
import userStore from "../../entities/user/store/userStore";
import {observer} from "mobx-react-lite";
import UserData from "../../widget/UserData/UserData";
import Container from "react-bootstrap/Container";
import CarItem from "../../widget/CarPark/CarItem";
import ModalCarCreate from "../../feature/ModalCarCreate/ModalCarCreate";
import {Vehicle} from "../../entities/vehicle/model/types";
import vehicleStore from "../../entities/vehicle/store/vehicleStore";
import ordersStore from "../../entities/order/store/OrdersStore";
import {Order} from "../../entities/order/model/types";

const ProfilePage = () => {
    const [drivers, setDrivers] = useState<Driver[]>([])
    const [vehicles, setVehicles] = useState<Vehicle[]>()
    const [carShow, setCarShow] = useState(false);
    const [driverShow, setDriverShow] = useState(false);
    const {isLoading, orders} = ordersStore
    const [table, setTable] = useState<Order[]>()


    useEffect(() => {
        driverStore.getDrivers().then(res => {
            res && setDrivers(res)
        }).then(() => {
            vehicleStore.getVehicles().then((res) => {
                setVehicles(res)
            })
        }).then(()=> {
            ordersStore.getOrders()
        }).then(() => {
            const data = ordersStore.orders.filter(order => order?.customer?.id === userStore?.user?.id)
            setTable(data)
        })
    }, [userStore.isAuth, ordersStore.orders])

    const deleteDriver = (driver: Driver) => {
        driverStore.deleteDriver(driver).then(() => {
            driverStore.getDrivers().then(res => {
                res && setDrivers(res)
            })
        })
    }

    return (
        <div className={'w-100 h-100 p-5'}>
            <Tabs
                defaultActiveKey="data"
                id="justify-tab-example"
                className="mb-3 text-success"
                justify
            >
                <Tab eventKey="data" title="Дані" className={'w-100'}>
                    <div
                        style={{height: 'min-content', display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <UserData/>
                    </div>
                </Tab>
                <Tab eventKey="car_park" title="Автопарк" className={'w-100'}>
                    <div
                        style={{height: 'min-content', display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <div className={'w-100 h-auto d-flex justify-content-xxl-start'}>
                            <button type="button" className="btn btn-outline-success rounded-pill px-4"
                                    onClick={() => setCarShow(true)}>Додати
                            </button>
                        </div>
                        <Container className="mt-4">
                            <Row>
                                {vehicles?.map((car) => (
                                    <Col key={car.digits} md={4}>
                                        <CarItem car={car}/>
                                    </Col>
                                ))}

                                {vehicles && vehicles.length === 0 &&
                                    <div
                                        style={{height: 300}}
                                        className={" w-100 border rounded rounded-4 shadow border-success border-2 bg-secondary d-flex flex-col justify-content-center align-items-center"}>
                                        <p className={"fw-bold fs-2 text-success"}>Уппс, у вас ще немає транспорту</p>
                                    </div>
                                }
                            </Row>
                        </Container>
                        <ModalCarCreate show={carShow} onHide={() => setCarShow(false)}/>
                    </div>
                </Tab>
                <Tab eventKey="drivers" title="Водії" className={'w-100'}>
                    <div
                        style={{height: 'min-content', display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <div className={'w-100 h-auto d-flex justify-content-xxl-start'}>
                            <button type="button" className="btn btn-outline-success rounded-pill px-4"
                                    onClick={() => setDriverShow(true)}>Додати
                            </button>
                        </div>
                        <div className={'container p-5'}>
                            <div className={'row d-flex gap-2 justify-content-center'}>
                                {drivers?.map((driver, index) => (
                                    <DriverCard driver={driver} deleteDriver={deleteDriver}/>
                                ))}
                            </div>

                            {drivers && drivers.length === 0 &&
                                <div
                                    style={{height: 300}}
                                    className={" w-100 border rounded rounded-4 shadow border-success border-2 bg-secondary d-flex flex-col justify-content-center align-items-center"}>
                                    <p className={"fw-bold fs-2 text-success"}>Уппс, у вас ще немає водіїв</p>
                                </div>
                            }

                        </div>

                        <ModalDriverCreate
                            show={driverShow}
                            onHide={() => setDriverShow(false)}
                            onDriverChange={(driver: Driver) => {
                                driver.operator = userStore.user
                                driverStore.createDriver(driver)
                                    .then(() => {
                                        driverStore.getDrivers().then(res => {
                                            res && setDrivers(res)
                                        })
                                    })
                                    .catch(err => console.log(err))
                                setDriverShow(false)
                            }}
                        />

                    </div>
                </Tab>
                <Tab eventKey="orders" title="Замовлення" className={'w-100'}>
                    <div
                        style={{height: 'min-content', display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>Назва</th>
                                <th>Вартість замовлення</th>
                                <th>Замовник</th>
                                <th>Дата замовлення</th>

                            </tr>
                            </thead>
                            <tbody>
                            {table?.map((value, index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{value?.title}</td>
                                        <td>{value?.price} UAN</td>
                                        <td>{`${value?.customer.lastName} ${value?.customer.firstName}`}</td>
                                        <td>{value?.tenderStart.toString().split('T')[0]}</td>
                                    </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
};

export default observer(ProfilePage);