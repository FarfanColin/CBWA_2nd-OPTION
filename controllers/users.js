const users = require('../models/users.js')();

module.exports = () => {

  const getController = async (req, res) => {
    try {
      res.json(await users.get());
    }
    catch (ex) {
      console.log("======Exception get::controller")
      console.log(ex)
      return null
    }
  };

  const getByUser = async (req, res) => {
    try {
      res.json(await users.get((req.params.email)));
    }
    catch (ex) {
      console.log("======Exception get::byUser")
      console.log(ex)
      return null
    }
  };

  const postController = async (req, res) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const usertype = req.body.usertype;
      const key = req.body.key;
      const result = await users.add(name, email, usertype, key);
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
    getByUser
  };

};
