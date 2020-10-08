const authors = require('../models/authors.js')();
module.exports = () => {
const getController = (req, res) => {
 res.setHeader('Content-Type', 'application/json');
 res.json(authors.get());
 }
const postController = (req, res) => {
 const name = req.body.name;
 authors.add(name);
 return res.end(`POST: ${name}`);
 }
return {
 getController,
 postController,
 }
}
