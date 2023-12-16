import React, {FC, useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './SearchFilterModal.module.scss';

interface ModalRightProps {
    show: boolean;
    handleClose: () => void;
}
const SearchFilterModal: FC<ModalRightProps> = ({ show, handleClose }) => {
    return (
        <CSSTransition
            in={show}
            timeout={300}
            classNames="modal-right"
            unmountOnExit
        >
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Modal content goes here.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </CSSTransition>
    );
};

export default SearchFilterModal;