import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from '@firebase/auth'
import {Button } from '@chakra-ui/react'
import {app} from '../firebase'
import { useDispatch } from 'react-redux'
import {signInSuccess} from '../redux/userSlice'
import { Link, useNavigate } from 'react-router-dom'
const OAuth = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const  handleGoogleClick=async()=>{
    try{
        const provider=new GoogleAuthProvider()
        const auth=getAuth(app)
        const result=await signInWithPopup(auth,provider)
        const res=await fetch('http://localhost:3000/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
        });
        
        const data = await res.json();  
        dispatch(signInSuccess(data))
        navigate("/")
        
    } catch(error){console.log(error)}
  }
  return (
    
     <Button onClick={handleGoogleClick} type="button" p={3} rounded={"lg"} backgroundColor={"red.700"} _hover={{background:"red.500"}} > Countinue With Google </Button>
  
  )
}

export default OAuth
