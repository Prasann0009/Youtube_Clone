var menuIcon = document.querySelector(".menu-icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");
const listcontainer = document.querySelector(".list-container");


menuIcon.onclick = function()
{
  sidebar.classList.toggle("small-sidebar");
  container.classList.toggle("large-container");
}

let API_KEY = "AIzaSyBlAeOvlIx1qxy8lk4KT-jFWVU_5ntgejk";
let BASE_URL = "https://www.googleapis.com/youtube/v3";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

async function fetchVideos(maxResults) {
  let searchQuery;
 if(sessionStorage.getItem("searchinput"))
 {
  searchQuery=sessionStorage.getItem("searchinput");
 }
 else
 {
  searchQuery="mostpopular";
 }
  const response = await fetch(
    `${BASE_URL}/search?key=${API_KEY}&q=${searchQuery}&maxResults=${maxResults}&part=snippet`
  );
  const data = await response.json();
  // console.log(data);
  // rendervideo(data.items); 
  listcontainer.innerHTML = "";
 
      data.items.forEach((item)=>{
        console.log(item);
         getChannelIcon(item);
      })
  
}

window.addEventListener("load",()=> 
{
  listcontainer.innerHTML = `<h1 class="loader">Videos are loading.....</h1>`;
  fetchVideos(20);
});


document.getElementById("search-form").addEventListener("submit",(e)=>{
  e.preventDefault();
  if(sessionStorage.getItem("searchinput"))
  {
    sessionStorage.removeItem("searchinput");
  }
  const searchinput = document.getElementById("search_input").value;
  sessionStorage.setItem("searchinput",searchinput);
  fetchVideos(20);
});

const getChannelIcon = (video_data) => {
  fetch(
    channel_http + 
    new URLSearchParams({
      key: API_KEY,
      part: "snippet",
      id: video_data.snippet.channelId,
    })
  )
  .then((res) => res.json())
  .then((data) => {
    video_data.channelThunbnail = data.items[0].snippet.thumbnails.default.url;
    rendervideo(video_data);
  });
  
};

const playVideo = (vid) => {
  sessionStorage.setItem("videoId",vid);
  window.location.href = "videoplayer.html";
};


const rendervideo = (item) => {
  const mdiv = document.createElement("div");
         mdiv.className = "vid-list";
         mdiv.innerHTML = `<div class="vid-click" ><img src="${item.snippet.thumbnails.high.url}" class="thumbnail" alt="thumbnail"
       />
       <div class="flex-div">
         <img src="${item.channelThunbnail}" alt="Channel Logo" />
         <div class="vid-info">
             <p>${item.snippet.title}</p>
           </div></div></div>
           <div class="vid-info-1">
             <p>${item.snippet.channelTitle}</p>
           
           </div>`;
           mdiv.addEventListener("click",()=>{
              console.log(item.id.videoId);
                      playVideo(item.id.videoId);
                });
           listcontainer.appendChild(mdiv);
};

