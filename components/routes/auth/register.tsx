import CInput from "@/components/core/inputs";
import CCheckbox from "@/components/core/inputs/checkbox";
import Link from "next/link";
import {FC, useState} from "react";

interface RegisterRouteProps {}

const RegisterRoute: FC<RegisterRouteProps> = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");
    return (
        <div className="w-full min-h-screen h-full flex items-center justify-center bg-slate-200 p-2">
            <div className="w-96 max-w-md flex flex-wrap items-center justify-center rounded-2xl border-primary border-4 border-dashed p-5">
                <div className="w-full mb-5 pb-1 flex justify-center items-center">
                    <h4 className="text-3xl font-bold inline border-b-2 border-secondary">
                        ثبت نام در داشبورد
                    </h4>
                </div>
                <div className="w-full flex items-center justify-center flex-wrap">
                    <div className="w-full flex justify-center items-center my-2">
                        <CInput
                            type="name"
                            placeholder="نام و نام خانوادگی"
                            name="full-name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            containerClassName="rounded-md border-2 border-gray-light active:border-primary hover:border-primary p-2 transition-all"
                        />
                    </div>
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
                    <div className="w-full flex justify-center items-center my-2">
                        <CInput
                            type="email"
                            placeholder="ایمیل"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            containerClassName="rounded-md border-2 border-gray-light active:border-primary hover:border-primary p-2 transition-all"
                        />
                    </div>
                    <div className="w-full flex justify-center items-center my-2">
                        <CInput
                            type="phone"
                            placeholder="شماره تلفن"
                            name="phone-number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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
                            className="w-full flex justify-center items-center m-1 bg-primary text-white font-bold py-2 px-4 rounded-md hover:brightness-90 transition-all"
                            onClick={() => {
                                console.log(userName, password);
                            }}>
                            ثبت نام
                        </button>
                        <Link href="/auth/login" passHref>
                            <a
                                className="w-full flex justify-center items-center m-1 text-gray-dark border border-gray-dark font-bold py-2 px-4 rounded-md"
                                onClick={() => {
                                    console.log(userName, password);
                                }}>
                                ورود
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterRoute;
