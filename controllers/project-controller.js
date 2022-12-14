const projectServices = require("../services/project.services");
const token = require("../services/token.service");
const TokenModel = require("../models/projectModel");

const addProject = async (req, res) => {
  const register = await projectServices.addProject(req.body);
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

module.exports = {
  addProject,
};
