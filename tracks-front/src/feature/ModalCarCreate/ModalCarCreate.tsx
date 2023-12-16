import React, {FC, useState} from 'react';
import {Alert, Button, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {$api, $apiGai} from "../../app/http";
import userStore from "../../entities/user/store/userStore";
import {observer} from "mobx-react-lite";

interface IModalCarCreate {
    show: boolean,
    onHide: () => void
}

const ModalCarCreate: FC<IModalCarCreate> = ({show, onHide}) => {
    const [digits, setDigits] = useState('')
    const [isValid, setIsValid] = useState<Boolean>(true)
    const checkDigits = () => {
        if (digits !== '') {
            const carNumberRegex = /^[А-ЯҐЄIІЇA-Z]{2}\d{4}[А-ЯҐЄIІЇA-Z]{2}$/i;
            const isValidInput = carNumberRegex.test(digits);
            setIsValid(isValidInput)
            if (isValidInput) {
                $apiGai.get(`/vehicle?digits=${digits}`).then((response) => {

                    if (response.data.length !== 0) {
                        const data = response.data[0]
                        $api.post('/vehicles', data).then((response) => {
                            alert('Vehicle is well added')
                            window.location.reload()
                        })
                    }
                }).catch(e => {
                    console.log(e)
                })
            } else {
                alert('Number not valid')
                setIsValid(isValidInput)
            }
        }
    }
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Додайте нову техніку</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Прізвище</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            className={'text-success border-success'}
                            placeholder="Введіть державний номер автомобіля"
                            onChange={(e) => setDigits(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                {!isValid && (
                    <Alert variant="danger">
                        Недійсний номер автомобіля. Введіть дійсне значення.
                    </Alert>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={checkDigits}>
                    Додати
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default observer(ModalCarCreate);