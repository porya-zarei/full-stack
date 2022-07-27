import {FC} from "react";

interface CardProps {
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    className?: string;
    primaryContainerClassName?: string;
    secondaryContainerClassName?: string;
    title: string;
    titleClassName?: string;
    icon?: React.ReactElement;
    iconClassName?: string;
    content: string;
    contentClassName?: string;
    badge?: string;
    badgeClassName?: string;
    data?: [
        {
            label: string;
            value: string;
        },
        {
            label: string;
            value: string;
        },
    ];
    dataClassName?: string;
    btnsContainerClassName?: string;
    dangerBtnClassName?: string;
    successBtnClassName?: string;
    dangerBtnText?: string;
    successBtnText?: string;
    onDangerBtnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onSuccessBtnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    titleContainerClassName?: string;
}

const Card: FC<CardProps> = ({
    onClick,
    className,
    secondaryContainerClassName,
    primaryContainerClassName,
    title,
    titleClassName,
    icon,
    iconClassName,
    content,
    contentClassName,
    data,
    dataClassName,
    badge,
    badgeClassName,
    btnsContainerClassName,
    dangerBtnClassName,
    successBtnClassName,
    dangerBtnText,
    successBtnText,
    onDangerBtnClick,
    onSuccessBtnClick,
    titleContainerClassName,
}) => {
    return (
        <div
            onClick={onClick}
            className={`w-full h-full flex items-center justify-center ${primaryContainerClassName}`}>
            <article
                className={`w-full flex flex-wrap justify-center items-center ${secondaryContainerClassName}`}>
                <div className="w-full my-2 text-[10px] md:text-xs flex justify-center items-center">
                    {data &&
                        data.map((item) => (
                            <div
                                key={item.label}
                                className={`w-1/3 h-12 flex flex-col justify-center items-center ${dataClassName}`}>
                                <div className="w-full h-6 flex justify-center items-center">
                                    {item.value}
                                </div>
                                <div className="w-full h-6 inline-flex justify-center items-center whitespace-nowrap">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                </div>
                <div
                    className={`w-full my-2 flex justify-center items-center flex-wrap ${titleContainerClassName}`}>
                    <div
                        className={`w-full font-bold text-lg flex justify-center items-center ${titleClassName}`}>
                        {title}
                        <span className="m-1 flex justify-center items-center">
                            {icon && (
                                <span className={`${iconClassName}`}>
                                    {icon}
                                </span>
                            )}
                        </span>
                    </div>
                    <span
                        className={`w-full text-xs flex justify-center items-center ${badgeClassName}`}>
                        {badge}
                    </span>
                </div>
                <div
                    className={`w-full my-2 flex justify-center items-center ${className}`}>
                    <p
                        className={`w-full flex justify-center items-center ${contentClassName}`}>
                        {content}
                    </p>
                </div>
                {(dangerBtnText || successBtnClassName) && (
                    <div
                        className={`w-full flex justify-center items-center ${btnsContainerClassName}`}>
                        <button
                            type="button"
                            className={`w-full m-1 flex justify-center items-center ${successBtnClassName}`}
                            onClick={onSuccessBtnClick}>
                            {successBtnText}
                        </button>
                        <button
                            type="button"
                            className={`w-full m-1 flex justify-center items-center ${dangerBtnClassName}`}
                            onClick={onDangerBtnClick}>
                            {dangerBtnText}
                        </button>
                    </div>
                )}
            </article>
        </div>
    );
};

export default Card;
