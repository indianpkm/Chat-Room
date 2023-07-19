import user from "../model/user.js"

export const addUSer=async(req,res)=>{
    try{
        let exists=await user.findOne({sub:req.body.sub})
        if(exists){
            res.status(200).json({msg:'user already exists'})
            return;
        }
        const newUser=new user(req.body);
        await newUser.save();
        return res.status(200).json(newUser)
    }catch(err){
        return res.status(500).json(err.message)
    }
}

export const getUser=async(req,res)=>{
    try{
        const users=await user.find({})
        return res.status(200).json(users)
    }catch(err){
        return res.status(500).json(err.message)
    }
}