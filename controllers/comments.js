const comments = require('../models/comments.js')();

module.exports = () => {
  const getController = async (req, res) => {
    res.json(await comments.get());
  };

  const populatedController = async (reg, res) => {
    res.json(await comments.aggregateWithIssues());
  };

  const getById = async (req, res) => {
    res.json(await comments.get(parseInt(req.params.id)));
  };

  const postController = async (req, res) => {
    const text = req.body.text;
    const issue = req.body.issue;
    const result = await comment.add(text, issue);
    res.json(result);
  };

  return {
    getController,
    postController,
    getById,
    populatedController,
  };
};
