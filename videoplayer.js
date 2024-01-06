window.addEventListener("load",()=> 
{
    let videoIds = currentid;
    console.log(videoIds);
    if(YT)
    {
        new YT.Player('video-container',{
            height: "500",
            width: "1000",
            videoId : videoIds,
        });
    }
});


