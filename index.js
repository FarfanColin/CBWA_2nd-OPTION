const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;

const uri = process.env.MONGO_URI;
const MongoClient = require('mongodb').MongoClient;
const DB_NAME = "CA1";
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };
const assert = require('assert');
const client = new MongoClient(uri);

const projectController = require("./controllers/projects")();
const issuesController = require("./controllers/issues")();
const usersController = require("./controllers/users")();
const commentsController = require("./controllers/comments")();

const users = require("./models/users")();

const app = (module.exports = express());

app.use(express.static('./public/img'));
app.use(express.static('./public/css'));
app.use(express.static('./public/js'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/users', (req, res) => {
  const db = client.db(DB_NAME);
  const collection = db.collection('users');
  // Find some documents
  collection.find({}).toArray(function (err, users) {
    assert.equal(err, null);
    res.render('users', { 'users': users })
  });
})

app.get('/issues', (req, res) => {
  const db = client.db(DB_NAME);
  const collection = db.collection('issues');
  // Find some documents
  collection.find({}).toArray(function (err, issues) {
    assert.equal(err, null);
    res.render('issues', { 'issues': issues })
  });
})

app.get('/comments', (req, res) => {
  const db = client.db(DB_NAME);
  const collection = db.collection('comments');
  // Find some documents
  collection.find({}).toArray(function (err, comments) {
    assert.equal(err, null);
    res.render('comments', { 'comments': comments })
  });
})

app.get('/projects', (req, res) => {
  const db = client.db(DB_NAME);
  const collection = db.collection('projects');
  // Find some documents
  collection.find({}).toArray(function (err, projects) {
    assert.equal(err, null);
    res.render('projects', { 'projects': projects })
  });
})

// Use connect method to connect to the Server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(DB_NAME);
});

app.use((req, res, next) => {
  console.log("[%s] %s -- %s", new Date(), req.method, req.url);
  next();
});


// app.use(async (req, res, next) => {
//   const FailedAuthMessage = {
//     // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
//     error: "Failed Authentication",
//     message: "Go away!",
//     code: "xxx", // Some useful error code
//   };

//   const suppliedKey = req.headers["x-api-key"];
//   const clientIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

//   if (!suppliedKey) {
//     console.log(
//       " [%s] FAILED AUTHENTICATION -- %s, No Key Supplied",
//       new Date(),
//       clientIp
//     );
//     FailedAuthMessage.code = "01";
//     return res.status(401).json(FailedAuthMessage);
//   }

//   try {
//     const user = await users.getByKey(suppliedKey);
//     if (!user) {
//       console.log(
//         " [%s] FAILED AUTHENTICATION -- %s, BAD Key Supplied",
//         new Date(),
//         clientIp
//       );
//       FailedAuthMessage.code = "02";
//       return res.status(401).json(FailedAuthMessage);
//     }
//   }
//   catch (ex) {
//     console.log("======= Exception wrong::key")
//     return null
//   }
//   next();
// });



// P R O J E C T S //

// GET ALL PROJECTS (localhost:3000/projects/)
app.get("/projects", projectController.getController);

// GET INDIVIDUAL PROJECTS (localhost:3000/projects/BUG || localhost:3000/projects/BOOK)
app.get("/projects/:slug", projectController.getByProject);

// ADD NEW PROJECTS INDIVIDUALLY (localhost:3000/projects/)
app.post("/projects", projectController.postController);



// U S E R S //

// GET ALL USERS (localhost:3000/users)
app.get("/users", usersController.getController);

// GET INDIVIDUAL USERS (localhost:3000/users/dave.albert@cbwa.com || localhost:3000/users/christian.farfan@cbwa.com)
app.get("/users/:email", usersController.getByUser);

// ADD NEW USERS INDIVIDUALLY (localhost:3000/users)
app.post("/users", usersController.postController);


// I S S U E S //

// GET ALL ISSUES, BRING COMMENTS WITH IT (localhost:3000/issues)
app.get("/issues", issuesController.populatedController);

// GET INDIVIDUAL ISSUES (localhost:3000/issues/BOOK-1 || localhost:3000/issues/BUG-1)
app.get("/issues/:issueNumber", issuesController.getBySlugId);

//GET ALL ISSUES FOR A PROJECT (localhost:3000/projects/BUG/issues || localhost:3000/projects/BOOK/issues)
app.get("/projects/:slug/:issues", issuesController.getIssuesPerProject);

// ADD NEW ISSUES TO A PROJECT INDIVIDUALLY (localhost:3000/projects/BUG/issues || localhost:3000/projects/BOOK/issues)
app.post("/projects/:slug/:issues", issuesController.postController);


// C O M M E N T S / /

// GET ALL COMMENTS WITH ISSUES (localhost:3000/comments)
app.get("/comments", commentsController.populatedController);

// GET ALL COMMENTS FOR AN ISSUE (localhost:3000/issues/BOOK-1/comments || localhost:3000/issues/BUG-2/comments)
app.get("/issues/:issueNumber/:comments", commentsController.getByIssue);

// ADD NEW COMMENTS TO AN ISSUE (localhost:3000/issues/BOOK-1/comments || localhost:3000/issues/BUG-2/comments)
app.post("/issues/:issueNumber/:comments", commentsController.postController);

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

