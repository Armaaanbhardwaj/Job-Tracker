const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "Interview",
        "Offer",
        "Rejected",
        "Selected"
      ],
      default: "Applied"
    },
    location: {
      type: String,
      default: ""
    },
    jobType: {
      type: String,
      default: ""
    },
    applicationDate: {
      type: Date,
      default: Date.now
    },
    jobUrl: {
      type: String,
      default: ""
    },
    notes: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Application", applicationSchema);