//const mongoose = require('mongoose');
//const Schema = require(Schema.mongoose)
const { Schema, model } = require("mongoose");


const quizSchema = new Schema({
    name:String, //Classes and Object
    
    categoryID: //from table category select(id)
    [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    userID: 
    [{
        type: Schema.Types.ObjectId,
        ref:'User'
    }],
    
},{timestamps:true})

module.exports = model("quiz", quizSchema);


