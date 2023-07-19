import { Typography } from "@mui/material";
import { Box, styled} from "@mui/system";
import { useContext } from "react";
import { AccountContext } from "../../../context/AccountProvider";

const Header=styled(Box)`
height:44px;
width:97%;
border-radius:10px;
background:#ededed;
padding:8px 14px;
display:flex;
align=items:center;
`
const Image=styled('img')({
    height:40,
    width:40,
    objectFit:'cover',
    borderRadius:'50%',
})

const Name=styled(Typography)`
margin-left:12px ! important;
`
const Status=styled(Typography)`
margin-left:12px ! important;
font-size:12px;
color:rgb(0,0,0,0.6);
`

const ChatHeader = () => {
    const {person,activeUser}=useContext(AccountContext)
    return (<>
        <Header>
           { person &&
          <> 
          <Image src={person.picture} alt='dp' />
            <Box>
                <Name>{person.name}</Name>
                <Status>{activeUser?.find(user=>user.sub===person.sub)?<span style={{color:'#05fc1d',fontWeight:'bold'}}>Online</span> : 'Offline'}</Status>
            </Box>
            </>
            }
        </Header>
    </>)
}

export default ChatHeader