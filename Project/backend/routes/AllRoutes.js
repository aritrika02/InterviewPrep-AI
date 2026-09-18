const express=require("express")
const jwt=require("jsonwebtoken")

let {RegisterHandel}=require("../controller/HandelRegister")
let {GetSkills}=require("../controller/GetSkills")
let {GetQuestions}=require("../controller/GetQuestions")
let {LoginHandel,validate}=require("../controller/HandelLogin")
let {GenerateQuestions,upload}=require("../controller/GenerateQuestions")

let router=express.Router()
const secret="MySecretKey"

async function verifyRoute(req,res,next) {
    let auth_header = req.headers["auth"].split(" ")
    let token=auth_header[1]

    jwt.verify(token,secret,(error,payload)=>{
        if(error){
            res.json({status:"Invalid"})
            return
        }
        
        req.user=payload
        next()
    })
}

router.post("/register",RegisterHandel)
router.post("/login",LoginHandel)
router.get("/validate",verifyRoute,validate)
router.post("/generate",verifyRoute,upload.single("resume"),GenerateQuestions)
router.get("/skills",verifyRoute,GetSkills)
router.get("/questions",verifyRoute,GetQuestions)



module.exports={
    router,
}