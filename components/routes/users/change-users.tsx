import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";
import CSelectOption from "@/components/core/inputs/select";
import useNotification from "@/hooks/useNotification";
import {useUsers} from "@/hooks/useUsers";
import {changeGroup, changeRole, deleteUser} from "@/services/users";
import {EGroup, ERole, IUser} from "@/types/data";
import {FC, useTransition} from "react";
import {HiTrash} from "react-icons/hi";

interface ChangeUsersRouteProps {}

const ChangeUsersRoute: FC<ChangeUsersRouteProps> = () => {
    const [isPending, startTranstion] = useTransition();
    const {users, loading, refetch} = useUsers();
    const {notify} = useNotification();
    const handleChangeUserGroup =
        (selected_user: IUser) =>
        async (e: React.ChangeEvent<HTMLSelectElement>) => {
            const group = Number(e.target.value) as EGroup;
            const result = await changeGroup(selected_user.id, group);
            if (result && result.ok) {
                startTranstion(() => {
                    refetch().then(() => {
                        notify("تغییر گروه کاربر با موفقیت انجام شد");
                    });
                });
            } else {
                notify("خطا در تغییر گروه کاربر");
            }
        };
    const handleChangeUserRole =
        (selected_user: IUser) =>
        async (e: React.ChangeEvent<HTMLSelectElement>) => {
            const role = Number(e.target.value) as ERole;
            const result = await changeRole(selected_user.id, role);
            if (result && result.ok) {
                startTranstion(() => {
                    refetch().then(() => {
                        notify("تغییر نقش کاربر با موفقیت انجام شد");
                    });
                });
            } else {
                notify("خطا در تغییر نقش کاربر");
            }
        };
    const handleDeleteUser = (selected_user: IUser) => async () => {
        const result = await deleteUser(selected_user.id);
        if (result && result.ok) {
            startTranstion(() => {
                refetch().then(() => {
                    notify("حذف کاربر با موفقیت انجام شد");
                });
            });
        } else {
            notify("خطا در حذف کاربر");
        }
    };

    return (
        <RouteContainer>
            <FrameContainer className="m-4 border-primary">
                <div className="w-full flex items-start justify-center flex-wrap p-3">
                    <table className="w-full table-auto text-center">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">نام کامل</th>
                                <th className="px-4 py-2">شماره</th>
                                <th className="px-4 py-2">گروه</th>
                                <th className="px-4 py-2">نقش</th>
                                <th className="px-4 py-2">حذف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading &&
                                users?.length > 0 &&
                                users.map((user, index) => (
                                    <tr className="text-center" key={user.id}>
                                        <td className="px-4 py-2">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-2">
                                            {user.fullName}
                                        </td>
                                        <td className="px-4 py-2">
                                            {user.phoneNumber}
                                        </td>
                                        <td className="px-4 py-2">
                                            <CSelectOption
                                                options={Object.entries(EGroup)
                                                    .filter(([key]) =>
                                                        key.match(/^[A-Z]/),
                                                    )
                                                    .map(([key, value]) => ({
                                                        value: value.toString(),
                                                        label: key,
                                                    }))}
                                                value={user.group.toString()}
                                                name="group"
                                                placeholder="گروه"
                                                onChange={handleChangeUserGroup(
                                                    user,
                                                )}
                                                className="text-center"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <CSelectOption
                                                options={Object.entries(ERole)
                                                    .filter(([key]) =>
                                                        key.match(/^[A-Z]/),
                                                    )
                                                    .map(([key, value]) => ({
                                                        value: value.toString(),
                                                        label: key,
                                                    }))}
                                                value={user.role.toString()}
                                                name="group"
                                                placeholder="گروه"
                                                onChange={handleChangeUserRole(
                                                    user,
                                                )}
                                                className="text-center"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                type="button"
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={handleDeleteUser(user)}
                                                title="حذف">
                                                <HiTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default ChangeUsersRoute;
