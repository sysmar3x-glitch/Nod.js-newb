const API = "https://pro-premium-apk-01-project-hosting-1.onrender.com/api/apps";

async function loadApps(){

const container = document.getElementById("apps");

container.innerHTML = "Loading apps...";

try{

const res = await fetch(API,{
method:"GET",
headers:{
"Content-Type":"application/json"
}
});

const apps = await res.json();

if(!apps || apps.length === 0){
container.innerHTML = "<p>No apps uploaded yet</p>";
return;
}

container.innerHTML = "";

apps.reverse().forEach(app => {

container.innerHTML += `
<div class="card">

<img src="${app.icon}" alt="icon">

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
`;

});

}catch(err){

console.error(err);

container.innerHTML = "<p>Failed to load apps</p>";

}

}

document.addEventListener("DOMContentLoaded", loadApps);