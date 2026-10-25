// 
let { registration_model } = require("../model/connection")
const multer = require("multer")
const PdfParser = require("pdf-parse")
const { GoogleGenerativeAI } = require("@google/generative-ai")

// reading the pdf directly from memory
const storage_configuration = multer.memoryStorage()
const upload = multer({ storage: storage_configuration })

async function GenerateQuestions(req, res) {
    try {
        if (!req.file) {
            return res.json({ status: "Ok", message: "Failed" })
        }
        let data = (await PdfParser(req.file.buffer)).text

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

        let prompt = `You are an expert resume parser. I will provide a resume text.
    Extract **only the technical skills** mentioned in the resume, including:
    - Programming languages
    - Frameworks and libraries
    - Databases
    - Cloud & DevOps
    - Tools and platforms
    - AI / Machine Learning
    Do **not** include soft skills, achievements, hobbies, or any non-technical items.
    Rules (follow strictly):
    1. Use **standardized skill names**. Examples:
    - "JS" → "JavaScript"
    - "NodeJS" → "Node.js"
    - "PyTorch Lightning" → "PyTorch"
    - "Tensor Flow" → "TensorFlow"
    2. If a skill has multiple words, **replace spaces with hyphens**. Example: "Data Structures & Algorithms" → "Data-Structures-&-Algorithms"
    3. Include **only skills actually mentioned** in the resume.
    4. Remove duplicates.
    5. **Output only a plain text list of technical skills separated by single spaces**.
    6. **Do not output JSON, commas, bullets, categories, or any extra text**.
    7. Start with the first skill and end with the last skill — nothing else.

    Resume Text:\n` + data

        const result = await model.generateContent(prompt)
        let skills = result.response.text().trim().split(/\s+/)

        let company = req.body.company
        let role = req.body.role

        await registration_model.updateOne(
            { _id: req.user.id },
            { $set: { skills: skills, company: company, role: role } }
        )
        res.json({ status: "Ok", message: "sucess" })
    } catch (err) {
        console.log(err)
        res.json({ status: "Ok", message: "Failed" })
    }
}

module.exports = {
    GenerateQuestions,
    upload,
}