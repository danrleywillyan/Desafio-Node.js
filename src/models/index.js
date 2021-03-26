const mongoose = require('mongoose');
// it seems as deprecated, I am just having sure about global promise here
// I am using mongoose 5 in this project
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["seller", "admin"];

module.exports = db;