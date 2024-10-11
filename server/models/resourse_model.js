const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    content: { type: String, required: true },
    category: { 
      type: String, 
      enum: ['Business Tips', 'Funding', 'Mentorship', 'Networking'], 
      required: true 
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who created the resource
    tags: [String], 
    version: { type: Number, default: 1 }, 
    lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin or author who updated
    updatedAt: { type: Date }
  }, {
    timestamps: true 
  });
  
resourceSchema.index({ title: "text", content: "text", tags: "text" });
  
export const Resource = mongoose.model('Resource', resourceSchema);
  