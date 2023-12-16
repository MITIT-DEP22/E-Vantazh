import React, {FC} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import ChatWindow from "./ChatWindow";

const SecondAuctionPage: FC<any> = ({nextPage}) => {
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
                                <Card.Title className={'fs-3 text-center'}>
                                    <span className={'fw-bold '}>Поточна ціна:</span> 2900 uah
                                </Card.Title>
                            </Card.Body>
                        </Card>
                        <ChatWindow nextPage={nextPage}/>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SecondAuctionPage;