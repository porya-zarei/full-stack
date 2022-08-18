import {FC, ReactNode} from "react";

interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: FC<ModalProps> = ({children,isOpen}) => {
    return (
        <section
            className={`fixed z-50 top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm ${isOpen?"flex":"hidden"} items-center justify-center w-full h-screen min-h-screen`}>
            <div className="w-full z-50 h-[86vh] fixed bottom-0 md:static md:h-auto flex justify-center items-start md:items-center">
                {children}
            </div>
        </section>
    );
};

export default Modal;
