const projects = require('../models/projects.js')();

module.exports = () => {

  const getController = async (req, res) => {
    try {
      res.json(await projects.get());
    }
    catch (ex) {
      console.log("======Exception get::controller")
      console.log(ex)
      return null
    }
  };

  const populatedController = async (reg, res) => {
    try {
      res.json(await projects.aggregateWithIssues());
    }
    catch (ex) {
      console.log("======Exception populated::controller")
      console.log(ex)
      return null
    }
  };

  const getByProject = async (req, res) => {
    try {
      res.json(await projects.get(req.params.slug));
    }
    catch (ex) {
      console.log("======Exception get::ByProject")
      console.log(ex)
      return null
    }
  };

  const postController = async (req, res) => {
    try {
      const slug = req.body.slug;
      const name = req.body.name;
      const description = req.body.description;
      const result = await projects.add(slug, name, description);
      res.json(result);
    }
    catch (ex) {
      console.log("======Exception post::controller")
      console.log(ex)
      return null
    }
  };

  return {
    getController,
    postController,
    getByProject,
    populatedController,
  };

};
