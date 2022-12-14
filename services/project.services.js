const TokenModel = require("../models/token.model");
const ProjectModel = require("../models/projectModel");
const token = require("../services/token.service");

const addProject = async (body) => {
  const isExist = await ProjectModel.findOne({ email: body.email });
  if (isExist) {
    return "0";
  } else {
    const hash = await hashPassword(body.password);
    body.password = hash;
    const user = await UserModel.create(body);
    return user;
  }
};

module.exports = {
  addProject,
};
