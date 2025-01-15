const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes.js"); // User routes
const projectRoutes = require("./routes/projectRoutes.js"); // Project routes
const taskRoutes = require("./routes/taskRoutes.js"); // Task routes

const app = express();

app.use(express.json());
app.use(helmet.xssFilter());
app.use(helmet.xXssProtection());
app.use(
    cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    })
);
app.use(morgan("dev"));

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/tasks", taskRoutes);

// Root Route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Project Management System API!",
    });
});

const PORT = process.env.PORT || 4000;

(async () => {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log("Database connected successfully.");

        // Sync database models (use { force: true } to reset tables if needed)
        await sequelize.sync({ alter: true }); // Sync without data loss
        console.log("Database synced successfully.");

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.message);
    }
})();
