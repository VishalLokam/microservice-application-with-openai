const express = require("express")
const app = express();
const mongoose  = require("mongoose")
const PORT = process.env.PORT_ONE || 7070
const User = require("./User")
const jwt = require("jsonwebtoken")
require('dotenv').config()

app.use(express.json())

mongoose.connect(`${process.env.CONNECTION_STRING}auth-service?retryWrites=true&w=majority`).then(
    () => { console.log("Auth-Service DB connected")},
    err => { handleError(err)  }
)

app.get("/auth/health", async(req, res) => {
    return res.send("<h1>Auth service OK</h1>").status(200)
})

app.post("/auth/register", async (req, res) => {
    const { email, password, name } = req.body
    
    const userExists = await User.findOne({ email })

    if(userExists){
        return res.json ( {message: "User already exists"} )
    } else {
        const newUser = new User({
            name,
            email,
            password
        })
        newUser.save()
        return res.json(newUser)
    }
})


app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if(!user){
        return res.json({message: "User does not exist"})
    } else {

        if(password != user.password){
            return res.json({message: "Password Incorrect"})
        }

        const payload = {
            email,
            name: user.name
        }
        jwt.sign(payload, "secret", (err,token) => {
            if(err) console.log(err)
            else{
                return res.json({token: token})
            }
        })
    }
})



app.listen(PORT, () => {
    console.log(`Auth-service at ${PORT}`)
})