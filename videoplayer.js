let video_id = sessionStorage.getItem("videoId");
let searchquery = sessionStorage.getItem("searchinput");
const right_sidebar = document.querySelector(".right-sidebar");

console.log(video_id);
window.addEventListener("load",()=> 
{
    if(YT)
    {
        new YT.Player('video-container',{
            height: "500",
            width: "1000",
            videoId : video_id,
        });
    }
});

let API_KEY = "AIzaSyC08dTXZ8u4nGDkLLopBBuPvTEpiuEzrvY";
let BASE_URL = "https://www.googleapis.com/youtube/v3";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

async function fetchVideos1(maxResults) {
 
  const response = await fetch(
    `${BASE_URL}/search?key=${API_KEY}&q=${searchquery}&maxResults=${maxResults}&part=snippet`
  );
  const data = await response.json();
  // console.log(data);
  // rendervideo(data.items); 
  right_sidebar.innerHTML = "";
 
      data.items.forEach((item)=>{
        console.log(item);
         getChannelIcon1(item);
      })
  
}

window.addEventListener("load",()=> 
{
  fetchVideos1(20);
});

const getChannelIcon1 = (video_data) => {
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
      rendervideo1(video_data);
    });
    
  };

  const playVideo1 = (vid) => {
    sessionStorage.setItem("videoId",vid);
    window.location.href = "videoplayer.html";
  };
  
  
  const rendervideo1 = (item) => {
    const mdiv = document.createElement("div");
           mdiv.className = "side-video-list";
           mdiv.innerHTML = `<a href="" class="small-thumbnail"><img src="${item.snippet.thumbnails.high.url}"></a>
           <div class="vid-info">
               <a href="">${item.snippet.title}</a>
               <p>${item.snippet.channelTitle}</p>
               <p>15k Views</p>
           </div>`;
             mdiv.addEventListener("click",()=>{
                        playVideo1(item.id.videoId);
                  });
                  right_sidebar.appendChild(mdiv);
  };

// const embedHtml = sessionStorage.getItem("videoEmbedHtml");

// if(embedHtml)
// {
//     const playerContainer = document.createElement("div");
//     playerContainer.className = "player";
//     playerContainer.innerHTML = embedHtml;
//     document.getElementById("video-container").appendChild(playerContainer);
// }
// else
// {
//     alert("Video not found");
// }

