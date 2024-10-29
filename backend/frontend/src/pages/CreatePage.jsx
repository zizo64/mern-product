import { Box,Input,Button,Text,Heading,Container } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const CreatePage = () => {
  const navigate=useNavigate()
  const location = useLocation();
  const state = location.state ? location.state : null;
  const [product, setProduct] = useState({
    name: state?.name || '',
    price: state?.price || '',
    image: state?.image || ''
  });
  
  const handleChange=(e)=>{
    setProduct({
      ...product,
      [e.target.id]:e.target.value
    })
  }

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product)
    try {
      const res = await fetch(state ? `/products/${state._id}` : "/products", {
        method: state? "PUT": "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(product),
      });
      
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
  
      const data = await res.json();  
      console.log(data);
  
      navigate("/")
      
    } catch (error) {
     console.log(error)
    }
  };


  return (
    <Container p={3} maxW={"Container.sm"}>
      {state ? <Heading as={"h1"} p={3} textAlign={"center"}  size={"2xl"}> Update Product </Heading> : <Heading as={"h1"} p={3} textAlign={"center"}  size={"2xl"}> Create New Product </Heading>}
    
    <form onSubmit={handleSubmit} >
      <Input  placeholder='Product Name' rounded={"lg"} spacing={3} my={3} id="name" value={product.name} onChange={handleChange}></Input>
      <Input  placeholder='Product Price' rounded={"lg"} spacing={3} my={3} id="price" value={product?.price}  onChange={handleChange}></Input>
      <Input  placeholder='Product Image' rounded={"lg"} spacing={3} my={3} id="image" value={product?.image}  onChange={handleChange}></Input>
      <Button type="submit" rounded={"lg"} spacing={3} my={3} w={"full"}>
      {state ? "Edit product" : "Add Product"} 
          </Button>
    </form>
    
  </Container>
  )
}

export default CreatePage