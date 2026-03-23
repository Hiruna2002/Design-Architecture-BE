import mongoose from "mongoose";

export interface IService extends Document {
    name: string;
    desc: string;
    exp: number;
    benifits: string[];
}

const serviceSchema = new mongoose.Schema<IService>({
    name: {
        type: String,
        required: true,
        trim: true
    },

    desc: {
        type: String,
        required: true,
        trim: true
    },

    exp: {
        type: Number,
    },

    benifits: {
        type: [String],
        default: []
    }
});

const Service = mongoose.model<IService>("Service", serviceSchema);

export default Service;