var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");

menuIcon.onclick = function()
{
  sidebar.classList.toggle("small-sidebar");
  container.classList.toggle("large-container");
}

const API_KEY = "AIzaSyBlAeOvlIx1qxy8lk4KT-jFWVU_5ntgejk";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

async function fetchVideos(searchQuery, maxResults) {
   
  const response = await fetch(
    `${BASE_URL}/search?key=${API_KEY}&q=${searchQuery}&maxResults=${maxResults}&part=snippet`
  );
  const data = await response.json();
  console.log(data.items);
  rendervideo(data.items);
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
       mdiv.innerHTML = `<div class="vid-click" ><img src="images/thumbnail1.png" class="thumbnail" alt=""
     />
     <div class="flex-div">
       <img src="images/Jack.png" alt="" />
       <div class="vid-info">
           <p>Best channel to learn coding that help you to be a web
               developer</p>
         </div></div></div>
         <div class="vid-info-1">
           <p>Easy Tutorials</p>
           <p>15k Views &bull; 2 days</p>
         </div>`;
         mdiv.addEventListener("click",(e)=>{
          e.preventDefault();
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

