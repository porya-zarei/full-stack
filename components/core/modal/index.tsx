import {FC, ReactNode} from "react";

interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: FC<ModalProps> = ({children,isOpen}) => {
    return (
        <section
            className={`fixed top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm ${isOpen?"flex":"hidden"} items-center justify-center w-full h-screen min-h-screen`}>
            <div className="w-full h-auto flex justify-center items-start md:items-center rounded-t-lg md:rounded-t-none">
                {children}
            </div>
        </section>
    );
};

export default Modal;