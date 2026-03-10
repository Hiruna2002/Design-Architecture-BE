import mongoose, {Document} from "mongoose";

export interface IProject extends Document {
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    cost: number;
    area: string;
}

const projectSchema = new mongoose.Schema<IProject>({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    
    description: { 
        type: String, 
        required: true 
    },

    imageUrl: {
        type: String
    },

    category: { 
        type: String, 
        required: true 
    },

    cost: {
        type: Number,
        required: true,
    },

    area: {
        type: String
    }
});

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;

