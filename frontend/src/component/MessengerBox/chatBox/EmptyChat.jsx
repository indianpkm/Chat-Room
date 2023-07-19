import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import React from 'react'
import chatImg from '../../../media/chatRoom.png'


const Container = styled(Box)`
width:67%;
height:90vh;
border-radius:1rem;
display:flex;
margin:1rem;
justify-content:center;
align-items: center;
flex-direction:column;
background-color:#fff;
padding:1rem;
`

const Image=styled('img')({
  width:'10rem',
  height:'10rem',
  borderRadius:'50%',
  padding:'0 14px',
  objectFit:'cover',
  marginBottom:'1.5rem'
})

const WelcomeText=styled(Typography)`
font-size:2rem;
`
const Text=styled(Typography)`
font-size:1.4rem;
`

const EmptyChat = () => {
  return (
    <Container>
      <Image src={chatImg} alt='chat'/>
      <WelcomeText>Welcome to chat Room</WelcomeText>
      <Text>Click any friend for chat</Text>
    </Container>
  )
}

export default EmptyChat