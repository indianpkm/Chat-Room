import { Box, Typography, styled } from '@mui/material'
import React, { useContext } from 'react'
import { AccountContext } from '../../../context/AccountProvider'
import {  setConversation } from '../../../services/api'


const Component=styled(Box)`
display:flex;
height:45px;
padding:13px 0;
cursor:pointer;
border-bottom:1px solid #f2f2f2;
`
const Image=styled('img')({
    width:50,
    height:50,
    borderRadius:'50%',
    padding:'0 14px',
    objectFit:'cover',
})
const Container=styled(Box)`
height:100%;
margin-left:.5rem;
`

const Status=styled(Typography)`
margin-left:150px ! important;
font-size:12px;
color:rgb(0,0,0,0.6);
`

const AllUser = ({user}) => {
    const {account,setPerson,activeUser}=useContext(AccountContext)
    
    const getSingleUSer=async ()=>{
        await setConversation({senderId:account.sub,receiverId:user.sub})
        setPerson(user);
    }


  return (
    <Component onClick={getSingleUSer}>
      { user &&
      <>
       <Box>
            <Image src={user.picture} alt='dp' />
        </Box>
            <Container>
                <Typography>{user.name}</Typography>
                <Status>{activeUser?.find(users=>users.sub===user.sub)? <span style={{color:'#05fc1d',fontWeight:'bold'}}>Online</span> : 'Offline'}</Status>
            </Container>
        
        </>
        }
        
    </Component>
  )
}

export default AllUser