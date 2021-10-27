const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superadmin"]
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },  
  },{ timestamps: true});

module.exports = model("user", userSchema);


//https://dev.to/oluseyeo/how-to-create-relationships-with-mongoose-and-node-js-11c8