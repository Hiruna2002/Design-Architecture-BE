import { Document } from "mongodb";
import mongoose from "mongoose";

export interface ITeamMember extends Document {
    name: string;
    role: string;
    description: string;
    email: string;
}

const teamMembersSchema = new mongoose.Schema<ITeamMember>({
    name : {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true
    }
});

const TeamMembers = mongoose.model<ITeamMember>("teamMembers", teamMembersSchema);

export default TeamMembers;