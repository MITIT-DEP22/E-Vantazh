import React from 'react';
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import createNewOrderStore from "../../../entities/order/store/CreateNewOrderStore";

const DateForm = observer(() => {
    return (
        <Container className={"bg-secondary p-3 rounded-3"}>
            <p className={"fs-4 fw-bold"}>
                Введіть дати для завантаження і відвантаження перевезення:
            </p>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">Дата завантаження:</Form.Label>
                        <Form.Control onChange={(e) => {
                            createNewOrderStore.newOrder.route.route_from = new Date(e.target.value)
                            console.log(JSON.stringify(createNewOrderStore.newOrder.route.route_from))
                        }} as={"input"} type={"date"}
                                      id="disabledTextInput"/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">Дата відвінтаження:</Form.Label>
                        <Form.Control onChange={(e) => {
                            createNewOrderStore.newOrder.route.route_to = new Date(e.target.value)
                            console.log(JSON.stringify(createNewOrderStore.newOrder.route.route_to))

                        }} as={"input"} type={"date"}
                                      id="disabledTextInput"/>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    );
});

export default DateForm;