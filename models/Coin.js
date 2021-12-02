const { Schema, model } = require("mongoose");

const CoinSchema = new Schema(
  {
    username:{
      type: Schema.Types.ObjectId,
        ref: "user",
    },
    coins:{
      type:Number,
      required:false,
    }
  },
  
);

module.exports = model("coin", CoinSchema);
