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
      try {
        const issues = await db.get(COLLECTION);
        return issues;
      } catch (ex) {
        console.log("========Error::InsideIssues")
        return { error: ex }
      }
    }
    try {
      const issue = await db.get(COLLECTION, { issueNumber });
      return issue;
    } catch (ex) {
      return { error: ex }
    }
  };

  const add = async (issueNumber, title, description, status) => {
    try {
      const issueCount = await db.count(COLLECTION);
      const results = await db.add(COLLECTION, {
        id: issueCount + 1,
        issueNumber: issueNumber,
        title: title,
        description: description,
        status: status,
      });
      return results.result;
    } catch (ex) {
      console.log("========Error::Add")
      return { error: ex }
    }
  };

  const aggregateWithProjects = async () => {
    try {
      const issues = await db.aggregate(COLLECTION, LOOKUP_PROJECTS_PIPELINE);
      return issues;
    } catch (ex) {
      console.log("========Error::AggregateWithProjects")
      return { error: ex }
    }
  };

  return {
    get,
    add,
    aggregateWithProjects,
  };

};
