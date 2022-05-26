const songs = [
    {
        name: 'Viva La Vida',
        singer: 'J.Fla Cover',
        path: './assets/music/Coldplay - Viva La Vida ( cover by J.Fla ).mp3',
        image: './assets/img/song1.jpg'
    },

    {
        name: 'Sold Out',
        singer: 'Hawk Nelson',
        path: './assets/music/Hawk Nelson - Sold Out (Official Lyric Video).mp3',
        image: './assets/img/sold out.jpg'
    },

    {
        name: 'Arcade',
        singer: 'Duncan Laurence',
        path: './assets/music/Arcade - Duncan Laurence {LYRICS} -!WINNER ESC 2019!-.mp3',
        image: './assets/img/arcade.jpg'
    },

    {
        name: 'Send my love to your new lover',
        singer: 'Sit Still, Look Pretty',
        path: './assets/music/Send my love to your new lover - sit still, look pretty -- Vietsub.mp3',
        image: './assets/img/send my love.jpg'
    },

    {
        name: 'Waiting For Love',
        singer: 'Romy Wave Cover',
        path: './assets/music/Waiting For Love - Romy Wave Cover - Phong Max Remix (Lyrics + Vietsub) ♫ (1).mp3',
        image: './assets/img/waiting.jpg'
    },

    {
        name: 'Hương lúa',
        singer: 'Jay Chou',
        path: './assets/music/Fragrant Rice - Hương Lúa [Vietsub + Kara] [HD].mp3',
        image: './assets/img/jaychou.jpg'
    },

    {
        name: 'Counting Stars',
        singer: 'OneRepublic',
        path: './assets/music/OneRepublic - Counting Stars (Official Music Video).mp3',
        image: './assets/img/onerepublic-songs-counting-stars-meaning-and-lyrics.png'
    }
]

// 1. Render song
// 2. Scroll top
// 3. Play/pause/seek
// 4. CD run 
// 5. Next/prev 
// 6. Random 
// 7. Next/repeat 
// 8. Active song 
// 9. Scroll active song into view 
// 10. Play song when click 

const heading = document.querySelector('header h2');
const cdThumb = document.querySelector('.cd-thumb');
const audio = document.querySelector('#audio');
// console.log(heading, cdThumb, audio); 
const cd = document.querySelector('.cd');   
const player = document.querySelector('.player');
const playBtn = document.querySelector('.btn-toggle-play');

const progress = document.querySelector('#progress');
const app = {
    currentIndex: 0,
    songs : songs,
    isPlaying :false,
    render: function() { // 1. Render song
        const htmls = this.songs.map(song => {
            return ` 
                <div class="song">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>`
        })
        // console.log(htmls);
        document.querySelector('.playlist').innerHTML = htmls.join('');
    },
    
    // Scroll top
    handleEvents: function() {
        const cdWidth = cd.offsetWidth;
        const _this = this;
        // Xử lý phóng to/thu nhỏ CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newWidth = cdWidth - scrollTop;
            // console.log(newWidth);
            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0 ;
            cd.style.opacity = newWidth / cdWidth;
        }

        // Xử lý khi click Play
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            };
        }
    

        // Lắng nghe Sự kiện khi song được play
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
        }

         // Lắng nghe Sự kiện khi song được play
         audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
        }   

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = audio.currentTime / audio.duration * 100;
                progress.value = progressPercent;
            } 
            ;
        }

        // Xử lý khi tua bài hát
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }
    },   

    // tìm vị trí current song
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url'${this.currentSong.image}'`
        audio.src = this.currentSong.path;
    },


    

    // hàm tổng 
    start: function() {
        // Định nghĩa các thuộc tính cho obj
        this.defineProperties();

        // Lắng nghe, xử lý các sự kiện DOM events
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI khi chạy app
        this.loadCurrentSong();

        // Render playlist
        this.render();
    }
}
    app.start()

// 3. Play/pause/seek




