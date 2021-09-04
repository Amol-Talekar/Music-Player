//Selecting all the querties we need for operations
const mainContainer=document.querySelector(".main-container")
const playButton=document.querySelector("#play")
const prevButton=document.querySelector("#prev")
const nextButton=document.querySelector("#next")
const audio=document.querySelector("#audio")
const title=document.querySelector("#title")
const progress=document.querySelector(".progress")
const progressContainer=document.querySelector(".progress-container")

//Making Array of Songs
const songs=["LutGaye","Pagal","Senorita"];
let songIndex=0;

//Function to rotate pick individual songs
function PickSong(song){
    title.innerText=song;
    //document.getElementById("title").innerHTML = title;
    audio.src=`songs/${song}.mp3`
}
PickSong(songs[songIndex])

function playSong(){
    mainContainer.classList.add("play");
    playButton.querySelector("i.fas").classList.remove("fa-play");
    playButton.querySelector("i.fas").classList.add("fa-pause")

    audio.play()
}

function pauseSong(){
    mainContainer.classList.remove("play");
    playButton.querySelector("i.fas").classList.remove("fa-pause")
    playButton.querySelector("i.fas").classList.add("fa-play");

    audio.pause()

}

function prevSong(){
    songIndex--
    if(songIndex<0)
    {
        songIndex=songs.length-1
    }
    PickSong(songs[songIndex]);
    playSong()
}

function nextSong(){
    songIndex++
    if(songIndex> songs.length-1)
    {
        songIndex=0
    }
    PickSong(songs[songIndex]);
    playSong()
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
nextButton.addEventListener("click", nextSong)