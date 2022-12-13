const userService = require("../services/user-service");
const token = require("../services/token.service");
const TokenModel = require("../models/token.model");

const registerUser = async (req, res) => {
  const register = await userService.registerUser(req.body);
  if (register === "0") {
    return res.status(400).send({
      data: [],
      status: 400,
      message: "Already Registered",
    });
  } else {
    const getToken = await token.generateAuthTokens(register);
    let user = await deletePassword(register);
    return res.send({
      data: user,
      token: getToken,
      status: 200,
      message: "Registered",
    });
  }
};

const logoutUser = async (req, res) => {
  let login = await userService.logoutUser(req.params);
  if (login === "1") {
    return res.status(400).send({
      data: [],
      status: 400,
      message: "Server Error",
    });
  } else {
    return res.status(200).send({
      data: [],
      status: 200,
      message: "Successfully LogOut",
    });
  }
};

const loginUser = async (req, res) => {
  let login = await userService.loginUser(req.body);
  if (login === "1") {
    return res.status(400).send({
      data: [],
      status: 400,
      message: "Invalid Email Or Password",
    });
  } else {
    const isExist = await TokenModel.findOneAndDelete({ user: login._id });
    const getToken = await token.generateAuthTokens(login);
    let user = await deletePassword(login);
    return res.status(200).send({
      data: user,
      token: getToken,
      status: 200,
      message: "Successfully LogIn",
    });
  }
};

const deleteUser = async (req, res) => {
  if (req.params.id) {
    const dUser = await userService.deleteUser(req.params.id);
    if (dUser === "0") {
      return res.status(404).send({
        status: 404,
        message: "Record Not Foud",
      });
    } else {
      return res.send({
        status: 200,
        message: "Deleted",
      });
    }
  } else {
    return res.status(404).send({
      status: 404,
      message: "Id required",
    });
  }
};

const updateUser = async (req, res) => {
  if (req.params.id) {
    const uUser = await userService.updateUser(req.params.id, req.body);
    return res.send({
      data: uUser,
      status: 200,
      message: "Updated",
    });
  } else {
    return res.status(400).send({
      data: [],
      status: 400,
      message: "Id required",
    });
  }
};

const getUsers = async (req, res) => {
  const allUsers = await userService.getUsers();
  return res.send({
    data: allUsers,
    status: 200,
    message: "Gotted",
  });
};

module.exports = {
  registerUser,
  deleteUser,
  updateUser,
  getUsers,
  loginUser,
  logoutUser,
};
