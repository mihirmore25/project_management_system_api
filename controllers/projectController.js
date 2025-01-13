const { Project, User, Task } = require("../models");

module.exports = {
    // Create a new project
    async createProject(req, res) {
        try {
            const { name, description } = req.body;
            const project = await Project.create({ name, description });
            await project.addUser(req.user); // Add the current user as a project member
            res.status(201).json(project);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Get all projects
    async getProjects(req, res) {
        try {
            const projects = await Project.findAll({ include: User });

            if (
                projects.length < 1 ||
                projects == null ||
                projects == undefined
            )
                return res.status(404).json({
                    message: "No projects found!",
                });
            return res.status(200).json(projects);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Get a project by ID
    async getProjectById(req, res) {
        try {
            const { id } = req.params;
            const project = await Project.findByPk(id, { include: User });
            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }
            res.json(project);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Update a project
    async updateProject(req, res) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            const project = await Project.findByPk(id);
            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }

            await project.update({ name, description });
            res.json(project);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Delete a project
    async deleteProject(req, res) {
        try {
            const { id } = req.params;

            const project = await Project.findByPk(id);
            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }

            await project.destroy();
            res.json({ message: "Project deleted successfully" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Assign a user to a project
    async assignUserToProject(req, res) {
        try {
            const { id } = req.params; // Project ID
            const { userId } = req.body; // User ID to assign

            const project = await Project.findByPk(id);
            const user = await User.findByPk(userId);

            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Add the user to the project
            await project.addUser(user);

            res.status(200).json({
                message: `User ${userId} assigned to project ${id}`,
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Retrieve all tasks for a project
    async getTasksForProject(req, res) {
        try {
            const { id } = req.params; // Project ID
            console.log(`project id ${id}`);

            const project = await Project.findByPk(id, {
                include: {
                    model: Task,
                    attributes: ["id", "title", "description", "status"],
                },
            });

            // const project1 = await Project.findByPk(id);
            // console.log(project1);

            // console.log(project);

            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }

            res.status(200).json(project.Tasks); // Return only tasks for the project
        } catch (err) {
            res.status(500).json({ error: err.stack });
        }
    },
};
