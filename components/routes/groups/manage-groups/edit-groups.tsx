import CInput from "@/components/core/inputs";
import Loading from "@/components/core/loadings";
import useNotification from "@/hooks/useNotification";
import {uuidGenerator} from "@/server/utils/uuid-helper";
import {addGroup, deleteGroupLimitYear, updateGroup} from "@/services/groups";
import {
    ICreateGroup,
    ICreateMoneyLimitYear,
    IGroup,
    IMoneyLimitYear,
} from "@/types/data";
import {getCurrentJalaliYear} from "@/utils/date-helper";
import {isAPIResultOk, isValid} from "@/utils/validations";
import {FC, useState} from "react";
import {
    HiOutlineDocumentAdd,
    HiOutlinePencil,
    HiOutlineX,
} from "react-icons/hi";

interface EditGroupProps {
    handleClose: () => void;
    group?: IGroup;
    refetch: () => Promise<void>;
}

const EditGroup: FC<EditGroupProps> = ({handleClose, group, refetch}) => {
    const {notify} = useNotification();
    const [groupName, setGtoupName] = useState(group?.name ?? "");
    const [moneyLimitYears, setMoneyLimitYears] = useState<
        Array<IMoneyLimitYear>
    >(group?.moneyLimitYears ?? []);
    const [moneyLimitYear, setMoneyLimitYear] = useState<ICreateMoneyLimitYear>(
        {
            limit: "",
            year: "",
        },
    );
    const [loading, setLoading] = useState(false);

    const handleChangeMoneyLimitYear =
        (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const {value, name} = e.target;
            setMoneyLimitYears((prev) =>
                prev.map((year) => {
                    if (year._id === id) {
                        return {
                            ...year,
                            [name]: value,
                        };
                    }
                    return year;
                }),
            );
        };
    const handleUpdate = (id: string) => async () => {
        console.log(groupName, moneyLimitYears);
        const updated = {...moneyLimitYears.find((ml) => ml?._id === id)};
        if (updated) {
            try {
                setLoading(true);
                const data: Partial<ICreateGroup> & {id: string} = {
                    id: group?.id ?? "",
                    moneyLimitYears: [...(moneyLimitYears ?? [])],
                };
                console.log("data in update limit year => ", data,updated,moneyLimitYears);
                const result = await updateGroup(data);
                console.log("result in update limit year => ", result);
                if (result.ok) {
                    notify("گروه با موفقیت ویرایش شد", {
                        type: "success",
                    });
                    refetch();
                } else {
                    notify(`خطا در ویرایش گروه: ${result?.error}`, {
                        type: "error",
                    });
                }
            } catch (error) {
                notify("خطا در ویرایش گروه", {
                    type: "error",
                });
                console.log("error i create product category => ", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeleteGroupLimitYear =
        (groupId: string, yearLimitId: string) => async () => {
            try {
                console.log("data in delete gl => ", groupId, yearLimitId);
                const result = await deleteGroupLimitYear(groupId, yearLimitId);
                console.log("result in delete gl => ", result);
                if (result.ok) {
                    notify("محدودیت با موفقیت حذف شد");
                    refetch();
                }
            } catch (error) {
                console.log(error);
                notify(`مشکلی رخ داده است`);
            }
        };

    const handleChangeGroupName = async () => {
        try {
            const data: Partial<ICreateGroup> & {id: string} = {
                name: groupName,
                id: group?.id ?? "",
            };
            const result = await updateGroup(data);
            if (result.ok) {
                notify("نام گروه اپدیت شد");
                refetch();
            }
        } catch (error) {
            console.log(error);
            notify(`مشکلی رخ داده است`);
        }
    };

    const handleAddNewGroupLimitYear = async () => {
        try {
            setLoading(true);

            const data: Partial<ICreateGroup> & {id: string} = {
                id: group?.id ?? "",
                moneyLimitYears: [
                    ...(group?.moneyLimitYears ?? []),
                    {
                        limit: moneyLimitYear.limit ?? "",
                        year: moneyLimitYear.year ?? "",
                    },
                ],
            };
            console.log("data in add group => ", data);
            const result = await updateGroup(data);
            console.log("result in add group => ", result);
            if (result.ok) {
                notify("محدودیت با موفقیت ایجاد شد", {
                    type: "success",
                });
                refetch();
            } else {
                notify(`خطا در ایجاد محدودیت: ${result?.error}`, {
                    type: "error",
                });
            }
        } catch (error) {
            notify("خطا در ایجاد محدودیت", {
                type: "error",
            });
            console.log("error i create product category => ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full h-full md:max-w-md bg-light rounded-t-3xl md:rounded-xl flex items-start justify-center flex-wrap content-start p-4">
            <button
                type="button"
                title="بستن"
                className="absolute top-0 right-0 m-4 text-danger"
                onClick={() => {
                    setGtoupName("");
                    handleClose();
                }}>
                <HiOutlineX />
            </button>
            <div className="w-full flex items-center justify-center mt-3">
                <h3 className="text-2xl font-semibold border-b-2 border-secondary">
                    ویرایش گروه
                </h3>
            </div>
            <div className="w-full mt-5 flex items-start justify-center flex-wrap content-start">
                <div className="w-full flex items-center justify-center mt-3">
                    <CInput
                        containerClassName="rounded-md border-2 border-gray p-2 flex-wrap"
                        type="text"
                        value={groupName}
                        name={"group-name"}
                        onChange={(e) => setGtoupName(e.target.value)}
                        title="نام گروه"
                        placeholder="type here..."
                    />
                </div>
                <div className="w-full flex items-center justify-center mb-3">
                    <button
                        onClick={handleChangeGroupName}
                        disabled={groupName === group?.name}
                        className="w-full disabled:bg-gray-light p-2 bg-primary rounded-md text-white"
                        type="button">
                        ثبت تغییر نام
                    </button>
                </div>
                <div className="w-full flex items-center justify-center flex-wrap my-3  max-h-[150px] overflow-y-auto">
                    {moneyLimitYears
                        .filter((ml) => ml._id)
                        .map((ml, index) => (
                            <div
                                className="w-full flex items-center justify-center my-3"
                                key={index}>
                                <div className="w-4/12 md:w-4/12 flex flex-wrap items-center justify-center">
                                    <CInput
                                        containerClassName="rounded-md border-2 border-gray p-2 flex-wrap"
                                        type="text"
                                        value={ml.year}
                                        name={"year"}
                                        onChange={handleChangeMoneyLimitYear(
                                            ml?._id ?? "",
                                        )}
                                        placeholder="سال"
                                    />
                                </div>
                                <div className="w-4/12 md:w-4/12 flex items-center justify-center">
                                    <CInput
                                        containerClassName="rounded-md border-2 border-gray p-2 flex-wrap"
                                        type="text"
                                        value={ml.limit}
                                        name={"limit"}
                                        onChange={handleChangeMoneyLimitYear(
                                            ml?._id ?? "",
                                        )}
                                        placeholder="محدودیت"
                                    />
                                </div>
                                <div className="w-2/12 md:w-2/12 flex items-center justify-center">
                                    <button
                                        type="button"
                                        title="حذف کردن"
                                        className="w-auto p-2 flex items-center justify-center rounded-full bg-danger text-white"
                                        onClick={handleDeleteGroupLimitYear(
                                            group?.id ?? "",
                                            ml?._id ?? "",
                                        )}>
                                        <span className="text-sm">
                                            <HiOutlineX />
                                        </span>
                                    </button>
                                </div>
                                <div className="w-2/12 md:w-2/12 flex items-center justify-center">
                                    <button
                                        type="button"
                                        title="ثبت ویرایش"
                                        className="w-auto p-2 flex items-center justify-center rounded-full bg-info text-white"
                                        onClick={handleUpdate(ml?._id ?? "")}>
                                        <span className="text-sm">
                                            <HiOutlinePencil />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="w-4/12 md:w-4/12 flex flex-wrap items-center justify-center">
                        <CInput
                            containerClassName="rounded-md border-2 border-gray p-2 flex-wrap"
                            type="text"
                            value={moneyLimitYear.year}
                            name={"year"}
                            onChange={(e) =>
                                setMoneyLimitYear((prev) => ({
                                    ...prev,
                                    year: e.target.value,
                                }))
                            }
                            placeholder="سال"
                        />
                    </div>
                    <div className="w-4/12 md:w-4/12 flex items-center justify-center">
                        <CInput
                            containerClassName="rounded-md border-2 border-gray p-2 flex-wrap"
                            type="text"
                            value={moneyLimitYear.limit}
                            name={"limit"}
                            onChange={(e) =>
                                setMoneyLimitYear((prev) => ({
                                    ...prev,
                                    limit: e.target.value,
                                }))
                            }
                            placeholder="محدودیت"
                        />
                    </div>
                    <div className="w-2/12 md:w-2/12 flex items-center justify-center">
                        <button
                            type="button"
                            title="افزودن به گروه"
                            className="w-auto p-2 flex items-center justify-center rounded-full bg-primary text-white"
                            onClick={handleAddNewGroupLimitYear}>
                            <span className="text-sm">
                                <HiOutlineDocumentAdd />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditGroup;
