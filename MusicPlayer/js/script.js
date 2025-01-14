console.log("Welcome to JavaScript");
async function getSongs(folder) {
  currFolder = folder;
  let a = await fetch(`/${folder}/`);
  let response = await a.text();
  // console.log(response) //This response is not in the html so we cannot apply DOM methods
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  console.log(as);
  songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1]);
      // Spongs.push(element.href.split("/songs/")[1])
    }
  }

  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  songUL.innerHTML = "";
  // console.log("list:",songUL)
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li>
        
        
        <img src="img/music.svg" alt="">
        <div class="info">
            <div>${song.replaceAll("%20", " ").replaceAll("%5", " ")}</div>
            <div>Abhijith</div>
        </div>
        <img src="img/play.svg" alt="">
    
        
        
        </li>`;
  }
  return songs;
}

async function displayAlbums() {
  let a = await fetch(`/songs/`);
  let response = await a.text();
  let cardContainer = document.querySelector(".cardContainer");
  // console.log(response) //This response is not in the html so we cannot apply DOM methods
  let div = document.createElement("div");
  div.innerHTML = response;
  let anchors = div.getElementsByTagName("a");
  let array = Array.from(anchors);
  for (let index = 0; index < array.length; index++) {
    const e = array[index];

    if (e.href.includes("/songs/")) {
      console.log(e.href);
      folder = e.href.split("/").slice(-2)[1];

      let a = await fetch(`/songs/${folder}/info.json`);
      let response = await a.json();
      cardContainer.innerHTML =
        cardContainer.innerHTML +
        ` <div data-folder="${folder}" class="card">
            <div class="play">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none">
            <path
            d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
            fill="white" />
            </svg>
            </div>
            
            <img src="/songs/${folder}/cover.jpg" alt="">
            <h3>${response.title}</h3>
            <p>${response.description}</p>
            </div>`;
      // console.log("The Json Folder have:",response)
    }
    Array.from(document.getElementsByClassName("card")).forEach((e) => {
      e.addEventListener("click", async (item) => {
        songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
        playMusic(songs[0]);
        // console.log(`songs/${item.currentTarget.dataset.folder}`)
        updateSongList();
        console.log(e);
      });
    });
  }
}

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

function updateSongList() {
  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  songUL.innerHTML = "";
  for (const song of songs) {
    songUL.innerHTML += `<li>
            <img src="img/music.svg" alt="">
            <div class="info">
                <div>${song.replaceAll("%20", " ").replaceAll("%5", " ")}</div>
                <div>Abhijith</div>
            </div>
            <img src="img/play.svg" alt="">
        </li>`;
  }

  // Reattach event listeners for play buttons
  let playButtons = document.querySelectorAll(
    ".songList ul li img[src='img/play.svg']"
  );
  playButtons.forEach((playButton, index) => {
    playButton.addEventListener("click", () => {
      playMusic(songs[index]);
    });
  });
}

// Example usage:

// Example usage:

let currentSong = new Audio();
let songs;
let currFolder;
const playMusic = (track, pause) => {
  // let audio = new Audio("/songs/"+track)
  currentSong.src = `/${currFolder}/` + track;
  if (!pause) {
    currentSong.play();
    play.src = "img/pause.svg";
  }

  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00/00:00";
};
async function main() {
  await getSongs(`songs/cs`);
  // let songs1= await getSongs()
  playMusic(songs[0], true);
  console.log(songs);
  displayAlbums();
  let playButtons = document.querySelectorAll(
    ".songList ul li img[src='img/play.svg']"
  );
  playButtons.forEach((playButton, index) => {
    playButton.addEventListener("click", () => {
      playMusic(songs[index]);
    });
  });
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "img/pause.svg";
    } else {
      currentSong.pause();
      play.src = "img/play.svg";
    }
  });
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(
      currentSong.currentTime
    )}/${secondsToMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });
  document.querySelector(".humburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-140%";
  });

  document.getElementById("next").addEventListener("click", () => {
    console.log("Next Clicked");
    console.log("You have clicked the next element songs");
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    console.log(index);
    if (index + 1 <= songs.length - 1) {
      playMusic(songs[index + 1]);
    }
  });
  document.getElementById("prev").addEventListener("click", () => {
    console.log("Next Clicked");
    console.log("You have clicked the next element songs");
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    console.log(index);
    if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
  });
  document
    .querySelector(".volume")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      console.log(e);
      currentSong.volume = parseInt(e.target.value) / 100;
    });

  document.querySelector(".volume>img").addEventListener("click", (e) => {
    if (e.target.src.includes("img/volume.svg")) {
      e.target.src = e.target.src.replace("img/volume.svg", "img/mute.svg");
      currentSong.volume = 0;
      document
        .querySelector(".range")
        .getElementsByTagName("input")[0].value = 0;
    } else {
      e.target.src = e.target.src.replace("img/mute.svg", "img/volume.svg");
      currentSong.volume = 0.1;
      document
        .querySelector(".range")
        .getElementsByTagName("input")[0].value = 10;
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault(); // Prevent default behavior of spacebar (e.g., scrolling the page)
    if (currentSong.paused) {
      currentSong.play();
      play.src = "img/pause.svg";
    } else {
      currentSong.pause();
      play.src = "img/play.svg";
    }
  }
});

main();
