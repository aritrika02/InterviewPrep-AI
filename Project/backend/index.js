
require("dotenv").config();

if (
  !process.env.JWT_SECRET ||
  process.env.JWT_SECRET.length < 32
) {
  throw new Error(
    "Set JWT_SECRET to a secret of at least 32 characters"
  );
}

const express = require("express");
const cors = require("cors");

const { router } = require("./routes/AllRoutes");

const app = express();

const allowedOrigins = (
  process.env.FRONTEND_URL || ""
).split(",").map(s => s.trim()).filter(Boolean);

app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : false
}));

app.use(express.json({
  limit: "50kb"
}));

app.get("/", (req, res) => {
  res.send("InterviewPrep API is running");
});

app.use("/", router);

// Handle file upload and other request errors
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      status: "Error",
      message: "PDF must be 5 MB or smaller"
    });
  }

  console.error("Request error:", err.message);

  return res.status(400).json({
    status: "Error",
    message: "Invalid request"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
