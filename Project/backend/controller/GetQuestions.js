
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const {questions_model}=require("../model/connection")

// async function GetQuestions(req,res){
//     let skilll=req.query.skill

//     let questions=await questions_model.findOne({skill:skilll},{questions:1,_id:0})
//     if(questions){
//         console.log("questions db se aaya")
//         // console.log(questions.questions)
//         questions=questions.questions
//         res.json({status:"Ok",questions})
//     }
//     else{
//         console.log("questions api se aaya")
//     const genAI = new GoogleGenerativeAI("AIzaSyCWAPOyrx820BBAQRR8-bZ29AhcvaBM1M4");
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
//     let prompt=`Generate 50 questions based on the skill: [${skilll}].

//     The questions should:
//     - Be a mix of Easy, Medium, and Hard difficulty.
//     - Be written in plain text only.
//     - Do NOT include numbering or bullets.
//     - Each question should be separated by a comma.
//     - Dont include commas in a single question comma should only be used to seperate questions
//     - Do not include answers or explanations.
//     - Ensure a good variety of conceptual, practical, and scenario-based questions.

//     Output format example:
//     Question 1?,Question 2?,Question 3?,...`
//     const result = await model.generateContent(prompt);
//     questions=await result.response.text().split(",")
//     // console.log("get questions me h")
//     // console.log(req.query.skill)
//     // console.log(questions)
//     await questions_model.insertOne({skill:skilll,questions:questions})
//     res.json({status:"Ok",questions})
//     }
// }

// module.exports={
//     GetQuestions,
// }


const { GoogleGenerativeAI } = require("@google/generative-ai")
const { questions_model } = require("../model/connection")

async function GetQuestions(req, res) {
    try {
        let skill = req.query.skill

        let found = await questions_model.findOne({ skill: skill }, { questions: 1, _id: 0 })
        if (found) {
            return res.json({ status: "Ok", questions: found.questions })
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

        let prompt = `Generate 50 questions based on the skill: [${skill}].

    The questions should:
    - Be a mix of Easy, Medium, and Hard difficulty.
    - Be written in plain text only.
    - Do NOT include numbering or bullets.
    - Each question should be separated by a comma.
    - Dont include commas in a single question comma should only be used to seperate questions
    - Do not include answers or explanations.
    - Ensure a good variety of conceptual, practical, and scenario-based questions.

    Output format example:
    Question 1?,Question 2?,Question 3?,...`

        const result = await model.generateContent(prompt)
        let questions = result.response.text().split(",")

        await questions_model.create({ skill: skill, questions: questions })
        res.json({ status: "Ok", questions })
    } catch (err) {
        console.log(err)
        res.json({ status: "Error", questions: [] })
    }
}

module.exports = {
    GetQuestions,
}