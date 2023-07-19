import { Box, Typography, styled } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { getUser } from '../../../services/api'
import { AccountContext } from '../../../context/AccountProvider'
import AllUser from './AllUser'

const Container = styled(Box)`
width:90%;
`

const User = ({ text }) => {
  const [users, setUsers] = useState([])
  const { account,setActiveUser,socket } = useContext(AccountContext)

  useEffect(() => {
    const fetchUser = async () => {
      let responseUser = await getUser();
      const filterUser = responseUser.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
      setUsers(filterUser)
    }
    fetchUser()
  }, [text])

  useEffect(()=>{
    socket.current.emit('addUser',account);
    socket.current.on('getUsers',user=>{
      console.log(user)
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