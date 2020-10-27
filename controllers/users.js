const users = require('../models/users.js')();

module.exports = () => {
  const getController = async (req, res) => {
    res.json(await users.get());
  };

  //const populatedController = async (reg, res) => {
  //  res.json(await users.aggregateWithIssues());
  //};

  const getById = async (req, res) => {
    res.json(await users.get((req.params.email)));
  };

  const postController = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const key = req.body.key;
    const result = await users.add(name, email, key);
    res.json(result);
  };

  return {
    getController,
    postController,
    getById,
    //populatedController,
  };
};
