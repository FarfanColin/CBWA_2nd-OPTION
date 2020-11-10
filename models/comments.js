const db = require('../db')();
const COLLECTION = "comments";
const LOOKUP_ISSUES_PIPELINE = [
  {
    $lookup: {
      from: "issues",
      localField: "id",
      foreignField: "id",
      as: "a",
    },
  },
];

module.exports = () => {

  const get = async (issueNumber = null) => {
    console.log(' inside comments model');
    if (!issueNumber) {
      try {
        const comments = await db.get(COLLECTION);
        return comments;
      } catch (ex) {
        console.log("======Error::insideComments")
      }
    }
    try {
      const comments = await db.get(COLLECTION, { issueNumber });
      return comments;
    } catch (ex) {
      return { error: ex }
    }
  };

  const add = async (text, issue) => {
    try {
      const commentCount = await db.count(COLLECTION);
      const results = await db.add(COLLECTION, {
        id: commentCount + 1,
        text: text,
        issue: issue,
      });
      return results.result;
    } catch (ex) {
      console.log("=======Error::Add")
      return { error: ex }
    }
  };

  const aggregateWithIssues = async () => {
    try {
      const comments = await db.aggregate(COLLECTION, LOOKUP_ISSUES_PIPELINE);
      return comments;
    } catch (ex) {
      console.log("======Error::AggregateWithIssues")
      return { error: ex }
    }
  };

  return {
    get,
    add,
    aggregateWithIssues,
  };

};
