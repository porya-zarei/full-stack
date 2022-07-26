import {FC, useState} from "react";
import {HiOutlineX} from "react-icons/hi";
import RouteContainer from "@/components/core/containers/route-container";
import FrameContainer from "@/components/core/containers/frame-container";
import CInput from "@/components/core/inputs";
import CTextArea from "@/components/core/inputs/text-area";

interface AddOrderRouteProps {}

const AddOrderRoute: FC<AddOrderRouteProps> = () => {
    const [ordersData, setOrdersData] = useState([
        {
            id: 1,
            name: "order-1",
            valueName: "",
            valuePrice: "",
            valueDate: "",
        },
        {
            id: 2,
            name: "order-2",
            valueName: "",
            valuePrice: "",
            valueDate: "",
        },
        {
            id: 3,
            name: "order-3",
            valueName: "",
            valuePrice: "",
            valueDate: "",
        },
    ]);

    const [description, setDescription] = useState("");

    const today = new Date().toLocaleDateString("fa-IR");

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
                            : {
                                  ...order,
                                  valueDate: value,
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
            },
        ]);
    };

    const handleRemoveOrderRow = (id: number) => {
        setOrdersData(ordersData.filter((order) => order.id !== id));
    };

    const handleSendOrder = async () => {
        console.log("send order");
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
                                <div className="w-10/12 md:w-5/12 flex items-center justify-center">
                                    <CInput
                                        containerClassName="rounded-md border-2 border-gray p-2"
                                        type="text"
                                        value={order.valueName}
                                        name={order.name}
                                        onChange={handleChange("name")}
                                        placeholder="نام کالا"
                                    />
                                </div>
                                <div className="w-5/12 md:w-2/12 flex items-center justify-center">
                                    <CInput
                                        containerClassName="rounded-md border-2 border-gray p-2"
                                        type="number"
                                        value={order.valuePrice}
                                        name={order.name}
                                        onChange={handleChange("price")}
                                        placeholder="قیمت"
                                    />
                                </div>
                                <div className="w-5/12 md:w-2/12 flex items-center justify-center">
                                    <CInput
                                        containerClassName="rounded-md border-2 border-gray p-2"
                                        type="text"
                                        value={order.valueDate}
                                        name={order.name}
                                        onChange={handleChange("date")}
                                        placeholder={`تاریخ:${today}`}
                                    />
                                </div>
                                <button
                                    title="حذف"
                                    type="button"
                                    onClick={() =>
                                        handleRemoveOrderRow(order.id)
                                    }
                                    className="bg-danger text-white px-2 py-2 text-xl hover:rotate-90 transition-transform rounded-full">
                                    <HiOutlineX />
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
                        <CTextArea
                            containerClassName="rounded-md border-2 border-gray p-2"
                            rows={3}
                            title="توضیحات"
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
