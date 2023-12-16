import MultiStepProgressBar from "../../feature/MultiStepProgresBar/MultiStepProgressBar";
import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import CargoForm from "../../feature/CreateOrderForms/CargoForm/CargoForm";
import {Col, Row} from "react-bootstrap";
import MapComponent from "../../feature/CreateOrderForms/MapComponent/MapComponent";
import ProzzoroForm from "../../feature/CreateOrderForms/ProzzorroForm/ProzzoroForm";
import DateForm from "../../feature/CreateOrderForms/DateForm/DateForm";
import ResultForm from "../../feature/CreateOrderForms/ResultForm/ResultForm";
import {observer} from "mobx-react-lite";

const CreateOrderPage = observer(() => {
    const [currentStep, setCurrentStep] = useState("")
    const steps = [
        "Вантаж",
        "Маршрут",
        "Дати",
        "Деталі",
        "Підсумок"
    ]

    const changeCurrentStep = (index: number) => {
        setCurrentStep(steps[index])
    }

    useEffect(() => {
        setCurrentStep(steps[0])
    }, []);

    return (
        <>
            <MultiStepProgressBar onChange={changeCurrentStep} steps={steps}/>
            <Container className={"pb-5"}>
                <Row>
                    <Col>
                        <div className={currentStep === steps[0] ? "" : "d-none"}>
                            <CargoForm/>
                        </div>

                        <div className={currentStep === steps[1] ? "" : "d-none"}>
                            <MapComponent/>
                        </div>

                        <div className={currentStep === steps[2] ? "" : "d-none"}>
                            <DateForm/>
                        </div>

                        <div className={currentStep === steps[3] ? "" : "d-none"}>
                            <ProzzoroForm/>
                        </div>

                        <div className={currentStep === steps[4] ? "" : "d-none"}>
                            <ResultForm/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
});

export default CreateOrderPage;