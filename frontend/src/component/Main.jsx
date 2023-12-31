import React, { useContext, useEffect } from 'react'
import Login from './account/Login'
import { AccountContext } from '../context/AccountProvider'
import { Box,styled } from '@mui/material'
import UserBox from './MessengerBox/userBox/UserBox'
import ChatBox from './MessengerBox/chatBox/ChatBox'
import EmptyChat from './MessengerBox/chatBox/EmptyChat'

const Container=styled(Box)(({theme})=>({
  display:'flex',
  height:'100vh',
  background: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)',
[theme.breakpoints.down('md')]:{
  height:'100svh'
}
}))

const Main = () => {
  const {account,person}=useContext(AccountContext)

  useEffect(()=>{
  },[person])
  
  return (
    <Container>
      {
        account ?
        <Box style={{display:'flex',height:'100%',width:"100%"}}>
          <UserBox/>
          {
            person.sub ? <ChatBox/> : <EmptyChat/>
          }
        </Box>
        : <Login/>
      }
    </Container>
  )
}

export default Main
