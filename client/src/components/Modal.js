import React, { useState, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function GlobalModal(props) {
    
    return (
        <Modal show={props.state} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.form}
            </Modal.Body>
            <Modal.Footer>
    
            </Modal.Footer>
        </Modal>
    )
}