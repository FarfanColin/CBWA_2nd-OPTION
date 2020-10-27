const db = require('../db')();
const COLLECTION = "projects";
const LOOKUP_ISSUES_PIPELINE = [
  {
    $lookup: {
      from: "issues",
      localField: "id",
      foreignField: "project",
      as: "issues",
    },
  },
];

module.exports = () => {
  const get = async (id = null) => {
    console.log(' inside projects model');
    if (!id) {
      const projects = await db.get(COLLECTION);
      return projects;
    };

    const project = await db.get(COLLECTION, { id });
    return project;
  };
  const add = async (name) => {
    const projectCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      id: projectCount + 1,
      name: name
    });
    return results.result;
  };

  const aggregateWithIssues = async () => {
    const projects = await db.aggregate(COLLECTION, LOOKUP_ISSUES_PIPELINE);
    return projects;
  };

  return {
    get,
    add,
    aggregateWithIssues,
  };
};
