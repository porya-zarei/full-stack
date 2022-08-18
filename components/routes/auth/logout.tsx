import {useUserContext} from "@/contexts/user-context";
import useNotification from "@/hooks/useNotification";
import {IUser} from "@/types/data";
import {clearUserData} from "@/utils/auth";
import Link from "next/link";
import {FC, useEffect} from "react";

interface LogoutRouteProps {}

const LogoutRoute: FC<LogoutRouteProps> = () => {
    const {changeToken, changeUser, isUserLoggedIn} = useUserContext();
    const {notify} = useNotification();
    useEffect(() => {
        if (isUserLoggedIn()) {
            changeToken("");
            changeUser({} as IUser);
            clearUserData();
            notify("شما با موفقیت خارج شدید.");
        }
    }, []);
    return (
        <div className="w-full min-h-screen h-full flex items-center justify-center bg-slate-200 p-2">
            <div className="w-96 max-w-md flex flex-wrap items-center justify-center rounded-2xl border-primary border-4 border-dashed p-5">
                <div className="w-full mb-5 pb-1 flex justify-center items-center">
                    <h4 className="text-3xl font-bold inline border-b-2 border-secondary">
                        خروج از حساب کاربری
                    </h4>
                </div>
                <div className="w-full flex items-center justify-center flex-wrap">
                    <div className="w-full flex justify-center items-center">
                        <p className="w-full text-center text-gray-600 my-4">
                            برای ورود مجدد به حساب کاربری خود بر روی لینک های زیر کلیک کنید.
                        </p>
                    </div>
                    <div className="w-full flex flex-wrap justify-center items-center my-4">
                        <Link href="/auth/login" passHref>
                            <a className="w-full flex justify-center items-center m-1 text-gray-dark border border-gray-dark font-bold py-2 px-4 rounded-md">
                                ورود
                            </a>
                        </Link>
                        <Link href="/auth/register" passHref>
                            <a className="w-full flex justify-center items-center m-1 text-gray-dark border border-gray-dark font-bold py-2 px-4 rounded-md">
                                ثبت نام
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoutRoute;
