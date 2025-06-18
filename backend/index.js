const dotenv=require('dotenv').config()
const cors=require('cors')
const express=require('express')
const { connection } = require('./db')
const { userRoutes } = require('./Controller/userRoutes')
const { todoRoutes } = require('./Controller/todoRoutes')

const port=process.env.port

const app=express()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send("Wellcom to my Todo App")
})


app.use('/api',userRoutes)
app.use('/api',todoRoutes)

app.listen(port,async()=>{
    try {
        await connection
        console.log(`server is running on port:-${port} and connected to Todo_List database`)
    } catch (error) {
        console.log(error)
    }
})