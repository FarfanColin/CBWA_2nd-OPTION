const users = require('../models/users.js')();

module.exports = () => {
  const getController = async (req, res) => {
    res.json(await users.get());
  };

  //const populatedController = async (reg, res) => {
  //  res.json(await users.aggregateWithIssues());
  //};

  const getById = async (req, res) => {
    res.json(await users.get(parseInt(req.params.id)));
  };

  const postController = async (req, res) => {
    const name = req.body.name;
    const result = await users.add(name);
    res.json(result);
  };

  return {
    getController,
    postController,
    getById,
    //populatedController,
  };
};
