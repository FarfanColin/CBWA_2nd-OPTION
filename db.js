const uri = process.env.MONGO_URI;
const MongoClient = require('mongodb').MongoClient;
const DB_NAME = "CA1";
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };

module.exports = () => {

  const count = (collectionName) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        if (err){
          console.log("=== count::MongoClient.connect")
          console.log(err)
          return reject(err)
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        
        collection.countDocuments({}, (err, docs) => {
          if (err){
            console.log("=== count::collection.countDocuments")
            console.log(err)
            return reject(err)
          }
          resolve(docs);
          client.close();
        });
      });
    });
  };

  const get = (collectionName, query = {}) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        if (err) {
          console.log(err)
          return reject("=== get::MongoClient.connect")
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);

        collection.find(query).toArray((err, docs) => {
          if (err) {
            console.log("  === get::collection.find")
            console.log(err)
            return reject(err)
          }

          resolve(docs);
          client.close();
        });
      });
    });
  };

  const add = (collectionName, item) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        if (err){
          console.log("=== add::MongoClient.connect")
          console.log(err)
          return reject(err)
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.insertOne(item, (err, result) => {
          if (err){
            console.log("=== add::collection.insertOne")
            console.log(err)
            return reject(err)
          }
          resolve(result);
          client.close();
        });
      });
    });
  };

  const aggregate = (collectionName, pipeline = []) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        if (err){
          console.log("=== aggregate::MongoClient.connect")
          console.log(err)
          return reject(err)
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.aggregate(pipeline).toArray((err, docs) => {
          if (err) {
            console.log(" ---aggregate ERROR ---");
            console.log(err);
          }
          resolve(docs);
          client.close();
        });
      });
    });
  };

  return {
    count,
    get,
    add,
    aggregate,
  };

};
