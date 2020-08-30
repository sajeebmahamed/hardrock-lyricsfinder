const inputSongName = document.querySelector('#inputSongName')
const searchBtn = document.querySelector('#searchBtn')


searchBtn.addEventListener('click', searchResult);


function searchResult() {
    songName = inputSongName.value
    const searchApi = `https://api.lyrics.ovh/suggest/${songName}`

    document.querySelector('.song-list').innerText = ''

    fetch(searchApi)
        .then(res => res.json())
        .then(data => {
            global = data
            const result = data.data.slice(1, 6)
            result.map((songs, i) => {
                const title = songs.title
                const artist = songs.artist.name
                document.querySelector('.text-success').innerText = title
                let songList = document.querySelector('.song-list')
                let p = document.createElement('p')
                p.innerHTML = `<p class="author lead">
                                    <strong> ${title} </strong>
                                    Album by <span> ${artist} </span>
                                    <button
                                        onClick = "getLyrics(${i})"
                                        class="btn btn-success">Get Lyrics
                                    </button>
                                </p>`
                songList.appendChild(p)
            })

        })
}

document.querySelector('#lyricshow').innerText = ''

function getLyrics(index) {
    const title = global.data[index].title
    const artist = global.data[index].artist.name

    const lyricsApi = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(lyricsApi)
        .then(res => res.json())
        .then(data => {
            const lyrics = data.lyrics
            const lyricshow = document.querySelector('#lyricshow')
            if (lyrics !== undefined) {
                lyricshow.innerText = lyrics
            }
            else {
                lyricshow.innerHTML = 'Lyrics Not Found'
            }
        })
}
