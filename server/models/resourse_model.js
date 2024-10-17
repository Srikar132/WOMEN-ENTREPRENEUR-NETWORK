import mongoose from "mongoose";


const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    content: { type: String, required: true },
    category: { 
      type: String, 
      required: true 
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    tags: [String],
    version: { type: Number, default: 1 }, 
    lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  }, {
    timestamps: true 
  });
  
resourceSchema.index({ title: "text", content: "text", tags: "text" });
  
export const Resource = mongoose.model('Resource', resourceSchema);
  