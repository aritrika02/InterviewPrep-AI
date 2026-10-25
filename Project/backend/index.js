const express = require("express")
const cors = require("cors")
let { router } = require("./routes/AllRoutes")

let app = express()

app.use(cors({ origin: process.env.FRONTEND_URL || "*" }))
app.use(express.json())

app.get("/", (req, res) => res.send("InterviewPrep API is running"))
app.use("/", router)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));



// const express=require("express")
// let {router}=require("./routes/AllRoutes")
// const cors=require("cors")

// let app=express()



// app.use(cors())
// app.use(express.json())

// app.use("/",router)


// app.listen(2000,()=>{
//     console.log("server is starting")
// })