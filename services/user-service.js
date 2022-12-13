const UserModel = require("../models/user");
const TokenModel = require("../models/token.model");

const { hashPassword, unHashPassword } = require("../utils/hashing");
const token = require("../services/token.service");

const registerUser = async (body) => {
  const isExist = await UserModel.findOne({ email: body.email });
  if (isExist) {
    return "0";
  } else {
    const hash = await hashPassword(body.password);
    body.password = hash;
    const user = await UserModel.create(body);
    return user;
  }
};

const loginUser = async (body) => {
  let isExist = await UserModel.findOne({ email: body.email });
  const unhash = await unHashPassword(body.password, isExist.password);
  if (isExist && unhash) {
    return isExist;
  } else {
    return "1";
  }
};

const logoutUser = async (params) => {
  const { id } = params;
  const isExist = await TokenModel.findOneAndDelete({ user: id });
  if (isExist) {
    return "0";
  } else {
    return "1";
  }
};

const deleteUser = async (id) => {
  const isExist = await UserModel.findOne({ _id: id });
  if (isExist) {
    const user = await UserModel.findOneAndDelete({ _id: id }).select(
      "-password"
    );
    return user;
  } else {
    return "0";
  }
};

const updateUser = async (id, body) => {
  const user = await UserModel.findOneAndUpdate({ _id: id }, body, {
    new: true,
  }).select("-password");
  return user;
};

const getUsers = async () => {
  const user = await UserModel.find({}).select("-password");
  return user;
};

module.exports = {
  logoutUser,
  registerUser,
  deleteUser,
  updateUser,
  getUsers,
  loginUser,
};
