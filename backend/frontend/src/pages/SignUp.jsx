import React, { useState } from 'react'
import { Box,Input,Button,Text,Heading,Container,Flex } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

const SignUp = () => {

  const navigate=useNavigate()
  const[form,setForm]=useState({})
  const[error,setError]=useState(null)
  const[loading,setLoading]=useState(false)

  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.id]:e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(form),
      });
      
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
  
      const data = await res.json();  // Attempt to parse JSON
      console.log(data);
      navigate("/sign-in")
      
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <Box p={3} maxW={"lg"} mx="auto" >
    <Heading  textAlign="center" fontWeight={"bold"}  m={3}> Sign UP </Heading>
    
      <form onSubmit={handleSubmit} >
      <Flex gap={4} flexDirection="column">
        <Input type="text" placeholder='username'  p={3} rounded={"lg"}  id="username"  onChange={handleChange}></Input>
        <Input type="password" placeholder='password'  p={3} rounded={"lg"}  id="password" onChange={handleChange}></Input>
        <Input type="email" placeholder='email'  p={3} rounded={"lg"}  id="email" onChange={handleChange}></Input>
        <Button p={3} rounded={"lg"} backgroundColor={"gray.700"} _hover={{background:"gray.500"}}> Sign Up</Button>
        <OAuth />
        </Flex>
      </form>
      <Flex gap={2} mt={5} >
        <Text> Have an account?</Text>
        <Link to="/sign-in">
        <Text  color="blue.500" > Sign in</Text>
        </Link>
      </Flex>
    </Box>
  )
}

export default SignUp