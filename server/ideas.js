const express = require("express");
const ideasRouter = express.Router();
const db = require("./db");
const checkMillionDollarIdea = require("./checkMillionDollarIdea");

ideasRouter.get("/api/ideas", (req, res, next) => {
  const ideas = db.getAllFromDatabase("ideas");
  res.status(200).send(ideas);
});

ideasRouter.post("/api/ideas", checkMillionDollarIdea, (req, res, next) => {
  const added = db.addToDatabase("ideas", req.body);
  res.status(201).send(added);
});

ideasRouter.get("/api/ideas/:ideaId", (req, res, next) => {
  const ideaId = req.params.ideaId;
  const idea = db.getFromDatabaseById("ideas", ideaId);
  if (idea) {
    res.status(200).send(idea);
  } else {
    res.status(404).send();
  }
});

ideasRouter.put("/api/ideas/:ideaId", (req, res, next) => {
  const ideaId = req.params.ideaId;
  const { name, description, numWeeks, weeklyRevenue } = req.body;

  const updated = db.updateInstanceInDatabase("ideas", {
    id: ideaId,
    name: name,
    description: description,
    numWeeks: numWeeks,
    weeklyRevenue: weeklyRevenue,
  });

  if (updated) {
    res.status(201).send(updated);
  } else {
    res.status(404).send();
  }
});

ideasRouter.delete("/api/ideas/:ideaId", (req, res, next) => {
  const ideaId = req.params.ideaId;
  const deleted = db.deleteFromDatabasebyId("ideas", ideaId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = ideasRouter;
