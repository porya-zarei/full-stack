import {FC} from "react";

interface CSelectOptionProps {
    options: {value: string; label: string; selected?: boolean}[];
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    containerClassName?: string;
    icon?: React.ReactElement;
    iconClassName?: string;
    title?: string;
    titleClassName?: string;
    disabled?:boolean;
}

const CSelectOption: FC<CSelectOptionProps> = ({
    options,
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
    disabled=false
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
                <select
                    className={`w-full bg-transparent outline-none border-none ${className}`}
                    name={name}
                    title={placeholder}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}>
                    <option
                        disabled
                        selected={options.some((op) => op?.selected)}
                        value="">
                        {placeholder}
                    </option>
                    {options.map((option) => (
                        <option
                            selected={option?.selected}
                            key={option.label}
                            value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default CSelectOption;
