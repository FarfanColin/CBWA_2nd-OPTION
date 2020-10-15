const express = require("express");
const bodyParser = require("body-parser");

const hostname = "0.0.0.0";
const port = process.env.PORT || 3000;

const authorController = require("./controllers/authors")();
const booksController = require("./controllers/books")();

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

app.get("/", (req, res) => {
  res.json({
    hello: "world",
  });
});
// Get all books
app.get("/books", booksController.getController);
// Get all books with authors
app.get("/books/populated", booksController.populatedController);
// Add a book
app.post("/books", booksController.postController);
// A book
app.get("/books/:id", booksController.getById);
// Get all authors
app.get("/authors", authorController.getController);
// Get all authors with books
app.get("/authors/populated", authorController.populatedController);
// Add a author
app.post("/authors", authorController.postController);
// An Author
app.get("/authors/:id", authorController.getById);

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
