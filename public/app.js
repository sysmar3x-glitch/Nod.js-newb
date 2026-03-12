const API="https://pro-premium-apk-01-project-hosting-1.onrender.com/api/apps"

const params=new URLSearchParams(location.search)

const id=params.get("id")

async function load(){

const res=await fetch(API)

const apps=await res.json()

const app=apps.find(a=>a.id==id)

const container=document.getElementById("app")

container.innerHTML=`

<h1>${app.name}</h1>

<img src="${app.icon}" class="icon">

<p>${app.description}</p>

⭐ Rating: ${app.rating}

<h3>Screenshots</h3>

<div class="screens">

${app.screenshots.map(s=>`<img src="${s}">`).join("")}

</div>

<h3>Version History</h3>

<ul>

${app.versions.map(v=>`<li>${v}</li>`).join("")}

</ul>

<a href="${app.download}" class="download">Download</a>

`

}

load()