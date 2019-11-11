const express = require("express"),
  Router = express.Router({ mergeParams: true }),
  // Project = require("../../../data/helpers/projectModel"),
  Action = require("../../../data/helpers/actionModel");
Router.get("/", (req, res) => {
  Action.get()
    .then(projects => {
      res.status(200).json({ projects });
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Unable to access the database." });
    });
});
Router.get("/:actionId", validateProjectId, (req, res) => {
  Action.get(req.params.actionId)
    .then(action => {
      res.status(200).json({ action });
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "Unable to locate project database." });
    });
});
Router.post("/", (req, res) => {
  const newAction = req.body;
  newAction.project_id = req.params.id;
  if (newAction.project_id && newAction.description && newAction.notes) {
    Action.insert(newAction)
      .then(action => {
        res.status(202).json({ action });
      })
      .catch(() => {
        res
          .status(500)
          .json({ errorMessage: "Unable to add project to the database." });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Project name and description must be included" });
  }
});
Router.put("/:actionId", validateProjectId, (req, res) => {
  const editAction = req.body;
  editAction.project_id = req.params.id;
  if (
    editAction.project_id ||
    editAction.description ||
    editAction.notes ||
    editAction.completed
  ) {
    Action.update(req.params.actionId, editAction)
      .then(action => {
        res.status(202).json({ action });
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: "Unable to update project actions in database."
        });
      });
  } else {
    res.status(400).json({
      errorMessage:
        "No information was added to be updated actions in that project"
    });
  }
});
Router.delete("/:actionId", validateProjectId, (req, res) => {
  Action.remove(req.params.actionId)
    .then(project => {
      res.status(202);
      Action.get(req.params.actionId)
        .then(projects => {
          res.status(200).json(projects);
        })
        .catch(() => {
          res
            .status(500)
            .json({ errorMessage: "Unable to access the database." });
        });
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "Unable to remove project from database." });
    });
});
function validateProjectId(req, res, next) {
  Action.get(req.params.actionId)
    .then(action => {
      // console.log(req.params.id);
      // console.log(action.project_id);
      // console.log(req.params.id == action.project_id);
      if (req.params.id == action.project_id) {
        next();
      } else {
        res.status(404).json({
          errorMessage:
            "Else statement: Stopped by middleware Project ID not a match for that Action's Project Id"
        });
      }
    })
    .catch(() => {
      res.status(404).json({
        errorMessage:
          "Catch statement: Stopped by middleware Project ID not a match for that Action's Project Id"
      });
    });
}
module.exports = Router;
