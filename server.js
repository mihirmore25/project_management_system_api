require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

// Root Route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Project Management System API!",
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
