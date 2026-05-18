/*const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

// Create task (admin only)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const task = await Task.create(req.body);
  res.json(task);
});

// Get tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Update status
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

module.exports = router;
/*const express = require("express");*/
/*const Task = require("../models/Task");*/
/*const auth = require("../middleware/auth.middleware");

const router = express.Router();*/

// Create task (admin only)
/*router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const task = await Task.create(req.body);
  res.json(task);
});

// Get tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Update status
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

module.exports = router;


router.get("/dashboard", auth, async (req, res) => {
  const total = await Task.countDocuments();
  const completed = await Task.countDocuments({ status: "completed" });
  const pending = await Task.countDocuments({ status: "pending" });

  res.json({ total, completed, pending });
});*/
 







const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const Project = require("../models/Project");
const { authMiddleware } = require("../middleware/authMiddleware");

// ==========================
// ➕ CREATE TASK (SECURE + VALIDATION)
// ==========================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, projectId, assignedTo, status } = req.body;

    // ✅ validate input
    if (!title || !projectId || !assignedTo) {
      return res.status(400).json({
        message: "Title, projectId and assignedTo are required",
      });
    }

    // ✅ check project exists
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const members = project.members || [];

    // ✅ check current user permission
    const isCreator = project.createdBy.toString() === req.user.id;
    const isMember = members.some(
      (member) => member.toString() === req.user.id
    );
    const isAdmin = req.user.role === "admin";

    if (!isCreator && !isMember && !isAdmin) {
      return res.status(403).json({
        message: "Not authorized to add task in this project",
      });
    }

    // ✅ check assigned user is member
    const isAssignedValid = members.some(
      (member) => member.toString() === assignedTo
    );

    if (!isAssignedValid) {
      return res.status(403).json({
        message: "Assigned user is not part of this project",
      });
    }

    // ✅ create task
    const task = await Task.create({
      title,
      projectId,
      assignedTo,
      createdBy: req.user.id, // 🔥 IMPORTANT (permission system)
      status: status || "pending",
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ==========================
// 📥 GET TASKS (USER BASED)
// ==========================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { assignedTo: req.user.id },
        { createdBy: req.user.id },
      ],
    })
      .populate("assignedTo", "name email")
      .populate("projectId", "name")
      .populate("createdBy", "name");

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================
// ❌ DELETE TASK (SECURE)
// ==========================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ✅ only creator or admin can delete
    if (
      task.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized to delete this task",
      });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;