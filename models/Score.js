const mongoose = require('mongoose');
const Schema = require(Schema.mongoose);

const scoreSchema = new Schema(
    {
        scoreID:[{
            type: Schema.Types.ObjectId
        }],
        userID:[{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required
        }],
        quizID:[{
            type: Schema.Types.ObjectId,
            ref: 'Quiz',
            required
        }],
        score: int,
        guestID:[{
            type: Schema.Types.ObjectId,
            ref:'Guest',
            required
        }]
    }, {timestamps:true})
    
module.exports = model("score", scoreSchema);