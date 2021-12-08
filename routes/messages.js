const router = require("express").Router();
const Message = require("../models/Message");
const {userAuth} = require("../utils/Auth");

//add new message
router.post("/messages", async(req,res)=>{
    const newMessage = new Message(req.body);
    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch(err){
        res.status(500).json(err);
    }
});

//get messages
router.get("/getMessages/:conversationId", async(req,res)=>{
    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;