const books = require('../models/books.js')();
module.exports = () => {
const getController = (req, res) => {
 res.setHeader('Content-Type', 'application/json');
 return res.json(books.get());
 }
const getById = (req, res) => {
 res.setHeader('Content-Type', 'application/json');
 res.json(books.get(req.params.id));
 }
const postController = (req, res) => {
 const name = req.body.name;
 const author = req.body.author;
 books.add(name, author);
 return res.end(`POST: ${name}`);
 }
return {
 getController,
 postController,
 getById
 }
}
