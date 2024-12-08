async function getSongs(){
    let a = await fetch("http://127.0.0.1:5500/Songs/");
    let response= await a.text();
    let div= document.createElement("div");
    div.innerHTML=response;
    // console.log(div);
    let as=div.getElementsByTagName("a");
    // console.log(as);

    let songs=[];
    for(let index=0; index<as.length; index++){
        const element=as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/Songs/")[1]);
        }
    }
    return songs;
}

async function main(){
    // Get the list of all songs.

    let songs= await getSongs();
    console.log(songs);

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
                            </div>
        
        
        </li>`
    }


    // Play the first song
    var audio= new Audio(songs[0]);
    // audio.play(); 
    console.log("Playing: ",audio) 
}
main();