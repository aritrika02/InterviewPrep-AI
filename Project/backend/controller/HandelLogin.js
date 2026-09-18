
let {registration_model}=require("../model/connection")
const jwt=require("jsonwebtoken")
const secret="MySecretKey"

async function LoginHandel(req,res) {
    let {Lemail,Lpassword}=req.body
    // console.log(Lemail);    
    // console.log(Lpassword);
    let data=await registration_model.findOne({email:Lemail,password:Lpassword})
    // console.log(data)
    if(data){
        let token =jwt.sign({id:data._id,name:data.name,username:data.email},secret,{
            expiresIn:"10m"
        })
        res.json({"status":"logged",token})    
        
    }
    else{
        res.json([{},{status:"not logged"}])    

    }
}

function validate(req,res){
    res.json({user:req.user,status:"Ok"})
}

module.exports={
    LoginHandel,
    validate
}