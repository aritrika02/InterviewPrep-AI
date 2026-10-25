
// let {registration_model}=require("../model/connection")

// function RegisterHandel(req,res){
    
//     let {name,email,password}=req.body
//     // console.log(name)
//     // console.log(email)
//     // console.log(password)
//     registration_model.insertOne({"name":name,"email":email,"password":password})
//     res.json({status:"done"})

// }

// module.exports={
//     RegisterHandel,
// }

let { registration_model } = require("../model/connection")
const bcrypt = require("bcryptjs")

async function RegisterHandel(req, res) {
    try {
        let { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ status: "missing" })
        }
        let exists = await registration_model.findOne({ email })
        if (exists) {
            return res.json({ status: "exists" })
        }
        let hashed = await bcrypt.hash(password, 10)
        await registration_model.create({ name, email, password: hashed })
        res.json({ status: "done" })
    } catch (err) {
        console.log(err)
        res.json({ status: "error" })
    }
}

module.exports = { RegisterHandel }