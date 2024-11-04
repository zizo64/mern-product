import React, { useState } from 'react'
import { Box,Input,Button,Text,Heading,Container,Flex } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {signInSuccess} from '../redux/userSlice'
import OAuth from '../components/OAuth'

const SignIn = () => {
  const navigate=useNavigate()
  const[form,setForm]=useState({})
  const[error,setError]=useState(null)
  const[loading,setLoading]=useState(false)
const dispatch=useDispatch()
  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.id]:e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/auth/sign-in', {
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
  
      const data = await res.json();  
      dispatch(signInSuccess(data))
      navigate("/")
      
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };



  return (
    <Box p={3} maxW={"lg"} mx="auto" >
    <Heading  textAlign="center" fontWeight={"bold"}  m={3}> Sign In </Heading>
    <form onSubmit={handleSubmit} >
      <Flex gap={4} flexDirection="column">
      <Input type="email" placeholder='email' p={3} rounded={"lg"}   id="email" onChange={handleChange}></Input>
      <Input type="password" placeholder='password' p={3} rounded={"lg"} id="password" onChange={handleChange}></Input>
      <Button p={3} rounded={"lg"} backgroundColor={"gray.700"} _hover={{background:"gray.500"}} > Sign In</Button>
      <OAuth/>
      </Flex>
    </form>
    <Flex gap={2} mt={5} >
      <Text> Don't have an account?</Text>
      <Link to="/sign-up">
      <Text  color="blue.500" > Sign up</Text>
      </Link>
    </Flex>
  </Box>
  )
}

export default SignIn