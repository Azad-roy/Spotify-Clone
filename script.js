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
            songs.push(element.href);
        }
    }
    return songs;
}

async function main(){
    // Get the list of all songs.

    let songs= await getSongs();
    // console.log(songs);

    // Play the first song
    var audio= new Audio(songs[0]);
    audio.play(); 
    console.log("Playing: ",audio) 
}
main();