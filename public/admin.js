const API="https://pro-premium-apk-01-project-hosting-1.onrender.com/api/apps"

async function upload(){

const iconFile=document.getElementById("icon").files[0]

const reader=new FileReader()

reader.onload=async function(){

const data={

id:Date.now(),

name:name.value,

icon:reader.result,

version:version.value,

size:size.value,

rating:rating.value,

category:category.value,

description:desc.value,

download:download.value,

screenshots:[],

versions:[version.value]

}

await fetch(API,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

})

alert("Uploaded")

location.reload()

}

reader.readAsDataURL(iconFile)

}

async function load(){

const res=await fetch(API)

const apps=await res.json()

const list=document.getElementById("list")

apps.forEach(app=>{

list.innerHTML+=`

<div class="admin-card">

${app.name}

<button onclick="deleteApp(${app.id})">Delete</button>

</div>

`

})

}

async function deleteApp(id){

await fetch(API+"/"+id,{method:"DELETE"})

location.reload()

}

load()