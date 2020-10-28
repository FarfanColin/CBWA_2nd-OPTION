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
      const comments = await db.get(COLLECTION);
      return comments;
    }
    const comments = await db.get(COLLECTION, { issueNumber });
    return comments;
  }

  const add = async (text, issue) => {
    const commentCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      id: commentCount + 1,
      text: text,
      issue: issue,
    });
    return results.result;
  };
  
  const aggregateWithIssues = async () => {
    const comments = await db.aggregate(COLLECTION, LOOKUP_ISSUES_PIPELINE);
    return comments;
  };

  return {
    get,
    add,
    aggregateWithIssues,
  };

};
