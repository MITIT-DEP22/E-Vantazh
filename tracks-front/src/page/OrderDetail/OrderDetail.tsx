import React, {useEffect, useState} from 'react';
import {Order} from "../../entities/order/model/types";
import {observer} from "mobx-react-lite";
import {$api} from "../../app/http";
import {ClipLoader} from "react-spinners";
import {useParams} from "react-router";
import Countdown from "../../feature/Countdown/Countdown";
import {RouteRequest} from "../../entities/map/models/map-request";
import {CargoType} from "../../shared/enums/CargoTypes";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import {PersonCircle} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import {RouterNames} from "../../shared/enums/RouterNames";


const OrderDetail = observer(() => {

    const {id} = useParams()
    const [order, setOrder] = useState<Order>({} as Order)
    const [isLoading, setIsLoading] = useState(true)
    const [route, setRoute] = useState<RouteRequest>()
    const [isLoadingRoute, setIsLoadingRoute] = useState<boolean>(true)


    useEffect(() => {
        $api.get(`/orders/${id}`).then(res => {
            setOrder(res.data)
            console.log(res.data)
        }).then(() => {
            setIsLoading(false)
        }).catch(e => {
            console.log(e)
        })
    }, []);


    useEffect(() => {
        $api.get(`/routes/${order.routeId}`).then((res) => {
            setRoute(res.data)
            console.log(res.data)
        }).then(() => {
            setIsLoadingRoute(false)
        }).catch(e => {
            console.log(e)
        })
    }, [isLoading]);

    return (
        <div className="container mb-5">
            {isLoading ?
                <div className={"d-flex align-items-center justify-content-center vh-100 w-100"}>
                    <ClipLoader
                        color={"#3333"}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
                :
                <>
                    <div className="text-center h1 my-5">Замовлення</div>

                    <div className="p-4 bg-secondary rounded-2 position-relative" style={{border: "1px solid #727272"}}>
                        <div className="mb-4">
                            <strong>Замовник:</strong> {order.customer?.lastName} {order.customer?.firstName}
                        </div>
                        <div className="mb-4"><strong>Деталі маршруту: </strong></div>
                        <Container>
                            <Row>
                                <Col>
                                    <div className="d-flex mb-4">
                                        <div className="border-end border-1 border-black pe-5">
                                            {route && route.points.map(item => (
                                                <div className="d-flex align-items-center mb-3">
                                                    <i className="bi bi-geo-alt text-success display-6"></i>
                                                    <div className="ms-3">{item.formatted_address}</div>
                                                </div>
                                            ))}

                                        </div>
                                        {
                                            order.route &&
                                            <div className="ps-5">
                                                <div style={{height: "48px"}}
                                                     className="d-flex align-items-center mb-3">{order.route.route_from.toLocaleString()}</div>
                                                <div style={{height: "48px"}}
                                                     className="d-flex align-items-center mb-3">{order.route.route_to.toLocaleString()}</div>
                                            </div>

                                        }
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <div className="mb-2"><strong>Транспортний засіб: </strong></div>
                                        <div className="d-flex">
                                            <div className="pe-4 border-end border-1 border-black">
                                                <div>Вимоги транспорту</div>
                                            </div>
                                            <div className="ps-4">
                                                <div className={"d-flex gap-2 flex-wrap m-1 mt-2"}>
                                                    {order.requirements?.map(req => (
                                                        <div
                                                            className={"bg-success rounded p-1 d-flex gap-1 text-white"}>
                                                            <span>{req.requirement}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                {(CargoType as any)[order.cargos[0].type].status === 'alive' &&
                                                    <div>{order.cargos[0].passengersCapacity}</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>

                        <div className="d-flex flex-wrap gap-5 mb-4">
                            {order.cargos.map(cargo => (
                                <div className={"border border-success rounded p-3"}>
                                    <div className="mb-2"><strong>Вантаж</strong></div>
                                    <div className={"d-flex gap-4 mt-3"}>
                                        <p><strong>Найменування вантажу</strong></p>
                                        <p>{cargo.title}</p>
                                    </div>

                                    <div className={"d-flex gap-4 mt-2"}>
                                        <p><strong>Опис вантажу</strong></p>
                                        <p>{cargo.description}</p>
                                    </div>
                                    <div className="d-flex">
                                        <div className="pe-4 border-end border-1 border-black">
                                            <div>Тип вантажу</div>
                                            {(CargoType as any)[cargo.type].status === "not alive" &&
                                                <>
                                                    <div>Вага:</div>
                                                    <div>Об’єм:</div>
                                                    <div>Довжина:</div>
                                                    <div>Ширина:</div>
                                                    <div>Висота:</div>
                                                </>
                                            }
                                            {(CargoType as any)[cargo.type].status === 'alive' &&
                                                <div>К-ть пасажирських місць</div>
                                            }
                                        </div>
                                        <div className="ps-4">
                                            <div>{(CargoType as any)[cargo.type].name}</div>
                                            {(CargoType as any)[cargo.type].status === "not alive" &&
                                                <>
                                                    <div>{cargo.weight} т</div>
                                                    <div>{cargo.volume} м3</div>
                                                    <div>{cargo.dimensionLength} м</div>
                                                    <div>{cargo.dimensionWidth} м</div>
                                                    <div>{cargo.dimensionHeight} м</div>
                                                </>
                                            }
                                            {(CargoType as any)[cargo.type].status === 'alive' &&
                                                <div>{cargo.passengersCapacity}</div>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mb-4">Встановлена перевізником вартість: {order.price} UAH</div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="text-decoration-underline"><strong>Коментарі:</strong></div>

                            <Link to={RouterNames.AUCTION} className="p-2 rounded-5 bg-secondary text-success"
                                  style={{textDecoration: "none", border: "1px solid #727272"}}>
                                Прийняти замовлення
                            </Link>
                        </div>

                        <div className="row mb-4 pb-4 border-black border-bottom border-1">
                            <div className="col-3">
                                <PersonCircle className="me-3" size={48}/>
                                Оператор 8
                            </div>
                            <div className="col d-flex flex-column">
                                <textarea className="w-100 rounded-2 mb-2 p-2" rows={5}
                                          placeholder="Текст повідомлення"/>
                                <button className="p-2 rounded-5 bg-secondary ms-auto"
                                        style={{border: "1px solid #727272", width: "115px"}}>Надіслати
                                </button>
                            </div>
                        </div>

                        <div className="row mb-4 pb-4 border-black border-bottom border-1">
                            <div className="col-3">
                                <PersonCircle className="me-3" size={48}/>
                                Оператор 7
                            </div>
                            <div className="col-9 d-flex align-items-center justify-content-end text-muted">
                                12 січня 2022 року
                            </div>
                            <div className="ms-auto col-9">
                                <div className="mb-4">
                                    Reinforced toecap and back made of thermoplastic material in Alligator tactical
                                    boots will provide protection from injuries, which is very important in the
                                    conditions of operation of military and tourist shoes. The loops of quick lacing
                                    will allow you to quickly put on and take off the boots without any problems, and
                                    the optimal height of the boots is very convenient both when walking and, for
                                    example, when staying in the "shooting from the knee"
                                </div>
                                <button className="p-2 rounded-5 bg-secondary"
                                        style={{border: "1px solid #727272", width: "115px"}}>Відповісти
                                </button>
                            </div>
                        </div>

                        <div className="row mb-4 pb-4 border-black border-bottom border-1">
                            <div className="col-3">
                                <PersonCircle className="me-3" size={48}/>
                                Оператор 1
                            </div>
                            <div className="col-9 d-flex align-items-center justify-content-end text-muted">
                                12 січня 2022 року
                            </div>
                            <div className="ms-auto col-9">
                                <div className="mb-4">
                                    Reinforced toecap and back made of thermoplastic material in Alligator tactical
                                    boots will provide protection from injuries, which is very important in the
                                    conditions of operation of military and tourist shoes. The loops of quick lacing
                                    will allow you to quickly put on and take off the boots without any problems, and
                                    the optimal height of the boots is very convenient both when walking and, for
                                    example, when staying in the "shooting from the knee"
                                </div>
                                <button className="p-2 rounded-5 bg-secondary"
                                        style={{border: "1px solid #727272", width: "115px"}}>Відповісти
                                </button>
                            </div>
                        </div>

                        <div className="row mb-4 pb-4 border-black border-bottom border-1">
                            <div className="col-3">
                                <PersonCircle className="me-3" size={48}/>
                                Оператор 2
                            </div>
                            <div className="col-9 d-flex align-items-center justify-content-end text-muted">
                                12 січня 2022 року
                            </div>
                            <div className="ms-auto col-9">
                                <div className="mb-4 border-bottom border-1 border-black pb-4">
                                    Reinforced toecap and back made of thermoplastic material in Alligator tactical
                                    boots will provide protection from injuries, which is very important in the
                                    conditions of operation of military and tourist shoes. The loops of quick lacing
                                    will allow you to quickly put on and take off the boots without any problems, and
                                    the optimal height of the boots is very convenient both when walking and, for
                                    example, when staying in the "shooting from the knee"
                                </div>

                                <div>
                                    <div className="mb-2"><strong>Напишіть відповідь</strong></div>
                                    <textarea className="rounded-2 mb-2 p-2 w-100" placeholder="Текст повідомлення"
                                              rows={5}></textarea>
                                    <button className="p-2 rounded-5 bg-secondary ms-auto"
                                            style={{border: "1px solid #727272", width: "115px"}}>Надіслати
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="position-absolute top-0 end-0 p-4">
                            <div className="d-flex gap-2">
                                <div className="d-flex gap-2 align-items-center rounded-2 px-2"
                                     style={{border: "1px solid #727272"}}>
                                    <i className="bi bi-calendar-check fs-4"></i>
                                    {isLoadingRoute ?
                                        <>
                                            <ClipLoader
                                                color={"#3333"}
                                                size={20}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        </>
                                        :
                                        <div>
                                            {route && route.route_from.toLocaleString().split("T")[0]} - {route && route.route_to.toLocaleString().split("T")[0]}
                                        </div>
                                    }
                                </div>
                                <div className="d-flex gap-2 align-items-center rounded-2 px-2"
                                     style={{border: "1px solid #727272"}}>
                                    <i className="bi bi-coin fs-4"></i>
                                    {order.price}
                                </div>
                                <div className="d-flex gap-2 align-items-center rounded-2 px-2"
                                     style={{border: "1px solid #727272"}}>
                                    <i className="bi bi-eye fs-4"></i>
                                    {order.minimalStep}
                                </div>
                                <div className="d-flex gap-2 align-items-center rounded-2 px-2"
                                     style={{border: "1px solid #727272"}}>
                                    <i className="bi bi-clock-history fs-4"></i>
                                    <Countdown targetDate={new Date(order.tenderStart)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
});

export default OrderDetail;
