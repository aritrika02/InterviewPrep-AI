

const express = require("express");
const jwt = require("jsonwebtoken");

const { RegisterHandel } = require("../controller/HandelRegister");
const { GetSkills } = require("../controller/GetSkills");
const { GetQuestions } = require("../controller/GetQuestions");
const { GetProjects, GetProjectQuestions } = require("../controller/GetProjects");
const { LoginHandel, validate } = require("../controller/HandelLogin");
const { GenerateQuestions, upload } = require("../controller/GenerateQuestions");

const router = express.Router();

function verifyRoute(req, res, next) {
  const header =
    req.get("auth") ||
    req.get("authorization") ||
    "";

  const match = header.match(/^Bearer\s+(.+)$/i);

  if (!match) {
    return res.status(401).json({
      status: "Invalid",
      message: "Authentication token required"
    });
  }

  try {
    const payload = jwt.verify(
      match[1],
      process.env.JWT_SECRET
    );

    req.user = payload;
    next();

  } catch (err) {
    return res.status(401).json({
      status: "Invalid",
      message: "Invalid or expired token"
    });
  }
}

// Authentication
router.post("/register", RegisterHandel);
router.post("/login", LoginHandel);
router.get("/validate", verifyRoute, validate);

// Resume analysis
router.post(
  "/generate",
  verifyRoute,
  upload.single("resume"),
  GenerateQuestions
);

// Skill preparation
router.get("/skills", verifyRoute, GetSkills);
router.get("/questions", verifyRoute, GetQuestions);

// Project preparation
router.get("/projects", verifyRoute, GetProjects);
router.get(
  "/project-questions",
  verifyRoute,
  GetProjectQuestions
);

module.exports = {
  router
};
