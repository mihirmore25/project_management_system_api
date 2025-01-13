const express = require("express");
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require("../controllers/taskController.js");
const { authenticate } = require("../middleware/authenticate.js");

const router = express.Router();

// Create a new task
router.post("/", authenticate, createTask);

// Get all tasks
router.get("/", authenticate, getTasks);

// Get a task by ID
router.get("/:id", authenticate, getTaskById);

// Update a task
router.put("/:id", authenticate, updateTask);

// Delete a task
router.delete("/:id", authenticate, deleteTask);

module.exports = router;
