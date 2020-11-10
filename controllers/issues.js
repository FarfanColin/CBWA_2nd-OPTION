const issues = require('../models/issues.js')();
const projects = require('../models/projects.js')();

module.exports = () => {

  const getController = async (req, res) => {
    try {
      res.json(await issues.get());
    } catch (ex) {
      console.log("======Exception get::controller")
      console.log(ex)
      return null
    }
  };

  const populatedController = async (reg, res) => {
    try {
      res.json(await issues.aggregateWithProjects());
    } catch (ex) {
      console.log("======Exception populated::controller")
      console.log(ex)
      return null
    }
  };

  const getBySlugId = async (req, res) => {
    try {
      res.json(await issues.get(req.params.issueNumber));
    }
    catch (ex) {
      console.log("======Exception get::bySlugId")
      console.log(ex)
      return null
    }
  };

  const getIssuesPerProject = async (req, res) => {
    try {
      res.json(await projects.get(req.params.slug));
    }
    catch (ex) {
      console.log("======Exception get::IssuesPerProject")
      console.log(ex)
      return null
    }
  };

  const postController = async (req, res) => {
    try {
      const issueNumber = req.body.issueNumber;
      const title = req.body.title;
      const description = req.body.description;
      const status = req.body.status;
      const result = await issues.add(issueNumber, title, description, status);
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
    getBySlugId,
    getIssuesPerProject,
    populatedController,
  };

};
