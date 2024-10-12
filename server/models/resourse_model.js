import mongoose from "mongoose";

const getISTTime = () => {
  const currentDate = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30
  const istTime = new Date(currentDate.getTime() + istOffset);
  return istTime;
};

const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    content: { type: String, required: true },
    category: { 
      type: String, 
      enum: ['Business_Tips', 'Funding', 'Mentorship', 'Networking'], 
      required: true 
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    tags: [String], 
    version: { type: Number, default: 1 }, 
    lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    updatedAt: { type: Date }
  }, {
    timestamps: { currentTime: getISTTime } 
  });
  
resourceSchema.index({ title: "text", content: "text", tags: "text" });
  
export const Resource = mongoose.model('Resource', resourceSchema);
  