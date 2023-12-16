import React from 'react';
import createNewOrderStore from "../../../entities/order/store/CreateNewOrderStore";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import {CargoType} from "../../../shared/enums/CargoTypes";
import {useNavigate} from "react-router";
import {RouterNames} from "../../../shared/enums/RouterNames";

const ResultForm = observer(() => {
    const {newOrder: order} = createNewOrderStore
    const navigate = useNavigate()
    return (
        <div>

            <div className="container">
                <div className="text-center h1 my-5">Перевірте сформоване замовлення</div>

                <div className="p-4 bg-secondary rounded-2 position-relative" style={{border: "1px solid #727272"}}>

                    <div className="mb-4">
                        <strong>Замовник:</strong> {order.customer?.lastName} {order.customer?.firstName}
                    </div>

                    <Container>
                        <Row>
                            <Col>
                                <div className="mb-4"><strong>Встановлена вартість:</strong> {order.price} UAH</div>
                            </Col>
                            <Col>
                                <div className="mb-4"><strong>Мінімальний шаг на
                                    аукціоні:</strong> {order.minimalStep} UAH
                                </div>

                            </Col>

                        </Row>

                        <Row>
                            <Col>
                                <div className="mb-4"><strong>Назва тендеру:</strong> {order.title}</div>

                            </Col>

                            <Col>
                                <div className="mb-4"><strong>Опис тендеру:</strong> {order.description}</div>

                            </Col>
                        </Row>
                    </Container>

                    <div className="mb-4"><strong>Деталі маршруту: </strong></div>
                    <div className="d-flex mb-4">
                        <div className="border-end border-1 border-black pe-5">
                            {order.route && order.route.points.map(item => (
                                <div className="d-flex align-items-center mb-3">
                                    <i className="bi bi-geo-alt text-success display-6"></i>
                                    <div className="ms-3">{item.formatted_address}</div>
                                </div>
                            ))}

                        </div>
                        {
                            order.route && (
                                (order.route.route_from && order.route.route_to) &&
                                <div className="ps-5">
                                    <div style={{height: "48px"}}
                                         className="d-flex align-items-center mb-3">{order.route.route_from.toLocaleString()}</div>
                                    <div style={{height: "48px"}}
                                         className="d-flex align-items-center mb-3">{order.route.route_to.toLocaleString()}</div>
                                </div>
                            )
                        }
                    </div>
                    {createNewOrderStore.newOrder.cargos.map((cargo, index) => (
                        <div className="d-flex gap-5 mb-4">
                            {index + 1}.
                            <div>
                                <div className="mb-2"><strong>Вантаж</strong></div>
                                <div className="mb-2">{cargo.title}</div>
                                <div className="d-flex">
                                    <div className="pe-4 border-end border-1 border-black">
                                        <div>Тип вантажу</div>
                                        {
                                            (CargoType as any)[cargo.type]?.status !== "alive" &&
                                            <>
                                                <div>Вага:</div>
                                                <div>Об’єм:</div>
                                                <div>Довжина:</div>
                                                <div>Ширина:</div>
                                                <div>Висота:</div>
                                            </>
                                        }
                                    </div>
                                    <div className="ps-4">
                                        <div>{(CargoType as any)[cargo.type]?.name}</div>
                                        {
                                            cargo.type?.status !== "alive" &&
                                            <>
                                                <div>{cargo.weight}</div>
                                                <div>{cargo.volume} м3</div>
                                                <div>{cargo.dimensionLength} м</div>
                                                <div>{cargo.dimensionWidth} м</div>
                                                <div>{cargo.dimensionHeight} м</div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-2"><strong>Транспортний засіб: </strong></div>
                                <div className="d-flex">
                                    <div className="pe-4 border-end border-1 border-black">
                                        {(CargoType as any)[cargo.type]?.status === "alive" &&
                                            <div>К-ть пасажирських місць: {cargo.passengersCapacity}</div>}
                                    </div>
                                    <div className="ps-4">
                                        <div>Вимоги транспорту</div>
                                        <div className={"d-flex gap-2 flex-wrap m-1 mt-2 align-items-center"}>
                                            {order.requirements?.map(req => (
                                                <div
                                                    className={"bg-success rounded p-1 d-flex gap-1 text-white"}>
                                                    <span>{req.requirement}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className={"d-flex justify-content-center mt-2"}>
                <button className={"rounded border-0 bg-success p-2 text-white"} onClick={() => {
                    console.log(JSON.stringify(createNewOrderStore.newOrder))
                    createNewOrderStore.sendOrder().then(()=>{
                        navigate(RouterNames.HOME)
                    })
                }}>
                    Підтвердити
                </button>
            </div>
        </div>
    );
});

export default ResultForm;