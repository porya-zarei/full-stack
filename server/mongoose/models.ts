import {
    ERole,
    EStatus,
    IDBOrder,
    IOrder,
    IProductCategory,
    IProduct,
    IUser,
} from "@/types/data";
import mongoose, {Schema} from "mongoose";

export const UserSchema = new Schema<IUser>(
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
            type: Number,
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

export const ProductCategorySchema = new Schema<IProductCategory>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    group: {
        type: Number,
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
    mongoose.model<IUser>("User", UserSchema)) as mongoose.Model<IUser>;
export const OrderModel = (mongoose?.models?.Order ||
    mongoose.model<IDBOrder>("Order", OrderSchema)) as mongoose.Model<IDBOrder>;
export const ProductCategoryModel = (mongoose?.models?.ProductCategory ||
    mongoose.model<IProductCategory>(
        "ProductCategory",
        ProductCategorySchema,
    )) as mongoose.Model<IProductCategory>;
