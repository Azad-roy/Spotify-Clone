let currentSong= new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder){
    currFolder=folder;

    let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
    let response= await a.text();
    let div= document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");

    let songs=[];
    for(let index=0; index<as.length; index++){
        const element=as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }
    return songs;
}

const playMusic= (track,pause=false) =>{
    // let audio= new Audio(/Songs/ + track);
    currentSong.src=(`/${currFolder}/` + track) 
    if(!pause){
        currentSong.play();
        play.src="/img/pause.svg";
    }


    document.querySelector(".songInfo").innerHTML= decodeURI(track);
    document.querySelector(".songTime").innerHTML= "00:00 / 00:00";
}

async function main(){
    // Get the list of all songs.
    songs= await getSongs("Songs/Fav");
    
    playMusic(songs[0], true);

    // Show all the songs in the playlist
    let songUl=document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUl.innerHTML=songUl.innerHTML+ `<li> <img class="invert" src="/img/music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>Azad</div>
                            </div>
                            <div class="playNow">
                                <span>Play Now</span>
                                <img class="invert" src="/img/play.svg" alt="">
                            </div> </li>`
    }

    // Attach an event listener in each song;
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.querySelector("div").firstElementChild.innerHTML);
            playMusic(e.querySelector("div").firstElementChild.innerHTML.trim());
        })
    })

    // Attach an event listener to play, next and previous
    play.addEventListener("click", ()=> {
        if(currentSong.paused){
            currentSong.play();
            play.src="/img/pause.svg";
        }else{
            currentSong.pause();
            play.src="/img/play.svg";
        } 
    })

    // Listen for time update event
    currentSong.addEventListener("timeupdate", ()=>{
        document.querySelector(".songTime").innerHTML=`${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;

        document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%";
    })

    // Add an event listener to seekbar
    document.querySelector(".seekBar").addEventListener("click", e=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width )*100;

        document.querySelector(".circle").style.left=percent + "%"; 

        currentSong.currentTime= (currentSong.duration*percent)/100;
    })

    // add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left="0";
    })


    // add an event listener for close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    // Add an event listener for previous
    previous.addEventListener("click", ()=>{

        let index=songs.indexOf(currentSong.src.split("/").slice(-1) [0]);

        if((index-1)>= 0){
            playMusic(songs[index-1]);
        }
    })

    // Add an event listener for next
    next.addEventListener("click", () => {
        currentSong.pause();
        let index=songs.indexOf(currentSong.src.split("/").slice(-1) [0]); 

        // playMusic(songs[index+1]);

        if((index+1)<songs.length){
            playMusic(songs[index+1]);
        }
    })

    // Add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener('change',(e)=>{
        // console.log(e, e.target, e.target.value)

        console.log("Setting volume to",e.target.value,"/100")

        currentSong.volume=parseInt(e.target.value)/100;

        // Load the card whenever the click
         
    })
} 
main();
