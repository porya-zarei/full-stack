import {ERole, IUser} from "@/types/data";

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
