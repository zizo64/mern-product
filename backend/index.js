import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import Product from "./models/product.model.js";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
dotenv.config()

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const app=express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO).then(()=>{console.log("connected to database")}).catch(err=>console.log(err))


app.get("/products", async (req,res)=>{ 
try{
const product=await Product.find({})
  return res.status(200).json(product)
    } catch(error){
        return res.status(500).json(error)
    }
})

app.use(express.static(path.join(__dirname,'/frontend/dist')))
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'/frontend/dist/index.html')))

app.post("/products", async (req,res)=>{
    const product=req.body
    if (! product.name || !product.price || ! product.image){
        return res.status(400).json("please fill all fields ")
    }
    const newProduct= new Product(product)
    try{
await newProduct.save()
  return res.status(200).json(newProduct)
    } catch(error){
        return res.status(500).json(error)
    }
})

app.put("/products/:id", async (req,res)=>{
    const {id}=req.params
    const product=req.body
    try{
   const updatedProduct=await Product.findByIdAndUpdate(id,product,{new:true})
  return res.status(200).json(updatedProduct)
    } catch(error){
        return res.status(500).json("product not found")
    }
})


app.delete("/products/:id", async (req,res)=>{
    const {id}=req.params
   
    try{
   await Product.findByIdAndDelete(id)
  return res.status(200).json("product delet successfully")
    } catch(error){
        return res.status(500).json("product not found")
    }
})

app.listen(3000, ()=>{
    console.log("app run in port 3000 , hello world")
})

