const checkMillionDollarIdea = (req, res, next) => {
  const { numWeeks, weeklyRevenue } = req.body;
  if (numWeeks * weeklyRevenue >= 1000000) {
    next();
  } else {
    res.status(400).send("This project not value one million dollars.");
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
