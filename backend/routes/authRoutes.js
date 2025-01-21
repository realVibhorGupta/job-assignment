const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { check, validationResult } = require("express-validator");
const router = express.Router();

// Signup route - directly use '/api/signup'
router.post(
  "/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be 6+ chars").isLength({ min: 6 }),
    check("username", "Username is required").notEmpty(),
    check("firstName", "First name is required").notEmpty(),
    check("lastName", "Last name is required").notEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Signup request body:", req.body);
    next();
  },
  registerUser
);

// Login route - directly use '/api/login'
router.post("/login", loginUser);

// Logout route
router.get("/logout", logoutUser);

// Protected route - should be just /protected since /api is added in app.js
router.get("/protected", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome, ${req.user.username}`,
    user: req.user,
  });
});

module.exports = router;
