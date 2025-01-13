require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes.js"); // User routes

const app = express();

app.use(express.json());

// Routes
app.use("/api/v1/users", userRoutes);


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
