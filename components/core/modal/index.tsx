import {FC, ReactNode} from "react";
import {motion, PanInfo} from "framer-motion";
interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: FC<ModalProps> = ({children, isOpen, onClose}) => {
    const handleDragEnd = (
        event: MouseEvent | PointerEvent | TouchEvent,
        info: PanInfo,
    ) => {
        const yOffset = info.offset.y;
        if (yOffset > 100) {
            onClose();
        }
    };
    return (
        <section
            className={`fixed z-50 top-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm ${
                isOpen ? "flex" : "hidden"
            } items-center justify-center w-full h-screen min-h-screen`}>
            <motion.div
                className="w-full z-50 h-[86vh] fixed bottom-0 md:static md:h-auto flex justify-center items-start md:items-center"
                drag="y"
                initial={{scale: 0.1}}
                animate={{scale: 1}}
                dragElastic={0.5}
                onDragEnd={handleDragEnd}
                dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}>
                <div className="w-full h-full md:h-auto flex justify-center items-center relative before:h-1 before:w-10 before:rounded-full before:bg-gray-light before:top-2 before:absolute before:z-10 before:bg-opacity-60 before:cursor-grab">
                    {children}
                </div>
            </motion.div>
        </section>
    );
};

export default Modal;
