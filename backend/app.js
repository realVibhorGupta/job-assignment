const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { errorHandler } = require("./utils/errorHandler");

// Determine the correct .env file
const envFile =
  process.env.NODE_ENV === "test"
    ? ".env.test"
    : process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env";

dotenv.config({ path: envFile });
console.log(`Using ${envFile} configuration`);

// Connect to MongoDB before setting up routes
connectDB()
  .then(() => {
    console.log("MongoDB connection established");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(require("helmet")());

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    optionsSuccessStatus: 204,
  })
);

// Handle preflight requests
app.options("*", cors());

// Routes
app.use("/api", authRoutes);

// Catch-all route for undefined routes (should be AFTER your API routes)
app.get("*", (req, res) => {
  res
    .status(404)
    .send(
      "<h1>404 Error: Page Not Found</h1><p>The page you are looking for does not exist.</p>"
    );
});

// Custom error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
