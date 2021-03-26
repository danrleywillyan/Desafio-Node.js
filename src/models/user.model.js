const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    cpf: String,
    password: String,
    //One-to-Many relationship or Reference Data Model
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;