const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = {
    // Register a new user
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
            });
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Login a user
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            res.json({ token });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Get a user by ID
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Update a user
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const hashedPassword = password
                ? await bcrypt.hash(password, 10)
                : user.password;
            await user.update({ name, email, password: hashedPassword });

            res.json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Delete a user
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            await user.destroy();
            res.json({ message: "User deleted successfully" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};
