const jobSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Entrepreneur or company
    employmentType: { type: String, enum: ['full-time', 'part-time', 'freelance'], required: true },
    location: { type: String },
    salary: { type: String }, 
    applications: [{
      applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
      appliedAt: { type: Date, default: Date.now }
    }],
    postedAt: { type: Date, default: Date.now }
  }, {
    timestamps: true
  });
  
export const Job = mongoose.model('Job', jobSchema);
  