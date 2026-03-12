const API = "https://pro-premium-apk-01-project-hosting-1.onrender.com/api/apps"

async function loadApps(){

try{

const res = await fetch(API)

const apps = await res.json()

const container = document.getElementById("apps")

if(!apps.length){
container.innerHTML="<p>No apps uploaded yet</p>"
return
}

container.innerHTML=""

apps.reverse().forEach(app=>{

container.innerHTML += `
<div class="card">

<img src="${app.icon}">

<div class="info">

<h2>${app.name}</h2>

<p>${app.description}</p>

<div class="meta">

<span>${app.version}</span>
<span>${app.size}</span>

</div>

<a class="btn" href="${app.download}" target="_blank">Download</a>

</div>

</div>
`

})

}catch(e){

document.getElementById("apps").innerHTML="<p>Failed to load apps</p>"

}

}

loadApps()