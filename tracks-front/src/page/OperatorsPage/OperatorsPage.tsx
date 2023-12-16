import React, {useEffect, useState} from 'react';
import {OperatorCard} from "../../widget/OperatorCard";
import {Operator} from "../../entities/operator/model/type";
import operatorsStore from "../../entities/operator/store/operatorStore";


const operators = [
    {
        id: 1,
        email: 'some@gmail.com',
        firstName: 'Іван',
        lastName: 'Петров',
        phone: '+380981234567',
        companyName: 'CargoMasters',
        rating: 5,
        countOfOrders: 120,
        imgSource: 'https://rb.ru/media/upload_tmp/photo-1516202648085-f93e477d1300.jpg',
        vehicle: [
            {
                id: 1,
                operatorId: 1,
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
                operatorId: 1,
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
                operatorId: 1,
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
                operatorId: 1,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            },
            {
                id: 2,
                operatorId: 1,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            },
            {
                id: 3,
                operatorId: 1,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            }
        ]
    },
    {
        id: 2,
        email: 'some@gmail.com',
        firstName: 'Катерина ',
        lastName: 'Іванова',
        phone: '+380961234567',
        companyName: 'FreightFlow',
        rating: 1,
        countOfOrders: 56,
        imgSource: 'https://cojo.ru/wp-content/uploads/2022/12/teilor-khill-temnye-volosy-1-2.webp',
        vehicle: [
            {
                id: 1,
                operatorId: 2,
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
                operatorId: 2,
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
                operatorId: 2,
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
                operatorId: 2,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            },
            {
                id: 2,
                operatorId: 2,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            },
            {
                id: 3,
                operatorId: 2,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            }
        ]
    },
    {
        id: 3,
        email: 'some@gmail.com',
        firstName: 'Олександр ',
        lastName: 'Ткаченко',
        phone: '+380991234567',
        companyName: 'TransLogistics',
        rating: 5,
        countOfOrders: 39,
        imgSource: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLh3d8CiQKzvnqZMcgit-hNbhaDfv2D04dtg&usqp=CAU',
        vehicle: [
            {
                id: 1,
                operatorId: 3,
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
                operatorId: 3,
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
                operatorId: 3,
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
                operatorId: 3,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            },
            {
                id: 2,
                operatorId: 3,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            },
            {
                id: 3,
                operatorId: 3,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            }
        ]
    },
    {
        id: 4,
        email: 'some@gmail.com',
        firstName: 'Марія ',
        lastName: 'Коваленко',
        phone: '+380971234567',
        companyName: 'LoadLift L',
        rating: 3,
        countOfOrders: 89,
        imgSource: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiWK9LaYWf5BkTOkitrAJNrzBdpSRDaNBYQQ&usqp=CAU',
        vehicle: [
            {
                id: 1,
                operatorId: 4,
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
                operatorId: 4,
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
                operatorId: 4,
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
                operatorId: 4,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            },
            {
                id: 2,
                operatorId: 4,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            },
            {
                id: 3,
                operatorId: 4,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            }
        ]
    },
    {
        id: 5,
        email: 'some@gmail.com',
        firstName: 'Андрій ',
        lastName: 'Григорович',
        phone: '+380951234567',
        companyName: 'SwiftCargo',
        rating: 5,
        countOfOrders: 165,
        imgSource: 'https://igate.com.ua/upload/photo/0001/0001/3746/7139/81.jpg',
        vehicle: [
            {
                id: 1,
                operatorId: 5,
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
                operatorId: 5,
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
                operatorId: 5,
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
                operatorId: 5,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            },
            {
                id: 2,
                operatorId: 5,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            },
            {
                id: 3,
                operatorId: 5,
                name: 'Алехандро',
                surname: 'Максимилиан',
                typeOfLicense: 'C',
            }
        ]
    },
    {
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
]

const OperatorsPage = () => {
    const [operatorsData, setOperatorsData] = useState<Operator[]>()

    useEffect(() => {
        operatorsStore.getOperators()
            .then(res => {
                setOperatorsData(res && res.data)
                console.log(res && res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <div className={'w-100 h-100 p-5 d-flex flex-column align-items-center justify-content-center gap-5'}>
            <div className={'w-75 h1 text-center'}>
                Список перевізників
            </div>
            <div className={'w-100 container '}>
                <div className={'row row-cols-4 d-flex align-items-center justify-content-center gap-4'}>
                        {operatorsData?.map(operator => (
                            <OperatorCard operator={operator}/>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default OperatorsPage;