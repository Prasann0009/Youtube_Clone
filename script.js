var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");
let currentid = "";
menuIcon.onclick = function()
{
  sidebar.classList.toggle("small-sidebar");
  container.classList.toggle("large-container");
}

const API_KEY = "AIzaSyC08dTXZ8u4nGDkLLopBBuPvTEpiuEzrvY";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

async function fetchVideos(searchQuery, maxResults) {
   
  const response = await fetch(
    `${BASE_URL}/search?key=${API_KEY}&q=${searchQuery}&maxResults=${maxResults}&part=snippet`
  );
  const data = await response.json();
  console.log(data.items);
  rendervideo(data.items);
}
window.addEventListener("load",()=> 
{
  fetchVideos("/",20);
});
function navigateToVideoDetails(videoId) {
  // document.cookie = `id=${videoId}; path=/videoplayer.html`;
  currentid = videoId;
  window.location.href = "http://127.0.0.1:5500/videoplayer.html";
}

function rendervideo(videoarr)
{
   const listcontainer = document.querySelector(".list-container");
   listcontainer.innerHTML = "";

   videoarr.forEach((item)=>{
       const mdiv = document.createElement("div");
       mdiv.className = "vid-list";
       console.log(item.id.videoId);
       mdiv.id = item.id.videoId;
       mdiv.innerHTML = `<div class="vid-click" ><img src="${item.snippet.thumbnails.high.url}" class="thumbnail" alt="thumbnail"
     />
     <div class="flex-div">
       <img src="${item.channelLogo}" alt="Channel Logo" />
       <div class="vid-info">
           <p>${item.snippet.description}</p>
         </div></div></div>
         <div class="vid-info-1">
           <p>${item.snippet.channelTitle}</p>
           <p>15k Views .  ${item.snippet.publishTime}</p>
         </div>`;
         mdiv.addEventListener("click",(e)=>{
          e.preventDefault();
          navigateToVideoDetails(item.id.videoId);
       });
     listcontainer.appendChild(mdiv);
   });

}

document.getElementById("search-form").addEventListener("submit",(e)=>{
  e.preventDefault();
  const searchinput = document.getElementById("search_input").value;
  fetchVideos(searchinput, 20);
});



// async function getVideoStats(videoId){
   
//     const response = await fetch(`${BASE_URL}/videos?key=${API_KEY}&part=statistics&id=${videoId}`);
//     const data = await response.json();
//     console.log(data);
// }

// // viewCount

// async function getChannelLogo(channelId){
   
//     const response = await fetch(`${BASE_URL}/channels?key=${API_KEY}&part=snippet&id=${channelId}`);
//     const data = await response.json();
//     console.log(data);
// }

// // getChannelLogo("UCeVMnSShP_Iviwkknt83cww");

// async function getComments(videoId){
//     const response = await fetch(`${BASE_URL}/commentThreads?key=${API_KEY}&videoId=${videoId}&maxResults=25&part=snippet`);
//     const data = await response.json();
//     console.log(data);
// }

// getComments('Kwu1yIC-ssg');

