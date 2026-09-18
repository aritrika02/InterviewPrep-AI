const mongoose =require("mongoose")

mongoose.connect("mongodb://localhost:27017/interviewApp")
.then(()=>{
    console.log("connection sucess")
})
.catch(()=>{
    console.log("some error occured")
})


let registration_schema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    skills:[String],
    company:String,
    role:String
})

let questions_schema=mongoose.Schema({
    
    questions:[String],
    skill:String
})


let registration_model=mongoose.model("login_data",registration_schema)
let questions_model=mongoose.model("questions",questions_schema)
// let login_model=mongoose.model("login_data",login_schema)


module.exports={
    registration_model,
    questions_model,
    // login_model,
}