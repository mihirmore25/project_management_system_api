const express = require("express");
const {
    register,
    login,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers/userController.js");

const { authenticate } = require("../middleware/authenticate.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", authenticate, getUsers);
router.get("/:id", authenticate, getUserById);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

module.exports = router;
