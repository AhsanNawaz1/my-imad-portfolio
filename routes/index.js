const router = require("express").Router();
const user = require("./users");
const projects = require("./project");

const defaultRoutes = [
  {
    path: "/users",
    route: user,
  },
  {
    path: "/projects",
    route: projects,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
