import React, {useEffect, useState} from 'react';
import {Accordion} from "react-bootstrap";
import {useParams} from "react-router";
import operatorsStore from "../../entities/operator/store/operatorStore";
import {Operator} from "../../entities/operator/model/type";

const OperatorPage = () => {

    const [operator, setOperator] = useState<Operator>({} as Operator)
    const {id} = useParams()

    useEffect(() => {
        operatorsStore.getOperatorById(String(id))
            .then(res => {
                if (!res) {
                    return
                }
                setOperator(res.data)
                console.log(res && res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    const defaultOperator = {
        id: 6,
        email: 'some@gmail.com',
        firstName: 'Олексій',
        lastName: 'Бондаренко',
        phone: '+380931234567',
        companyName: 'TransGlobal',
        rating: 2,
        countOfOrders: 42,
        imgSource: 'https://hi-news.ru/wp-content/uploads/2018/11/SP_ZTE_Selfi_01-750x563.jpg',
        vehicle: [
            {
                id: 1,
                operatorId: 6,
                digits: "KA0007XB",
                type: "Вантажний автотранспорт",
                modelYear: 2021,
                carryingCapacity: "15 т",
                fuelType: "Дизельне паливо",
                gabarites: "ширина 2.4 м, висота 2.1 м, довжина 6 м",
                cargoDimensions: "ширина 2.2 м, висота 2 м, довжина 4 м",
                passengersCapacity: "4",
                photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU-LqoMmAljjXcmY4EUWVpOeUmClFl_X1zOg&usqp=CAU"
            },
            {
                id: 2,
                operatorId: 6,
                digits: "KA0007XB",
                type: "Вантажний автотранспорт",
                modelYear: 2021,
                carryingCapacity: "15 т",
                fuelType: "Дизельне паливо",
                gabarites: "ширина 2.4 м, висота 2.1 м, довжина 6 м",
                cargoDimensions: "ширина 2.2 м, висота 2 м, довжина 4 м",
                passengersCapacity: "4",
                photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU-LqoMmAljjXcmY4EUWVpOeUmClFl_X1zOg&usqp=CAU"
            },
            {
                id: 3,
                operatorId: 6,
                digits: "KA0007XB",
                type: "Вантажний автотранспорт",
                modelYear: 2021,
                carryingCapacity: "15 т",
                fuelType: "Дизельне паливо",
                gabarites: "ширина 2.4 м, висота 2.1 м, довжина 6 м",
                cargoDimensions: "ширина 2.2 м, висота 2 м, довжина 4 м",
                passengersCapacity: "4",
                photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU-LqoMmAljjXcmY4EUWVpOeUmClFl_X1zOg&usqp=CAU"
            }
        ],
        drivers: [
            {
                id: 1,
                operatorId: 6,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            },
            {
                id: 2,
                operatorId: 6,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            },
            {
                id: 3,
                operatorId: 6,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            }
        ]
    }

    return (
        <div className={'w-100 h-100 d-flex flex-column align-items-center justify-content-center gap-5 p-5'}>
            <div className={'w-75 h-auto d-flex gap-4 flex-column align-items-center'}>
                <div className={'w-100 h1 text-success'}>
                    Про перевізника
                </div>
                <div className="card p-3 w-75" >
                    <img src={`https://46.219.127.6:9999/images/${operator?.image?.fileName}`} className="card-img-top w-100 h-auto" alt="фото"/>
                    <div className="card-body">
                        <h1 className="card-title display-2">{`${operator.lastName} ${operator.firstName}`}</h1>
                        <p className="card-text display-6">Організація: {`${operator.companyName}`}</p>
                        <p className="card-text display-6">
                            {
                                // @ts-ignore
                                Array(5).fill().map((_, index) => (
                                    <i className={`bi bi-star-fill ${operator.rating > index? 'text-success' : ''}`}></i>
                                ))
                            }
                        </p>
                        <p className="card-text">Кількість виконаних замовлень: {`${operator.countOfOrders}`}</p>
                        <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header bsPrefix={'bg-success'}>Водії</Accordion.Header>
                                <Accordion.Body>
                                    <div className={'w-100 container text-center'}>
                                        <div className={'row row-cols-2 g-4'}>
                                            {operator?.drivers?.map(driver => (
                                                <div className={'col w-50 h-auto'}>
                                                    <i className="bi bi-person-fill display-1 text-success"></i>
                                                    <div className={'text-center w-100'}><strong>Прізвище:</strong>{` ${driver.surname}`}</div>
                                                    <div className={'text-center w-100'}><strong>Ім'я:</strong>{` ${driver.name}`}</div>
                                                    <div className={'text-center w-100'}><strong>Тип ліцензії:</strong>{` ${driver.typeOfLicense}`}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Машини</Accordion.Header>
                                <Accordion.Body>
                                    <div className={'w-100 container text-center'}>
                                        <div className={'row row-cols-2 g-5'}>
                                            {operator?.vehicles?.map(value => (
                                                <div className={'col w-50 h-auto'}>
                                                    <img src={value.photoUrl} style={{width:'274px', height: '170px'}} alt=""/>
                                                    <div className={'text-start w-100'}><strong>Номера:</strong>{` ${value.digits}`}</div>
                                                    <div className={'text-start w-100'}><strong>Тип машини:</strong>{` ${value.type}`}</div>
                                                    <div className={'text-start w-100'}><strong>Рік виробництва:</strong>{` ${value.modelYear}`}</div>
                                                    <div className={'text-start w-100'}><strong>Вантажопідйомність:</strong>{` ${value.carryingCapacity}`}</div>
                                                    <div className={'text-start w-100'}><strong>Тип палива:</strong>{` ${value.fuelType}`}</div>
                                                    <div className={'text-start w-100'}><strong>Габарити:</strong>{` ${value.gabarites}`}</div>
                                                    <div className={'text-start w-100'}><strong>Хр-ки причепа:</strong>{` ${value.cargoDimensions}`}</div>
                                                    <div className={'text-start w-100'}><strong>Кількість місць:</strong>{` ${value.passengersCapacity}`}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OperatorPage;