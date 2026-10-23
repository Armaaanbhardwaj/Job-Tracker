const express = require("express");
const protect = require("../middleware/auth.middleware");

const {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication
} = require("../controllers/application.controller");

const router = express.Router();

// All application endpoints require authentication.
router.use(protect);

router.post("/", createApplication);
router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

module.exports = router;