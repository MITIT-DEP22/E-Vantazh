import React, {useEffect, useState} from 'react';
import {OrderSearchBlock} from "../../widget/OrderSearchBlock";
import {Pagination} from "react-bootstrap";
import {CurrentOrderBlock} from "../../widget/CurrentOrderBlock";
import {observer} from "mobx-react-lite";
import {Order} from "../../entities/order/model/types";
import userStore from "../../entities/user/store/userStore";
import ordersStore from "../../entities/order/store/OrdersStore";


const CurrentOrdersPage = observer(() => {

    const [active, setActive] = useState(1)
    const {isLoading, orders} = ordersStore


    const newOrder = (_orders: Order[]) => {
        ordersStore.setOrders(_orders)
    }

    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item onClick={() => setActive(number)} key={number} active={number === active}
                             linkStyle={number === active ? {
                                 background: '#6f42c1',
                                 border: '#6f42c1'
                             } : {color: '#6f42c1'}}>
                {number}
            </Pagination.Item>,
        );
    }
    useEffect(() => {
        console.log(JSON.stringify(orders[0]))
    }, [isLoading]);

    useEffect(() => {
        ordersStore.getOrders()
    }, [userStore.isAuth]);

    return (
        <>
            <div className={'p-5 d-flex flex-column align-items-center justify-content-center gap-5'}>
                <div className={'container'}>
                    <div className={'row w-auto row-cols-2'}>
                        <div className={'col w-100 '}>
                            <OrderSearchBlock newOrder={newOrder}/>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row w-auto row-cols-2 g-3">
                        {!isLoading &&
                            orders.map(order => (
                                <CurrentOrderBlock order={order}/>
                            ))
                        }
                    </div>
                </div>
                <div className="w-100 h-auto d-flex justify-content-center">
                    <Pagination>{items}</Pagination>
                </div>
            </div>
        </>
    );
});

export default CurrentOrdersPage;