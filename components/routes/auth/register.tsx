import CInput from "@/components/core/inputs";
import CCheckbox from "@/components/core/inputs/checkbox";
import CSelectOption from "@/components/core/inputs/select";
import {useUserContext} from "@/contexts/user-context";
import useNotification from "@/hooks/useNotification";
import {handleRegister} from "@/services/auth";
import {EGroup, EGROUPS_NAMES, ICreateUser} from "@/types/data";
import {isEmailValid, isPhoneNumberValid, isValid} from "@/utils/validations";
import Link from "next/link";
import {useRouter} from "next/router";
import {FC, useState} from "react";

interface RegisterRouteProps {}

const RegisterRoute: FC<RegisterRouteProps> = () => {
    const {notify} = useNotification();
    const router = useRouter();
    const {changeToken, changeUser} = useUserContext();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [group, setGroup] = useState("");
    const [key, setKey] = useState("");
    const handleSubmit = async () => {
        console.log(
            userName,
            password,
            rememberMe,
            email,
            phoneNumber,
            fullName,
        );
        if (
            isEmailValid(email) &&
            isValid([userName, password, fullName]) &&
            isPhoneNumberValid(phoneNumber)
        ) {
            const data: ICreateUser = {
                userName,
                password,
                email,
                phoneNumber,
                fullName,
                group: Number(group) as EGroup,
                key,
            };
            const result = await handleRegister(data);
            console.log(result);
            if (result && result.ok && result.token && result.data) {
                changeToken(result.token);
                changeUser(result.data);
                if (rememberMe) {
                    localStorage.setItem("token", result.token);
                }
                notify("ثبت نام با موفقیت انجام شد");
                router.push("/");
            }
        } else {
            notify("لطفا اطلاعات را به صورت صحیح وارد کنید");
        }
    };
    return (
        <div className="w-full min-h-screen h-full flex items-center justify-center bg-slate-200 p-2">
            <div className="w-96 max-w-md flex flex-wrap items-center justify-center rounded-2xl border-primary border-4 border-dashed p-5">
                <div className="w-full mb-5 pb-1 flex justify-center items-center">
                    <h4
                        onClick={() => {
                            window.open(
                                "https://emn178.github.io/online-tools/sha256.html",
                                "_blank",
                            );
                        }}
                        className="text-3xl font-bold inline border-b-2 border-secondary">
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
                            containerClassName="rounded-md border-2 border-gray-light focus:border-primary hover:border-primary p-2 transition-all"
                        />
                    </div>
                    <div className="w-full flex justify-center items-center my-2">
                        <CInput
                            type="username"
                            placeholder="نام کاربری"
                            name="user-name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            containerClassName="rounded-md border-2 border-gray-light focus:border-primary hover:border-primary p-2 transition-all"
                        />
                    </div>
                    <div className="w-full flex justify-center items-center my-2">
                        <CInput
                            type="password"
                            placeholder="رمز عبور"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            containerClassName="rounded-md border-2 border-gray-light focus:border-primary hover:border-primary p-2 transition-all"
                        />
                    </div>
                    <div className="w-full flex justify-center items-center my-2">
                        <CInput
                            type="email"
                            placeholder="ایمیل"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            containerClassName="rounded-md border-2 border-gray-light focus:border-primary hover:border-primary p-2 transition-all"
                        />
                    </div>
                    <div className="w-full flex justify-center items-center my-2">
                        <CInput
                            type="phone"
                            placeholder="شماره تلفن"
                            name="phone-number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            containerClassName="rounded-md border-2 border-gray-light focus:border-primary hover:border-primary p-2 transition-all"
                        />
                    </div>
                    <div className="w-full flex justify-center items-center my-2">
                        <CInput
                            type="text"
                            placeholder="کلید دسترسی"
                            name="key"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            containerClassName="rounded-md border-2 border-gray-light focus:border-primary hover:border-primary p-2 transition-all"
                        />
                    </div>
                    <div className="w-full flex justify-center items-center my-2">
                        <CSelectOption
                            containerClassName="rounded-md border-2 border-gray p-2"
                            placeholder="گروه شما"
                            value={group}
                            name={"group"}
                            onChange={(e) => setGroup(e.target.value)}
                            options={[
                                {
                                    label: "همه",
                                    value: String(-1),
                                    selected: true,
                                },
                                ...Object.keys(EGroup)
                                    .filter((g) => !isNaN(Number(g)))
                                    .map((g) => ({
                                        value: g,
                                        label: EGROUPS_NAMES[Number(g)],
                                    })),
                            ]}
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
                            onClick={handleSubmit}>
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
