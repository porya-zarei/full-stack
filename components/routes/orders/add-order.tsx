import {FC, lazy, useState} from "react";
import {HiTrash} from "react-icons/hi";
import RouteContainer from "@/components/core/containers/route-container";
import FrameContainer from "@/components/core/containers/frame-container";
import CInput from "@/components/core/inputs";
import CTextArea from "@/components/core/inputs/text-area";
import CSelectOption from "@/components/core/inputs/select";
import {useUsers} from "@/hooks/useUsers";
import {ICreateOrder, IOrder, IProduct} from "@/types/data";
import {useUserContext} from "@/contexts/user-context";
import {createOrder} from "@/services/orders";
import useNotification from "@/hooks/useNotification";
import dynamic from "next/dynamic";
import CCheckbox from "@/components/core/inputs/checkbox";
import {getGeorgianDateFromJalali} from "@/utils/date-helper";
const DatePickerInput = dynamic(
    () => import("@/components/core/date-picker/date-picker-input"),
    {
        ssr: false,
    },
);
interface AddOrderRouteProps {}
interface OrderDataProduct {
    id: number;
    name: string;
    valueName: string;
    valuePrice: string;
    valueDate: string;
    valueCount: string;
}

const AddOrderRoute: FC<AddOrderRouteProps> = () => {
    const {users} = useUsers();
    const {user} = useUserContext();
    const {notify} = useNotification();
    const [ordersData, setOrdersData] = useState<OrderDataProduct[]>(
        [1, 2, 3].map((id) => ({
            id,
            name: `order-${id}`,
            valueName: "",
            valuePrice: "",
            valueDate: "",
            valueCount: "",
        })),
    );

    const [description, setDescription] = useState("");
    const [supervisor, setSupervisor] = useState("");
    const [officialBill, setOfficialBill] = useState(false);

    const handleChange =
        (type = "name") =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            console.log(name, value);
            setOrdersData((prev) =>
                prev.map((order) => {
                    if (order.name === name) {
                        return type === "name"
                            ? {
                                  ...order,
                                  valueName: value,
                              }
                            : type === "price"
                            ? {
                                  ...order,
                                  valuePrice: value,
                              }
                            : type === "date"
                            ? {
                                  ...order,
                                  valueDate: value,
                              }
                            : {
                                  ...order,
                                  valueCount: value,
                              };
                    }
                    return order;
                }),
            );
        };

    const handleAddOrderRow = () => {
        const randomId = Math.floor(Math.random() * 10000);
        setOrdersData([
            ...ordersData,
            {
                id: randomId,
                name: `order-${randomId}`,
                valueName: "",
                valuePrice: "",
                valueDate: "",
                valueCount: "",
            },
        ]);
    };

    const handleRemoveOrderRow = (id: number) => {
        setOrdersData(ordersData.filter((order) => order.id !== id));
    };

    const resetOrdersData = () => {
        setOrdersData(
            [1, 2, 3].map((id) => ({
                id,
                name: `order-${id}`,
                valueName: "",
                valuePrice: "",
                valueDate: "",
                valueCount: "",
            })),
        );
        setDescription("");
        setSupervisor("");
    };

    const handleSendOrder = async () => {
        console.log("send order");
        if (supervisor.length > 0 && ordersData.length > 0) {
            const data: ICreateOrder = {
                officialBill,
                description,
                products: ordersData
                    .filter(
                        (product) =>
                            product.valueName !== "" &&
                            product.valuePrice !== "" &&
                            product.valueDate !== "",
                    )
                    .map(
                        (product) =>
                            ({
                                id: String(product.id),
                                name: product.valueName,
                                price: product.valuePrice,
                                date: getGeorgianDateFromJalali(
                                    product.valueDate,
                                ).toString(),
                                count: Number(product.valueCount),
                            } as IProduct),
                    ),
                supervisor: supervisor,
                user: user.id,
            };

            const result = await createOrder(data);
            console.log(result);
            if (result && result.ok && result.data) {
                notify("ثبت سفارش با موفقیت انجام شد", {
                    type: "success",
                });
                resetOrdersData();
            } else {
                notify("ثبت سفارش با خطا مواجه شد", {
                    type: "error",
                });
            }
        } else {
            notify("لطفا فیلد ها را به درستی پر کنید", {
                type: "error",
            });
        }
    };

    return (
        <RouteContainer>
            <FrameContainer className="m-4 border-primary">
                <div className="w-full flex items-start justify-center flex-wrap p-3">
                    <div className="w-full flex items-center justify-satrt mb-4">
                        <h3 className="text-2xl text-center pb-2 border-b-2 border-solid border-gray">
                            افزودن سفارش
                        </h3>
                    </div>
                    <div className="w-full flex items-center justify-center py-3 flex-wrap">
                        {ordersData.map((order, index) => (
                            <div
                                key={order.id}
                                className="w-full flex flex-wrap md:flex-nowrap items-center justify-evenly mb-4">
                                <span className="font-bold">- {index + 1}</span>
                                <div className="w-11/12 md:w-3/12 flex items-center justify-center">
                                    <CInput
                                        containerClassName="rounded-md border-2 border-gray p-2"
                                        type="text"
                                        value={order.valueName}
                                        name={order.name}
                                        onChange={handleChange("name")}
                                        placeholder="نام کالا"
                                    />
                                </div>
                                <div className="w-5/12 md:w-1/12 flex items-center justify-center">
                                    <CInput
                                        containerClassName="rounded-md border-2 border-gray p-2"
                                        type="number"
                                        value={order.valuePrice}
                                        name={order.name}
                                        onChange={handleChange("price")}
                                        placeholder="قیمت"
                                    />
                                </div>
                                <div className="w-3/12 md:w-1/12 flex items-center justify-center">
                                    <CInput
                                        containerClassName="rounded-md border-2 border-gray p-2"
                                        type="number"
                                        value={order.valueCount}
                                        name={order.name}
                                        onChange={handleChange("count")}
                                        placeholder="تعداد"
                                    />
                                </div>
                                <div className="w-4/12 md:w-1/12 flex items-center justify-center">
                                    <span className="text-center">
                                        {order.valueCount.length &&
                                            order.valuePrice.length &&
                                            Number(order.valueCount) *
                                                Number(order.valuePrice)}
                                    </span>
                                </div>
                                <div className="w-10/12 md:w-3/12 flex items-center justify-center">
                                    <CInput
                                        containerClassName="rounded-md border-2 border-gray p-2"
                                        type="text"
                                        value={order.valueDate}
                                        name={order.name}
                                        onChange={handleChange("date")}
                                        placeholder={`تاریخ با فرمت: 1401/01/01`}
                                    />
                                </div>
                                <button
                                    title="حذف"
                                    type="button"
                                    onClick={() =>
                                        handleRemoveOrderRow(order.id)
                                    }
                                    className="bg-danger text-white peer hover:rotate-45 px-2 py-2 transition-all rounded-full">
                                    <div className="text-xl">
                                        <HiTrash />
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex items-center justify-start p-3 flex-wrap">
                        <button
                            type="button"
                            onClick={handleAddOrderRow}
                            className="bg-primary text-white px-2 py-2 hover:bg-opacity-90 rounded-md">
                            اضافه کردن سطر
                        </button>
                    </div>
                    <div className="w-full flex items-center justify-start p-3 flex-wrap">
                        <CSelectOption
                            containerClassName="rounded-md border-2 border-gray p-2"
                            placeholder="انتخاب سر پرست مرتبط"
                            value={supervisor}
                            name={"description"}
                            onChange={(e) => setSupervisor(e.target.value)}
                            options={
                                users?.length > 0
                                    ? users?.map((user) => ({
                                          value: user.id,
                                          label: user.fullName,
                                      }))
                                    : []
                            }
                        />
                    </div>
                    <div className="w-full flex items-center justify-start p-3 flex-wrap">
                        <CCheckbox
                            placeholder="دارای فاکتور رسمی ؟"
                            name="official-bill"
                            title="دارای فاکتور رسمی ؟"
                            value={officialBill}
                            onChange={(e) => setOfficialBill(e.target.checked)}
                            containerClassName="rounded-md p-2"
                        />
                    </div>
                    <div className="w-full flex items-center justify-start p-3 flex-wrap">
                        <CTextArea
                            containerClassName="rounded-md border-2 border-gray p-2"
                            rows={3}
                            title="توضیحات"
                            placeholder=""
                            value={description}
                            name={"description"}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex items-center justify-start p-3 flex-wrap">
                        <button
                            type="button"
                            onClick={handleSendOrder}
                            className="bg-info text-white px-2 py-2 hover:bg-opacity-90 rounded-md">
                            افزودن سفارش
                        </button>
                    </div>
                </div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default AddOrderRoute;
