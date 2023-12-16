import React, {useState} from 'react';
import {Card, Col, Container, ListGroup, Row} from 'react-bootstrap';
import Timer from "../../widget/Timer/Timer";
import StatusIndicator from "../../widget/Timer/StatusIndicator";
import ThirdAuctionPage from "./ThirdAuctionPage";
import SecondAuctionPage from "./SecondAuctionPage";

const AuctionPage = () => {
    const participants = [{label: 'Користувач 1', price: 3000, status: 'success'}, {
        label: 'Користувач 2',
        price: 3500,
        status: 'success'
    }, {label: 'Користувач 3', price: 4000, status: 'error'},]
    const [pageNumber, setPageNumber] = useState(1)
    const nextPage = () => {
        setPageNumber(pageNumber + 1)
    }

    return (
        <>
            {pageNumber === 1 ?
                <Container className="my-5">
                    <Row>
                        <Col md={{span: 6, offset: 3}}>
                            <Card>
                                <Card.Body>
                                    <Timer time={3} nextPage={nextPage}/>
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
                                <ListGroup className="list-group-flush">
                                    {participants.map((participant, index) => (
                                        <div className={'d-flex align-items-center fs-5 m-2'}>
                                            <hr/>
                                            <StatusIndicator
                                                status={participant.status}/>
                                            <ListGroup className={"d-flex align-items-center"}
                                                       key={index}>{participant.label} - {participant.price} uah
                                            </ListGroup>
                                        </div>
                                    ))}
                                </ListGroup>
                                <button type="button" className="btn btn-success">Приєднатися</button>
                            </Card>
                        </Col>
                    </Row>
                </Container> : pageNumber === 2 ? <SecondAuctionPage nextPage={nextPage}/> : <ThirdAuctionPage/>}
        </>
    );
};

export default AuctionPage;