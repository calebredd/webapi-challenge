const express = require("express"),
  Router = express(),
  // Action = require("../data/helpers/actionModel"),
  // Project = require("../data/helpers/projectModel"),
  projectRoutes = require("./projectsModel");

Router.get("/", (req, res) => {
  res.status(200).send("<h2>Welcome to the API!</h2>");
});
Router.use("/projects", projectRoutes);

module.exports = Router;
