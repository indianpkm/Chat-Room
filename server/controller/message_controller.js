import conversation from "../model/conversation.js";
import message from "../model/message.js";

export const newMessage=async (req,res)=>{
    try{
        const newMessage= new message(req.body);
        await newMessage.save();
        await conversation.findByIdAndUpdate(req.body.conversationId,{message:req.body.text})
        return res.status(200).json('message save successfully');
    }catch(err){
        return res.status(500).json(err.message)
    }
}

export const getMessage=async(req,res)=>{
    try{
      const messages=await message.find({conversationId:req.params.id})
      return res.status(200).json(messages)
    }catch(err){
      console.log('error while get message',err.message)
    }
  }