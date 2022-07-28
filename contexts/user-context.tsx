import {IUser} from "@/types/data";
import {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

interface IUserContext {
    user: IUser;
    changeUser: Dispatch<SetStateAction<IUser>>;
    token: string;
    changeToken: Dispatch<SetStateAction<string>>;
    isUserLoggedIn: () => boolean;
}
interface IUserContextProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserContextProvider: FC<IUserContextProviderProps> = ({
    children,
}) => {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [token, setToken] = useState("");
    const changeUser: Dispatch<SetStateAction<IUser>> = (value) => {
        console.log("changeUser", value);
        setUser(value);
    };
    const changeToken: Dispatch<SetStateAction<string>> = (value) => {
        console.log("changeToken", value);
        setToken(value);
    };

    const isUserLoggedIn = useCallback(() => {
        return Object.keys(user ?? {}).length > 0 && token.length > 0;
    }, [user, token]);

    useEffect(() => {}, []);

    const context = useMemo<IUserContext>(
        () => ({
            user,
            changeUser,
            token,
            changeToken,
            isUserLoggedIn,
        }),
        [user, token, isUserLoggedIn],
    );
    return (
        <UserContext.Provider value={context}>{children}</UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error(
            "useUserContext must be used within a UserContextProvider",
        );
    }
    return context;
};
