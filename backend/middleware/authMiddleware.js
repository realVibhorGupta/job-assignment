const jwt = require("jsonwebtoken");
const { ErrorResponse } = require("../utils/errorHandler");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return next(new ErrorResponse("Not authorized, user not found", 401));
      }

      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      return next(new ErrorResponse("Not authorized, token failed", 401));
    }
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized, no token", 401));
  }
};

module.exports = { protect };
