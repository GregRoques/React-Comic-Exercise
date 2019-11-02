import React from 'react';
import cssModal from "./cssModal.module.css"

const Modal = ({ date, title, alt, isDisplayed, closed }) => {
    return isDisplayed ? (
    <div className={ cssModal.modal }>
        <div className={ cssModal.modalPosition }>
            <div className={ cssModal.closeButton } onClick={closed}>X</div>
            <div className={ cssModal.containter }>
                <div className={ cssModal.title }>{ title }</div>
                <div className={ cssModal.date }>{ date }</div>
                <p>{ alt }</p>
            </div>
        </div>
    </div>
    ) : null
};

export default Modal;