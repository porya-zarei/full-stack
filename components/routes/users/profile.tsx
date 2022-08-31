import CButton from "@/components/core/buttons";
import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";
import CInput from "@/components/core/inputs";
import CSelectOption from "@/components/core/inputs/select";
import IMAGES from "@/constants/images";
import {useUserContext} from "@/contexts/user-context";
import {useGroups} from "@/hooks/useGroups";
import useNotification from "@/hooks/useNotification";
import {useUpdateUser} from "@/hooks/useUpdateUser";
import {useUser} from "@/hooks/useUser";
import {changeGroup, changeRole} from "@/services/users";
import {ERole, IUser} from "@/types/data";
import {enumToArray} from "@/utils/enums-helper";
import Image from "next/image";
import {useRouter} from "next/router";
import {FC, useState, useEffect, ChangeEvent} from "react";
import {HiOutlinePencilAlt} from "react-icons/hi";

interface ProfileRouteProps {
    slug: string;
}

const ProfileRoute: FC<ProfileRouteProps> = ({slug}) => {
    const router = useRouter();
    const {notify} = useNotification();
    const {user, changeUser} = useUserContext();
    const [inUpdate, setInUpdate] = useState(true);
    const [editUser, setEditUser] = useState<IUser>({} as IUser);
    const {groups} = useGroups();
    const {
        user: dataUser,
        refetch,
        loading,
    } = useUser(slug === "me" ? "" : slug);
    const {handleUpdateUser, loading: updateLoading} = useUpdateUser();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditUser((prev) => ({...prev, [name]: value}));
    };

    const handleUpdateRole = async (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const role = Number(e.target.value) as ERole;
        const result = await changeRole(editUser.id, role);
        if (result && result.ok && result.data) {
            refetch().then(() => {
                notify("تغییر نقش کاربر با موفقیت انجام شد");
                if (user.id === dataUser.id) {
                    changeUser((prev) => ({
                        ...prev,
                        role,
                    }));
                }
            });
        } else {
            notify("خطا در تغییر نقش کاربر");
            setEditUser(dataUser);
        }
    };
    const handleUpdateGroup = async (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const group = String(e.target.value);
        const result = await changeGroup(editUser.id, group);
        if (result && result.ok && result.data) {
            console.log("transition => ", result);
            refetch().then(() => {
                notify("تغییر گروه کاربر با موفقیت انجام شد");
                if (user.id === dataUser.id) {
                    changeUser((prev) => ({
                        ...prev,
                        group: editUser.group,
                    }));
                }
            });
        } else {
            notify("خطا در تغییر گروه کاربر");
            setEditUser(dataUser);
        }
    };

    const handleUpdate = (name: keyof IUser) => async () => {
        const result = await handleUpdateUser(editUser.id, {
            [name]: editUser[name],
        });
        if (result && result?.ok) {
            refetch().then(() => {
                notify(`تغییر ${name} با موفقیت انجام شد`);
                if (user.id === dataUser.id) {
                    changeUser((prev) => ({
                        ...prev,
                        [name]: editUser[name],
                    }));
                }
            });
        } else {
            notify(`تغییر ${name} با مشکل مواجه شد`);
            console.log("error in update user => ", result.error);
            setEditUser(dataUser);
        }
    };

    useEffect(() => {
        !loading && setEditUser(dataUser);
        if (!loading) {
            if (dataUser && dataUser?._id?.length > 0) {
                setEditUser(dataUser);
            } else {
                router.replace("/");
            }
        }
    }, [loading]);

    return (
        <RouteContainer>
            <FrameContainer className="m-4 border-primary min-h-[80vh]">
                <div className="w-full flex items-start justify-center flex-wrap p-3">
                    <div className="w-full md:w-1/2 flex justify-center items-center">
                        <Image
                            src={IMAGES.profile}
                            layout="intrinsic"
                            height={400}
                            className="h-full"
                            alt="ویرایش و مشاهده مشخصات"
                        />
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center items-center flex-wrap">
                        <div className="w-full flex justify-evenly items-center my-4">
                            <span className="font-extrabold text-xl border-b-2 border-primary mb-2">
                                اپدیت و مشاهده پروفایل
                            </span>
                        </div>
                        <div className="w-full flex justify-evenly items-center mb-4">
                            <div className="w-5/12 flex justify-center items-center">
                                <div className="w-full h-10 inline-flex justify-evenly items-center rounded-full overflow-hidden border-2 border-secondary-light">
                                    <CInput
                                        containerClassName="px-2 h-full"
                                        type="text"
                                        title="نام کامل : "
                                        titleClassName="text-xs px-0"
                                        value={editUser.fullName}
                                        name="fullName"
                                        onChange={handleChange}
                                        placeholder=""
                                        disabled={!inUpdate}
                                    />
                                    <CButton
                                        className="bg-secondary-light disabled:bg-gray-light py-2 px-3 h-full border-none text-white"
                                        text={<HiOutlinePencilAlt />}
                                        variant="default"
                                        disabled={
                                            !inUpdate ||
                                            loading ||
                                            updateLoading
                                        }
                                        onClick={handleUpdate("fullName")}
                                    />
                                </div>
                            </div>
                            <div className="w-5/12 flex justify-center items-center">
                                <div className="w-full h-10 inline-flex justify-evenly items-center rounded-full overflow-hidden border-2 border-secondary-light">
                                    <CInput
                                        containerClassName="px-2 h-full"
                                        type="text"
                                        title="ایمیل : "
                                        titleClassName="text-xs px-0"
                                        value={editUser.email}
                                        name="email"
                                        onChange={handleChange}
                                        placeholder=""
                                        disabled={!inUpdate}
                                    />
                                    <CButton
                                        className="bg-secondary-light disabled:bg-gray-light py-2 px-3 h-full border-none text-white"
                                        text={<HiOutlinePencilAlt />}
                                        variant="default"
                                        disabled={
                                            !inUpdate ||
                                            loading ||
                                            updateLoading
                                        }
                                        onClick={handleUpdate("email")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-evenly items-center mb-4">
                            <div className="w-5/12 flex justify-center items-center">
                                <div className="w-full h-10 inline-flex justify-evenly items-center rounded-full overflow-hidden border-2 border-secondary-light">
                                    <CInput
                                        containerClassName="px-2 h-full"
                                        type="text"
                                        title="شماره : "
                                        titleClassName="text-xs px-0"
                                        value={editUser.phoneNumber}
                                        name="phoneNumber"
                                        onChange={handleChange}
                                        placeholder=""
                                        disabled={!inUpdate}
                                    />
                                    <CButton
                                        className="bg-secondary-light disabled:bg-gray-light py-2 px-3 h-full border-none text-white"
                                        text={<HiOutlinePencilAlt />}
                                        variant="default"
                                        disabled={
                                            !inUpdate ||
                                            loading ||
                                            updateLoading
                                        }
                                        onClick={handleUpdate("phoneNumber")}
                                    />
                                </div>
                            </div>
                            <div className="w-5/12 flex justify-center items-center">
                                <div className="w-full h-10 inline-flex justify-evenly items-center rounded-full overflow-hidden border-2 border-secondary-light">
                                    <CInput
                                        containerClassName="px-2 h-full"
                                        type="text"
                                        title="نام کاربری : "
                                        titleClassName="text-xs px-0"
                                        value={editUser.userName}
                                        name="userName"
                                        onChange={handleChange}
                                        placeholder=""
                                        disabled={!inUpdate}
                                    />
                                    <CButton
                                        className="bg-secondary-light disabled:bg-gray-light py-2 px-3 h-full border-none text-white"
                                        text={<HiOutlinePencilAlt />}
                                        variant="default"
                                        disabled={
                                            !inUpdate ||
                                            loading ||
                                            updateLoading
                                        }
                                        onClick={handleUpdate("userName")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-evenly items-center mb-4">
                            <div className="w-5/12 flex justify-center items-center">
                                <div className="w-full h-10 inline-flex justify-evenly items-center rounded-full overflow-hidden border-2 border-secondary-light">
                                    <CInput
                                        containerClassName="px-2 h-full"
                                        type="text"
                                        title="رمز : "
                                        titleClassName="text-xs px-0"
                                        value={editUser.password}
                                        name="password"
                                        onChange={handleChange}
                                        placeholder=""
                                        disabled={!inUpdate}
                                    />
                                    <CButton
                                        className="bg-secondary-light disabled:bg-gray-light py-2 px-3 h-full border-none text-white"
                                        text={<HiOutlinePencilAlt />}
                                        variant="default"
                                        disabled={
                                            !inUpdate ||
                                            loading ||
                                            updateLoading
                                        }
                                        onClick={handleUpdate("password")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-evenly items-center mb-4">
                            <div className="w-5/12 flex justify-center items-center">
                                <div className="w-full h-10 inline-flex justify-evenly items-center rounded-full overflow-hidden border-2 border-secondary-light">
                                    <CSelectOption
                                        options={
                                            groups?.map?.(({id, name}) => ({
                                                value: id ?? "",
                                                label: name,
                                            })) ?? []
                                        }
                                        title="گروه : "
                                        titleClassName="text-xs px-0"
                                        value={
                                            editUser?.group?.id?.toString() ??
                                            ""
                                        }
                                        name="group"
                                        disabled={user.role !== ERole.CREATOR}
                                        onChange={handleUpdateGroup}
                                        containerClassName="px-2 h-full text-center"
                                        placeholder=""
                                    />
                                    <CButton
                                        className="bg-secondary-light disabled:bg-gray-light py-2 px-3 h-full border-none text-white"
                                        text={<HiOutlinePencilAlt />}
                                        variant="default"
                                        disabled={
                                            !inUpdate ||
                                            loading ||
                                            updateLoading ||
                                            user.role !== ERole.CREATOR
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-5/12 flex justify-center items-center">
                                <div className="w-full h-10 inline-flex justify-evenly items-center rounded-full overflow-hidden border-2 border-secondary-light">
                                    <CSelectOption
                                        options={enumToArray(ERole).map(
                                            ({key, value}) => ({
                                                value: value?.toString(),
                                                label: key,
                                            }),
                                        )}
                                        title="نقش : "
                                        titleClassName="text-xs px-0"
                                        value={editUser?.role?.toString() ?? ""}
                                        name="role"
                                        disabled={user.role !== ERole.CREATOR}
                                        onChange={handleUpdateRole}
                                        containerClassName="px-2 h-full text-center"
                                        placeholder=""
                                    />
                                    <CButton
                                        className="bg-secondary-light disabled:bg-gray-light py-2 px-3 h-full border-none text-white"
                                        text={<HiOutlinePencilAlt />}
                                        variant="default"
                                        disabled={
                                            !inUpdate ||
                                            loading ||
                                            updateLoading ||
                                            user.role !== ERole.CREATOR
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default ProfileRoute;
