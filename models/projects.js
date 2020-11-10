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
      try {
        const projects = await db.get(COLLECTION);
        return projects;
      } catch (ex) {
        console.log("========Error::InsideProjects")
        return { error: ex }
      }
    }
    try {
      const project = await db.get(COLLECTION, { slug });
      return project;
    } catch (ex) {
      return { error: ex }
    }
  };

  const add = async (slug, name, description) => {
    try {
      const projectCount = await db.count(COLLECTION);
      const results = await db.add(COLLECTION, {
        id: projectCount + 1,
        slug: slug,
        name: name,
        dscription: description,
      });
      return results.result;
    } catch (ex) {
      console.log("=======Error::Add")
      return { error: ex }
    }
  };

  const aggregateWithIssues = async () => {
    try {
      const projects = await db.aggregate(COLLECTION, LOOKUP_ISSUES_PIPELINE);
      return projects;
    } catch (ex) {
      console.log("=======Error::AggregateWithIssues")
      return { error: ex }
    }
  };

  return {
    get,
    add,
    aggregateWithIssues,
  };

};
