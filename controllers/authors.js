const authors = require('../models/authors.js')();
module.exports = () => {
  const getController = async (req, res) => {
    res.json(await authors.get());
  }
  const getById = async (req, res) => {
    res.json({ error: "byId not implemented yet"});
  }
  const postController = async (req, res) => {
    const name = req.body.name;
    const result = await authors.add(name);
    res.json(result);
  }
  return {
    getController,
    postController,
    getById
  }
}
