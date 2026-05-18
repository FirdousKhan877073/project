const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ROUTES
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/tasks", require("./routes/task.routes")); // ✅ FIXED
// Add this to your server.js or create routes/user.routes.js
//app.use("/api/users", require("./routes/user.routes"));
// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);