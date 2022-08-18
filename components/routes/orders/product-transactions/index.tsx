import FrameContainer from "@/components/core/containers/frame-container";
import RouteContainer from "@/components/core/containers/route-container";
import AddProductTransaction from "./add-product-transaction";
import {useModal} from "@/hooks/useModal";
import {FC} from "react";
import {HiOutlinePencilAlt} from "react-icons/hi";
import {useProductTransactions} from "@/hooks/useProductTransactions";
import {useUserContext} from "@/contexts/user-context";
import {
    ERole,
    ETransactionStatus,
    ETRANSACTION_STATUS_NAMES,
} from "@/types/data";
import {updateProductTransaction} from "@/services/product-transactions";
import {isAPIResultOk} from "@/utils/validations";
import useNotification from "@/hooks/useNotification";
import {usePendingTransactions} from "@/hooks/usePendingTransactions";
import ProductTransactionList from "./product-transaction-list";

interface ProductTransactionsRouteProps {}

const ProductTransactionsRoute: FC<ProductTransactionsRouteProps> = () => {
    const {ModalWrapper, handleClose, isOpen, handleOpen} = useModal();
    const {notify} = useNotification();
    const {user} = useUserContext();
    const {productTransactions} = useProductTransactions(
        user.role === ERole.CREATOR ? undefined : user.id,
    );
    const {pendingTransactions, refetch} = usePendingTransactions();
    const handleChangeKey = async (id: string, key?: string) => {
        try {
            const newKey = prompt(
                "ایدی کالا را برای ثبت یا ویرایش وارد کنید",
                key,
            );
            if (newKey && newKey.length > 4) {
                const result = await updateProductTransaction({
                    id,
                    key: newKey,
                });
                if (isAPIResultOk(result)) {
                    notify(`کلید با موفقیت ${key ? "ویرایش" : "ثبت"} شد`, {
                        type: "success",
                    });
                    refetch();
                } else {
                    notify(`خطا در ثبت کلید: ${result?.error}`, {
                        type: "error",
                    });
                }
            }
        } catch (error) {
            notify("خطا در ثبت کلید", {
                type: "error",
            });
            console.log("error in update product transaction => ", error);
        }
    };
    const handleChangeStatus = async (
        id: string,
        status: ETransactionStatus,
    ) => {
        try {
            const result = await updateProductTransaction({
                id,
                status,
            });
            if (isAPIResultOk(result)) {
                notify(
                    `وضعیت با موفقیت ${ETRANSACTION_STATUS_NAMES[status]} شد`,
                    {
                        type: "success",
                    },
                );
                refetch();
            } else {
                notify(`خطا در ثبت وضعیت: ${result?.error}`, {
                    type: "error",
                });
            }
        } catch (error) {
            notify("خطا در ثبت وضعیت", {
                type: "error",
            });
            console.log("error in update product transaction => ", error);
        }
    };
    return (
        <RouteContainer>
            <FrameContainer className="m-2 md:m-4 border-primary">
                <div className="w-full flex items-start justify-center flex-wrap p-3">
                    <div className="w-full flex items-center justify-center">
                        <h3 className="text-2xl font-semibold">
                            مدیریت دسته بندی های کالا های هر گروه
                        </h3>
                    </div>
                    <div className="w-full flex items-center justify-center flex-wrap my-3">
                        <button
                            onClick={handleOpen}
                            type="button"
                            className="w-full text-lg flex items-center justify-center m-1 text-light bg-warning rounded-full p-3">
                            <span className="text-lg font-semibold">
                                <HiOutlinePencilAlt />
                            </span>
                            <span>افزودن دسته بندی جدید</span>
                        </button>
                        <ModalWrapper>
                            <AddProductTransaction
                                refetch={refetch}
                                handleClose={handleClose}
                            />
                        </ModalWrapper>
                    </div>
                    <div className="w-full flex items-center justify-center flex-wrap mb-4">
                        <div className="w-full font-bold text-lg flex items-center justify-center">
                            کالا های ثبت شده توسط شما
                        </div>
                        <ProductTransactionList
                            user={user}
                            transactions={productTransactions}
                            handleChangeKey={handleChangeKey}
                            handleChangeStatus={handleChangeStatus}
                            editable={false}
                        />
                    </div>
                    {user?.role !== ERole.USER && (
                        <div className="w-full flex items-center justify-center flex-wrap">
                            <div className="w-full font-bold text-lg flex items-center justify-center flex-wrap my-3">
                                کالا های در انتظار تایید توسط شما
                            </div>
                            <ProductTransactionList
                                user={user}
                                transactions={pendingTransactions}
                                handleChangeKey={handleChangeKey}
                                handleChangeStatus={handleChangeStatus}
                                editable={true}
                            />
                        </div>
                    )}
                </div>
            </FrameContainer>
        </RouteContainer>
    );
};

export default ProductTransactionsRoute;
