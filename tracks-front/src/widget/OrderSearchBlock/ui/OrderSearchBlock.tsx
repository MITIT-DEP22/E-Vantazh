import React, {FC, useState} from 'react';
import Form from "react-bootstrap/Form";
import {Offcanvas} from "react-bootstrap";
import axios from "axios";
import {Search} from "../../../entities/search/model/type";
import {Order} from "../../../entities/order/model/types";
import {observer} from "mobx-react-lite";
import SearchService from "../../../entities/search/services/SearchService";

interface ISearch {
    newOrder: (order: Order[]) => void
}

export const OrderSearchBlock:FC<ISearch> = observer(({newOrder}) => {
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState<Search>({} as Search)

    const search = () => {
        SearchService.getOrder(filter)
            .then(res => {
                console.log(res && res.data)
                newOrder(res && res.data)
            })
            .catch(err => console.log(err))
    }

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div className={'container w-auto border rounded-4 h-auto container p-4'}>
            <div className={'row w-100 d-flex gap-2'}>
                <div className={'col-9'}>
                    <Form.Control
                        type="text"
                        className={'text-success border-success w-100'}
                        onChange={(e) => setFilter({...filter, _search: e.target.value})}
                    />
                </div>
                <div className={'col-auto d-flex justify-content-center'}>
                    <button type="button" className="btn text-black btn-outline-secondary rounded-pill px-4" onClick={search}>Пошук</button>
                </div>
                <div className={'col-auto d-flex justify-content-center'}>
                    <button type="button" className="btn text-black btn-outline-success rounded-pill px-4" onClick={handleShow}>Фільтри</button>
                </div>
            </div>
            <Offcanvas placement={"end"} show={showModal} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Фільтри</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className={'container'}>
                        <div className={'row d-flex flex-column gap-1 align-items-center'}>
                            <div className={'text-success'}>
                                <strong>Статус</strong>
                            </div>
                            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                <Form.Select
                                    onChange={(e) => setFilter({...filter, status: e.target.value})}
                                    className={'text-success border-success'}
                                >
                                    <option selected={!filter?.status} disabled={true}>Choose.....</option>
                                    <option selected={filter?.status === 'new'} value={"new"}>Новий</option>
                                    <option selected={filter?.status === 'receiving_proposals'} value={"receiving_proposals"}>Отримання пропозицій</option>
                                    <option selected={filter?.status === 'pending_tender'} value={"pending_tender"}>Очікування тендеру</option>
                                    <option selected={filter?.status === 'tender_completed'} value={"tender_completed"}>Тенедер створено</option>
                                    <option selected={filter?.status === 'closed'} value={"closed"}>Закритий</option>
                                    <option selected={filter?.status === 'canceled'} value={"canceled"}>Відмінений</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className={'row d-flex flex-column gap-1 align-items-center'}>
                            <div className={'text-success'}>
                                <strong>Вантаж</strong>
                            </div>
                            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                <Form.Select
                                    onChange={(e) => setFilter({...filter, cargoType: e.target.value})}
                                    className={'text-success border-success'}
                                >
                                    <option selected={!filter?.cargoType} disabled={true}>Choose.....</option>
                                    <option selected={filter?.cargoType === 'passengers'} value={"passengers"}>Пасажири</option>
                                    <option selected={filter?.cargoType === 'children'} value={"children"}>Діти</option>
                                    <option selected={filter?.cargoType === 'persons_with_disabilities'} value={"persons_with_disabilities"}>Особи з інвалідністю</option>
                                    <option selected={filter?.cargoType === 'liquids'} value={"liquids"}>Рідини</option>
                                    <option selected={filter?.cargoType === 'explosive'} value={"explosive"}>Вибухові речовини</option>
                                    <option selected={filter?.cargoType === 'products'} value={"products"}>Продукти харчування</option>
                                    <option selected={filter?.cargoType === 'need_cooling'} value={"need_cooling"}>Потребують охолодження</option>
                                    <option selected={filter?.cargoType === 'military_purposes'} value={"military_purposes"}>Військові цілі</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className={'row d-flex flex-column gap-1 align-items-center '}>
                            <div className={'text-success'}>
                                <strong>Ціна</strong>
                            </div>
                            <div className={'d-flex justify-content-center gap-2'}>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Від</Form.Label>
                                    <Form.Control
                                        type="number"
                                        autoFocus
                                        className={'text-success border-success'}
                                        defaultValue={filter?.rangePrice?.start}
                                        onChange={(e) => setFilter({ ...filter, rangePrice: { ...filter.rangePrice, start: Number(e.target.value)}})}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>До</Form.Label>
                                    <Form.Control
                                        type="number"
                                        autoFocus
                                        className={'text-success border-success'}
                                        defaultValue={filter?.rangePrice?.end}
                                        onChange={(e) => setFilter({ ...filter, rangePrice: { ...filter.rangePrice, end: Number(e.target.value)}})}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className={'row d-flex flex-column gap-1 align-items-center '}>
                            <div className={'text-success'}>
                                <strong>Мінімальний крок</strong>
                            </div>
                            <div className={'d-flex justify-content-center gap-2'}>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Від</Form.Label>
                                    <Form.Control
                                        type="number"
                                        autoFocus
                                        className={'text-success border-success'}
                                        defaultValue={filter?.rangMinStep?.start}
                                        onChange={(e) => setFilter({ ...filter, rangMinStep: { ...filter.rangMinStep, start: Number(e.target.value)}})}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>До</Form.Label>
                                    <Form.Control
                                        type="number"
                                        autoFocus
                                        className={'text-success border-success'}
                                        defaultValue={filter?.rangMinStep?.end}
                                        onChange={(e) => setFilter({ ...filter, rangMinStep: { ...filter.rangMinStep, end: Number(e.target.value)}})}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className={'row d-flex flex-column gap-1 align-items-center '}>
                            <div className={'text-success'}>
                                <strong>Мінімальний крок</strong>
                            </div>
                            <div className={'d-flex justify-content-center gap-2'}>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Від</Form.Label>
                                    <Form.Control
                                        defaultValue={filter?.rangeDate?.start?.toISOString().split('T')[0]}
                                        onChange={(e) =>
                                        setFilter({ ...filter, rangeDate:
                                                { ...filter.rangeDate,
                                                    start:
                                                        new Date(e.target.value)}})}
                                        as={"input"} type={"date"}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>До</Form.Label>
                                    <Form.Control
                                        defaultValue={filter?.rangeDate?.end?.toISOString().split('T')[0]}
                                        onChange={(e) =>
                                        setFilter({ ...filter, rangeDate:
                                                { ...filter.rangeDate,
                                                    end:
                                                        new Date(e.target.value)}})}
                                        as="input" type="date"/>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
});
