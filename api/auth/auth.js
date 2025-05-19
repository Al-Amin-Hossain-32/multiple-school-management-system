const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.header("Authorization");

      if (!authHeader) {
        return res.status(401).json({ success: false, message: "No token, Authorization denied." });
      }

      const token = authHeader.replace("Bearer ", "").trim(); // ✅ remove 'Bearer ' and trim
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        return res.status(401).json({ success: false, message: "Invalid token." });
      }

      req.user = decoded;

      if (roles.length > 0 && !roles.includes(req.user.role)) {
        return res.status(403).json({ success: false, message: "Access Denied" });
      }

      next();
    } catch (error) {
      console.error("JWT Auth error:", error.message);
      return res.status(401).json({ success: false, message: "Token is not valid" });
    }
  };
};

module.exports = authMiddleware;
