const ProjectModel = require("../models/projectModel");
const token = require("../services/token.service");

const addProject = async (body, id) => {
  body.user = id;
  const project = await ProjectModel.create(body);
  return project;
};

const getUserProjects = async (id) => {
  const projects = await ProjectModel.find({ user: id });
  return projects;
};

module.exports = {
  addProject,
  getUserProjects,
};
