import {FC} from "react";

interface CRadioProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    containerClassName?: string;
    icon?: React.ReactElement;
    iconClassName?: string;
    title?: string;
    titleClassName?: string;
    radioContainerClassName?: string;
    options: Array<{key: string; value: string}>;
}

const CRadio: FC<CRadioProps> = ({
    name,
    onChange,
    className,
    containerClassName,
    icon,
    iconClassName,
    title,
    titleClassName,
    options,
    radioContainerClassName,
    value,
}) => {
    return (
        <div
            title={title}
            className={`w-full flex items-center justify-center ${containerClassName}`}>
            {title && (
                <div className="w-auto whitespace-nowrap inline-flex items-center justify-center">
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
            <div className="w-auto flex items-center justify-center">
                {options.map((option) => (
                    <div
                        key={option.value}
                        className={`w-auto inline-flex whitespace-nowrap items-center justify-center ${radioContainerClassName}`}>
                        <span className="flex items-center justify-center">
                            {option.key}
                        </span>
                        <input
                            className={`w-full bg-transparent outline-none border-none ${className}`}
                            type={"radio"}
                            name={name}
                            value={option.value}
                            placeholder={option.key}
                            onChange={onChange}
                            checked={value === option.value}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CRadio;
