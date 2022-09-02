import {
    FC,
    ReactNode,
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useRef,
} from "react";

interface CFileProps {
    text: ReactNode;
    textClassName?: string;
    name?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    containerClassName?: string;
    icon?: ReactNode;
    iconClassName?: string;
    title?: string;
    disabled?: boolean;
    file: File | File[] | null;
    setFile: Dispatch<SetStateAction<File[] | File | null>>;
    multi?: boolean;
    onGetFile?: (file: File | File[]) => Promise<void>;
}

const fileListToFileArray = (fileList: FileList | undefined | null) => {
    const files: File[] = [];
    if (fileList) {
        for (let index = 0; index < fileList.length; index++) {
            const file = fileList.item(index);
            file && files.push(file);
        }
    }
    return files;
};

const CFile: FC<CFileProps> = ({
    name,
    onChange,
    className,
    containerClassName,
    icon,
    iconClassName,
    title,
    disabled = false,
    text,
    textClassName,
    file,
    setFile,
    multi = false,
    onGetFile,
}) => {
    const ref = useRef<HTMLInputElement>(null);
    return (
        <div
            className={`w-full flex items-center justify-center ${containerClassName}`}>
            <button
                type="button"
                title={title}
                onClick={() => {
                    ref?.current?.click?.();
                }}
                className={`flex items-center ${
                    icon ? "justify-evenly" : "justify-center"
                } ${className}`}>
                <input
                    className="hidden"
                    type="file"
                    name={name}
                    multiple={multi}
                    placeholder={title}
                    title={title}
                    hidden={true}
                    ref={ref}
                    onChange={onChange}
                    disabled={disabled}
                    onInput={() => {
                        if (
                            ref?.current &&
                            ref?.current?.files &&
                            ref?.current?.files[0]
                        ) {
                            const file = multi
                                ? fileListToFileArray(ref?.current?.files)
                                : ref?.current?.files[0];
                            setFile(file);
                            onGetFile && onGetFile(file);
                        }
                    }}
                />
                <span
                    className={`w-auto flex justify-center items-center ${iconClassName}`}>
                    {icon}
                </span>
                <span
                    className={`w-auto flex justify-center items-center ${textClassName}`}>
                    {text}
                </span>
            </button>
        </div>
    );
};
export default CFile;
