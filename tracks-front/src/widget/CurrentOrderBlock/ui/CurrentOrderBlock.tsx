import React, {FC, useEffect, useState} from 'react';
import {Order} from "../../../entities/order/model/types";
import {RouteRequest} from "../../../entities/map/models/map-request";
import {$api} from "../../../app/http";
import {ClipLoader} from "react-spinners";
import {Link} from "react-router-dom";
import {RouterNames} from "../../../shared/enums/RouterNames";
import Countdown from "../../../feature/Countdown/Countdown";

interface OrderProps {
    order: Order
}

export const CurrentOrderBlock: FC<OrderProps> = ({order}) => {

    const [route, setRoute] = useState<RouteRequest>({} as RouteRequest)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        console.log(JSON.stringify(order.id))
        $api.get(`/routes/${order.routeId}`).then((res) => {
            setRoute(res.data)
        }).then(() => {
            setIsLoading(false)
        }).catch(e => {
            console.log(e)
        })

    }, []);

    return (
        <>
            <div className={'w-auto border rounded-4 h-auto container p-3 mt-4'}>
                {isLoading ?
                    <ClipLoader
                        color={"#3333"}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    :
                    <>
                        <div className="row d-flex align-items-center justify-content-end gap-2 me-auto mb-1">
                            {!isLoading &&
                                <div
                                    className={'col-sm-au¬to rounded-3 border border-secondary d-flex align-items-center' +
                                        ' justify-content-center gap-2'}>
                                    <i className="bi bi-calendar-check"></i>
                                    {route.route_from.toLocaleString().split("T")[0]} - {route.route_to.toLocaleString().split("T")[0]}
                                </div>
                            }
                            <div className={'col-sm-auto rounded-3 border border-secondary d-flex align-items-center' +
                                ' justify-content-center gap-2'}>
                                <i className="bi bi-coin"></i>
                                {order.price} UAH
                            </div>
                            <div className={'col-sm-auto rounded-3 border border-secondary d-flex align-items-center' +
                                ' justify-content-center gap-2'}>
                                <i className="bi bi-eye"></i>
                                {order.minimalStep} UAH
                            </div>
                        </div>
                        <div className="col-sm d-flex align-items-center justify-content-end">
                            <div
                                className={'d-flex align-items-center justify-content-center gap-2 rounded-3 px-4 border border-secondary'}>
                                <i className="bi bi-clock"></i>
                                <Countdown targetDate={order.tenderStart? new Date(order.tenderStart): new Date()}/>
                            </div>
                        </div>

                        {order && order.cargos.map(cargo => (
                            <div className="row gap-5">
                                <div className="col-sm d-flex align-items-center justify-content-xxl-start gap-2">
                                    <span className={'text-'}><strong>Вантаж:</strong></span>
                                    <span>{cargo.title}</span>
                                </div>
                            </div>
                        ))
                        }

                        {!isLoading && route.points.map(point => (
                            <div className={'row'}>
                                <div className={'col d-flex align-items-center justify-content-xxl-start'}>
                                    <i className="bi bi-geo-alt text-success h4"></i>
                                    <div>{point.formatted_address}</div>
                                </div>
                            </div>
                        ))}
                        <div className={'row w-auto'}>
                            <div className={'col d-flex align-items-center justify-content-xxl-start w-auto'}>
                                <span>Замовник: <span>{order.customer.lastName} {order.customer.firstName}</span></span>

                            </div>
                            <div className={'col-sm-auto d-flex align-items-center justify-content-end'}>
                                {order.id &&
                                    <Link to={RouterNames.ORDERS + `/${order.id}`}
                                          className="btn btn-outline-success rounded-pill px-4">Детальніше
                                    </Link>
                                }
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    );
};