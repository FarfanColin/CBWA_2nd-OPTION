const comments = require('../models/comments.js')();
const issues = require('../models/issues.js')();

module.exports = () => {


  const getController = async (req, res) => {
    try {
      res.json(await comments.get());
    }
    catch (ex) {
      console.log("======Exception get::controller")
      console.log(ex)
      return null
    }
  };

  const populatedController = async (reg, res) => {
    try {
      res.json(await comments.aggregateWithIssues());
    }
    catch (ex) {
      console.log("======Exception populated::controller")
      console.log(ex)
      return null
    }
  };

  const getByIssue = async (req, res) => {
    try {
      res.json(await issues.get(req.params.issueNumber));
    }
    catch (ex) {
      console.log("======Exception get::byIssue")
      console.log(ex)
      return null
    }
  };

  const postController = async (req, res) => {
    try {
      const text = req.body.text;
      const issue = req.body.issue;
      const result = await comment.add(text, issue);
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
    getByIssue,
    populatedController,
  };

};
