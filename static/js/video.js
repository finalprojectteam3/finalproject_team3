let canvas =document.querySelector("#canvas")
let context=canvas.getContext("2d");
let video=document.querySelector("#videoElement");


 if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
        //play video
        video.play();
    });
 }

document.getElementById("snap").addEventListener("click", () =>{
    context.drawImage(video,0,0,640,480);
});
