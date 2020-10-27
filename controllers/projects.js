const projects = require('../models/projects.js')();

module.exports = () => {
  const getController = async (req, res) => {
    res.json(await projects.get());
  };

  const populatedController = async (reg, res) => {
    res.json(await projects.aggregateWithIssues());
  };

  const getById = async (req, res) => {
    res.json(await projects.get(parseInt(req.params.id)));
  };

  const postController = async (req, res) => {
    const slug = req.body.slug;
    const name = req.body.name;
    const description = req.body.description;
    const result = await projects.add(slug, name, description);
    res.json(result);
  };

  return {
    getController,
    postController,
    getById,
    populatedController,
  };
};
