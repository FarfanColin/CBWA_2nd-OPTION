const db = require('../db')();
const COLLECTION = "projects";
const LOOKUP_ISSUES_PIPELINE = [
  {
    $lookup: {
      from: "issues",
      localField: "id",
      foreignField: "id",
      as: "field",
    },
  },
];

module.exports = () => {
  const get = async (slug = null) => {
    console.log(' inside projects model');
    if (!slug) {
      const projects = await db.get(COLLECTION);
      return projects;
    };

    const project = await db.get(COLLECTION, { slug });
    return project;
  };
  const add = async (slug, name, description) => {
    const projectCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      id: projectCount + 1,
      slug: slug,
      name: name,
      dscription: description,
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
