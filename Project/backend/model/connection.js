
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/interviewApp"
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB error:", err.message));

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  }
}, { _id: false });

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  skills: [String],
  projects: [projectSchema],
  company: String,
  role: String
});

const questionSchema = new mongoose.Schema({
  cacheKey: {
    type: String,
    unique: true,
    sparse: true
  },

  skill: String,
  company: String,
  role: String,
  mode: String,

  // Retains compatibility with the old frontend
  questions: [String],

  // Additional structured question details
  details: [{
    question: String,
    difficulty: String,
    category: String
  }]
}, { timestamps: true });

const registration_model = mongoose.model(
  "login_data",
  registrationSchema
);

const questions_model = mongoose.model(
  "questions",
  questionSchema
);

module.exports = {
  registration_model,
  questions_model
};
