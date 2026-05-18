/*const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },
  assignedTo: String,
  projectId: String
});

module.exports = mongoose.model("Task", taskSchema);*/
/*const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending"
  },

  assignedTo: {
    type: String
  },

  createdBy: {
    type: String
  },

  dueDate: {
    type: Date
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);*/
// UPDATE TASK STATUS
const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  title: String,

  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },

  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

  

}, { timestamps: true }); 
