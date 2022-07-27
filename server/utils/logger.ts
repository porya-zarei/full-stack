class Logger {
    public log(message: string) {
        console.log(message);
    }
    public error(message: string | unknown) {
        console.error(message);
    }
}

export const logger = new Logger();

