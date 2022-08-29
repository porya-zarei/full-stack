import CSelectOption from "@/components/core/inputs/select";
import {
    ERole,
    ETransactionStatus,
    ETRANSACTION_STATUS_NAMES,
    ETRANSACTION_TYPE_NAMES,
    IProductTransaction,
    IUser,
} from "@/types/data";
import {filterStatusesByUser, isInTransaction} from "@/utils";
import {FC} from "react";

interface ProductTransactionListItemProps {
    transaction: IProductTransaction;
    editable: boolean;
    handleChangeKey: (id: string, key?: string) => void;
    handleChangeStatus: (id: string, status: ETransactionStatus) => void;
    user: IUser;
}

const ProductTransactionListItem: FC<ProductTransactionListItemProps> = ({
    transaction,
    editable,
    handleChangeKey,
    handleChangeStatus,
    user,
}) => {
    console.log(transaction)
    return (
        <div className="w-full text-xs md:text-base overflow-x-auto flex items-center justify-center flex-nowrap my-1 p-1 rounded-lg hover:bg-secondary-light hover:bg-opacity-30 bg-secondary-light bg-opacity-20">
            <div className="flex-1 md:w-2/12 overflow-x-auto flex items-center justify-center">
                <span className="font-semibold">{transaction.product}</span>
            </div>
            <div
                title={transaction.description}
                className="md:w-2/12 hidden md:flex items-center justify-center">
                <span className="">
                    {transaction?.description?.split(" ")[0] + " ..."}
                </span>
            </div>
            <div className="flex-1 md:w-1/12 flex items-center justify-center">
                <button
                    type="button"
                    onClick={() =>
                        editable &&
                        handleChangeKey(transaction.id, transaction.key)
                    }
                    className="w-ful flex items-center justify-center m-1 text-light bg-warning rounded-md p-1">
                    {transaction.key?.length > 0
                        ? transaction.key
                        : "بدون ایدی"}
                </button>
            </div>
            <div className="flex-1 md:w-1/12 flex items-center justify-center">
                <span className="flex justify-center items-center text-xs">
                    {new Date(transaction.date).toLocaleString("fa-IR")}
                </span>
            </div>
            <div className="flex-1 md:w-3/12 flex items-center justify-center text-xs">
                {!editable ? (
                    <span className="">
                        {ETRANSACTION_STATUS_NAMES[Number(transaction.status)]}
                    </span>
                ) : (
                    <CSelectOption
                        options={filterStatusesByUser(
                            user.role,
                            isInTransaction(transaction.status),
                        ).map(({value}) => ({
                            value: value,
                            label: ETRANSACTION_STATUS_NAMES[Number(value)],
                        }))}
                        value={transaction.status.toString()}
                        name="status"
                        placeholder="وضعیت"
                        onChange={(e) => {
                            handleChangeStatus(
                                transaction.id,
                                Number(e.target.value),
                            );
                        }}
                        className="text-center"
                    />
                )}
            </div>
            <div className="flex-1 md:w-1/12 flex items-center justify-center">
                <span className="">
                    {ETRANSACTION_TYPE_NAMES[Number(transaction.type)]}
                </span>
            </div>
        </div>
    );
};

export default ProductTransactionListItem;
