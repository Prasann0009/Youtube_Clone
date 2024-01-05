window.addEventListener("load",()=> 
{
    let videoId = "25T8Bj_WQbY";
    if(YT)
    {
        new YT.Player('video-container',{
            height: "500",
            width: "1000",
            videoId : videoId,
        });
    }
});