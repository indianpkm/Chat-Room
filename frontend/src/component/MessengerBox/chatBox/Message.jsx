import { Typography } from "@mui/material"
import { Box,styled } from "@mui/system"
import { useContext } from "react"
import { AccountContext } from "../../../context/AccountProvider";
import { FormateDate } from "../../../utils/utils";

const Own=styled(Box)`
background:#dcf8c6;
max-width:60%;
margin-left:auto;
padding:3px;
width:fit-content;
display:flex;
border-radius:10px;
word-break:break-word;
margin-top:.5rem;
margin-right:.3rem;
`
const Wrapper=styled(Box)`
background:#ffffff;
max-width:60%;
background:#dcf8c6;
padding:3px;
width:fit-content;
display:flex;
border-radius:10px;
word-break:break-word;
margin-top:.5rem;
margin-left:.3rem;
`
const Text=styled(Typography)`
font-size:14px;
padding:0 5px 0 8px;
display:flex
`
const Time=styled(Typography)`
font-size:10px;
color:#919191;
margin-top:6px;
word-break:keep-all;
margin-top:auto;
`

export const Message =({message})=>{
    const {account}=useContext(AccountContext);

    
    return(<>
   { account.sub===message.senderId?
    <Own>
        {
            message.type==='file' ? <ImageMessage message={message}/> : <TextMessage message={message} />
        }
    </Own>
    :
    <Wrapper>
        {
            message.type==='file' ? <ImageMessage message={message}/> : <TextMessage message={message} />
        }
    </Wrapper>
    }
    </>)
}

const ImageMessage=({message})=>{
    return(
        <></>
    )
}

const TextMessage=({message})=>{
    return(<>
    <Text dangerouslySetInnerHTML={{ __html: message.text }} ></Text>
        <Time>{FormateDate(message.createdAt)}</Time>
    </>)
}

export default Message