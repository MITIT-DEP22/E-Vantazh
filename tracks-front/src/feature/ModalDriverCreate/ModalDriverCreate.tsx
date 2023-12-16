import React, {FC, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {Driver} from "../../entities/driver/model/driver";
import {Role} from "../../entities/user/model/types";

interface IModalDriverCreate {
    show: boolean,
    onHide: () => void,
    onDriverChange: (driver: Driver) => void
}

const ModalDriverCreate:FC<IModalDriverCreate> = ({show,onHide, onDriverChange}) => {
    const [driver, setDrive] = useState<Driver>({} as Driver)
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Додайте нового водія</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Прізвище</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            className={'text-success border-success'}
                            onChange={(e) => setDrive({...driver, surname: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Ім'я</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            className={'text-success border-success'}
                            onChange={(e) => setDrive({...driver, name: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Select
                            onChange={(e) => setDrive({...driver, typeOfLicense: e.target.value})}
                            className={'text-success border-success'}
                        >
                            <option selected={true} disabled={true}>Choose.....</option>
                            <option value={"C"}>C</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-outline-success rounded-pill px-4" onClick={() =>
                {
                    onDriverChange(driver)}}>Додати</button>
                <button type="button" className="btn btn-outline-success rounded-pill px-4" onClick={onHide}>Закрити</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDriverCreate;