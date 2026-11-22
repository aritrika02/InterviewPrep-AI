
let { registration_model } = require("../model/connection")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const secret = process.env.JWT_SECRET;

async function LoginHandel(req, res) {
    try {
        let { Lemail, Lpassword } = req.body
        let data = await registration_model.findOne({ email: Lemail })
        if (data && await bcrypt.compare(Lpassword, data.password)) {
            let token = jwt.sign({ id: data._id, name: data.name, username: data.email }, secret, {
                expiresIn: "1d"
            })
            res.json({ status: "logged", token })
        } else {
            res.json({ status: "not logged" })
        }
    } catch (err) {
        console.log(err)
        res.json({ status: "not logged" })
    }
}

function validate(req, res) {
    res.json({ user: req.user, status: "Ok" })
}

module.exports = { LoginHandel, validate }