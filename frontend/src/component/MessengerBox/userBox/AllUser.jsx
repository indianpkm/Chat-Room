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
const Image=styled('img')(({theme})=>({
    width:50,
    height:50,
    borderRadius:'50%',
    padding:'0 14px',
    objectFit:'cover',
    alignSelf:'center',
[theme.breakpoints.down('md')]:{
    width:40,
    height:40,
    padding:'0 5px',
  }
}))

const Container=styled(Box)`
height:100%;
display:flex;
align-items:center;
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

    const dotStyle = {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: 'green',
        boxShadow: '0 0 2px rgba(0, 0, 0, 0.5)',
        marginLeft:'1rem'
      };

  return (
    <Component onClick={getSingleUSer}>
      { user &&
      <>
       <Box style={{display:'flex',alignItems:'center'}}>
            <Image src={user.picture} alt='dp' />
        </Box>
            <Container>
                <Typography style={{fontSize:'.9rem'}}>{user.name}</Typography>
            {activeUser?.find(users=>users.sub===user.sub) && <span style={dotStyle}></span>}
            </Container>
        
        </>
        }
        
    </Component>
  )
}

export default AllUser