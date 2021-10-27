//const mongoose = require('mongoose');
const mongooseRandom = require('mongoose-simple-random');
//const Schema = mongoose.Schema;
const { Schema, model } = require("mongoose");


const questionSchema = new Schema ({
    question_id: Schema.Types.ObjectId,
    questionTittle: {
        type: String,
        minlength: 1,
        require: true
    },
    option_one:[{
        type:String,
    }],
    option_two:[{
        type:String,
    }],
    option_three:[{
        type:String,
    }],
    option_four:[{
        type:String,
    }],
    points: int,
    isCorrect: Boolean,
    quizID:[{
        type: Schema.Types.ObjectId,
        ref:'quiz',
        required
    }],
    userID:[{
        type:Schema.Types.ObjectId,
        ref:'user',
        required
    }]
},{timestamps:true})
module. exports= model("question", questionSchema);