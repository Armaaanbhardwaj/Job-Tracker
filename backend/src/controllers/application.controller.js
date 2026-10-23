const mongoose = require("mongoose");
const Application = require("../models/Application");

// POST /api/applications
const createApplication = async (req, res) => {
  try {
    const {
      company,
      role,
      status,
      location,
      jobType,
      applicationDate,
      jobUrl,
      notes
    } = req.body;

    if (
      typeof company !== "string" ||
      !company.trim() ||
      typeof role !== "string" ||
      !role.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Company and role are required"
      });
    }

    const application = await Application.create({
      user: req.userId,
      company: company.trim(),
      role: role.trim(),
      status,
      location,
      jobType,
      applicationDate,
      jobUrl,
      notes
    });

    return res.status(201).json({
      success: true,
      message: "Application created successfully",
      application
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid application data",
        error: error.message
      });
    }

    console.error("Create application error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to create application"
    });
  }
};

// GET /api/applications
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.userId
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    console.error("Get applications error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch applications"
    });
  }
};

// GET /api/applications/:id
const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID"
      });
    }

    const application = await Application.findOne({
      _id: id,
      user: req.userId
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    return res.status(200).json({
      success: true,
      application
    });
  } catch (error) {
    console.error("Get application error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch application"
    });
  }
};

// PUT /api/applications/:id
const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID"
      });
    }

    // Only allow these fields to be updated.
    const allowedFields = [
      "company",
      "role",
      "status",
      "location",
      "jobType",
      "applicationDate",
      "jobUrl",
      "notes"
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (
      ("company" in updates &&
        (typeof updates.company !== "string" ||
          !updates.company.trim())) ||
      ("role" in updates &&
        (typeof updates.role !== "string" ||
          !updates.role.trim()))
    ) {
      return res.status(400).json({
        success: false,
        message: "Company and role cannot be empty"
      });
    }

    if (typeof updates.company === "string") {
      updates.company = updates.company.trim();
    }

    if (typeof updates.role === "string") {
      updates.role = updates.role.trim();
    }

    const application = await Application.findOneAndUpdate(
      {
        _id: id,
        user: req.userId
      },
      { $set: updates },
      {
        new: true,
        runValidators: true
      }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      application
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid application data",
        error: error.message
      });
    }

    console.error("Update application error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to update application"
    });
  }
};

// DELETE /api/applications/:id
const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID"
      });
    }

    const application = await Application.findOneAndDelete({
      _id: id,
      user: req.userId
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully"
    });
  } catch (error) {
    console.error("Delete application error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to delete application"
    });
  }
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication
};