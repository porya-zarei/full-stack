import path from "path";

export const USERS_JSON_DB_FILE = path.join(
    process.cwd(),
    "server",
    "local-db",
    "users.json",
);

export const ORDERS_JSON_DB_FILE = path.join(
    process.cwd(),
    "server",
    "local-db",
    "orders.json",
);
