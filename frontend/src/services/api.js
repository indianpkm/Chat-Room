import axios from 'axios'

const url='https://chat-room-mk4f.onrender.com'

export const addUser=async(data)=>{
    try{
        await axios.post(`${url}/add`,data)
    }catch(err){
        console.log('Error while adding user',err)
    }
}

export const getUser=async()=>{
    try{
        const response= await axios.get(`${url}/getUser`)
        return response.data
    }catch(err){
        console.log('Error while getting user',err)
    }
}

export const setConversation=async(data)=>{
    try{
      await axios.post(`${url}/conversation/add`,data)
    }catch(err){
      console.log('error while set conversation api',err.message)
    }
  }
  
export const getConversation=async(data)=>{
    try{
     let res = await axios.post(`${url}/conversation/get`,data)
     return res.data;
    }catch(err){
      console.log('error while get conversation',err.message)
    }
  }

  export const newMessage=async(data)=>{
    try{
      await axios.post(`${url}/message/add`,data)
    }catch(err){
      console.log('error while post message conversation',err.message)
    }
  }

  
export const getMessage=async(id)=>{
  try{
   let res = await axios.get(`${url}/message/get/${id}`)
   return res.data
  }catch(err){
    console.log('error while get message',err.message)
  }
}