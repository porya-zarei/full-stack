import {
    ERole,
    ETransactionStatus,
    ETransactionStatus_ADMIN,
    IGroup,
    IOrder,
} from "@/types/data";
import {getCurrentJalaliYear} from "./date-helper";
import {enumToArray} from "./enums-helper";

export const getOrderPrice = (order: IOrder | IOrder[]) => {
    if (Array.isArray(order)) {
        let sum = 0;
        order.forEach((o) => {
            const {products} = o;
            const price = products.reduce((acc, product) => {
                return acc + Number(product.price) * Number(product.count);
            }, 0);
            sum += price;
        });
        return sum;
    } else {
        const {products} = order;
        const price = products.reduce((acc, product) => {
            return acc + Number(product.price) * Number(product.count);
        }, 0);
        return price;
    }
};

export const getGroupMoneyRemaining = (
    groups: IGroup[],
    orders: IOrder[],
    selectedGroup: string,
) => {
    const group = groups.find((g) => g?.id === selectedGroup);
    const filteredOrders = orders.filter(
        (o) => o.user?.group?.id === selectedGroup,
    );
    if (group && filteredOrders.length) {
        const currentYear = getCurrentJalaliYear();
        const groupPrice = group?.moneyLimitYears.find(
            (ml) => ml?.year === currentYear,
        );
        const ordersPrice = getOrderPrice(filteredOrders);
        return Number(groupPrice?.limit ?? 0) - Number(ordersPrice);
    }
    return 0;
};

export const filterStatusesByUser = (role: ERole, inTransaction: boolean) => {
    if (role === ERole.ADMIN) {
        const options = enumToArray(ETransactionStatus_ADMIN).filter((s) => {
            console.log("options =>", s.key);
            if (inTransaction) {
                return s.key.includes("IN");
            } else {
                return s.key.includes("OUT");
            }
        });
        return options;
    } else {
        const options = enumToArray(ETransactionStatus).filter((s) => {
            if (inTransaction) {
                return s.key.includes("IN");
            } else {
                return s.key.includes("OUT");
            }
        });
        return options;
    }
};

export const isInTransaction = (status: ETransactionStatus) => {
    const result =
        enumToArray(ETransactionStatus)
            .find((s) => Number(s.value) === status)
            ?.key.includes("IN") ?? false;
    console.log("is in transaction => ", result);
    return result;
};

export const isObjectNotEmpty = (obj: object | undefined | null) => {
    return obj && Object.keys(obj).length > 0;
};
