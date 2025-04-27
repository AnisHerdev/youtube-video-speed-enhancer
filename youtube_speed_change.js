//main function that updates the speed of the video
var videoSpeed = window.videoSpeed || 1.0; // initial speed
var speedJump = window.speedJump || 0.25; // default speed increment

function setVideoSpeed(speed){
    // const video = document.querySelector('video');
    // video.playbackRate = speed;
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.playbackRate = speed;
    });
    console.log(`Video speed set to ${speed}`);
}

document.addEventListener('keydown', (event)=>{
    if(event.key === '+'){
        videoSpeed += speedJump;
        if (videoSpeed>10) {
            videoSpeed = 10; // max speed limit
        }
    } else if(event.key === '-'){
        videoSpeed -= speedJump;
        if (videoSpeed<0) {
            videoSpeed = 0; // min speed limit
        }
    }
    setVideoSpeed(videoSpeed);
})
