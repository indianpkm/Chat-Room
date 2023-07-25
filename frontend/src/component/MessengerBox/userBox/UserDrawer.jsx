import { Drawer, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AccountContext } from "../../../context/AccountProvider";
import Search from "./Search";
import User from "./User";

const Header = styled(Box)`
background:#008069;
background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
padding:4px;
display:flex;
&> svg, & >p {
    margin-top:auto;
    padding:15px;
    font-weight:600;
}
`

const drawarStyle = {
    left: 0,
    top: 0,
    height: '100%',
    width: '75%',
    maxWidth:'400px',
    boxShadow: 'none',
}

const Container = styled(Box)(({theme})=>({
    width:'100%',
    height:'90vh',
    borderRadius:'1rem',
    display:'flex',
    alignItems:'center',
    marginTop:'.7rem',
    flexDirection:'column',
    padding:'-10px',
    backgroundColor:'#fff',
    }))
    
 const Image=styled('img')({
      width:50,
      height:50,
      borderRadius:'50%',
      padding:'0 14px',
      objectFit:'cover',
      marginLeft:'auto',
      alignSelf:'center'
    })

const UserDrawer = ({ open, setOpen }) => {
  const [text,setText]=useState('')
  const {account,person}=useContext(AccountContext)

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(()=>{
        setOpen(false)
    },[person])

    return (<>
        <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: drawarStyle }}
            style={{ zIndex: 1500,overflow:'hidden' }}
        >
            <Header>
                <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => setOpen(false)} />
                <Typography>Profile</Typography>
                <Image src={account.picture} alt='profile' />
            </Header>
            <Container >
                <Search setText={setText} />
                <User text={text}/>
            </Container>
        </Drawer>
    </>)
}

export default UserDrawer;