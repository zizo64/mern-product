import React, { useState,useRef, useEffect } from 'react'
import { Box,Input,Button,Text,Heading,Image,Flex } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import { app } from '../firebase'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"

const Profile = () => {
  const navigate=useNavigate()
  const[form,setForm]=useState({})
  const[file,setFile]=useState(undefined)
  const[filePercentage,setFilePercentage]=useState(0)
  const dispatch=useDispatch()
  const fileRef=useRef(null)
  const currentUser=useSelector((state)=>state.user.currentUser)

  console.log(form)
useEffect(()=>{
  if (file) {  
const storage=getStorage(app)
const fileName=new Date().getTime() + file?.name;
const storageRef=ref( storage, fileName)
const uploadTask=uploadBytesResumable(storageRef,file)
uploadTask.on('state_changed',(snapshot)=>{
  const progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100
  setFilePercentage(Math.round(progress))
},
(error)=>{console.log(error)},
()=>{
  getDownloadURL(uploadTask.snapshot.ref).then(
    (downloadUrl)=>setForm({...form,avatar:downloadUrl})
  )
})
  }
},[file])


  
  

  return (
    <Box p={3} maxW={"lg"} mx="auto" >
     <Heading  textAlign="center" fontWeight={"bold"}  m={3}>  Profile</Heading>
    <form >
    <Flex gap={4} flexDirection="column"> 
    <Input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
    <Image  onClick={()=>fileRef.current.click()} src={form.avatar || currentUser?.avatar} p={3} rounded={"full"} h={200} w={200} backgroundColor={"grey"} mx="auto"/>
    {filePercentage >0 && filePercentage<100 && <Text  color="slate.500" mx={"auto"}>{`UpLoading ${filePercentage} %`}</Text>}
    <Input type="text" placeholder='username'  p={3} rounded={"lg"}  id="username" ></Input>
      <Input type="email" placeholder='email'  p={3} rounded={"lg"}  id="email" ></Input>
      <Input type="password" placeholder='password'  p={3} rounded={"lg"}  id="password"></Input>
      <Button p={3} rounded={"lg"} backgroundColor={"gray.700"} _hover={{background:"gray.500"}}> Update Profile</Button>
     </Flex>
    </form>
    <Flex justifyContent={"space-between"}  mt={5}>
     
    <Text  color="red.500" > Delete Account</Text>
    <Text  color="red.500" > Sign Out</Text>
    </Flex>
  </Box>
  )
}

export default Profile