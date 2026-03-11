const express = require("express")
const cors = require("cors")
const fs = require("fs")

const app = express()

app.use(cors())   // IMPORTANT

app.use(express.json())
app.use(express.static("public"))

const DB_FILE="apps.json"

if(!fs.existsSync(DB_FILE)){
fs.writeFileSync(DB_FILE,"[]")
}

app.get("/api/apps",(req,res)=>{
const apps = JSON.parse(fs.readFileSync(DB_FILE))
res.json(apps)
})

app.post("/api/apps",(req,res)=>{

const apps = JSON.parse(fs.readFileSync(DB_FILE))

const newApp={
id:Date.now(),
name:req.body.name,
icon:req.body.icon,
description:req.body.description,
download:req.body.download
}

apps.unshift(newApp)

fs.writeFileSync(DB_FILE,JSON.stringify(apps,null,2))

res.json({status:"saved"})

})

const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{

console.log("Server running")

})