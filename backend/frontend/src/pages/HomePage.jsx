import { Container,Box ,Heading, SimpleGrid, Text, Image, Button, Flex} from '@chakra-ui/react';

import React, { useEffect,useState } from 'react'
import { Link , useNavigate} from 'react-router-dom';

const HomePage = () => {
  const[products,setProducts]=useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const handleProducs = async () => {
      console.log(products)
      try {
        const res = await fetch('/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          },
        });
        console.log("Raw response:", res)
        
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
    
        const data = await res.json();  
        console.log(data);
        setProducts(data)
      } catch (error) {
       console.log(error)
      }
    };
  
    handleProducs();
  },[]);

  const handleDelete = async (id) => {

    try {
      const res = await fetch(`/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
      
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
  
      const data = await res.json();  
      console.log(data);
      setProducts(products.filter((item)=>item._id!==id))
      
    } catch (error) {
     console.log(error)
    }
  };

  const handleEdit=(product)=>{
    navigate("/create", { state: product });
}

  return (
    <Container p={3} maxW={"Container.sm"}>
      <Heading as={"h1"} p={3} textAlign={"center"}  size={"2xl"}>  Products </Heading>
{products.length ==0 && <Text textAlign={"center"} fontSize={"lg"}> No Product Found <Link to="/create">
<Text as={"span"} color={"blue"} _hover={{textDecoration:"underline"}}> create product</Text>
</Link></Text>}

        <SimpleGrid columns={{base:1, md:2, lg:3}} spacing={10}>
          {products && products.map((item)=><Box key={item._id} bg={"gray.200"} rounded={"lg"} m={3} > 
          <Image src={item.image} alt={item.name} h={80} w={"full"} p={3} objectFit={"cover"}></Image>
          <Box p={4}>
          <Flex justifyContent={"space-between"} my={3}> 
            <Heading>{item.name}</Heading>
            <Text> ${item.price}</Text>
            </Flex>
            <Flex justifyContent={"space-between"}>
           <Button onClick={()=>handleDelete(item._id)}>Delete</Button>
           <Button onClick={()=>handleEdit(item)}>Edit</Button>
            </Flex>
          </Box>
           </Box>)}
 
        </SimpleGrid>
      
    </Container>
  )
}

export default HomePage