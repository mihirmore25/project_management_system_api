const { Project } = require("../models");

module.exports = {
    authorizeProjectOwner: async (req, res, next) => {
        try {
            const { id } = req.params; // Project ID from route params
            const project = await Project.findByPk(id);

            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }

            // Check if the authenticated user is the project owner
            const isOwner = await project.hasUser(req.user);
            if (!isOwner) {
                return res.status(403).json({
                    message: "You are not authorized to access this project",
                });
            }

            req.project = project; // Attach project to the request
            next();
        } catch (err) {
            res.status(500).json({
                message: "Authorization failed",
                error: err.message,
            });
        }
    },
};
