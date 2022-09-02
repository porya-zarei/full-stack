export const API_ROUTES = {
    orders: {
        addOrder: "/orders/addOrder",
        deleteOrder: "/orders/deleteOrder",
        getAllOrders: "/orders/getAllOrders",
        getOrder: "/orders/getOrder",
        getPendingOrders: "/orders/getPendingOrders",
        updateOrder: "/orders/updateOrder",
        userOrders: "/orders/userOrders",
        updateOrderStatus: "/orders/updateOrderStatus",
        checkMoneyLimit: "/orders/checkMoneyLimit",
    },
    users: {
        addUser: "/users/addUser",
        deleteUser: "/users/deleteUser",
        getAllUsers: "/users/getAllUsers",
        getUser: "/users/getUser",
        updateUser: "/users/updateUser",
        loginUser: "/users/loginUser",
        registerUser: "/users/registerUser",
        changeUserGroup: "/users/changeUserGroup",
        changeUserRole: "/users/changeUserRole",
    },
    productCategories: {
        getProductCategories: "/product-categories/getProductCategories",
        getProductCategoriesByGroup:
            "/product-categories/getProductCategoryByGroup",
        getProductCategory: "/product-categories/getProductCategory",
        addProductCategory: "/product-categories/addProductCategory",
        deleteProductCategory: "/product-categories/deleteProductCategory",
    },
    productTransactions: {
        getAllProductTransactions:
            "/product-transactions/getAllProductTransactions",
        getProductTransactionsByUser:
            "/product-transactions/getProductTransactionsByUser",
        getProductTransactionsByStatus:
            "/product-transactions/getProductTransactionsByStatus",
        getProductTransaction: "/product-transactions/getProductTransaction",
        addProductTransaction: "/product-transactions/addProductTransaction",
        deleteProductTransaction:
            "/product-transactions/deleteProductTransaction",
        updateProductTransaction:
            "/product-transactions/updateProductTransaction",
        confirmProductTransaction:
            "/product-transactions/confirmProductTransaction",
        getProductTransactionsForConfirmation:
            "/product-transactions/getProductTransactionsForConfirmation",
    },
    groups: {
        getAllGroups: "/groups/getAllGroups",
        getGroup: "/groups/getGroup",
        addGroup: "/groups/addGroup",
        updateGroup: "/groups/updateGroup",
        deleteGroup: "/groups/deleteGroup",
        checkGroupMoneyLimit: "/groups/checkGroupMoneyLimit",
        deleteGroupLimitYear: "/groups/deleteGroupLimitYear",
    },
    accessKeys: {
        getAllAccessKeys: "/access-keys/getAllAccessKeys",
        getAccessKey: "/access-keys/getAccessKey",
        addAccessKey: "/access-keys/addAccessKey",
        deleteAccessKey: "/access-keys/deleteAccessKey",
        updateAccessKey: "/access-keys/updateAccessKey",
    },
    uploads: {
        uploadOrderFile: "/uploads/uploadOrderFile",
    },
};
