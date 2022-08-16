import {
    ERole,
    EStatus,
    IDBOrder,
    IProduct,
    IGroup,
    IDBProductCategory,
    IDBUser,
    IMoneyLimitYear,
} from "@/types/data";

import mongoose, {Schema} from "mongoose";

export const MoneyLimitYearSchema = new Schema<IMoneyLimitYear>({
    limit: {type: String, required: true},
    year: {type: String, required: true},
});

export const GroupSchema = new Schema<IGroup>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    moneyLimitYears: {
        type: [MoneyLimitYearSchema],
    },
});

export const UserSchema = new Schema<IDBUser>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        group: {
            type: String,
            required: true,
        },
        joinedAt: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            required: true,
            default: ERole.USER,
        },
    },
    {timestamps: true},
);

export const ProductCategorySchema = new Schema<IDBProductCategory>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    group: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

export const ProductSchema = new Schema<IProduct>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    category: {
        type: ProductCategorySchema,
        required: true,
        default: {
            id: "",
            key: "",
            name: "",
        },
    },
});

export const OrderSchema = new Schema<IDBOrder>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default: EStatus.PENDING_FOR_SUPERVISOR,
    },
    date: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    supervisor: {
        type: String,
        required: true,
    },
    officialBill: {
        type: Boolean,
        required: true,
        default: false,
    },
    products: {
        type: [ProductSchema],
        required: true,
        default: [],
    },
});

export const UserModel = (mongoose?.models?.User ||
    mongoose.model<IDBUser>("User", UserSchema)) as mongoose.Model<IDBUser>;
export const OrderModel = (mongoose?.models?.Order ||
    mongoose.model<IDBOrder>("Order", OrderSchema)) as mongoose.Model<IDBOrder>;
export const ProductCategoryModel = (mongoose?.models?.ProductCategory ||
    mongoose.model<IDBProductCategory>(
        "ProductCategory",
        ProductCategorySchema,
    )) as mongoose.Model<IDBProductCategory>;

export const GroupModel = (mongoose?.models?.Group ||
    mongoose.model<IGroup>("Group", GroupSchema)) as mongoose.Model<IGroup>;
