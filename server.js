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

// ✅ SERVE STATIC FILES (HTML, CSS, JS from frontend folder)
app.use(express.static(__dirname + "/frontend"));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ROUTES
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/tasks", require("./routes/task.routes"));

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

/*const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ✅ ADD THIS LINE - To serve your frontend files (login.html, dashboard.html)
app.use(express.static("frontend"));

// TEST ROUTE
app.get("/api/test", (req, res) => {
  res.json({ message: "🚀 API is running..." });
});

// ROUTES
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/tasks", require("./routes/task.routes"));

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);*/