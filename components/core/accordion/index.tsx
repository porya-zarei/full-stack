import {FC, ReactNode, useState} from "react";

interface CAccordionProps {
    title: string;
    titleClassName?: string;
    contentClassName?: string;
    containerClassName?: string;
    content: ReactNode;
    iconOpen?: ReactNode;
    iconClose?: ReactNode;
    withIcon?: boolean;
}

const CAccordion: FC<CAccordionProps> = ({
    content,
    title,
    iconOpen,
    iconClose,
    containerClassName = "",
    contentClassName = "",
    titleClassName = "",
    withIcon = false,
}) => {
    const [show, setShow] = useState(false);
    return (
        <div className="w-full h-auto flex justify-center items-center p-0 m-0">
            <div
                className={`w-full h-auto flex justify-center items-center flex-wrap ${containerClassName}`}>
                <div
                    onClick={() => setShow((p) => !p)}
                    className={`w-full h-auto flex justify-start cursor-pointer items-center ${titleClassName}`}>
                    {withIcon && (
                        <span className="ml-2">{show ? iconClose : iconOpen}</span>
                    )}
                    <span className="w-auto flex justify-center items-center">
                        {title}
                    </span>
                </div>
                <div
                    className={`w-full h-auto ${
                        show ? "flex" : "hidden"
                    } justify-center items-center ${contentClassName}`}>
                    {content}
                </div>
            </div>
        </div>
    );
};

export default CAccordion;
