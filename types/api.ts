export interface IAPIResult<T> {
    data: T;
    error?: string;
    ok: boolean;
    token?: string;
}

export interface ILoginData {
    userName: string;
    password: string;
}
