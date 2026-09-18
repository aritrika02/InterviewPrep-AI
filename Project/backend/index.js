const express=require("express")
let {router}=require("./routes/AllRoutes")
const cors=require("cors")

let app=express()



app.use(cors())
app.use(express.json())

app.use("/",router)


app.listen(2000,()=>{
    console.log("server is starting")
})