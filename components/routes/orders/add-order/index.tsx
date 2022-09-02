import {FC, useState, useRef} from "react";
import RouteContainer from "@/components/core/containers/route-container";
import FrameContainer from "@/components/core/containers/frame-container";
import CTextArea from "@/components/core/inputs/text-area";
import CSelectOption from "@/components/core/inputs/select";
import {useUsers} from "@/hooks/useUsers";
import {
    EProductType,
    ERole,
    ICreateOrder,
    ICreateProduct,
    IDBProductCategory,
} from "@/types/data";
import {useUserContext} from "@/contexts/user-context";
import {createOrder} from "@/services/orders";
import useNotification from "@/hooks/useNotification";
import CCheckbox from "@/components/core/inputs/checkbox";
import {getGeorgianDateFromJalali} from "@/utils/date-helper";
import {useProductCategories} from "@/hooks/useProductCategories";
import AddProduct from "./add-product";
import {useCheckMoneyLimit} from "@/hooks/useCheckMoneyLimit";
import Loading from "@/components/core/loadings";
import CButton from "@/components/core/buttons";
import {uploadFile} from "@/services/uploads";
import CFile from "@/components/core/inputs/file";
import {HiOutlineDocumentText} from "react-icons/hi";
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

export const getRandonId = (): number => {
    return Math.floor(Math.random() * 1000000000);
};

const AddOrderRoute: FC<AddOrderRouteProps> = () => {
    const {user} = useUserContext();
    const {users} = useUsers(ERole.ADMIN);
    const {checkMoneyLimit} = useCheckMoneyLimit();
    console.log("user in add order => ", user);
    const {productCategories} = useProductCategories(
        user?.group?.id ?? "",
        true,
    );
    const {notify} = useNotification();
    const [productsData, setProductsData] = useState<OrderDataProduct[]>(
        [getRandonId(), getRandonId(), getRandonId()].map((id) => ({
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
    const [invoiceFile, setInvoiceFile] = useState<File | File[] | null>(null);
    const [loading, setLoading] = useState(false);
    const handleAddOrderRow = () => {
        const randomId = getRandonId();
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
            [getRandonId(), getRandonId(), getRandonId()].map((id) => ({
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
        setInvoiceFile(null);
        setOfficialBill(false);
    };

    const checkMoneyLimitForOrder = async () => {
        const limitCheck = await checkMoneyLimit(
            user.group.id,
            productsData
                .reduce((acc, curr) => {
                    return (
                        acc + Number(curr.valuePrice) * Number(curr.valueCount)
                    );
                }, 0)
                .toString(),
        );
        if (!limitCheck) {
            const response = prompt(
                "مبلغ سفارش بیشتر از حد مجاز سالانه است | ایا ادامه می دهید ؟ بله یا خیر",
            );
            if (response === "بله") {
                const text = prompt(
                    "لطفا مبلغ کلی مورد نیاز برای افزایش را وارد کنید",
                );
                return !!text && description + "\n" + text;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };

    const handleSendOrder = async () => {
        console.log("send order");
        if (supervisor.length > 0 && productsData.length > 0) {
            try {
                setLoading(true);
                const isOk = await checkMoneyLimitForOrder();
                if (isOk) {
                    let fileName = "";
                    if (
                        invoiceFile &&
                        !Array.isArray(invoiceFile) &&
                        invoiceFile.name?.length > 0
                    ) {
                        const uploadResult = await uploadFile(invoiceFile);
                        if (uploadResult.ok && uploadResult.data) {
                            fileName = uploadResult.data;
                        }
                    }
                    const data: ICreateOrder = {
                        officialBill,
                        description:
                            typeof isOk === "string" ? isOk : description,
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
                                        category:
                                            productCategories.find(
                                                (c) =>
                                                    c.id ===
                                                    product.valueCategory,
                                            ) ?? ({} as IDBProductCategory),
                                        type: Number(
                                            product.valueType,
                                        ) as EProductType,
                                    } as ICreateProduct),
                            ),
                        supervisor: supervisor,
                        user: user.id,
                        invoice: fileName,
                    };
                    console.log("data => ", data);
                    const result = await createOrder(data);
                    if (result && result.ok && result.ok) {
                        resetProductsData();
                        notify("سفارش شما با موفقیت ثبت شد", {
                            type: "success",
                        });
                    } else {
                        notify("خطا در ثبت اطلاعات", {
                            type: "error",
                        });
                    }
                }
            } catch (error) {
                console.log("error in add order => ", error);
                notify("خطا در ثبت اطلاعات", {
                    type: "error",
                });
            } finally {
                setLoading(false);
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
                                categories={productCategories}
                            />
                        ))}
                    </div>
                    <div className="w-full flex items-center justify-start p-3 flex-wrap">
                        <CButton
                            text="اضافه کردن سطر"
                            onClick={handleAddOrderRow}
                            disabled={loading}
                            variant="outline"
                            className="w-full md:w-auto border-info text-info my-1 md:my-0 text-center py-2 px-4 rounded-2xl"
                        />
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
                        <CFile
                            file={invoiceFile}
                            setFile={setInvoiceFile}
                            text={`فایل خود را اپلود کنید ${
                                !Array.isArray(invoiceFile) &&
                                ` - ${invoiceFile?.name}`
                            }`}
                            className="p-2 border-2 border-dark rounded-md"
                            iconClassName="mx-2"
                            textClassName="mx-2"
                            icon={<HiOutlineDocumentText />}
                            name="invoice"
                            title="فایل پیش فاکتور خود را انتخاب کنید"
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
                        <CButton
                            text={loading ? <Loading size={20} /> : "ثبت سفارش"}
                            onClick={handleSendOrder}
                            disabled={loading}
                            variant="outline"
                            className="w-full md:w-auto border-primary text-primary my-1 md:my-0 text-center py-2 px-4 rounded-2xl"
                        />
                    </div>
                </div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default AddOrderRoute;
