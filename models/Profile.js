const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema(
  {

    username:{
        type: Schema.Types.ObjectId,
      ref: "user",
    },
    avatar: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = model("profile", ProfileSchema);
