const express = require("express");
const workRouter = express();
const db = require("./db");

const validMinionId = (req, res, next) => {
  const minion = db.getFromDatabaseById("minions", req.params.minionId);
  if (minion) {
    next();
  } else {
    res.status(404).send("Not Found");
  }
};

const validWorkId = (req, res, next) => {
  const work = db.getFromDatabaseById("work", req.params.workId);
  if (work) {
    if (work.minionId === req.params.minionId) {
      next();
    } else {
      res.status(400).send();
    }
  } else {
    res.status(404).send("Not Found");
  }
};

workRouter.get(
  "/api/minions/:minionId/work",
  validMinionId,
  (req, res, next) => {
    const minionId = req.params.minionId;
    const work = db.getFromDatabaseById("work", minionId);
    if (work) {
      res.status(200).send([work]);
    } else {
      res.status(200).send([]);
    }
  }
);

workRouter.post(
  "/api/minions/:minionId/work",
  validMinionId,
  (req, res, next) => {
    const minionId = req.params.minionId;
    const workId = req.params.workId;
    const { title, description, hours } = req.body;

    const added = db.addToDatabase("work", {
      id: workId,
      title: title ? title : "",
      description: description ? description : "",
      hours: hours ? hours : "",
      minionId: minionId,
    });
    res.status(201).send(added);
  }
);

workRouter.put(
  "/api/minions/:minionId/work/:workId",
  validMinionId,
  validWorkId,
  (req, res, next) => {
    const minionId = req.params.minionId;
    const workId = req.params.workId;
    const { title, description, hours } = req.body;

    const updated = db.updateInstanceInDatabase("work", {
      id: workId,
      title: title ? title : "",
      description: description ? description : "",
      hours: hours ? hours : "",
      minionId: minionId,
    });

    if (updated) {
      res.status(200).send(updated);
    } else {
      res.status(404).send("Not found");
    }
  }
);

workRouter.delete(
  "/api/minions/:minionId/work/:workId",
  validMinionId,
  validWorkId,
  (req, res, next) => {
    const workId = req.params.workId;
    const deleted = db.deleteFromDatabasebyId("work", workId);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  }
);

module.exports = workRouter;
