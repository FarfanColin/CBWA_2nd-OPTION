const db = require('../db')();
const COLLECTION = "issues";
const LOOKUP_PROJECTS_PIPELINE = [
  {
    $lookup: {
      from: "comments",
      localField: "id",
      foreignField: "id",
      as: "field",
    },
  },
];

module.exports = () => {

  const get = async (issueNumber = null) => {
    console.log(' inside issues model');
    if (!issueNumber) {
      const issues = await db.get(COLLECTION);
      return issues;
    }
    const issue = await db.get(COLLECTION, { issueNumber });
    return issue;
  }

  const add = async (issueNumber, title, description, status) => {
    const issueCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      id: issueCount + 1,
      issueNumber: issueNumber,
      title: title,
      description: description,
      status: status,
    });
    return results.result;
  };

  const aggregateWithProjects = async () => {
    const issues = await db.aggregate(COLLECTION, LOOKUP_PROJECTS_PIPELINE);
    return issues;
  };

  return {
    get,
    add,
    aggregateWithProjects,
  };

};
