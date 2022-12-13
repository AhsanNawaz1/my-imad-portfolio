const router = require("express").Router();
const userController = require("../controllers/user-controllers");
const { AUTHENTICATE } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate");
const userValidations = require("../validations/user.validation");

router.post(
  "/register",
  validate(userValidations.register),
  userController.registerUser
);

router.delete("/delete-user/:id?", userController.deleteUser);
router.put(
  "/update-user/:id?",
  validate(userValidations.updateProfile),
  userController.updateUser
);
router.get("/get-users", AUTHENTICATE, userController.getUsers);
router.post(
  "/login",
  validate(userValidations.login),
  userController.loginUser
);
router.get("/logout/:id", AUTHENTICATE, userController.logoutUser);

module.exports = router;
