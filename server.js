const express = require("express");
const app = express();
module.exports = app;

/* Do not change the following line! It is required for testing and allowing
 *  the frontend application to interact as planned with the api server
 */
const port = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
const cors = require("cors");
app.use(cors());

// Add middware for parsing request bodies here:
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use(function (req, res) {
//   res.setHeader("Content-Type", "text/plain");
//   res.write("you posted:\n");
//   res.end(JSON.stringify(req.body, null, 2));
// });

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require("./server/api");
app.use(apiRouter);

const ideasRouter = require("./server/ideas");
app.use(ideasRouter);

const meetingsRouter = require("./server/meetings");
app.use(meetingsRouter);

const minionsRouter = require("./server/minions");
app.use(minionsRouter);

const workRouter = require("./server/work");
app.use(workRouter);

// This conditional is here for testing purposes:
if (!module.parent) {
  // Add your code to start the server listening at PORT below:

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
