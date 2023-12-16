import React, {FC, useEffect, useState} from 'react';
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {Operator} from "../../../entities/operator/model/type";

interface IOperator {
    operator: Operator
}

export const OperatorCard:FC<IOperator> = ({operator}) => {
    return (
        <div className="card p-3" style={{width: '20rem'}}>
                <img src={`https://46.219.127.6:9999/images/${operator?.image?.fileName}`} style={{width: '285px', height: '260px'}} className="card-img-top" alt="фото"/>
                <div className="card-body">
                    <h5 className="card-title">{`${operator.lastName} ${operator.firstName}`}</h5>
                    <p className="card-text">Організація: {`${operator.companyName}`}</p>
                    <p className="card-text">Кількість виконаних замовлень: {`${operator.countOfOrders}`}</p>
                    <p className="card-text">
                        {
                            // @ts-ignore
                            Array(5).fill().map((_, index) => (
                                <i className={`bi bi-star-fill ${operator.rating > index? 'text-success' : ''}`}></i>
                            ))
                        }
                    </p>
                    <Nav.Link className={"rounded-pill w-75  pb-2 pt-2 border border-success bg-white  text-center"}>
                        <Link className={"text-decoration-none text-success w-auto h5 h-auto"}
                              to={`/operators/${operator.id}`}>Детальніше</Link>
                    </Nav.Link>
                </div>
        </div>
    );
};