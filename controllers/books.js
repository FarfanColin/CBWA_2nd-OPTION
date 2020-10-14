const books = require('../models/books.js')();

module.exports = () => {
  const getController = async (req, res) => {
    res.json(await books.get());
  };

  const populatedController = async (reg, res) => {
    res.json(await authors.aggregateWithAuthors());
  };

  const getById = async (req, res) => {
    res.json(await books.get(parseInt(req.params.id)));
  };

  const postController = async (req, res) => {
    const name = req.body.name;
    const author = req.body.author;
    const result = await books.add(name, author);
    res.json(result);
  };

  return {
    getController,
    postController,
    getById,
    populatedController,
  };
};
