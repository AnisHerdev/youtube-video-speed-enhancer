//main function that updates the speed of the video
var videoSpeed = 1.0; // initial speed
function setVideoSpeed(speed){
    const video = document.querySelector('video');
    video.playbackRate = speed;
    console.log(`Video speed set to ${speed}`);
}

document.addEventListener('keydown', (event)=>{
    if(event.key === '+'){
        if (videoSpeed<=10) {
            videoSpeed += 0.25;
        }
    } else if(event.key === '-'){
        if (videoSpeed>=0.25) {
            videoSpeed -= 0.25;
        }
    }
    setVideoSpeed(videoSpeed);
})