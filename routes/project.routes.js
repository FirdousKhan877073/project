/*const express = require("express");
const router = express.Router();
const auth = require("../middleware/authmiddleware");

// Create project (admin only)
router.post("/", auth, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { name } = req.body;

  res.json({
    message: "Project created",
    project: { name }
  });
});

// Get all projects
router.get("/", auth, (req, res) => {
  res.json({
    message: "All projects fetched"
  });
});

module.exports = router;*/

const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");


// ==========================
// ➕ CREATE PROJECT
// ==========================
router.post("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      createdBy: req.user.id,
      members: req.body.members || [],
    });

    res.status(201).json(project);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ==========================
// 📥 GET USER PROJECTS ONLY
// ==========================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.user.id },
        { members: req.user.id },
      ],
    })
      .populate("members", "name email")
      .populate("createdBy", "name email");

    res.json(projects);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ==========================
// ❌ DELETE PROJECT (SECURE)
// ==========================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ only creator or admin
    if (
      project.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Only creator or admin can delete",
      });
    }

    await project.deleteOne();

    res.json({ message: "Project deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ==========================
// 👥 ADD MEMBER
// ==========================
router.put("/:id/add-member", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // only creator/admin
    if (
      project.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!project.members.includes(userId)) {
      project.members.push(userId);
      await project.save();
    }

    res.json(project);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ==========================
// ❌ REMOVE MEMBER
// ==========================
router.put("/:id/remove-member", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // only creator/admin
    if (
      project.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    project.members = project.members.filter(
      (member) => member.toString() !== userId
    );

    await project.save();

    res.json(project);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;