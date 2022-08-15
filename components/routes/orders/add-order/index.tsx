import {FC, useState} from "react";
import {HiTrash} from "react-icons/hi";
import RouteContainer from "@/components/core/containers/route-container";
import FrameContainer from "@/components/core/containers/frame-container";
import CInput from "@/components/core/inputs";
import CTextArea from "@/components/core/inputs/text-area";
import CSelectOption from "@/components/core/inputs/select";
import {useUsers} from "@/hooks/useUsers";
import {
    EProductType,
    EPRODUCT_TYPES_NAMES,
    ERole,
    ICreateOrder,
    IProduct,
    PRODUCT_CATEGORIES,
} from "@/types/data";
import {useUserContext} from "@/contexts/user-context";
import {createOrder} from "@/services/orders";
import useNotification from "@/hooks/useNotification";
import CCheckbox from "@/components/core/inputs/checkbox";
import {getGeorgianDateFromJalali} from "@/utils/date-helper";
import CRadio from "@/components/core/inputs/radio";
import {useProductCategories} from "@/hooks/useProductCategories";
import AddProduct from "./add-product";
interface AddOrderRouteProps {}
export interface OrderDataProduct {
    id: number;
    name: string;
    valueName: string;
    valuePrice: string;
    valueDate: string;
    valueCount: string;
    valueCategory: string;
    valueType: string;
}

const AddOrderRoute: FC<AddOrderRouteProps> = () => {
    const {user} = useUserContext();
    const {users} = useUsers(ERole.ADMIN);
    const {notify} = useNotification();
    const [productsData, setProductsData] = useState<OrderDataProduct[]>(
        [1, 2, 3].map((id) => ({
            id,
            name: `order-${id}`,
            valueName: "",
            valuePrice: "",
            valueDate: "",
            valueCount: "",
            valueCategory: "",
            valueType: "",
        })),
    );

    const [description, setDescription] = useState("");
    const [supervisor, setSupervisor] = useState("");
    const [officialBill, setOfficialBill] = useState(false);

    const handleAddOrderRow = () => {
        const randomId = Math.floor(Math.random() * 10000);
        setProductsData([
            ...productsData,
            {
                id: randomId,
                name: `order-${randomId}`,
                valueName: "",
                valuePrice: "",
                valueDate: "",
                valueCount: "",
                valueCategory: "",
                valueType: "",
            },
        ]);
    };
    const resetProductsData = () => {
        setProductsData(
            [1, 2, 3].map((id) => ({
                id,
                name: `order-${id}`,
                valueName: "",
                valuePrice: "",
                valueDate: "",
                valueCount: "",
                valueCategory: "",
                valueType: "",
            })),
        );
        setDescription("");
        setSupervisor("");
    };

    const handleSendOrder = async () => {
        console.log("send order");
        if (supervisor.length > 0 && productsData.length > 0) {
            const data: ICreateOrder = {
                officialBill,
                description,
                products: productsData
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
                                category: PRODUCT_CATEGORIES.find(
                                    (c) => c.id === product.valueCategory,
                                ),
                                type: Number(product.valueType) as EProductType,
                            } as IProduct),
                    ),
                supervisor: supervisor,
                user: user.id,
            };

            console.log("data => ", data);
            const result = await createOrder(data);
            if (result && result.ok && result.ok) {
                resetProductsData();
                notify("محصول با موفقیت ثبت شد", {
                    type: "success",
                });
            } else {
                notify("خطا در ثبت اطلاعات", {
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
                        {productsData.map((productData, index) => (
                            <AddProduct
                                key={index}
                                setProductsData={setProductsData}
                                productData={productData}
                                index={index}
                            />
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
                            title="ایا فروشنده فاکتور رسمی ارائه می کند ؟"
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
