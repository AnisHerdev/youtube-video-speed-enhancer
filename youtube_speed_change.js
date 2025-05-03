//main function that updates the speed of the video
window.videoSpeed = 1.0; // initial speed
window.speedJump = 0.25; // default speed increment

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
        window.videoSpeed += window.speedJump;
        if (window.videoSpeed>10) {
            window.videoSpeed = 10; // max speed limit
        }
        setVideoSpeed(window.videoSpeed);
    } else if(event.key === '-'){
        window.videoSpeed -= window.speedJump;
        if (window.videoSpeed<0) {
            window.videoSpeed = 0; // min speed limit
        }
        setVideoSpeed(window.videoSpeed);
    }
})

