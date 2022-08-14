import CInput from "@/components/core/inputs";
import CCheckbox from "@/components/core/inputs/checkbox";
import {useUserContext} from "@/contexts/user-context";
import useNotification from "@/hooks/useNotification";
import {handleLogin} from "@/services/auth";
import {ILoginData} from "@/types/api";
import Link from "next/link";
import {useRouter} from "next/router";
import {FC, useState} from "react";
import {HiOutlineCubeTransparent} from "react-icons/hi";

interface LoginRouteProps {}

const LoginRoute: FC<LoginRouteProps> = () => {
    const router = useRouter();
    const {changeToken, changeUser} = useUserContext();
    const {notify} = useNotification();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        console.log(userName, password, rememberMe);
        setLoading(true);
        if (userName.length > 5 && password.length > 5) {
            const loginData: ILoginData = {
                userName,
                password,
            };
            const result = await handleLogin(loginData);
            if (result.data && result.token) {
                changeToken(result.token);
                changeUser(result.data);
                if (rememberMe) {
                    localStorage.setItem("token", result.token);
                }
                notify("Login successful");
                router.push("/");
            } else {
                notify("Login failed: " + result.error);
            }
        } else {
            notify("Login failed: username or password too short");
        }
        setLoading(false);
    };
    return (
        <div className="w-full min-h-screen h-full flex items-center justify-center bg-slate-200 p-2">
            <div className="w-96 max-w-md flex flex-wrap items-center justify-center rounded-2xl border-primary border-4 border-dashed p-5">
                <div className="w-full mb-5 pb-1 flex justify-center items-center">
                    <h4 className="text-3xl font-bold inline border-b-2 border-secondary">
                        ورود به داشبورد
                    </h4>
                </div>
                <div className="w-full flex items-center justify-center flex-wrap">
                    <div className="w-full flex justify-center items-center my-2">
                        <CInput
                            type="username"
                            placeholder="نام کاربری"
                            name="user-name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            containerClassName="rounded-md border-2 border-gray-light active:border-primary hover:border-primary p-2 transition-all"
                        />
                    </div>
                    <div className="w-full flex justify-center items-center my-2">
                        <CInput
                            type="password"
                            placeholder="رمز عبور"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            containerClassName="rounded-md border-2 border-gray-light active:border-primary hover:border-primary p-2 transition-all"
                        />
                    </div>
                    <div className="w-full flex justify-between items-center my-2">
                        <CCheckbox
                            placeholder="مرا به خاطر بسپار"
                            name="remember-me"
                            title="مرا به خاطر بسپار"
                            value={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            containerClassName="rounded-md p-2"
                        />
                    </div>
                    <div className="w-full flex flex-wrap justify-center items-center my-2">
                        <button
                            type="button"
                            disabled={loading}
                            className="w-full flex justify-center items-center m-1 bg-primary text-white font-bold py-2 px-4 rounded-md hover:brightness-90 transition-all"
                            onClick={handleSubmit}>
                            {loading ? (
                                <HiOutlineCubeTransparent className="rotate-and-rescale-animation" />
                            ) : (
                                "ورود"
                            )}
                        </button>
                        <Link href="/auth/register" passHref>
                            <a
                                className="w-full flex justify-center items-center m-1 text-gray-dark border border-gray-dark font-bold py-2 px-4 rounded-md"
                                onClick={() => {
                                    console.log(userName, password);
                                }}>
                                ثبت نام
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRoute;
