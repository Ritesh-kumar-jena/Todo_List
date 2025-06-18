const mongoose=require("mongoose")
const express=require("express")
const { user } = require("../Model/userModel")


const userRoutes=express.Router()

userRoutes.post("/users",async(req,res)=>{
    try {
        const {username,email}=req.body
        const existingUsername=await user.findOne({username})
        if(existingUsername){
            res.status(400).send("Allready have an user on this username. try an unique user name.")
        }else{
            const existingEmail=await user.findOne({email})
            if(existingEmail){
                 res.status(400).send("Allready registered this email id. So try another email id.")
            }else{
                const newuser=new user({username,email})
                await newuser.save()
                res.status(200).send({msg:"created new user successfully.",user:newuser})
            }
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

userRoutes.get('/users',async(req,res)=>{
    try {
        const users=await user.find()
        res.status(200).send({user:users})
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports={userRoutes}