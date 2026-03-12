const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())

const DB = "apps.json"

function readApps(){

try{

return JSON.parse(fs.readFileSync(DB))

}catch{

return []

}

}

function saveApps(data){

fs.writeFileSync(DB, JSON.stringify(data,null,2))

}

/* GET APPS */

app.get("/api/apps",(req,res)=>{

res.json(readApps())

})

/* ADD APP */

app.post("/api/apps",(req,res)=>{

const apps = readApps()

const newApp = {

id: Date.now(),

name: req.body.name,

icon: req.body.icon,

version: req.body.version,

size: req.body.size,

description: req.body.description,

download: req.body.download,

rating: req.body.rating || "4.5",

category: req.body.category || "apps",

screenshots: req.body.screenshots || [],

versions: req.body.versions || [req.body.version]

}

apps.push(newApp)

saveApps(apps)

res.json({status:"saved"})

})

/* DELETE APP */

app.delete("/api/apps/:id",(req,res)=>{

let apps = readApps()

apps = apps.filter(a => a.id != req.params.id)

saveApps(apps)

res.json({status:"deleted"})

})

/* EDIT APP */

app.put("/api/apps/:id",(req,res)=>{

let apps = readApps()

apps = apps.map(a => {

if(a.id == req.params.id){

return {...a,...req.body}

}

return a

})

saveApps(apps)

res.json({status:"updated"})

})

/* SERVE FRONTEND */

app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{

res.send("Backend running ✔")

})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

console.log("Server running on port "+PORT)

})