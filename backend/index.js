const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/users",userRouter)
// app.use("/posts",postRouter)

const main = async() => {
    try{
        await connection
        console.log("connected to db")
    }
    catch(err){
        console.log("err in connecting")
        console.log(err)
    }
}

main()

app.get("/",(req,res)=>{
    res.send("Testing server OK")
})

app.listen(process.env.port,()=>{
    console.log(`server connected to ${process.env.port}`)
})