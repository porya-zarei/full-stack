export interface IRoute {
    path: string;
    name: string;
}

export const APP_ROUTES:IRoute[] = [
    { path: '/', name: "داشبورد" },
    { path: '/auth/login', name: "ورود" },
    { path: '/auth/register', name: "ثبت نام" },
]