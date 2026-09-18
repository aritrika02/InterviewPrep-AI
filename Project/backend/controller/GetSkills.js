let {registration_model}=require("../model/connection")
async function GetSkills(req,res) {
    // console.log("click to hua h")
    let data=await registration_model.findOne({_id:req.user.id},{skills:1,_id:0})
    // console.log(data.skills)
    let skills=data.skills
    // console.log(req.user.id);
    res.json({skills,status:"Ok"})
}

module.exports={
    GetSkills,
}