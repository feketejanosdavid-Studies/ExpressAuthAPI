const express= require("express")
const usersRouter =require("./routers/users")
const bodyParser = require("body-parser")
const cors = require("cors")
const fs = require("fs")
const https = require("https")
const cookieParser = require("cookie-parser")

const app = express()

const options = {
    passphrase:"alma",
    pfx: fs.readFileSync("./localhost.pfx")
}

app.use(cors({origin:["http://localhost:4200", "https://localhost:4200"],
    credentials: true
}))

app.use(bodyParser.json())

app.use(cookieParser())

app.use("/users", usersRouter)

app.get("/", (req,res)=>{
    res.json({message:"Ok"})
})


app.use((err, req, res, next)=>{
    console.log(err.message, err.stack)
    res.status(err.statusCode||500).json({message:err.message})
    return
})

https.createServer(options, app).listen(3000, () => console.log("A server fut a 3000-es porton!"));