import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";

const ThirdAuctionPage = () => {
    return (
        <Container className="my-5">
            <Row>
                <Col md={{span: 6, offset: 3}}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center">Антикорупційний проект нашої команди</Card.Title>
                        </Card.Body>
                        <Card className={'m-5'}>
                            <Card.Body className={'p-3'}>
                                <Card.Title>
                                    <span className={'fw-bold'}>Початкова ціна:</span> 5000 uah
                                </Card.Title>
                                <Card.Title>
                                    <span className={'fw-bold'}>Замовник:</span> Міністерство Оборони України
                                </Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className={'mx-5'}>
                            <Card.Body className={'p-3'}>
                                <Card.Title className={''}>
                                    <span className={'fw-bold '}>Поточна ціна:</span> 2900 uah
                                </Card.Title>
                                <Card.Title className={''}>
                                    <span className={'fw-bold '}>Переможець:</span> Військовий інститут
                                    телекомунікацій та інформатизації імені Героїв Крут
                                </Card.Title>
                            </Card.Body>
                        </Card>
                        <button type="button" className="btn btn-success mt-5">Звʼязатися з замовником</button>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ThirdAuctionPage;