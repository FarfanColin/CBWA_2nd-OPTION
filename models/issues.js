const db = require('../db')();
const COLLECTION = "issues";
const LOOKUP_PROJECTS_PIPELINE = [
  {
    $lookup: {
      from: "projects",
      localField: "id",
      foreignField: "description",
      as: "pon algo",
    },
  },
  {
    $project: {
      id: 1,
      name: 1,
      project: {
        $arrayElemAt: ["$a", 0],
      },
    },
  },
];

module.exports = () => {
  const get = async (id = null) => {
    console.log(' inside issues model');
    if (!id) {
      const issues = await db.get(COLLECTION);
      return issues;
    }

    const issue = await db.get(COLLECTION, { id });
    return issue;
  }
  const add = async (name, project) => {
    const issueCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      id: issueCount + 1,
      name: name,
      project: project
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
