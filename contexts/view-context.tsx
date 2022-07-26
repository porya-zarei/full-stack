import {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

interface IViewContext {
    showNavbar: boolean;
    changeShowNavbar: Dispatch<SetStateAction<boolean>>;
}
interface IViewContextProviderProps {
    children: React.ReactNode;
}

const ViewContext = createContext<IViewContext>({} as IViewContext);

export const ViewContextProvider: FC<IViewContextProviderProps> = ({
    children,
}) => {
    const [showNavbar, setShowNavbar] = useState(false);
    const changeShowNavbar: Dispatch<SetStateAction<boolean>> = (value) => {
        console.log("changeShowNavbar", value);
        setShowNavbar(value);
    };

    useEffect(() => {
        setShowNavbar(window.innerWidth >= 768);
        const handleResize = () => {
            setShowNavbar(window.innerWidth >= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const context = useMemo<IViewContext>(
        () => ({
            showNavbar,
            changeShowNavbar,
        }),
        [showNavbar],
    );
    return (
        <ViewContext.Provider value={context}>{children}</ViewContext.Provider>
    );
};

export const useViewContext = () => {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error(
            "useViewContext must be used within a ViewContextProvider",
        );
    }
    return context;
};
