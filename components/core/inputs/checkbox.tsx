import {FC} from "react";

interface CCheckboxProps {
    name: string;
    placeholder: string;
    value: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    containerClassName?: string;
    icon?: React.ReactElement;
    iconClassName?: string;
    title?: string;
    titleClassName?: string;
}

const CCheckbox: FC<CCheckboxProps> = ({
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
            className={`w-full flex items-center justify-center ${containerClassName}`}>
            {title && (
                <div className="w-full flex items-center justify-center">
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
                    type={"checkbox"}
                    name={name}
                    placeholder={placeholder}
                    checked={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default CCheckbox;
