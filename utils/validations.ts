export const isEmailValid = (email: string): boolean => {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const isValid = (value: string | string[]): boolean => {
    if (Array.isArray(value)) {
        return value.every((item) => isValid(item));
    } else {
        return value.length > 0;
    }
};

export const isPhoneNumberValid = (phoneNumber: string): boolean => {
    const re = /^09[0-9]{9,9}$/;
    return re.test(phoneNumber);
}
