import { Box,styled } from '@mui/material'
import React, { useContext, useState } from 'react'
import Search from './Search'
import User from './User'
import { AccountContext } from '../../../context/AccountProvider'


const Container = styled(Box)`
width:25%;
height:90vh;
border-radius:1rem;
display:flex;
margin:1rem;
align-items:center;
flex-direction:column;
background-color:#fff;
padding:1rem;
`
const Users=styled(Box)`

`
const Image=styled('img')({
  width:50,
  height:50,
  borderRadius:'50%',
  padding:'0 14px',
  objectFit:'cover',
})

const UserBox = () => {
  const [text,setText]=useState('')
  const {account}=useContext(AccountContext)

  return (
    <Container>
      <Box>
            <Image src={account.picture} alt='profile' />
        </Box>
      <Search setText={setText}/>
      <User text={text}/>
    </Container>
  )
}

export default UserBox