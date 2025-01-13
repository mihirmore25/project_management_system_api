const { Task } = require("../models");

module.exports = {
    // Create a task
    async createTask(req, res) {
        try {
            const { title, description, status, projectId } = req.body;
            const task = await Task.create({
                title,
                description,
                status,
                projectId,
            });
            res.status(201).json(task);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Get all tasks
    async getTasks(req, res) {
        try {
            const tasks = await Task.findAll();
            res.json(tasks);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Get a task by ID
    async getTaskById(req, res) {
        try {
            const { id } = req.params;
            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.json(task);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Update a task
    async updateTask(req, res) {
        try {
            const { id } = req.params;
            const { title, description, status } = req.body;

            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            await task.update({ title, description, status });
            res.json(task);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Delete a task
    async deleteTask(req, res) {
        try {
            const { id } = req.params;

            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            await task.destroy();
            res.json({ message: "Task deleted successfully" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};
