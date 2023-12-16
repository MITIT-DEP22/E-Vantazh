import React from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {observable} from "mobx";
import {observer} from "mobx-react-lite";
import createNewOrderStore from "../../../entities/order/store/CreateNewOrderStore";
import {FileService} from "../../../entities/file/fileService/FileService";

const ProzzoroForm = observer(() => {

    return (
        <Form>
            <p className={"fs-3 fw-bold"}>
                Вкажіть деталі для Prozzorro:
            </p>
            <Container fluid>
                <Row className={"mt-4"}>
                    <Col className={"h-100"}>
                        <fieldset className={"bg-secondary p-3 rounded-3"}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput">Назва тендеру:</Form.Label>
                                <Form.Control onChange={e => {
                                    createNewOrderStore.newOrder.title = e.target.value
                                }} id="disabledTextInput"/>
                            </Form.Group>

                            <FloatingLabel
                                controlId="floatingTextarea"
                                label="Опис тендеру"
                                className="mb-3"
                            >
                                <Form.Control
                                    onChange={e => {
                                        createNewOrderStore.newOrder.description = e.target.value
                                    }}
                                    as="textarea" style={{minHeight: 100}} placeholder="Введіть опис тендеру"/>
                            </FloatingLabel>


                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput">Стартова ціна:</Form.Label>
                                <Form.Control onChange={e => {
                                    createNewOrderStore.newOrder.price = Number(e.target.value)
                                }} as={"input"} type={"number"} id="disabledTextInput"
                                              placeholder="Стартова ціна"/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="disabledTextInput">Мінімальний шаг ціни:</Form.Label>
                                <Form.Control onChange={e => {
                                    createNewOrderStore.newOrder.minimalStep = Number(e.target.value)
                                }} as={"input"} type={"number"} id="disabledTextInput"
                                              placeholder="Мінімальний шаг"/>
                            </Form.Group>
                            <div className={"d-flex flex-wrap"}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="disabledTextInput">Прикріпити файл:</Form.Label>
                                    <Form.Control
                                        onChange={e=>{
                                            FileService.sendFile().then(()=>{

                                            })
                                        }}
                                        className={""} as={"input"} type={"file"} id="disabledTextInput"/>
                                </Form.Group>
                            </div>
                        </fieldset>

                    </Col>
                </Row>
            </Container>
        </Form>
    );
});

export default ProzzoroForm;