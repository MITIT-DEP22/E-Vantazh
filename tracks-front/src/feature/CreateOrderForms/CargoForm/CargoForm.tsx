import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import {Button, Carousel, Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {CargoType} from "../../../shared/enums/CargoTypes";
import {VehicleRequirements} from "../../../shared/enums/vehicleRequirements";
import {observer} from "mobx-react-lite";
import createNewOrderStore from "../../../entities/order/store/CreateNewOrderStore";
import {Cargo} from "../../../entities/cargo/model/types";

const CargoForm = observer(() => {
    const [rerender, setRerender] = useState(false)

    const {newOrder} = createNewOrderStore

    const forceRerender = () => {
        setRerender(!rerender)
    }

    const addCargo = () => {
        createNewOrderStore.newOrder.cargos.push({} as Cargo)
    }

    return (
        <>
            <Form>
                <p className={"fs-3 fw-bold"}>
                    Встановіть деталі вантажу та транспорту:
                </p>

                <Carousel style={{paddingLeft: "100px", paddingRight: "100px"}}
                          prevIcon={<i className=" fs-1 bi bi-caret-left-fill text-black"></i>}
                          nextIcon={<i className="bi bi-caret-right-fill text-black fs-1"></i>}>
                    {newOrder.cargos?.map((item, index) => (
                        <Carousel.Item>
                            <Container fluid>
                                <Row className={"mt-4"}>
                                    {index + 1}.
                                    <Col className={"h-100"}>
                                        <fieldset className={"bg-secondary p-3 rounded-3"}>
                                            <p className={"fs-bold"}>
                                                Вантаж
                                            </p>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="disabledTextInput">Назва вантажу:</Form.Label>
                                                <Form.Control onChange={e => {
                                                    item.title = e.target.value
                                                    createNewOrderStore.changeOrder(newOrder)
                                                }} id="disabledTextInput" placeholder="яблука і т.п.."/>
                                            </Form.Group>

                                            <FloatingLabel
                                                controlId="floatingTextarea"
                                                label="Опис"
                                                className="mb-3"
                                            >
                                                <Form.Control
                                                    onChange={e => {
                                                        item.description = e.target.value
                                                        createNewOrderStore.changeOrder(newOrder)
                                                    }} as="textarea" placeholder="Введіть опис вантажу"/>
                                            </FloatingLabel>

                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="disabledSelect">Тип вантажу:</Form.Label>
                                                <Form.Select defaultValue={-1} onChange={e => {
                                                    item.type = e.target.value
                                                    createNewOrderStore.changeOrder(newOrder)
                                                }} id="disabledSelect">
                                                    <option disabled value={-1}>Тип вантажу</option>
                                                    {Object.keys(CargoType).map((key) => (
                                                        <option value={key}>{(CargoType as any)[key].name}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            {(CargoType as any)[item.type]?.status !== "alive" &&
                                                <>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="disabledTextInput">Габарити
                                                            до:</Form.Label>
                                                        <Container>
                                                            <Row>
                                                                <Col>
                                                                    <Form.Control onChange={e => {
                                                                        item.dimensionLength = Number(e.target.value)
                                                                        createNewOrderStore.changeOrder(newOrder)
                                                                    }} as={"input"} type={"number"}
                                                                                  id="disabledTextInput"
                                                                                  placeholder="Довжина(м)"/>
                                                                </Col>
                                                                <Col>
                                                                    <Form.Control onChange={e => {
                                                                        item.dimensionWidth = Number(e.target.value)
                                                                        createNewOrderStore.changeOrder(newOrder)
                                                                    }} as={"input"} type={"number"}
                                                                                  id="disabledTextInput"
                                                                                  placeholder="Ширина(м)"/>
                                                                </Col>
                                                                <Col>
                                                                    <Form.Control onChange={e => {
                                                                        item.dimensionHeight = Number(e.target.value)
                                                                        createNewOrderStore.changeOrder(newOrder)
                                                                    }} as={"input"} type={"number"}
                                                                                  id="disabledTextInput"
                                                                                  placeholder="Висота(м)"/>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </Form.Group>

                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="disabledTextInput">Маса:</Form.Label>
                                                        <Form.Control onChange={e => {
                                                            item.weight = Number(e.target.value)
                                                            createNewOrderStore.changeOrder(newOrder)
                                                        }} as={"input"} type={"number"} id="disabledTextInput"
                                                                      placeholder="Маса(т)"/>
                                                    </Form.Group>


                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="disabledTextInput">Обʼєм:</Form.Label>
                                                        <Form.Control onChange={e => {
                                                            item.volume = Number(e.target.value)
                                                            createNewOrderStore.changeOrder(newOrder)
                                                        }} as={"input"} type={"number"} id="disabledTextInput"
                                                                      placeholder="Обʼєм(м³)"/>
                                                    </Form.Group>
                                                </>
                                            }

                                        </fieldset>

                                    </Col>
                                    <Col>
                                        <fieldset className={"bg-secondary p-3 rounded-3"}>
                                            <p className={"fs-bold"}>
                                                Транспортний засіб
                                            </p>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor="disabledSelect">Вимоги до транспорту</Form.Label>
                                                <Form.Select onChange={e => {
                                                    if (newOrder.requirements === undefined) {
                                                        newOrder.requirements = [{requirement: e.target.value}]
                                                    } else {
                                                        !newOrder.requirements.includes({requirement: e.target.value}) && newOrder.requirements.push({requirement: e.target.value})
                                                    }
                                                    createNewOrderStore.changeOrder(newOrder)
                                                    console.log(JSON.stringify(newOrder))

                                                }} id="disabledSelect">
                                                    {VehicleRequirements.map(item => (
                                                        <option value={item}>{item}</option>
                                                    ))}
                                                </Form.Select>
                                                <div className={"d-flex gap-2 flex-wrap m-1 mt-2"}>
                                                    {newOrder.requirements?.map(req => (
                                                        <div
                                                            className={"bg-success rounded p-1 d-flex gap-1 text-white"}>
                                                            <span>{req.requirement}</span>
                                                            <button type={"button"} onClick={() => {
                                                                newOrder.requirements = newOrder.requirements.filter(f => f !== req)
                                                                console.log(newOrder.requirements)
                                                                createNewOrderStore.changeOrder(newOrder)
                                                            }} className={"bg-transparent border-0 text-white"}>x
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Form.Group>


                                            {(CargoType as any)[item.type]?.status === "alive" &&
                                                <Form.Group className="mb-3">
                                                    <Form.Label htmlFor="disabledTextInput">К-ть пасажирів:</Form.Label>
                                                    <Form.Control onChange={e => {
                                                        item.passengersCapacity = Number(e.target.value)
                                                        createNewOrderStore.changeOrder(newOrder)
                                                    }} as={"input"} type={"number"} id="disabledTextInput"
                                                                  placeholder="К-ть пасс. місць"/>
                                                </Form.Group>
                                            }
                                        </fieldset>
                                    </Col>
                                </Row>
                            </Container>
                        </Carousel.Item>
                    ))}
                </Carousel>

                <div className={"d-flex justify-content-center  mt-4"}>
                    <Button onClick={addCargo} className={"d-flex gap-1 bg-success rounded-2 border-0 text-white"}>
                        <i className="bi bi-plus-circle"></i>
                        Додати вантаж
                    </Button>
                </div>
            </Form>
        </>
    );
});

export default CargoForm;