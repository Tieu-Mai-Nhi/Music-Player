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
$(document).ready(function() {  
    const app = {
        songs : songs,
        render: function() {
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
            //  
            $('.playlist').html(htmls.join('')) ;
        },
        
        handleEvents: function() {
            const cd = document.querySelector('.cd');   
            const cdWidth = cd.offsetWidth;
            document.onscroll = function() {
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                const newWidth = cdWidth - scrollTop;
                // console.log(newWidth);
                cd.style.width = newWidth > 0 ? newWidth + 'px' : 0 ;
                cd.style.opacity = newWidth / cdWidth;
            }
        },

        start: function() {
            this.handleEvents();

            this.render();
        }
    }
    app.start()
});

// Scroll top


