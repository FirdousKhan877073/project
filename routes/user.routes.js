const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authmiddleware");

// GET all users (for dropdown)
router.get("/", auth, async (req, res) => {
    try {
        const users = await User.find({}, "name email _id role");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single user
router.get("/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id, "name email _id role");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;