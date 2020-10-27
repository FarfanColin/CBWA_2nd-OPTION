const express = require("express");
const bodyParser = require("body-parser");

const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;

const projectController = require("./controllers/projects")();
const issuesController = require("./controllers/issues")();
const usersController = require("./controllers/users")();
const commentsController = require("./controllers/comments")();


const users = require("./models/users")();

const app = (module.exports = express());

app.use('/',express.static('static'));

// logging
app.use((req, res, next) => {
  // Display log for requests
  console.log("[%s] %s -- %s", new Date(), req.method, req.url);
  next();
});

app.use(async (req, res, next) => {
  const FailedAuthMessage = {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
    error: "Failed Authentication",
    message: "Go away!",
    code: "xxx", // Some useful error code
  };

  const suppliedKey = req.headers["x-api-key"];
  const clientIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Check Pre-shared key
  if (!suppliedKey) {
    console.log(
      " [%s] FAILED AUTHENTICATION -- %s, No Key Supplied",
      new Date(),
      clientIp
    );
    FailedAuthMessage.code = "01";
    return res.status(401).json(FailedAuthMessage);
  }

  const user = await users.getByKey(suppliedKey);
  if (!user) {
    console.log(
      " [%s] FAILED AUTHENTICATION -- %s, BAD Key Supplied",
      new Date(),
      clientIp
    );
    FailedAuthMessage.code = "02";
    return res.status(401).json(FailedAuthMessage);
  }
  next();
});

app.use(bodyParser.json());

// Get all issues
app.get("/issues", issuesController.getController);
// Get all issues with projects
app.get("/issues/populated", issuesController.populatedController);
// Add a issue
app.post("/issues", issuesController.postController);
// A issue
app.get("/issues/:issueNumber", issuesController.getById);
// Get all projects
app.get("/projects", projectController.getController);
// Get all projects with issues
app.get("/projects/populated", projectController.populatedController);
// Add a project
app.post("/projects", projectController.postController);
// An Project
app.get("/projects/:slug", projectController.getById);
// Get all users
app.get("/users", usersController.getController);
// Add a user
app.post("/users", usersController.postController);
// A user
app.get("/users/:email", usersController.getById);
// Get all comments
app.get("/comments", commentsController.getController);
// Get all comments with issues
app.get("/comments/populated", commentsController.populatedController);
// Add a comment
app.post("/comments", commentsController.postController);
// A comment
app.get("/comments/:id", commentsController.getById);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  });
  // 404
  app.use((req, res) => {
    res.status(404).json({
      error: 404,
      message: "Route not found",
    });
  });

