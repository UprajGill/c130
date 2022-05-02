song1status="";
song2status="";
song1="";
song2="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreright=0;
scoreleft=0;
function preload(){
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}
function setup(){
canvas=createCanvas(500,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotPoses);
}
function draw(){
image(video,0,0,500,500);
song1status=song1.isPlaying();
song2status=song2.isPlaying();
fill("#FF0000");
stroke("#FF0000");
if(scoreright>0.2){
circle(rightwristx,rightwristy,20);
song2.stop();
if(song1status==false){
song1.play();
document.getElementById("song").innerHTML="Playing Harry Potter Song";
}
}
if(scoreleft>0.2){
circle(leftwristx,leftwristy,20);
song1.stop();
if(song2status==false){
song2.play();
document.getElementById("song").innerHTML="Playing Peter Pan Song";
}
}
}
function modelLoaded(){
console.log("poseNet has been initialized");
}
function gotPoses(results){
if(results.length>0){
console.log(results);
scoreright=results[0].pose.keypoints[10].score;
scoreleft=results[0].pose.keypoints[10].score;
leftwristx=results[0].pose.leftWrist.x;
leftwristy=results[0].pose.leftWrist.y;
console.log("leftWristX="+leftwristx+"leftWristY="+leftwristy)
rightwristx=results[0].pose.rightWrist.x;
rightwristy=results[0].pose.rightWrist.y;
console.log("rightWristX="+rightwristx+"rightWristY="+rightwristy);
}
}    
function play(){
song.play();
song.setVolume(1);
song.rate(1);
}