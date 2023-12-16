import React, {FC, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import './MultiStepProgressBar.scss'
import Container from "react-bootstrap/Container";

interface ProgressBarProps {
    steps: string[];
    onChange: (any: any) => any;
}

const MultiStepProgressBar: FC<ProgressBarProps> = ({steps, onChange}) => {

    let totalSteps = steps.length
    const [currentStep, setCurrentStep] = useState(0)

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
        onChange(currentStep + 1)
    }

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
        onChange(currentStep - 1)
    }

    const setStep = (step: number) => {
        setCurrentStep(step)
        onChange(step)
    }

    return (
        <Container className={"mb-5"} fluid>
            <Row>
                <Col>
                    <div className="progress-container">
                        <ul className="progress-steps">
                            {steps.map((step, ind) => {
                                return (
                                    <li onClick={() => setStep(ind)}
                                        className={`${currentStep >= ind ? 'active' : null}`}
                                        key={ind}>{step}</li>
                                )
                            })}
                        </ul>
                    </div>
                </Col>

            </Row>
            {/*<Row>*/}
            {/*    <Col>*/}
            {/*        <div className="d-flex justify-content-around mt-3">*/}
            {/*            <Button variant="secondary" onClick={handlePrevStep} disabled={currentStep === 0}>*/}
            {/*                Назад*/}
            {/*            </Button>*/}
            {/*            <Button variant="success" onClick={handleNextStep} disabled={currentStep === totalSteps - 1}>*/}
            {/*                Далі*/}
            {/*            </Button>*/}
            {/*        </div>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </Container>
    );
};

export default MultiStepProgressBar;