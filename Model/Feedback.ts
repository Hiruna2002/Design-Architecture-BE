import mongoose, { Document } from "mongoose";

export interface IFeedback extends Document {
  name: string;
  message: string;
  rating: number;
}

const feedbackSchema = new mongoose.Schema<IFeedback>({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
}, { timestamps: true });

export default mongoose.model<IFeedback>("Feedback", feedbackSchema);