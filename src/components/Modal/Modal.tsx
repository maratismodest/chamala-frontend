import React, {ReactNode} from 'react';
import ReactModal from 'react-modal';
import classes from './Modal.module.scss'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '200px'
    },
};

interface ModalProps {
    isOpen: boolean,
    closeModal: any,
    children: ReactNode
}

export const Modal = ({isOpen, closeModal, children}: ModalProps) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Modal"
        >
            <div className={classes.modal}>
                {children}
            </div>
        </ReactModal>
    )

}

export default Modal;
