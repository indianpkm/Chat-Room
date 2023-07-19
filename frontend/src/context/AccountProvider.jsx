import { createContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export const AccountContext=createContext(null)

const AccountProvider=({children})=>{
    const [account,setAccount]=useState()
    const [person,setPerson]=useState({})
    const [conversation,setConversation]=useState()
    const [message,setMessage]=useState({})
    const [activeUser,setActiveUser]=useState([])

    const socket=useRef();
    useEffect(()=>{
        socket.current=io('https://chat-room-mk4f.onrender.com')
    },[])

    return(
        <AccountContext.Provider
        value={{socket,setAccount,account,person,setPerson,conversation,setConversation,message,setMessage,activeUser,setActiveUser}} 
        >
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider