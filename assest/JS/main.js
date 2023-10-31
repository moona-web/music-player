const shuflleBtn = document.getElementsByClassName('shuflle')[0]
const nextBtn = document.getElementsByClassName('next')[0]
const prevBtn = document.getElementsByClassName('prev')[0]
const repeatBtn = document.getElementsByClassName('repeat')[0]
const songName = document.getElementsByClassName('song-name')[0]
const singer = document.getElementsByClassName('singer')[0]
const imgSong = document.getElementsByClassName('imgSong')[0]

const maxDuration = document.getElementsByClassName('all-duration')[0]

const playSongBtn = document.getElementsByClassName('playSong')[0]
const pouseSongBtn = document.getElementsByClassName('pouseSong')[0]
const progressBarBtn = document.getElementsByClassName('progress-bar')[0]
const currentProgresBar = document.getElementsByClassName('current-progres')[0]

const spendBtn = document.getElementsByClassName('spend')[0]
const playListBtn = document.getElementsByClassName('playListBtn')[0]
const playList = document.getElementsByClassName('playList')[0]
const closePlayList = document.getElementsByClassName('close-play-list')[0]

const audioBtn = document.getElementById('audio')

// index for songs
let index = 0

let loop = true;

const songsList = [
    {
        name: 'My Heart Will Go On',
        link: 'assest/Songs/sound1.mp3',
        artist: 'Celine Dion',
        img: 'assest/IMG/1.JPG',
        id: 0
    },
    {
        name: 'Heartbreak Hotel',
        link: 'assest/Songs/sound2.mp3',
        artist: 'Elvis Presley',
        img: 'assest/IMG/2.JPG',
        id: 1
    },
    {
        name: 'Be Doctor dawaw darman',
        link: 'assest/Songs/sound3.mp3',
        artist: 'Hassan Zirak & Turkish woman',
        img: 'assest/IMG/3.JPG',
        id: 2
    },
    {
        name: 'Ebrahim',
        link: 'assest/Songs/sound4.mp3',
        artist: 'Mohsen Chavoshi',
        img: 'assest/IMG/4.JPG',
        id: 3
    }
   
]

let events = {
    mouse: {
        click: 'click'
    },
    touch: {
        click: 'touchstart'
    }
}

let deviceType = ''

// Detect touch device

const isTouchDevice = () => {
    try {
        // creat touchEvent(it would fail for desktop and trhow error)
        document.createEvent('TouchEvent')
        deviceType = 'touch'
        return true
    }
    catch (e) {

        deviceType = 'mouse'
        return false
    }
}

// console.log(isTouchDevice())


// Format time(convert ms to second and mins, and add 0 to less than 10!)

const timeformatter = (timeInp) => {
    let hour = Math.floor(timeInp / 3600)
    let mins = Math.floor((timeInp - (hour * 3600)) / 60)
    let sec = Math.floor(timeInp - (hour * 3600) - (mins * 60))
    var formattedTime = ''

    formattedTime += hour > 0 ? hour + ':' : ''

    formattedTime += mins < 10 ? "0" + mins + ':' : mins + ':'

    formattedTime += sec < 10 ? '0' + sec : sec
    return formattedTime
}

const setSong = (arrayIndex) => {
    let { name, link, artist, img } = songsList[arrayIndex]
    audioBtn.src = link
    songName.innerHTML = name
    singer.innerHTML = artist
    imgSong.src = img

    audioBtn.onloadedmetadata = () => {
        maxDuration.innerHTML = timeformatter(audioBtn.duration)
    }

}

// playSong

const playSong = audios => {
    audios = audioBtn
    audios.play()
    playSongBtn.className = 'hidden'
    pouseSongBtn.classList.remove('hidden')
    pouseSongBtn.className = 'bi-pause-circle-fill text-[blue] pouseSong'
}

// repeat Song
repeatBtn.addEventListener('click', () => {
    if (repeatBtn.classList.contains('active')) {
        repeatBtn.classList.remove('active')
        repeatBtn.style.color = 'green'
        audioBtn.loop = true
        console.log('reapeat off');
    } else {
        repeatBtn.classList.add('active')
        audioBtn.loop = false
        console.log('repeat is on');
        repeatBtn.style.color = 'black'
    }
})


// next Song
const nextSong = () => {
    console.log(index);
    if (loop) {
        if (index == songsList.length - 1) {
            index = 0
        }
        else {
            index += 1
        }
        setSong(index)
        playSong()
    }
}

// pouse songs
const pauseSongs = () => {
    // if(!pouseSongBtn.classList.contains("hidden")){
    console.log('pause song');
    audioBtn.pause();
    pouseSongBtn.className = 'hidden'

    // playSongBtn.className.replace('hidden', 'visible')
    playSongBtn.classList.remove('hidden')
    playSongBtn.className = 'bi-play-circle-fill text-[blue] playSong'
    //         console.log('play: ', playSongBtn);
    // //    playSongBtn.className.remove('hidden') 
    //     console.log('pouseSongBtn: ', pouseSongBtn);

    // playSongBtn.classList.add('playSong')
    // }
}



// prev song
const prevSong = () => {
    console.log(index);
    if (loop) {
        if (index > 0) {
            index -= 1;
        }
        else {
            index = songsList.length - 1;
        }
        setSong(index);
        playSong()
    }
};

// shoflle toggle
const shuflleToggle = () => {
    if (shuflleBtn.classList.contains('shuflle')) {
        console.log('shuflle is on');
        const randomArr = Math.floor(Math.random() * songsList.length + 1)
        console.log(randomArr);
        setSong(randomArr)
        playSong()

        shuflleBtn.className = 'mt-2 text-[green] lg:text-[30px] md:mt-3 lg:mt-5'
    } else {
        console.log('shuffle off');
        shuflleBtn.className = 'shuflle mt-2 text-[black] lg:text-[30px] md:mt-3 lg:mt-5'

    }
}

//  progreess bar 
isTouchDevice()
progressBarBtn.addEventListener('click', event => {
    let coordStart = progressBarBtn.getBoundingClientRect().left

    // mouse click Position
    let coordEnd = !isTouchDevice() ? event.clientX : event.touches[0].clientX
    console.log(coordEnd);
    let progress = (coordEnd - coordStart) / progressBarBtn.offsetWidth
    currentProgresBar.style.width = progress * 100 + '%'
    audioBtn.currentTime = progress * audioBtn.duration
    playSong()
})

setInterval(() => {
    spendBtn.innerHTML = timeformatter(audioBtn.currentTime)
    currentProgresBar.style.width = (audioBtn.currentTime / audioBtn.duration.toFixed(3)) * 100 + '%'

});


// create PlayList
const initialPlayList = () => {
    let songsDive = document.createElement('div')
    songsDive.className = 'songs ml-[20%]'
    songsList.map((val, i) => {
        // console.log(val);
        let _div = document.createElement("div");
        _div.className = `song song${i + 1} cursor-pointer  flex gap-5 mb-[60px]`
        if (val.id == i) {
            _div.innerHTML = `
            <img class="w-[80px] small:w-[10px]" src=${val.img} alt="">
            <div class="details smal:w-[20%]">
                <div class="name text-[23px] small:text-[10px]">${val.name}</div>
                <div class="signer text-[20px]">${val.artist}</div>
            </div>`
            songsDive.appendChild(_div);
            playList.appendChild(songsDive)
            // console.log(val.children);
        }
    });
    for (let j = 0; j <= songsList.length; j++) {

        let _div = document.querySelectorAll(`.song${j}`)
        _div.forEach((item) => {
            if (item.classList.contains('song' + j)) {
                item.addEventListener('click', () => {
                    setSong(j-1)
                    playSong()
                    closePlayListFunc()
                })
            }
        })
    }

}

// playList show
playListBtn.addEventListener('click', () => {
    playList.classList.remove('hidden')
    initialPlayList()
})
// close playList
const closePlayListFunc = () => {
    playList.classList.add('hidden')
}
closePlayList.addEventListener('click', closePlayListFunc)

// play Song
playSongBtn.addEventListener('click', playSong)

// next song
nextBtn.addEventListener('click', nextSong)

// play next song when current song finished!
audioBtn.onended = () => {
    nextSong()
}

// puse Btn
pouseSongBtn.addEventListener('click', pauseSongs)


// prev Song
prevBtn.addEventListener('click', prevSong)

shuflleBtn.addEventListener('click', shuflleToggle)

// initial first song
window.onload = () => {
    index = 0
    setSong(index)
}