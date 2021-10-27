//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema, model } = require("mongoose");


const guestSchema = new Schema(
    {
        g_id:[{
            type: Schema.Types.ObjectId
        }],
        first_name: [{
            type: String,
            required
        }],
        last_name: [{
            type: String,
            required
        }]
        
    },{timestapms:true})
    
module.exports = model("guest", guestSchema);