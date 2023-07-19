import React, { useContext, useEffect, useRef, useState } from 'react'
import { AccountContext } from '../../../context/AccountProvider'
import { getMessage } from '../../../services/api'
import { Box, styled } from '@mui/material'
import Message from './Message'

const MessageBox=styled(Box)`
width:100%;
height:100%;
overflow:auto;
overflow-x:hidden;
margin:.4rem 0;
border:1px solid #c4c2c2;
padding-bottom:.5rem;
`

const ChatMiddle = () => {
  const { person, conversation,socket } = useContext(AccountContext)
  const [messages, setMessages] = useState([])
  const [incomingMessage,setIncomingMessage]=useState(null);
  const scrollRef=useRef()

  useEffect(()=>{
    socket.current.on('getMessage',data=>{
      setIncomingMessage(
        {
          ...data,
          createdAt:Date.now()
        }
      )
    })
  },[socket])

  useEffect(()=>{
    incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
    setMessages(prev=>[...prev,incomingMessage])
  },[incomingMessage,conversation])

  useEffect(() => {
    const getMessageDetail = async () => {
      const newMessage = await getMessage(conversation._id)
      setMessages(newMessage)
    }
    getMessageDetail()
  }, [person.sub, conversation._id])
  
  
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({transition:'smooth'});
},[messages])

  return (
    <MessageBox >
      {
        messages && messages.map((message) => {
          return(
            <>
            <Message message={message}/>
            
      <div ref={scrollRef} />
      </>
            
          )
        })
      }
    </MessageBox>
  )
}

export default ChatMiddle