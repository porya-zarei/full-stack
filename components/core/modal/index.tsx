import {FC, ReactNode} from "react";
import {motion, PanInfo, useMotionValue} from "framer-motion";
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
            } items-center justify-center w-full h-screen min-h-screen cursor-grab`}>
            <motion.div
                className="w-full z-50 h-[86vh] fixed bottom-0 md:static md:h-auto flex justify-center items-start md:items-center"
                drag="y"
                initial={{scale:0.1}}
                animate={{scale:1}}
                dragElastic={0.5}
                onDragEnd={handleDragEnd}
                dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}>
                {children}
            </motion.div>
        </section>
    );
};

export default Modal;
