const API="https://pro-premium-apk-01-project-hosting-1.onrender.com/api/apps"

let APPS=[]

async function loadApps(){

try{

const res=await fetch(API)

const data=await res.json()

APPS=data

renderApps(APPS)

renderFeatured(APPS)

}catch(err){

console.error("Failed to load apps",err)

document.getElementById("apps").innerHTML="Failed to load apps"

}

}

function renderApps(list){

const container=document.getElementById("apps")

if(!container) return

container.innerHTML=""

if(list.length===0){

container.innerHTML="<p>No apps found</p>"

return

}

list.forEach(app=>{

container.innerHTML+=`

<div class="card">

<img src="${app.icon || 'logo.png'}">

<div>

<h2>${app.name || 'Unknown App'}</h2>

<p>${app.description || ''}</p>

<div class="meta">

⭐ ${app.rating || "4.5"} • ${app.version || "1.0"} • ${app.size || ""}

</div>

<a class="btn" href="app.html?id=${app.id}">View</a>

</div>

</div>

`

})

}

function searchApps(){

const text=document.getElementById("search").value.toLowerCase()

const filtered=APPS.filter(a=>

(a.name || "").toLowerCase().includes(text)

)

renderApps(filtered)

}

function filterCategory(cat){

if(cat==="all"){

renderApps(APPS)

return

}

const filtered=APPS.filter(a=>a.category===cat)

renderApps(filtered)

}

function renderFeatured(apps){

const slider=document.getElementById("featured")

if(!slider) return

slider.innerHTML=""

apps.slice(0,5).forEach(app=>{

slider.innerHTML+=`

<div class="slide">

<img src="${app.icon || 'logo.png'}">

<h4>${app.name || ''}</h4>

</div>

`

})

}

loadApps()