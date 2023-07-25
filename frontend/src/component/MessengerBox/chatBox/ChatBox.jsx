import { Box, Dialog, styled } from '@mui/material'
import './chatBox.css'
import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import iconImage from '../../../media/sendIcon.png'
import 'quill-emoji/dist/quill-emoji.css';
import 'react-quill/dist/quill.snow.css';
import ChatHeader from './ChatHeader';
import { AccountContext } from '../../../context/AccountProvider';
import ChatMiddle from './ChatMiddle';
import { getConversation, newMessage } from '../../../services/api';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import EmojiPicker from 'emoji-picker-react';

const Container = styled(Box)(({theme})=>({
  width:'67%',
  height:'92vh',
  borderRadius:'1rem',
  display:'flex',
  margin:'1rem',
  alignItems:'center',
  flexDirection:'column',
  backgroundColor:'#fff',
  padding:'1rem',
  [theme.breakpoints.down('md')]:{
    width:'90%',
    height:'92svh'
  }
  }))

const BottomToolbar = styled(Box)(({theme})=>({
  width:'64%',
  position:'fixed',
  display: 'flex',
  paddingLeft:'1rem',
  paddingTop:'.5rem',
  justifyContent:'center',
  alignItems:'center',
  gap:'.8rem',
  [theme.breakpoints.down('md')]:{
    width:'78%'
  }
}))

const ImageAttachment = styled('img')`
max-width: 90px;
height: 30px;
margin-left:auto;
cursor:pointer;
`;

const ChatBottom = styled(Box)`
width: 100%;
height:20%; 
margin-top:auto; 
`


const modules = {
  toolbar: [
    ["bold", "italic", 'strike'],
    ["link"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["image"],
  ],
};

const ChatBox = () => {
  const [value, setValue] = useState('');
  const { person, account, setConversation, conversation, socket } = useContext(AccountContext)
  const [image, setImage] = useState('');
  const [file, setFile] = useState(null)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmojiSelect = (emoji) => {
    let text=value
    setValue((text+=emoji.emoji))
  };
  

  useEffect(() => {
    const getConversationDetail = async () => {
      const data = await getConversation({ senderId: account.sub, receiverId: person.sub })
      setConversation(data)
    }
    getConversationDetail();
  }, [account.sub, person.sub])

  const getQuillData = (data) => {
    setValue(data);
  };
  

  const handleGetText = async () => {
    let message = {};
    if (!file) {
      message = {
        senderId: account.sub,
        receiverId: person.sub,
        conversationId: conversation._id,
        type: 'text',
        text:value,
      }
    } else {
      message = {
        senderId: account.sub,
        receiverId: person.sub,
        conversationId: conversation._id,
        type: 'file',
        text: image,
      }
    }
    socket.current.emit('sendMessage', message)

    await newMessage(message)
    setValue('')
  };

  const getFile = () => {
    const fileInput = document.querySelector('.ql-image');
    fileInput.click()
  }

  return (
    <Container>
      <ChatHeader />
      {
        conversation && <ChatMiddle />
      }
      <ChatBottom >
            <Dialog open={open} onClose={handleClose}>
              <EmojiPicker onEmojiClick={handleEmojiSelect}/>
            </Dialog>
        <ReactQuill theme="snow" modules={modules} value={value} placeholder='Write something' onChange={getQuillData} />
        <BottomToolbar>
          <label style={{ cursor: 'pointer', paddingTop: '4px' }} onClick={getFile} htmlFor='ql-image'>
            <AddCircleOutlineOutlinedIcon fontSize='small' />
          </label>
          <EmojiEmotionsOutlinedIcon fontSize='small' onClick={handleClickOpen} />

          <AlternateEmailOutlinedIcon fontSize='small' />
          <ImageAttachment onClick={handleGetText} src={iconImage} alt="Attached Image" />
        </BottomToolbar>
      </ChatBottom>
    </Container>
  )
}

export default ChatBox