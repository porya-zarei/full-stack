import {FC} from "react";

interface FrameContainerProps {
    children: React.ReactNode;
    className?: string;
}

const FrameContainer: FC<FrameContainerProps> = ({children, className}) => {
    return (
        <div
            className={`w-full flex items-center justify-center rounded-xl border-dashed border-4 ${className}`}>
            {children}
        </div>
    );
};

export default FrameContainer;
