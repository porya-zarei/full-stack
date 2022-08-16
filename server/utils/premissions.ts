import {ERole, ICreateOrder, IGroup, IUser} from "@/types/data";

export const isUserCanChangeGroup = (user: IUser, modifiedUser: IUser) => {
    if (user.role === ERole.CREATOR && modifiedUser.role !== ERole.CREATOR) {
        return true;
    }
    if (user.role === ERole.ADMIN && modifiedUser.role === ERole.USER) {
        return true;
    }
    return false;
};

export const isUserCanChangeRole = (user: IUser, modifiedUser: IUser) => {
    if (user.role === ERole.CREATOR && modifiedUser.role !== ERole.CREATOR) {
        return true;
    }
    if (user.role === ERole.ADMIN && modifiedUser.role === ERole.USER) {
        return true;
    }
    return false;
};

export const isUserCanDeleteUser = (user: IUser, modifiedUser: IUser) => {
    if (user.role === ERole.CREATOR && modifiedUser.role !== ERole.CREATOR) {
        return true;
    }
    if (user.role === ERole.ADMIN && modifiedUser.role === ERole.USER) {
        return true;
    }
    return false;
};

export const isUserCanModifyProductCategories = (user: IUser) => {
    return user.role === ERole.CREATOR;
};

const toEnglishDigits = (str: string) => {
    const persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const english = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let i = 0; i < persian.length; i++) {
        str = str.replace(new RegExp(persian[i], "g"), english[i]);
    }
    return str;
};

export const getCurrentJalaliYear = () => {
    const date = new Date();
    const year = date.toLocaleDateString("fa-IR").split("/")[0];
    return toEnglishDigits(year);
};

export const isExtraPrice = (order: ICreateOrder | number, group: IGroup) => {
    let orderPrice = 0;
    if (typeof order === "number") {
        orderPrice = order;
    } else {
        orderPrice = order.products.reduce((acc, curr) => {
            return acc + Number(curr.price) * curr.count;
        }, 0);
    }
    const year = getCurrentJalaliYear();
    const groupLimit =
        Number(
            group.moneyLimitYears.find((limitYear) => limitYear.year === year)
                ?.limit,
        ) ?? 0;
    return orderPrice > groupLimit;
};
