import Modal from "@/components/core/modal";
import {ReactNode, useState} from "react";

export const useModal = () => {
    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen((p) => !p);
    };
    const ModalWrapper = ({children}: {children: ReactNode}) => {
        return (
            <Modal isOpen={isOpen} onClose={handleClose}>
                {children}
            </Modal>
        );
    };

    return {
        isOpen,
        handleOpen,
        handleClose,
        handleToggle,
        ModalWrapper,
    };
};
