const express = require("express")
const cors = require("cors")
const fs = require("fs")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const DB = "apps.json"

function readApps(){
return JSON.parse(fs.readFileSync(DB))
}

function saveApps(data){
fs.writeFileSync(DB,JSON.stringify(data,null,2))
}

app.get("/api/apps",(req,res)=>{
res.json(readApps())
})

app.post("/api/apps",(req,res)=>{
const apps = readApps()

const newApp = {
id:Date.now(),
name:req.body.name,
icon:req.body.icon,
version:req.body.version,
size:req.body.size,
description:req.body.description,
download:req.body.download
}

apps.push(newApp)
saveApps(apps)

res.json({status:"ok"})
})

app.delete("/api/apps/:id",(req,res)=>{
let apps = readApps()

apps = apps.filter(a=>a.id != req.params.id)

saveApps(apps)

res.json({status:"deleted"})
})

app.listen(3000,()=>{
console.log("server running")
})