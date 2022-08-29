import CInput from "@/components/core/inputs";
import CRadio from "@/components/core/inputs/radio";
import CSelectOption from "@/components/core/inputs/select";
import Loading from "@/components/core/loadings";
import {useUserContext} from "@/contexts/user-context";
import useNotification from "@/hooks/useNotification";
import {addProductTransaction} from "@/services/product-transactions";
import {
    EProductTransactionType,
    ETRANSACTION_TYPE_NAMES,
    ICreateProductTransaction,
} from "@/types/data";
import {enumToArray} from "@/utils/enums-helper";
import {isAPIResultOk, isValid} from "@/utils/validations";
import {FC, useState} from "react";
import {HiOutlineX} from "react-icons/hi";

interface AddProductTransactionProps {
    handleClose: () => void;
    refetch: () => Promise<void>;
}

const AddProductTransaction: FC<AddProductTransactionProps> = ({
    handleClose,
    refetch,
}) => {
    const {user} = useUserContext();
    const {notify} = useNotification();
    const [product, setProduct] = useState("");
    const [description, setDescription] = useState("");
    const [key, setKey] = useState("");
    const [type, setType] = useState<EProductTransactionType>(0);
    const [inTransaction, setInTransaction] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        console.log(product, description, key, inTransaction);
        if (isValid([product, description])) {
            try {
                setLoading(true);
                const data: ICreateProductTransaction = {
                    product,
                    description,
                    key,
                    user: user.id,
                    type,
                };
                const result = await addProductTransaction(data, inTransaction);
                if (isAPIResultOk(result)) {
                    notify("مورد با موفقیت ایجاد شد", {
                        type: "success",
                    });
                    handleClose();
                    refetch().then(() => {
                        setProduct("");
                        setDescription("");
                        setKey("");
                        setInTransaction(true);
                    });
                } else {
                    notify(`خطا در ایجاد مورد: ${result?.error}`, {
                        type: "error",
                    });
                }
            } catch (error) {
                notify("خطا در ایجاد مورد", {
                    type: "error",
                });
                console.log("error i create product transaction => ", error);
            } finally {
                setLoading(false);
            }
        } else {
            notify("لطفا فیلدها را به درستی پر کنید | بیشتر از 6 کاراکتر", {
                type: "error",
            });
        }
    };

    return (
        <div className="relative w-full h-full md:max-w-xl bg-light rounded-t-3xl md:rounded-xl flex items-start justify-center flex-wrap content-start p-4">
            <button
                type="button"
                title="بستن"
                className="absolute top-0 right-0 m-4 text-danger"
                onClick={() => {
                    setProduct("");
                    setDescription("");
                    setKey("");
                    setInTransaction(true);
                    handleClose();
                }}>
                <HiOutlineX />
            </button>
            <div className="w-full flex items-center justify-center mt-3">
                <h3 className="text-2xl font-semibold border-b-2 border-secondary">
                    افزودن تراکنش جدید
                </h3>
            </div>
            <div className="w-full mt-5 flex items-start justify-center flex-wrap content-start">
                <div className="w-full flex items-center justify-center my-3">
                    <CRadio
                        name="transaction-in-out"
                        title="ورود یا خروج کالا :"
                        options={[
                            {value: "in", key: "ورود"},
                            {value: "out", key: "خروج"},
                        ]}
                        onChange={(e) =>
                            setInTransaction(e.target.value === "in")
                        }
                        className="mx-1"
                        radioContainerClassName="mx-3 user-select-none text-xs"
                        value={inTransaction ? "in" : "out"}
                    />
                </div>
                <div className="w-full flex items-center justify-center my-3">
                    <CRadio
                        name="transaction-type"
                        title="نوع تراکنش:"
                        options={enumToArray(EProductTransactionType).map(
                            (item) => ({
                                key: ETRANSACTION_TYPE_NAMES[
                                    Number(item.value)
                                ],
                                value: item.value,
                            }),
                        )}
                        onChange={(e) => setType(Number(e.target.value))}
                        className="mx-1"
                        radioContainerClassName="mx-3 user-select-none text-xs"
                        value={type.toString()}
                    />
                </div>
                <div className="w-full flex items-center justify-center my-3">
                    <CInput
                        containerClassName="rounded-md border-2 border-gray p-2 flex-wrap"
                        type="text"
                        value={product}
                        name="product"
                        onChange={(e) => setProduct(e.target.value)}
                        title="نام کالا"
                        placeholder="......"
                    />
                </div>
                <div className="w-full flex items-center justify-center my-3">
                    <CInput
                        containerClassName="rounded-md border-2 border-gray p-2 flex-wrap"
                        type="text"
                        value={description}
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        title="توضیحات"
                        placeholder="......"
                    />
                </div>
                <div className="w-full flex items-center justify-center my-3">
                    <CInput
                        containerClassName="rounded-md border-2 border-gray p-2 flex-wrap"
                        type="text"
                        value={key}
                        name="key"
                        onChange={(e) => setKey(e.target.value)}
                        title="ایدی کالا"
                        placeholder="......"
                    />
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

export default AddProductTransaction;
