import CSelectOption from "@/components/core/inputs/select";
import Loading from "@/components/core/loadings";
import {
    ERole,
    ETransactionStatus,
    ETRANSACTION_STATUS_NAMES,
    IProductTransaction,
    IUser,
} from "@/types/data";
import {filterStatusesByUser, isInTransaction} from "@/utils";
import {FC} from "react";
import ProductTransactionListItem from "./product-transaction-list-item";

interface ProductTransactionListProps {
    transactions: IProductTransaction[];
    editable: boolean;
    handleChangeKey: (id: string, key?: string) => void;
    handleChangeStatus: (id: string, status: ETransactionStatus) => void;
    user: IUser;
}

const ProductTransactionList: FC<ProductTransactionListProps> = ({
    editable,
    transactions,
    handleChangeKey,
    handleChangeStatus,
    user,
}) => {
    return (
        <div className="w-full flex items-center justify-center flex-wrap text-sm pt-3 pb-5">
            <div className="w-full text-base flex items-center justify-center flex-nowrap my-3 p-1 border-b-2 border-secondary">
                <div className="w-2/12 overflow-x-auto flex items-center justify-center">
                    <span className="font-semibold">نام کالا</span>
                </div>
                <div className="w-2/12 flex items-center justify-center">
                    <span className="">توضیحات</span>
                </div>
                <div className="w-1/12 flex items-center justify-center">
                    <span className="">ایدی کالا</span>
                </div>
                <div className="w-2/12 flex items-center justify-center">
                    <span className="ml-1">وضعیت</span>
                </div>
            </div>
            {transactions?.length > 0 ?
                transactions.map((transaction, index) => (
                    <ProductTransactionListItem
                        key={index}
                        transaction={transaction}
                        editable={editable}
                        handleChangeKey={handleChangeKey}
                        handleChangeStatus={handleChangeStatus}
                        user={user}
                    />
                )):(
                    <div className="w-full flex justify-center items-center">
                        موردی یافت نشد
                    </div>
                )}
        </div>
    );
};

export default ProductTransactionList;
