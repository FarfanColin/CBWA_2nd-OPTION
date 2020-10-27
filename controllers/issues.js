const issues = require('../models/issues.js')();

module.exports = () => {
  const getController = async (req, res) => {
    res.json(await issues.get());
  };

  const populatedController = async (reg, res) => {
    res.json(await issues.aggregateWithProjects());
  };

  const getById= async (req, res) => {
    res.json(await issues.get(req.params.issueNumber));
  };

  const postController = async (req, res) => {
    const issueNumber = req.body.issueNumber;
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const result = await issues.add(issueNumber, title, description, status);
    res.json(result);
  };

  return {
    getController,
    postController,
    getById,
    populatedController,
  };
};
