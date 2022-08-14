import {FC} from "react";

interface CRadioProps {
    name: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    containerClassName?: string;
    icon?: React.ReactElement;
    iconClassName?: string;
    title?: string;
    titleClassName?: string;
    radioContainerClassName?: string;
    options: Array<{name: string; value: string}>;
}

const CRadio: FC<CRadioProps> = ({
    name,
    placeholder,
    onChange,
    className,
    containerClassName,
    icon,
    iconClassName,
    title,
    titleClassName,
    options,
    radioContainerClassName,
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
                {options.map((option) => (
                    <div
                        key={option.value}
                        className={`w-auto flex items-center justify-center ${radioContainerClassName}`}>
                        <span className="flex items-center justify-center">
                            {option.name}
                        </span>
                        <input
                            className={`w-full bg-transparent outline-none border-none ${className}`}
                            type={"radio"}
                            name={name}
                            value={option.value}
                            placeholder={option.name}
                            onChange={onChange}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CRadio;
