import { Button, Container ,Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import {  useSelector } from 'react-redux'

const Navbar = () => {
  const currentUser=useSelector((state)=>state.user.currentUser)
  console.log(currentUser)  

  return (
    <Container px={"4"} maxW={"1140px"}>
        <Flex h={20} justifyContent={"space-between"} alignItems={"center"}>
            <Text bg={"gray.200"} rounded={"lg"} px={3} m={3}>
<Link to={"/"}> Product Store </Link>
            </Text>
            <Text bg={"gray.200"} rounded={"lg"} px={3} m={3}>
            <Link to={"/create"} >Add  Product  </Link>
            </Text>
            
            {currentUser? <Text bg={"gray.200"} rounded={"lg"} px={3} m={3}> <Link to="/profile"> <img src={currentUser.avatar} alt="profile" className='rounded-full h-7 w-7'/></Link> </Text>
       : <Text bg={"gray.200"} rounded={"lg"} px={3} m={3}> <Link to="/sign-in"> SignIn </Link></Text>
        } 
            
      
        </Flex>
    </Container>
  )
}

export default Navbar