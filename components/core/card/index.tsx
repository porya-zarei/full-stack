import {FC, MouseEvent, ReactElement} from "react";
import CButton from "../buttons";

interface CardProps {
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    className?: string;
    primaryContainerClassName?: string;
    secondaryContainerClassName?: string;
    title: string;
    titleClassName?: string;
    icon?: ReactElement;
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
    onDangerBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    onSuccessBtnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    titleContainerClassName?: string;
    renderFooter?: boolean;
    status?: string;
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
    renderFooter = false,
    status,
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
                    <div className="w-full text-xs flex justify-center items-center">
                        <span className="m-1 flex justify-center items-center">
                            وضعیت:
                        </span>
                        <span className="m-1 flex justify-center items-center">
                            {status}
                        </span>
                    </div>
                </div>
                <div
                    className={`w-full my-2 flex justify-center items-center ${className}`}>
                    <p
                        className={`w-full flex justify-center items-center ${contentClassName}`}>
                        {content}
                    </p>
                </div>
                {renderFooter && (
                    <div
                        className={`w-full flex justify-center items-center ${btnsContainerClassName}`}>
                        <CButton
                            text={successBtnText}
                            onClick={onSuccessBtnClick}
                            variant="outline"
                            className={`w-full z-10 m-1 md:my-0 text-center py-2 px-4 rounded-2xl flex justify-center items-center ${successBtnClassName}`}
                        />
                        <CButton
                            className={`w-full z-10 m-1 md:my-0 text-center py-2 px-4 rounded-2xl flex justify-center items-center ${dangerBtnClassName}`}
                            onClick={onDangerBtnClick}
                            variant="outline"
                            text={dangerBtnText}
                        />
                    </div>
                )}
            </article>
        </div>
    );
};

export default Card;
