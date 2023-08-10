import React, { useState, forwardRef, useImperativeHandle, Ref } from 'react';

export interface ModalProps {
    children: React.ReactNode;
}

export interface ModalHandle {
    openModal: () => void;
    closeModal: () => void;
}

const Modal = (props: ModalProps, ref: Ref<ModalHandle>) => {
    const [visible, setVisible] = useState(false);

    const openModal = () => {
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
    };

    useImperativeHandle(ref, () => ({
        openModal,
        closeModal,
    }));

    return (
        visible && (
            <div className="modal">
                <div className="modal-content">
                    {props.children}
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        )
    );
};

export default forwardRef(Modal);
