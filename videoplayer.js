// window.addEventListener("load",()=> 
// {
//     let videoIds = currentid;
//     console.log(videoIds);
//     if(YT)
//     {
//         new YT.Player('video-container',{
//             height: "500",
//             width: "1000",
//             videoId : videoIds,
//         });
//     }
// });

const embedHtml = sessionStorage.getItem("videoEmbedHtml");

if(embedHtml)
{
    const playerContainer = document.createElement("div");
    playerContainer.className = "player";
    playerContainer.innerHTML = embedHtml;
    document.getElementById("video-container").appendChild(playerContainer);
}
else
{
    alert("Video not found");
}

