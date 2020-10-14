const express = require('express');
const bodyParser = require('body-parser');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const authorController = require('./controllers/authors')();
const booksController = require('./controllers/books')();

const app = module.exports = express();

app.use('/',express.static('static'));
// logging
app.use((req, res, next) => {
  // Display log for requests
  console.log('[%s] %s -- %s', new Date(), req.method, req.url);
  next();
});
app.use(bodyParser.json())
// Get all books
app.get('/books', booksController.getController);
// Get all books with authors
app.get("/books/populated", booksController.populatedController);
// Add a book
app.post('/books', booksController.postController);
// A book
app.get('/books/:id', booksController.getById);
// Get all authors
app.get('/authors', authorController.getController);
// Get all authors with books
app.get("/authors/populated", authorController.populatedController);
// Add a author
app.post('/authors', authorController.postController);
//An Author
app.get('/authors/:id', authorController.getById);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
    console.log(process.env.MONGO_URI)
  });
  // 404
  app.use((req, res) => {
    res.status(404).json({
      error: 404,
      message: 'Route not found',
    });
  });
