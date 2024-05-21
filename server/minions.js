const express = require("express");
const minionsRouter = express.Router();
const db = require("./db");

minionsRouter.get("/api/minions", (req, res, next) => {
  const minions = db.getAllFromDatabase("minions");
  if (!minions) {
    res.status(200).send([minions]);
  } else {
    res.status(200).send(minions);
  }
});

minionsRouter.post("/api/minions", (req, res, next) => {
  const added = db.addToDatabase("minions", req.body);
  res.status(201).send(added);
});

minionsRouter.get("/api/minions/:minionId", (req, res, next) => {
  const minionId = req.params.minionId;
  const minion = db.getFromDatabaseById("minions", minionId);
  if (minion) {
    res.status(200).send(minion);
  } else {
    res.status(404).send("Not Found");
  }
});

minionsRouter.put("/api/minions/:minionId", (req, res, next) => {
  const minionId = req.params.minionId;
  const { name, title, salary, weaknesses } = req.body;

  const updated = db.updateInstanceInDatabase("minions", {
    id: minionId,
    name: name ? name : "",
    title: title ? title : "",
    salary: salary ? salary : "",
    weaknesses: weaknesses ? weaknesses : "",
  });

  if (updated) {
    res.status(201).send(updated);
  } else {
    res.status(404).send("Not found");
  }
});

minionsRouter.delete("/api/minions/:minionId", (req, res, next) => {
  const minionId = req.params.minionId;
  const deleted = db.deleteFromDatabasebyId("minions", minionId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = minionsRouter;
