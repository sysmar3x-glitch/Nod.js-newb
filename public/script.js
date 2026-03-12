const API = "https://YOUR_RENDER_URL/api/apps"

async function loadApps(){

const res = await fetch(API)

const apps = await res.json()

const container = document.getElementById("apps")

container.innerHTML = ""

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

}

loadApps()