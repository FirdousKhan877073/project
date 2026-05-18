const jwt = require("jsonwebtoken");

// ==========================
// 🔐 AUTH MIDDLEWARE
// ==========================
const authMiddleware = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }

    // Remove Bearer
    if (token.startsWith("Bearer ")) {
      token = token.replace("Bearer ", "");
    }

    // ✅ FIXED HERE
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Token is not valid",
    });
  }
};


// ==========================
// 👑 ADMIN MIDDLEWARE
// ==========================
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin only access",
    });
  }
  next();
};


module.exports = {
  authMiddleware,
  isAdmin,
};