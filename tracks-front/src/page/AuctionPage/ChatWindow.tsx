import React, {FC, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import "./ChatWindow.scss"

const ChatWindow: FC<any> = ({nextPage}) => {
    const [messages, setMessages] = useState([
        {user: "3", text: 'ВИБУВ', isMine: false, time: "12:34 PM"},
        {user: "1", text: '3500 uah', isMine: false, time: "12:40 PM"},
        {user: "2", text: '3200 uah', isMine: true, time: "12:43 PM"},
        {user: "1", text: '3000 uah', isMine: false, time: "12:46 PM"},
        {user: "2", text: '2900 uah', isMine: true, time: "12:50 PM"},
        {user: "1", text: 'ВИБУВ', isMine: false, time: "12:55 PM"},
        {user: "2", text: 'ПЕРЕМІГ', isMine: true, time: "12:55 PM"},
    ]);

    const [newMessage, setNewMessage] = useState('');

    // const handleSendMessage = () => {
    //     if (newMessage.trim() !== '') {
    //         setMessages([...messages, {text: newMessage, isMine: true}]);
    //         setNewMessage('');
    //     }
    // };

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <div
                        className={'chat__body'}>
                        <div className={'messages'}>
                            {messages.map((message, index) => (
                                <div key={index} className={message.isMine ? 'message my-message droplet' : 'message droplet'}>
                                    <div className={'message__text'}>
                                        <div className={'d-flex'}>
                                            <div className={(message.isMine && " flex-row-reverse ") + ' message__text_content d-flex align-items-center gap-3 py-2'}>
                                                <div className={'avatar'}>{message.user}</div>
                                                {message.text}
                                                <div className='message__time'>{message.time}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Form className="mt-3">
                        <Form.Group controlId="messageInput">
                            <Form.Control
                                type="text"
                                placeholder="Ваше повідомлення..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                        </Form.Group>
                        <div className={'d-flex justify-content-end'}>
                            <Button className={'m-2 text-end'} variant="primary" type="button"
                                    onClick={() => {
                                        nextPage()
                                    }}>
                                Відправити
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            <svg height="0" width="0">
                <defs>
                    <clipPath id="left-droplet">
                        <path d="M 10,0 A 10,10 0 0 1 0,10 H 16 V 0 Z"/>
                    </clipPath>
                    <clipPath id="right-droplet">
                        <path d="M 6,0 A 10,10 0 0 0 16,10 H 0 V 0 Z"/>
                    </clipPath>
                </defs>
            </svg>
        </Container>

    );
};

export default ChatWindow;
