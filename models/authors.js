const db = require('../db')();
module.exports = () => {
const get = () => {
 console.log(' inside authors model');
 return db.authors;
 }
const add = (name) => {
 return db.authors.push({
 id: db.authors.length + 1,
 name,
 });
 }
return {
 get,
 add
 }
};
