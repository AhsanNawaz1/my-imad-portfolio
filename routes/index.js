const router = require("express").Router();
const user = require("./users");

const defaultRoutes = [
  {
    path: "/users",
    route: user,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
