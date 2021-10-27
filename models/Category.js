const { Schema, model } = require("mongoose");
//const {userID}  = require('./models/User')


const categorySchema = new Schema({
    //One to many 
    //User on to many create category
    //the userID specified publish category

    name: String,//"programim"
    userID: [{ //from table user(id)
        type: Schema.Types.ObjectId,
        ref: 'User'
     }]
    

}, {timestamps:true})

module.exports = model("category", categorySchema);

//https://soshace.com/create-simple-pos-with-react-js-node-js-and-mongodb-11-crud-with-relation