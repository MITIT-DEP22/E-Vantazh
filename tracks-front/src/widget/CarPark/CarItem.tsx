import React, {FC, useState} from 'react';
import {Button, Card} from "react-bootstrap";
import {Vehicle} from "../../entities/vehicle/model/types";

interface IVehicle {
    car: Vehicle;
}

const CarItem: FC<IVehicle> = ({car}) => {
    const [isHovered, setIsHovered] = useState(false);
    const onDelete = () => {

    }
    return (
        <Card className="mb-4" onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
            <Card.Body>
                <Card.Img variant={'top'} src={car.photoUrl}/>
                <Card.Title>{car.digits}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{car.type}</Card.Subtitle>
                <Card.Text>Рік випуску: {car.modelYear}</Card.Text>

                <Card.Text>Вантажопідйомність: {car.carryingCapacity}</Card.Text>
                <Card.Text>Габарити багажу: {car.cargoDimensions}</Card.Text>
                <Card.Text>Вид палива: {car.fuelType}</Card.Text>
                <Card.Text>Габарити вантажівки: {car.gabarites}</Card.Text>
                <Card.Text>К-ть пасс. місць: {car.passengersCapacity}</Card.Text>


                {isHovered && (
                    <Button
                        variant="danger"
                        className="position-absolute bottom-0 end-0 m-2"
                        onClick={onDelete}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-trash" viewBox="0 0 16 16">
                            <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default CarItem;