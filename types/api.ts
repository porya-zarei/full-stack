export interface IAPIResult<T> {
    data: T;
    error?: string;
    ok: boolean;
}

export interface ILoginData {
    userName: string;
    password: string;
}
