import conversation from "../model/conversation.js";


export const newConversation=async(req,res)=>{
    try{
        const senderId=req.body.senderId;
        const receiverId=req.body.receiverId;
        const exists=await conversation.findOne({members:{$all:[receiverId,senderId]}})
        if(exists){
            return res.status(200).json('conversation already exist')
        }
        const newConversation=new conversation({
            members:[senderId,receiverId]
        })
        await newConversation.save();
        return res.status(200).json('conversation saved successfully')
    }catch(err){
        return res.status(500).json(err.message)
    }
}

export const getConversation = async(req,res)=>{
    try{
        const senderId=req.body.senderId;
        const receiverId=req.body.receiverId;

        let getconversation=await conversation.findOne({members:{$all:[receiverId,senderId]}})
        return res.status(200).json(getconversation)
    }catch(err){
        return res.status(500).json(err.message)
    }
}