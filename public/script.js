const API="https://pro-premium-apk-01-project-hosting-1.onrender.com/api/apps"

let APPS=[]

async function loadApps(){

const res=await fetch(API)
const data=await res.json()

APPS=data

renderApps(data)
renderFeatured(data)

}

function renderApps(list){

const container=document.getElementById("apps")

container.innerHTML=""

list.forEach(app=>{

container.innerHTML+=`

<a href="app.html?id=${app.id}" class="card">

<img src="${app.icon}">

<div>

<h2>${app.name}</h2>

<p>${app.description}</p>

<div class="meta">

⭐ ${app.rating}
<span>${app.version}</span>
<span>${app.size}</span>

</div>

</div>

</a>

`

})

}

function searchApps(){

const text=document.getElementById("search").value.toLowerCase()

const filtered=APPS.filter(a=>a.name.toLowerCase().includes(text))

renderApps(filtered)

}

function filterCategory(cat){

if(cat==="all") return renderApps(APPS)

const filtered=APPS.filter(a=>a.category===cat)

renderApps(filtered)

}

function renderFeatured(apps){

const slider=document.getElementById("featured")

apps.slice(0,5).forEach(app=>{

slider.innerHTML+=`

<div class="slide">

<img src="${app.icon}">
<h3>${app.name}</h3>

</div>

`

})

}

loadApps()