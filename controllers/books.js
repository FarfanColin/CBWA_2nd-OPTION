const books = require('../models/books.js')();
module.exports = () => {
  const getController = async (req, res) => {
    res.json(await books.get());
  }
  const getById = async (req, res) => {
    res.json({ error: "byId not implemented yet"});
  }
  const postController = async (req, res) => {
    const name = req.body.name;
    const author = req.body.author;
    const result = await books.add(name, author);
    res.json(result);
  }
  return {
    getController,
    postController,
    getById
  }
}
