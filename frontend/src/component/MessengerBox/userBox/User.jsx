import { Box, Typography, styled } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { getUser } from '../../../services/api'
import { AccountContext } from '../../../context/AccountProvider'
import AllUser from './AllUser'

const Container = styled(Box)`
width:90%;
overflow:auto;
`

const User = ({ text }) => {
  const [users, setUsers] = useState([])
  const { account,setActiveUser,socket } = useContext(AccountContext)

  const fetchUserWithCache=async()=>{
    const cacheKey='cached_users'
    try{
      const cachedData=localStorage.getItem(cacheKey)
      if(cachedData){
        const parsedData=JSON.parse(cachedData);
        // Filter the cached users based on the text prop
        const filteredUsers = parsedData.filter((user) =>
          user.name.toLowerCase().includes(text.toLowerCase())
        );
        setUsers(filteredUsers);
      }else{
        const responseUser=await getUser();
        localStorage.setItem(cacheKey,JSON.stringify(responseUser));
        // Filter the fetched users based on the text prop
      const filteredUsers = responseUser.filter((user) =>
      user.name.toLowerCase().includes(text.toLowerCase())
    );
    setUsers(filteredUsers);
      }
    }catch(error){
      console.error("Error fetching users",error)
    }
  }

  useEffect(() => {
    fetchUserWithCache()
  }, [text,fetchUserWithCache])

  useEffect(()=>{
    socket.current.emit('addUser',account);
    socket.current.on('getUsers',user=>{
      setActiveUser(user)
    })
  },[account])

  return (
    <Container>
      {
        users.map((user, id) => (
          user.sub !== account.sub &&
          <Box key={id}>
            <AllUser user={user} />
          </Box>
        ))
      }
    </Container>
  )
}

export default User