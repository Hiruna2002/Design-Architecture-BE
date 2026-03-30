import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "user" | "admin";
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phone: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;