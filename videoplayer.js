const API_KEY = "AIzaSyAc2yIESuszzAW6WO_YrNbPPjewtlFWkJ8";
const BASE_URL = "https://www.googleapis.com/youtube/v3";
const video_http = "https://www.googleapis.com/youtube/v3/videos?";
const channel_http = "https://www.googleapis.com/youtube/v3/channels?";
const comment_url = "https://www.googleapis.com/youtube/v3/commentThreads";

let video_id = sessionStorage.getItem("videoId");
let channelid = sessionStorage.getItem("channelid");
let searchquery = sessionStorage.getItem("searchinput");
const right_sidebar = document.querySelector(".right-sidebar");
const vid_description=document.querySelector(".vid-description");

console.log(video_id);
console.log(searchquery);
window.addEventListener("load",()=> 
{
    if(YT)
    {
        new YT.Player('video-container',{
            height: "500",
            width: "1000",
            videoId : video_id,
        });
        loadComments(video_id);
    }
});




async function loadComments(videoId) {
  
  let endpoint = `${comment_url}?key=${API_KEY}&videoId=${videoId}&maxResults=30&part=snippet`;

  const response = await fetch(endpoint);
  const result = await response.json();
  console.log(result);
  result.items.forEach((item) => {
    const repliesCount = item.snippet.totalReplyCount;
    const {
      authorDisplayName,
      textDisplay,
      likeCount,
      authorProfileImageUrl: profileUrl,
      publishedAt,
    } = item.snippet.topLevelComment.snippet;

    const div = document.createElement("div");
    div.className = "old-comment";
    div.innerHTML = `<img src="${profileUrl}" alt="">
    <div>
        <h3>${authorDisplayName} <span>2 days ago</span></h3>
        <p>${textDisplay}</p>
        <div class="acomment-action">
            <img src="images/like.png">
            <span>244</span>
            <img src="images/dislike.png" >
            <span>2</span>
            <span>REPLY</span>
            <a href="">All replies</a>
        </div>
    </div>`;

    vid_description.appendChild(div);
  });
}

                        
                   
                    

async function fetchVideos1(maxResults) {
 
  const response = await fetch(
    `${BASE_URL}/search?key=${API_KEY}&q=${searchquery}&maxResults=${maxResults}&part=snippet`
  );
  const data = await response.json();
  // console.log(data);
  // rendervideo(data.items); 
  right_sidebar.innerHTML = "";
 
      data.items.forEach((item)=>{
        // console.log(item);
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


  // const getVideoChannelIcon = (channelid) => {
  //   fetch(
  //     channel_http + 
  //     new URLSearchParams({
  //       key: API_KEY,
  //       part: "snippet",
  //       id: channelid,
  //     })
  //   )
  //   .then((res) => res.json())
  //   .then((data) => {
  //       console.log(data);
  //        const channel_details = document.querySelector(".channel_details");
  //        channel_details.innerHTML = `<h3>${data.snippet.title}</h3>
  //        <div class="play-video-info">
  //            <p>1225 Views &bull; 2 days ago</p>
  //            <div>
  //                <a href=""><img src="images/like.png" alt="">125</a>
  //                <a href=""><img src="images/dislike.png" alt="">2</a>
  //                <a href=""><img src="images/share.png" alt="">Share</a>
  //                <a href=""><img src="images/save.png" alt="">Save</a>
                 
  //            </div>
  //        </div>
  //        <hr>
  //        <div class="publisher">
  //            <img src="${data.channelThunbnail}" alt="">
  //            <div>
  //                <p>${data.snippet.channelTitle}</p>
  //                <span>500k Subscribers</span>
  //            </div>
  //            <button type="button">Subscribe</button>
  //        </div>`;
  //   });
    
  // };

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

