import mongoose, {Document} from "mongoose";

export interface IProject extends Document {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: string;
    category: string;
    teamMembers: string[];
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
    startDate: { 
        type: Date 
    },
    endDate: { 
        type: Date 
    },
    status: { 
        type: String, 
        default: "Not Started" 
    },
    category: { 
        type: String, 
        required: true 
    },
    teamMembers: [
        { 
            type: String 
        }
    ],
});

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;

