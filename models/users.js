const db = require("../db")();
const COLLECTION = "users";

module.exports = () => {
  const getByKey = async (key) => {
    if (!key) {
      console.log(" 01: Missing key");
      return null;
    }
    const users = await db.get(COLLECTION, { key });
    if (users.length !== 1) {
      console.log(" 02: Bad key");
      return null;
    }
    return users[0];
  };

  const get = async (id = null) => {
    console.log(' inside users model');
    if (!id) {
      const users = await db.get(COLLECTION);
      return users;
    };

    const user = await db.get(COLLECTION, { id });
    return user;
  };

  const add = async (name) => {
    const userCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      id: userCount + 1,
      name: name
    });
    return results.result;
  };

  return {
    get,
    add,
    getByKey,
  };
};
