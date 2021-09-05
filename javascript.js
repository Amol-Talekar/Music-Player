//Selecting all the querties we need for operations
const mainContainer=document.querySelector(".main-container")
const playButton=document.querySelector("#play")
const prevButton=document.querySelector("#prev")
const nextButton=document.querySelector("#next")
const audio=document.querySelector("#audio")
const title=document.querySelector("#title")
const progress=document.querySelector(".progress")
const progressContainer=document.querySelector(".progress-container")


  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();



const canvasElement = document.getElementById("mainCanvas")
const canvasCtx = canvasElement.getContext('2d');
audio.crossOrigin = 'anonymous'
//const secondCanvas=document.getElementById("firstline")
//var ctx = secondCanvas.getContext("2d");
//canvasCtx.moveTo(50, 50);
//canvasCtx.lineTo(50, 590);
//canvasCtx.stroke();

//Giving Width and Height to canvas 
const WIDTH = canvasElement.clientWidth;
const HEIGHT = canvasElement.clientHeight;

//Giving Source as audio from all possible media element
const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();

//Giving fftsize to decide how many bars should appear in canvas
analyser.fftSize = 256;

source.connect(analyser);
analyser.connect(audioCtx.destination);


const bufferLength = analyser.frequencyBinCount;

//Creating an 8-bit unsigned integers array
const dataArray = new Uint8Array(bufferLength);

//Function to actually and repeatedly draw on canvas
function draw() {
    analyser.getByteFrequencyData(dataArray);
    canvasCtx.fillStyle = 'rgb(255,255,255)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for(let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2.8;
        canvasCtx.fillStyle = `rgb(135,206,235)`;
        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }

    requestAnimationFrame(draw);
}
draw();




//Making Array of Songs
const songs=["LutGaye","Pagal","Senorita"];
let songIndex=0;

//Function to rotate pick individual songs
function PickSong(song){
    title.innerText=song;
    //document.getElementById("title").innerHTML = title;
    audio.src=`https://raw.githubusercontent.com/Amol-Talekar/Music-Player/master/songs/${song}.mp3`
    
}
PickSong(songs[songIndex])

//Function that will play the music
function playSong(){
    mainContainer.classList.add("play");
    playButton.querySelector("i.fas").classList.remove("fa-play");
    playButton.querySelector("i.fas").classList.add("fa-pause")

   
    audio.play()
   
    
}

//Function that will pause the music
function pauseSong(){
    mainContainer.classList.remove("play");
    playButton.querySelector("i.fas").classList.remove("fa-pause")
    playButton.querySelector("i.fas").classList.add("fa-play");

    audio.pause()

}

//Function that will go to previous song
function prevSong(){
    songIndex--
    if(songIndex<0)
    {
        songIndex=songs.length-1
    }
    PickSong(songs[songIndex]);
    playSong()
}

//Function that will go to next sonf
function nextSong(){
    songIndex++
    if(songIndex> songs.length-1)
    {
        songIndex=0
    }
    PickSong(songs[songIndex]);
    playSong()
}

//Function that will show current progress of song
function ChangeProgress(e){
  const {currentTime, duration}=e.srcElement;
  const progressPercentage = (currentTime/duration)*100;
  progress.style.width= `${progressPercentage}%`
  //const {currentTime, duration}=e.srcElement;
  var minutes = Math.floor(duration / 60);
  var seconds = duration - minutes * 60;

  //var runMinutes=Math.floor(currentTime * 60);
  //var runSeconds = currentTime - minutes * 60;
if(typeof(minutes)!=="NaN"&&typeof(seconds)!=="NaN")
{
    document.getElementById("durationTime").textContent= `${minutes}:${seconds.toFixed(0)}`;
}

 //document.getElementById("runTime").textContent= `${runMinutes}:${runSeconds.toFixed(0)}`;

}

//Function that will allow to change the timing of song by clicking anywhere on canvas
function setProgress(e){
    const width= this.clientWidth;
    const duration =audio.duration;
    const ClickSpot = e.offsetX;

    audio.currentTime=(ClickSpot/(width))*duration
}

//All the event listeners
playButton.addEventListener("click",()=>{
    const isPlaying =mainContainer.classList.contains("play");
    if(isPlaying)
    {
        pauseSong()
    }
    else
    {
        playSong()
    }
})

prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", ChangeProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended",nextSong)
