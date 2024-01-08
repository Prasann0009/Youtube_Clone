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






// function navigateToVideoDetails(videoId) {
//   // document.cookie = `id=${videoId}; path=/videoplayer.html`;
//   currentid = videoId;
//   window.location.href = "http://127.0.0.1:5500/videoplayer.html";
// }

// function rendervideo(videoarr)
// {
//   //  const listcontainer = document.querySelector(".list-container");
//    listcontainer.innerHTML = "";

//    videoarr.forEach((item)=>{
//        const mdiv = document.createElement("div");
//        mdiv.className = "vid-list";
//        console.log(item.id.videoId);
//        mdiv.id = item.id.videoId;
//        mdiv.innerHTML = `<div class="vid-click" ><img src="${item.snippet.thumbnails.high.url}" class="thumbnail" alt="thumbnail"
//      />
//      <div class="flex-div">
//        <img src="${item.channelLogo}" alt="Channel Logo" />
//        <div class="vid-info">
//            <p>${item.snippet.description}</p>
//          </div></div></div>
//          <div class="vid-info-1">
//            <p>${item.snippet.channelTitle}</p>
//            <p>15k Views .  ${item.snippet.publishTime}</p>
//          </div>`;
//          mdiv.addEventListener("click",(e)=>{
//           e.preventDefault();
//           navigateToVideoDetails(item.id.videoId);
//        });
//      listcontainer.appendChild(mdiv);
//    });

// }

// function fetchVideos(searchQuery,maxR){
//     fetch(
//     video_http + new URLSearchParams({
//       part : "snippet,contentDetails,statistics,player", 
//       q: searchQuery,   
//       chart : "mostPopular",
//       maxResults : maxR,
//       regionCode : "IN",
//       key : API_KEY,
//     })
// )
// .then((res) => res.json())
// .then((data)=>{
//   listcontainer.innerHTML = "";
//   data.items.forEach((item)=>{
//     console.log(item);
//      getChannelIcon(item);
//   })
// })
// .catch((err) => console.log(err));
// }

//   fetch(
//     video_http + new URLSearchParams({
//       part : "snippet, contentDetails,statistics,player",
//       q : 
//       chart : "mostPopular",
//       maxResults : 20,
//       regionCode : "IN",
//       key : API_KEY,
//     })
// )
// .then((res) => res.json())
// .then((data)=>{
//   data.items.forEach((item)=>{
//     console.log(item);
//      getChannelIcon(item);
//   })
// })
// .catch((err) => console.log(err));

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

