import CAccordion from "@/components/core/accordion";
import CButton from "@/components/core/buttons";
import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";
import CInput from "@/components/core/inputs";
import Loading from "@/components/core/loadings";
import {useAccessKeys} from "@/hooks/useAccessKeys";
import useNotification from "@/hooks/useNotification";
import {addAccessKey, deleteAccessKey} from "@/services/access-keys";
import {ICreateAccessKey} from "@/types/data";
import {FC, useState} from "react";
import {
    HiOutlineChevronDoubleDown,
    HiOutlineChevronDoubleUp,
    HiOutlineTrash,
} from "react-icons/hi";

interface SettingRouteProps {}

const SettingRoute: FC<SettingRouteProps> = () => {
    const {notify} = useNotification();
    const {accessKeys, loading, refetch} = useAccessKeys();
    const [isLoading, setIsLoading] = useState(false);
    const [newKey, setNewKey] = useState("");
    const [newValue, setNewValue] = useState("");
    const handleDelete = (id: string) => async () => {
        try {
            setIsLoading(true);
            const result = await deleteAccessKey(id);
            if (result && result.ok) {
                notify("کلید دسترسی با موفقیت حذف شد");
                refetch();
            } else {
                notify("مشکلی در حذف کلید رخ داد" + " | " + result?.error);
            }
        } catch (error) {
            console.log("erro in delete access key => ", error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleAdd = async () => {
        try {
            setIsLoading(true);
            const data: ICreateAccessKey = {
                key: newKey,
                value: newValue,
            };
            const result = await addAccessKey(data);
            if (result && result.ok) {
                notify("کلید دسترسی با موفقیت اضافه شد");
                refetch();
                setNewKey("");
                setNewValue("");
            } else {
                notify(
                    "مشکلی در اضافه کردن کلید رخ داد" + " | " + result?.error,
                );
            }
        } catch (error) {
            console.log("erro in delete access key => ", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <RouteContainer>
            <FrameContainer className="min-h-[82vh] m-4 border-primary">
                <div className="w-full flex justify-center items-center flex-wrap">
                    <div className="w-full mb-10 flex justify-center items-center">
                        <h3 className="font-bold text-xl">تنظیمات کلی داشبورد</h3>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <CAccordion
                            title="کلید های دسترسی"
                            titleClassName="p-2 bg-light rounded-md"
                            containerClassName="p-3"
                            contentClassName="p-3 border-2 border-gray-light rounded-md mt-2"
                            withIcon={true}
                            iconOpen={<HiOutlineChevronDoubleDown />}
                            iconClose={<HiOutlineChevronDoubleUp />}
                            content={
                                <div className="w-full flex justify-center items-center flex-wrap">
                                    <div className="w-full flex justify-center items-center mb-3 bg-light rounded-xl">
                                        {loading ? (
                                            <Loading />
                                        ) : (
                                            <ul className="w-full flex flex-wrap justify-start items-center p-2">
                                                {accessKeys?.length > 0 ? (
                                                    accessKeys?.map(
                                                        (accessKey) => (
                                                            <li
                                                                key={
                                                                    accessKey._id
                                                                }
                                                                className="w-full flex justify-between items-center my-1">
                                                                <span className="w-1/3">
                                                                    نام :{" "}
                                                                    {
                                                                        accessKey.key
                                                                    }
                                                                </span>
                                                                <span className="w-1/3">
                                                                    مقدار :{" "}
                                                                    {
                                                                        accessKey.value
                                                                    }
                                                                </span>
                                                                <span className="w-1/3">
                                                                    <CButton
                                                                        text={
                                                                            ""
                                                                        }
                                                                        icon={
                                                                            <HiOutlineTrash
                                                                                size={
                                                                                    22
                                                                                }
                                                                            />
                                                                        }
                                                                        disabled={
                                                                            isLoading
                                                                        }
                                                                        onClick={handleDelete(
                                                                            accessKey._id,
                                                                        )}
                                                                        variant="animate"
                                                                        className="border-danger p-2 text-danger rounded-full"
                                                                    />
                                                                </span>
                                                            </li>
                                                        ),
                                                    )
                                                ) : (
                                                    <li className="">
                                                        <span>
                                                            کلیدی یافت نشد
                                                        </span>
                                                    </li>
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="w-full flex justify-center items-center flex-wrap">
                                        <div className="w-full flex justify-center items-center">
                                            <h4 className="w-auto">
                                                افزودن کلید دسترسی
                                            </h4>
                                        </div>
                                        <div className="w-full flex justify-center items-center flex-nowrap">
                                            <div className="w-1/3 flex justify-center items-center">
                                                <CInput
                                                    type="text"
                                                    value={newKey}
                                                    name="accesskey-key"
                                                    placeholder="..."
                                                    onChange={(e) =>
                                                        setNewKey(
                                                            e.target.value,
                                                        )
                                                    }
                                                    containerClassName="rounded-md border-2 border-gray p-2"
                                                />
                                            </div>
                                            <div className="w-1/3 flex justify-center items-center">
                                                <CInput
                                                    type="text"
                                                    value={newValue}
                                                    name="accesskey-value"
                                                    placeholder="..."
                                                    onChange={(e) =>
                                                        setNewValue(
                                                            e.target.value,
                                                        )
                                                    }
                                                    containerClassName="rounded-md border-2 border-gray p-2"
                                                />
                                            </div>
                                            <div className="w-1/3 flex justify-center items-center">
                                                <CButton
                                                    text="افزودن"
                                                    disabled={isLoading}
                                                    onClick={handleAdd}
                                                    variant="animate"
                                                    className="w-full md:w-auto border-primary text-primary my-1 md:my-0 text-center py-2 px-4 rounded-2xl"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default SettingRoute;
