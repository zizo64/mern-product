import { Button, Container ,Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
   

  return (
    <Container px={"4"} maxW={"1140px"}>
        <Flex h={16} justifyContent={"space-between"} alignItems={"center"}>
            <Text>
<Link to={"/"}> Product Store </Link>
            </Text>
            <Text>
            <Link to={"/create"}>Add  Product  </Link>
            </Text>
      
        </Flex>
    </Container>
  )
}

export default Navbar