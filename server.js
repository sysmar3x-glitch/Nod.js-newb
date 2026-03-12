const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const DB = "apps.json";

/* read apps */
function readApps(){
return JSON.parse(fs.readFileSync(DB));
}

/* save apps */
function saveApps(data){
fs.writeFileSync(DB, JSON.stringify(data,null,2));
}

/* API to get apps */
app.get("/api/apps",(req,res)=>{
res.json(readApps());
});

/* API to add app */
app.post("/api/apps",(req,res)=>{

const apps = readApps();

const newApp = {
id: Date.now(),
name: req.body.name,
icon: req.body.icon,
version: req.body.version,
size: req.body.size,
description: req.body.description,
download: req.body.download
};

apps.push(newApp);

saveApps(apps);

res.json({status:"saved"});
});

/* serve public folder */
app.use(express.static(path.join(__dirname,"public")));

/* homepage */
app.get("/",(req,res)=>{
res.send("Backend running ✔");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
console.log("Server running on port "+PORT);
});