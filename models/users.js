const db = require("../db")();
const COLLECTION = "users";

module.exports = () => {

  const getByKey = async (key) => {
    if (!key) {
      console.log(" 01: Missing key");
      return null;
    }

    try {
      const users = await db.get(COLLECTION, { key });
      if (users.length !== 1) {
        console.log(" 02: Bad key");
        return null;
      }
      return users[0];
    } catch (ex) {
      console.log("-=-=-= Exception users::getByKey")
      console.log(ex)
      return null
    }
  };

  const get = async (email = null) => {
    console.log(' inside users model');
    if (!email) {
      try {
        const users = await db.get(COLLECTION);
        return users;
      } catch (ex) {
        console.log("=======Error::InsideUsers")
        return { error: ex }
      }
    }
    try {
      const user = await db.get(COLLECTION, { email });
      return user;
    } catch (ex) {
      return { error: ex }
    }
  };

  const add = async (name, email, usertype, key) => {
    try {
      const userCount = await db.count(COLLECTION);
      const results = await db.add(COLLECTION, {
        id: userCount + 1,
        name: name,
        email: email,
        usertype: usertype,
        key: key
      });
      return results.result;
    } catch (ex) {
      console.log("=======Error::Add")
      return { error: ex }
    }
  };

  return {
    get,
    add,
    getByKey,
  };

};
