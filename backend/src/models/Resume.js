const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    title: {
      type: String,
      default: "My Resume",
      trim: true
    },
    template: {
      type: String,
      default: "Template1"
    },
    personalInfo: {
      fullName: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      summary: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" }
    },
    education: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    },
    experience: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    },
    skills: {
      type: [String],
      default: []
    },
    projects: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Resume", resumeSchema);