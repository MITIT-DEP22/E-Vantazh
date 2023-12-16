import React, {useState} from 'react';
import {$api} from "../../app/http";
import userStore from "../../entities/user/store/userStore";
import axios from "axios";
import {Alert, Button, Container} from "react-bootstrap";
import Form from "react-bootstrap/Form";

const AddVehicleComponent = () => {
    const [digits, setDigits] = useState('')
    const [isValid, setIsValid] = useState<Boolean>(true)
    const checkDigits = () => {
        if (digits !== '') {
            const carNumberRegex = /^[А-ЩЬЮЯҐЄIІЇa-zA-Z]{2}\d{4}[А-ЩЬЮЯҐЄIІЇa-zA-Z]{2}$/;
            const isValidInput = carNumberRegex.test(digits);
            setIsValid(isValidInput)
            if (isValidInput) {
                axios.get(`https://46.219.127.6:7000/vehicle?digits=${digits}`).then((response) => {
                    if (response.data.length !== 0) {
                        const data = response.data[0]
                        $api.post('/vehicles', data).then((response) => {
                            console.log(response.data)
                            alert('Vehicle is well added')
                        })
                    }
                })
            } else {
                alert('Number not valid')
                setIsValid(isValidInput)
            }
        }
    }
    return (
        <Container className="mt-4">
            <Form className="col-md-6">
                <Form.Label className='h3'>Державний номер</Form.Label>
                <Form.Control
                    size={'lg'}
                    type="text"
                    placeholder="Введіть державний номер автомобіля"
                    value={digits}
                    onChange={(e) => setDigits(e.target.value)}
                />

                {!isValid && (
                    <Alert variant="danger">
                        Недійсний номер автомобіля. Введіть дійсне значення.
                    </Alert>
                )}

                <Button variant="primary" onClick={checkDigits}>
                    Додати
                </Button>
            </Form>
        </Container>
    );
};

export default AddVehicleComponent;