import {FC} from "react";

interface CInputProps {
    type: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    containerClassName?: string;
    icon?: React.ReactElement;
    iconClassName?: string;
    title?: string;
    titleClassName?: string;
    disabled?: boolean;
}

const CInput: FC<CInputProps> = ({
    type,
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
    disabled = false,
}) => {
    return (
        <div
            className={`w-full flex items-center justify-center ${containerClassName}`}>
            {title && (
                <div className="w-auto whitespace-nowrap flex items-center justify-center">
                    {title && (
                        <div
                            className={`flex items-center justify-center ${titleClassName}`}>
                            {title}
                        </div>
                    )}
                    {icon && (
                        <div
                            className={`flex items-center justify-center ${iconClassName}`}>
                            {icon}
                        </div>
                    )}
                </div>
            )}
            <div className="w-full flex items-center justify-center">
                <input
                    className={`w-full bg-transparent outline-none border-none ${className}`}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};

export default CInput;
