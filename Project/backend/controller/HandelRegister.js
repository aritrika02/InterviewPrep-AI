
let {registration_model}=require("../model/connection")

function RegisterHandel(req,res){
    
    let {name,email,password}=req.body
    // console.log(name)
    // console.log(email)
    // console.log(password)
    registration_model.insertOne({"name":name,"email":email,"password":password})
    res.json({status:"done"})

}

module.exports={
    RegisterHandel,
}