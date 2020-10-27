const issues = require('../models/issues.js')();

module.exports = () => {
  const getController = async (req, res) => {
    res.json(await issues.get());
  };

  const populatedController = async (reg, res) => {
    res.json(await issues.aggregateWithProjects());
  };

  const getById = async (req, res) => {
    res.json(await issues.get(parseInt(req.params.id)));
  };

  const postController = async (req, res) => {
    const title = req.body.title;
    const project = req.body.project;
    const result = await issue.add(title, project);
    res.json(result);
  };

  return {
    getController,
    postController,
    getById,
    populatedController,
  };
};
