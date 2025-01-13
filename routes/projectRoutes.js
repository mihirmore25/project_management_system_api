const express = require("express");
const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    assignUserToProject,
    getTasksForProject,
} = require("../controllers/projectController.js");
const { authenticate } = require("../middleware/authenticate.js");
const { authorizeProjectOwner } = require("../middleware/authorize.js");

const router = express.Router();

// Create a new project
router.post("/", authenticate, createProject);

// Get all projects
router.get("/", authenticate, getProjects);

// Get a project by ID
router.get("/:id", authenticate, getProjectById);

// Update a project
router.put("/:id", authenticate, authorizeProjectOwner, updateProject);

// Delete a project
router.delete("/:id", authenticate, authorizeProjectOwner, deleteProject);

// Assign a user to a project
router.post(
    "/:id/assign",
    authenticate,
    authorizeProjectOwner,
    assignUserToProject
);

// Get all tasks for a project
router.get("/:id/tasks", authenticate, getTasksForProject);

module.exports = router;
