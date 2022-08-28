import {FC, MouseEventHandler, ReactNode} from "react";

interface CButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    text: string | ReactNode;
    textClassName?: string;
    className?: string;
    icon?: ReactNode;
    iconClassName?: string;
    disabled?: boolean;
    type?: "button" | "reset" | "submit";
    variant?: "default" | "outline" | "animate";
}

const CButton: FC<CButtonProps> = ({
    onClick,
    text = "",
    className = "",
    iconClassName = "",
    icon,
    disabled,
    type = "button",
    textClassName = "",
    variant = "default",
}) => {
    const getClasses = () => {
        const classes:string[] = [];
        if(variant==="default"){
            classes.push(`border-transparent`);
            classes.push(`border-2`);
        } else if (variant === "outline") {
            classes.push(`border-2`);
        } else if (variant === "animate") {
            classes.push(`border-2`);
            classes.push("animate-border-btn");
        }
        return classes.join(" ");
    }
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`flex hover:bg-opacity-90 transition-all ${
                icon ? "justify-evenly" : "justify-center"
            } items-center ${getClasses()} ${className}`}>
            {icon && (
                <span
                    className={`flex justify-center items-center ${iconClassName}`}>
                    {icon}
                </span>
            )}
            <span
                className={`flex justify-center items-center ${textClassName}`}>
                {text}
            </span>
        </button>
    );
};

export default CButton;
