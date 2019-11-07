import React from "react";
import cssModal from "./cssModal.module.css";

const Modal = ({ date, title, alt, isDisplayed, closed }) => {
    return isDisplayed ? (
        <div className={ cssModal.modal }>
            <div className={ cssModal.modalPosition }>
                <div class={cssModal.enter}>
                    <div className={ cssModal.closeButton } onClick={closed}>X</div>
                    <div className={ cssModal.modalContact } >
                        <span className={ cssModal.contactTitle } >{ alt }</span>
                        <div className={ cssModal.date }>{ date }</div>
                        <p>{ title }</p>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default Modal;
