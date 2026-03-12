const API="https://pro-premium-apk-01-project-hosting-1.onrender.com/api/apps"

const params=new URLSearchParams(location.search)

const id=params.get("id")

async function load(){

const res=await fetch(API)

const apps=await res.json()

const app=apps.find(a=>a.id==id)

const container=document.getElementById("app")

container.innerHTML=`

<div style="padding:30px">

<h1>${app.name}</h1>

<img src="${app.icon}" style="width:120px;border-radius:20px">

<p>${app.description}</p>

<p>⭐ ${app.rating}</p>

<p>${app.version} • ${app.size}</p>

<a class="btn" href="${app.download}">Download</a>

</div>

`

}

load()