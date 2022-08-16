import CInput from "@/components/core/inputs";
import Loading from "@/components/core/loadings";
import useNotification from "@/hooks/useNotification";
import {uuidGenerator} from "@/server/utils/uuid-helper";
import {addGroup} from "@/services/groups";
import {ICreateGroup, IMoneyLimitYear} from "@/types/data";
import {getCurrentJalaliYear} from "@/utils/date-helper";
import {isAPIResultOk, isValid} from "@/utils/validations";
import {FC, useState} from "react";
import {HiOutlineX} from "react-icons/hi";

interface AddGroupProps {
    handleClose: () => void;
    refetch: () => Promise<void>;
}

const AddGroup: FC<AddGroupProps> = ({handleClose, refetch}) => {
    const {notify} = useNotification();
    const [groupName, setGtoupName] = useState("");
    const currentYear = getCurrentJalaliYear();
    const [moneyLimitYears, setMoneyLimitYears] = useState<
        Array<Omit<IMoneyLimitYear, "_id"> & {id: string}>
    >([
        {
            id: uuidGenerator(),
            year: currentYear,
            limit: "",
        },
    ]);
    const [loading, setLoading] = useState(false);

    const handleChangeMoneyLimitYear =
        (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const {value, name} = e.target;
            setMoneyLimitYears((prev) =>
                prev.map((year) => {
                    if (year.id === id) {
                        return {
                            ...year,
                            [name]: value,
                        };
                    }
                    return year;
                }),
            );
        };

    const handleRemoveYearLimit = (id: string) => () => {
        setMoneyLimitYears((prev) => prev.filter((ml) => ml.id !== id));
    };

    const handleSubmit = async () => {
        console.log(groupName, moneyLimitYears);
        if (isValid([groupName])) {
            try {
                setLoading(true);
                const data: ICreateGroup = {
                    name: groupName,
                    moneyLimitYears: moneyLimitYears
                        .filter(
                            (ml) => ml.limit.length && ml.year.length > 3,
                        )
                        .map((ml) => ({
                            limit: ml.limit,
                            year: ml.year,
                        })),
                };
                console.log("data in add group => ", data);
                const result = await addGroup(data);
                if (isAPIResultOk(result)) {
                    notify("گروه با موفقیت ایجاد شد", {
                        type: "success",
                    });
                    refetch().then(() => {
                        setGtoupName("");
                        setMoneyLimitYears([
                            {
                                id: uuidGenerator(),
                                limit: "",
                                year: currentYear,
                            },
                        ]);
                    });
                } else {
                    notify(`خطا در ایجاد گروه: ${result?.error}`, {
                        type: "error",
                    });
                }
            } catch (error) {
                notify("خطا در ایجاد گروه", {
                    type: "error",
                });
                console.log("error i create product category => ", error);
            } finally {
                setLoading(false);
            }
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
                    setMoneyLimitYears([
                        {
                            id: uuidGenerator(),
                            year: currentYear,
                            limit: "",
                        },
                    ]);
                    handleClose();
                }}>
                <HiOutlineX />
            </button>
            <div className="w-full flex items-center justify-center mt-3">
                <h3 className="text-2xl font-semibold border-b-2 border-secondary">
                    افزودن گروه جدید
                </h3>
            </div>
            <div className="w-full mt-5 flex items-start justify-center flex-wrap content-start">
                <div className="w-full flex items-center justify-center my-3">
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
                <div className="w-full flex items-center justify-center flex-wrap my-3  max-h-[150px] overflow-y-auto">
                    {moneyLimitYears.map((ml, index) => (
                        <div
                            className="w-full flex items-center justify-center my-3"
                            key={index}>
                            <div className="w-5/12 md:w-5/12 flex flex-wrap items-center justify-center">
                                <CInput
                                    containerClassName="rounded-md border-2 border-gray p-2 flex-wrap"
                                    type="text"
                                    value={ml.year}
                                    name={"year"}
                                    onChange={handleChangeMoneyLimitYear(ml.id)}
                                    placeholder="سال"
                                />
                            </div>
                            <div className="w-5/12 md:w-5/12 flex items-center justify-center">
                                <CInput
                                    containerClassName="rounded-md border-2 border-gray p-2 flex-wrap"
                                    type="text"
                                    value={ml.limit}
                                    name={"limit"}
                                    onChange={handleChangeMoneyLimitYear(ml.id)}
                                    placeholder="محدودیت"
                                />
                            </div>
                            <div className="w-2/12 md:w-2/12 flex items-center justify-center">
                                <button
                                    type="button"
                                    title="حذف کردن"
                                    className="w-auto p-2 flex items-center justify-center rounded-full bg-danger text-white"
                                    onClick={handleRemoveYearLimit(ml.id)}>
                                    <span className="text-sm">
                                        <HiOutlineX />
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="w-full flex items-center justify-center my-3">
                        <button
                            type="button"
                            className="w-auto py-2 px-3 flex items-center justify-center rounded-md bg-info text-white"
                            onClick={() => {
                                setMoneyLimitYears([
                                    ...moneyLimitYears,
                                    {
                                        id: uuidGenerator(),
                                        year: currentYear,
                                        limit: "",
                                    },
                                ]);
                            }}>
                            <span className="text-sm">افزودن محدودیت جدید</span>
                        </button>
                    </div>
                </div>
                <div className="w-full flex items-center justify-center my-3">
                    <button
                        type="button"
                        disabled={loading}
                        className="w-full bg-primary text-white rounded-md border-2 border-primary p-2"
                        onClick={handleSubmit}>
                        {loading ? <Loading size={20} /> : "افزودن"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddGroup;
