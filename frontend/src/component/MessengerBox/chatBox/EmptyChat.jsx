import { Box, Typography,styled } from '@mui/material'
import React, { useState } from 'react'
import chatImg from '../../../media/chatRoom.png'
import MenuIcon from '@mui/icons-material/Menu';
import UserDrawer from '../userBox/UserDrawer';

const Container = styled(Box)(({theme})=>({
  width:'67%',
  height:'90vh',
  borderRadius:'1rem',
  display:'flex',
  margin:'1rem',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column',
  backgroundColor:'#fff',
  padding:'1rem',
  [theme.breakpoints.down('md')]:{
    width:'90%',
    height:'90svh'
  }
  }))

const Image=styled('img')({
  width:'10rem',
  height:'10rem',
  borderRadius:'50%',
  padding:'0 14px',
  objectFit:'cover',
  marginBottom:'1.5rem'
})

const WelcomeText=styled(Typography)`
font-size:1.9rem;
font-weight:500;
font-family: Arial, Helvetica, sans-serif;
`
const Text=styled(Typography)`
font-size:1.4rem;
`
const MenuIconStyle = styled(MenuIcon)(({theme})=>({
  marginRight:'auto',
  marginBottom:'auto',
  display:'none',
  cursor:'pointer',
  [theme.breakpoints.down('md')]:{
    display:'block'
  }
}))


const EmptyChat = () => {
  const [openDrawar,setOpenDrawar]=useState(true);

  const toggleDrawar=()=>{
    setOpenDrawar(true)
}

  return (
    <Container>
      <MenuIconStyle onClick={()=>toggleDrawar()}/>
      <Box style={{position:'absolute'}}>
      <Image src={chatImg} alt='chat'/>
      <WelcomeText>Welcome to chat Room</WelcomeText>
      <Text>Click any friend for chat</Text>
      <UserDrawer open={openDrawar} setOpen={setOpenDrawar} />
      </Box>
    </Container>
  )
}

export default EmptyChat