const express = require("express"),
  Router = express(),
  Action = require("../../data/helpers/actionModel"),
  Project = require("../../data/helpers/projectModel");
Router.get("/", (req, res) => {
  Project.get()
    .then(projects => {
      res.status(200).json({ projects });
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Unable to access the database." });
    });
});
Router.get("/:id", (req, res) => {
  Project.get(req.params.id)
    .then(project => {
      res.status(200).json({ project });
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Unable to locate project database." });
    });
});
Router.post("/", (req, res) => {
  const newProject = req.body;
  if (newProject.name && newProject.description) {
    Project.insert(newProject)
      .then(project => {
        res.status(202);
        Project.get()
          .then(projects => {
            res.status(200).json({ projects });
          })
          .catch(() => {
            res
              .status(500)
              .json({ errorMessage: "Unable to access the database." });
          });
      })
      .catch(() => {
        errorMessage: "Unable to add project to the database.";
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Project name and description must be included" });
  }
});
Router.put("/:id", (req, res) => {
  const editProject = req.body;
  if (editProject.name || editProject.description || editProject.completed) {
    Project.update(req.params.id, editProject)
      .then(project => {
        res.status(202).json({ project });
      })
      .catch(() => {
        res
          .status(500)
          .json({ errorMessage: "Unable to update project in database." });
      });
  } else {
    res
      .status(400)
      .json({
        errorMessage: "No information was added to be updated in that project"
      });
  }
});
module.exports = Router;