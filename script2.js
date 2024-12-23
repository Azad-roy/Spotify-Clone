let currentSong = new Audio();
let songs;

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

songs = [
    "/Songs/Hass_hass__diljit.mp3",
    "/Songs/Cheques_Bhojpuri_Song.mp3",
    "/Songs/Haye_Mera_DIl.mp3",
    "/Songs/Tere_Liye.mp3",
];

const playMusic = (track, pause = false) => {
    currentSong.src = track; // Updated to use the full URL directly
    if (!pause) {
        currentSong.play();
        play.src = "/img/pause.svg";
    }

    document.querySelector(".songInfo").innerHTML = decodeURI(track.split("/").slice(-1)[0]);
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
};

async function main() {
    playMusic(songs[0], true);

    // Show all the songs in the playlist
    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li> <img class="invert" src="/img/music.svg" alt="">
                            <div class="info">
                                <div>${song.split("/").slice(-1)[0].replaceAll("%20", " ")}</div>
                                <div>Azad</div>
                            </div>
                            <div class="playNow">
                                <span>Play Now</span>
                                <img class="invert" src="/img/play.svg" alt="">
                            </div> </li>`;
    }

    // Attach an event listener in each song;
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector("div").firstElementChild.innerHTML.trim());
        });
    });

    // Attach an event listener to play, next, and previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "/img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "/img/play.svg";
        }
    });

    // Listen for time update event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Add an event listener to seekbar
    document.querySelector(".seekBar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    // Add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    // Add an event listener for close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    // Add an event listener for previous
    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src); // Use the full URL for indexing
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]);
        }
    });

    // Add an event listener for next
    next.addEventListener("click", () => {
        currentSong.pause();
        let index = songs.indexOf(currentSong.src); // Use the full URL for indexing
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]);
        }
    });
}

main();
