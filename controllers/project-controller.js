const projectServices = require("../services/project.services");

const addProject = async (req, res) => {
  const project = await projectServices.addProject(req.body, req?.userId);
  return res.send({
    data: project,
    status: 200,
    message: "Project Added SuccessFully",
  });
};

const getUserProjects = async (req, res) => {
  const projects = await projectServices.getUserProjects(req?.userId);
  return res.send({
    data: projects,
    status: 200,
    message: "Projects Retreived SuccessFully",
  });
};

module.exports = {
  addProject,
  getUserProjects,
};
