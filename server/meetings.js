const express = require("express");
const meetingsRouter = express.Router();
const db = require("./db");

meetingsRouter.get("/api/meetings", (req, res, next) => {
  const meetings = db.getAllFromDatabase("meetings");
  res.status(200).send(meetings);
});

meetingsRouter.post("/api/meetings", (req, res, next) => {
  const meeting = db.createMeeting();
  const added = db.addToDatabase("meetings", meeting);
  res.status(201).send(added);
});

meetingsRouter.delete("/api/meetings", (req, res, next) => {
  const deleted = db.deleteAllFromDatabase("meetings");
  if (deleted.length === 0) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = meetingsRouter;
