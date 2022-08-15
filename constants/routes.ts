export enum ROUTES_STATE {
    GENERAL,
    USER_LOGED_IN,
    USER_LOGED_OUT,
    USER_IS_ADMIN,
    USER_IS_CREATOR,
}

export interface IRoute {
    path: string;
    name: string;
    renderState: ROUTES_STATE;
    onClick?: () => void;
}

export const APP_ROUTES: IRoute[] = [
    {path: "/", name: "داشبورد", renderState: ROUTES_STATE.GENERAL},
    {
        path: "/auth/login",
        name: "ورود",
        renderState: ROUTES_STATE.USER_LOGED_OUT,
    },
    {
        path: "/auth/register",
        name: "ثبت نام",
        renderState: ROUTES_STATE.USER_LOGED_OUT,
    },
    {path: "/orders", name: "سفارشات", renderState: ROUTES_STATE.USER_LOGED_IN},
    {
        path: "/auth/logout",
        name: "خروج",
        renderState: ROUTES_STATE.USER_LOGED_IN,
    },
];
