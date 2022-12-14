const router = require("express").Router();
const projectController = require("../controllers/project-controller");
const { AUTHENTICATE } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate");
const projectValidations = require("../validations/project.validations");

router.post(
  "/addproject",
  AUTHENTICATE,
  validate(projectValidations.addProject),
  projectController.addProject
);
