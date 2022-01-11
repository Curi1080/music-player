const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const container = $(".container");

const playList = $(".play-list");
const audio = $("#audio");
const range = $("#range");

const playIcon = $(".play ion-icon");
const cdSong = $(".song-img");

const playBtn = $(".play");
const nextBtn = $(".play-next");
const prevBtn = $(".play-back");

const repeatBtn = $(".repeat-song");
const randomBtn = $(".random-song");

const songImg = $(".song-img");
const songName = $(".song-name");
const songArtist = $(".artist");

const app = {
	currentIndex: 0,
	isPlaying: false,
	isRepeat: false,
	isRandom: false,
	songs: [
		{
			name: "Chay ngay di",
			singer: "Song Tung M-TP",
			imgSrc: "./img/sontungmtp.jpg",
			songSrc: "./audio/chayngaydi.mp3",
		},
		{
			name: "Ai no",
			singer: "Masew X Khoi Vu",
			imgSrc: "./img/aino.PNG",
			songSrc: "./audio/aino.mp3",
		},
		{
			name: "De vuong",
			singer: "Dinh Dung",
			imgSrc: "./img/devuong.PNG",
			songSrc: "./audio/devuong.mp3",
		},
		{
			name: "On my way",
			singer: "Alan Walker",
			imgSrc: "./img/AlanWalker.jpg",
			songSrc: "./audio/onmyway.mp3",
		},
		{
			name: "Cuoi thoi",
			singer: "Masew X Bray X Tap",
			imgSrc: "./img/cuoithoi.PNG",
			songSrc: "./audio/cuoithoi.mp3",
		},
		{
			name: "Lalisa",
			singer: "Lisa",
			imgSrc: "./img/lalisa.jpg",
			songSrc: "./audio/lalisa.mp3",
		},
		{
			name: "Gone",
			singer: "Rose",
			imgSrc: "./img/Rose.jpg",
			songSrc: "./audio/gone.mp3",
		},
		{
			name: "Anh thuong em nhat ma",
			singer: " Lã. x Log x TiB",
			imgSrc: "./img/anhthuongemnhatma.jpg",
			songSrc: "./audio/anhthuongemnhatma.mp3",
		},
		{
			name: "Roi toi luon",
			singer: "Nal",
			imgSrc: "./img/Nal.png",
			songSrc: "./audio/roitoiluon.mp3",
		},
		{
			name: "Yeu la cuoi",
			singer: "Phat Ho",
			imgSrc: "./img/yeulacuoi.jpg",
			songSrc: "./audio/cuoithoi.mp3",
		},
	],
	handleEvent: function () {
		const _this = this;

		let animation = cdSong.animate([{ transform: "rotate(-360deg)" }, { transition: "all 0.2s ease" }], {
			duration: 8000,
			iterations: Infinity,
		});

		animation.pause();

		this.scrollView();

		// xu li khi click
		playBtn.onclick = function () {
			if (_this.isPlaying) {
				audio.pause();
				animation.pause();
			} else {
				audio.play();
				animation.play();
			}
		};
		nextBtn.onclick = function () {
			if (_this.isRandom) {
				_this.randomSong();
				_this.render();
			} else {
				_this.nextSong();
				_this.render();
			}
			audio.play();
		};
		prevBtn.onclick = function () {
			if (_this.isRandom) {
				_this.randomSong();
				_this.render();
			} else {
				_this.prevSong();
				_this.render();
			}
			audio.play();
		};
		// xu li khi play
		audio.onplay = function () {
			_this.isPlaying = true;
			playIcon.name = "pause-outline";
		};
		audio.onpause = function () {
			_this.isPlaying = false;
			playIcon.name = "play-outline";
		};
		// xu li khi ket thuc
		audio.onended = function () {
			if (_this.isRepeat) {
				audio.play();
			}
			if (_this.isRandom) {
				_this.randomSong();
			}
			_this.nextSong();
			_this.render();
			audio.play();
		};
		// xu li khi random va repeat
		repeatBtn.onclick = function () {
			_this.isRepeat = !_this.isRepeat;
			repeatBtn.classList.toggle("active", _this.isRepeat);
		};
		randomBtn.onclick = function () {
			_this.isRandom = !_this.isRandom;
			randomBtn.classList.toggle("active", _this.isRandom);
		};
		// Timer
		audio.ontimeupdate = function () {
			if (audio.duration) {
				const rangePercent = Math.floor((audio.currentTime / audio.duration) * 100);
				range.value = rangePercent;
			}
		};
		// xu li tua
		range.onchange = function (e) {
			const seek = Math.floor((e.target.value * audio.duration) / 100);
			audio.currentTime = seek;
		};

		playList.onclick = function (e) {
			const songNode = e.target.closest(".list-item:not(.active-song)");
			if (songNode || e.target.closest(".more")) {
				// xu li khi bam vao item
				if (songNode) {
					_this.currentIndex = Number(songNode.dataset.index);
					_this.loadCurrentSong();
					_this.render();
					audio.play();
				}

				// xu li khi bam vao more
				if (e.target.closest(".more")) {
				}
			}
		};
	},
	loadCurrentSong: function () {
		songImg.style.backgroundImage = "url(" + this.currentSong.imgSrc + ")";
		songName.innerText = this.currentSong.name;
		songArtist.innerText = this.currentSong.singer;
		audio.src = this.currentSong.songSrc;
	},
	nextSong: function () {
		this.currentIndex++;
		if (this.currentIndex >= this.songs.length) {
			this.currentIndex = 0;
		}
		this.loadCurrentSong();
	},
	rangeView: function () {
		let currentTime = audio.currentTime;
	},
	prevSong: function () {
		this.currentIndex--;
		if (this.currentIndex < 0) {
			this.currentIndex = this.songs.length - 1;
		}
		this.loadCurrentSong();
	},
	repeatSong: function () {
		if (this.isRepeat) {
			audio.play();
		}
	},
	randomSong: function () {
		let newIndex;
		do {
			newIndex = Math.floor(Math.random() * this.songs.length);
		} while (newIndex === this.currentIndex);

		this.currentIndex = newIndex;
		this.loadCurrentSong();
	},
	scrollView: function () {},
	defineProperties: function () {
		Object.defineProperty(this, "currentSong", {
			get: function () {
				return this.songs[this.currentIndex];
			},
		});
	},
	render: function () {
		const html = this.songs
			.map((song, index) => {
				return `
                 <div class = "list-item ${index == this.currentIndex ? "active-song" : ""}" data-index=${index}> 
                    <img src="${song.imgSrc}" alt="" class="list-song__img"/>
                    <div class="infor">
                        <h2>${song.name}</h2>
                        <h3>${song.singer}</h3>
                    </div>
					<ion-icon name="ellipsis-horizontal-outline" class="more"></ion-icon>
                 </div>
                `;
			})
			.join("");
		playList.innerHTML = html;
	},
	start: function () {
		//dinh nghia thuoc tinh cho object
		this.defineProperties();
		//xu li su kien
		this.handleEvent();
		this.loadCurrentSong();
		//render list song
		this.render();
	},
};

app.start();
