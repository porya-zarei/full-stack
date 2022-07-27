import {FC} from "react";

interface CTextAreaProps {
    rows: number;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
    containerClassName?: string;
    icon?: React.ReactElement;
    iconClassName?: string;
    title?: string;
    titleClassName?: string;
}

const CTextArea: FC<CTextAreaProps> = ({
    rows,
    name,
    placeholder,
    value,
    onChange,
    className,
    containerClassName,
    icon,
    iconClassName,
    title,
    titleClassName,
}) => {
    return (
        <div
            className={`w-full flex flex-wrap items-center justify-center ${containerClassName}`}>
            {title && (
                <div className="w-full flex items-center justify-start mb-2 border-b-2 border-gray">
                    {icon && (
                        <div
                            className={`flex items-center justify-center ${iconClassName}`}>
                            {icon}
                        </div>
                    )}
                    {title && (
                        <div
                            className={`flex items-center justify-center ${titleClassName}`}>
                            {title}
                        </div>
                    )}
                </div>
            )}
            <div className="w-full flex items-center justify-center">
                <textarea
                    className={`w-full bg-transparent outline-none border-none ${className}`}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    rows={rows}></textarea>
            </div>
        </div>
    );
};

export default CTextArea;
