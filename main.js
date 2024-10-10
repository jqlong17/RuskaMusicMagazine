const musicData = [
  { title: "夜曲", titleEn: "Nocturne", image: "https://picsum.photos/200?random=1", audio: "https://example.com/audio1.mp3" },
  { title: "七里香", titleEn: "Common Jasmine Orange", image: "https://picsum.photos/200?random=2", audio: "https://example.com/audio2.mp3" },
  { title: "晴天", titleEn: "Sunny Day", image: "https://picsum.photos/200?random=3", audio: "https://example.com/audio3.mp3" },
  { title: "稻香", titleEn: "Rice Field", image: "https://picsum.photos/200?random=4", audio: "https://example.com/audio4.mp3" },
  { title: "青花瓷", titleEn: "Blue and White Porcelain", image: "https://picsum.photos/200?random=5", audio: "https://example.com/audio5.mp3" },
  { title: "简单爱", titleEn: "Simple Love", image: "https://picsum.photos/200?random=6", audio: "https://example.com/audio6.mp3" },
  { title: "双节棍", titleEn: "Nunchucks", image: "https://picsum.photos/200?random=7", audio: "https://example.com/audio7.mp3" },
  { title: "东风破", titleEn: "East Wind Breaks", image: "https://picsum.photos/200?random=8", audio: "https://example.com/audio8.mp3" },
  { title: "菊花台", titleEn: "Chrysanthemum Terrace", image: "https://picsum.photos/200?random=9", audio: "https://example.com/audio9.mp3" },
  { title: "龙卷风", titleEn: "Tornado", image: "https://picsum.photos/200?random=10", audio: "https://example.com/audio10.mp3" },
  { title: "珊瑚海", titleEn: "Coral Sea", image: "https://picsum.photos/200?random=11", audio: "https://example.com/audio11.mp3" },
  { title: "蒲公英的约定", titleEn: "Dandelion's Promise", image: "https://picsum.photos/200?random=12", audio: "https://example.com/audio12.mp3" },
  { title: "听妈妈的话", titleEn: "Listen to Mom", image: "https://picsum.photos/200?random=13", audio: "https://example.com/audio13.mp3" },
  { title: "发如雪", titleEn: "Hair Like Snow", image: "https://picsum.photos/200?random=14", audio: "https://example.com/audio14.mp3" },
  { title: "千里之外", titleEn: "A Thousand Miles Away", image: "https://picsum.photos/200?random=15", audio: "https://example.com/audio15.mp3" },
];

const grid = document.querySelector('.grid');
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const langToggleBtn = document.getElementById('langToggle');
const pageTitle = document.querySelector('h1');
const nowPlaying = document.getElementById('nowPlaying');
const tabSwitcher = document.getElementById('tabSwitcher');
const tabs = document.querySelectorAll('.tab');
const contactUsBtn = document.getElementById('contactUs');

let currentlyPlaying = null;
let isEnglish = false;
let currentTab = 'home';
let favorites = [];
let recentlyPlayed = [];

function createMusicItems() {
  grid.innerHTML = '';
  let displayData = [];

  switch (currentTab) {
    case 'home':
      displayData = musicData;
      break;
    case 'favorites':
      displayData = musicData.filter(item => favorites.includes(item.title));
      break;
    case 'recent':
      displayData = recentlyPlayed.map(title => musicData.find(item => item.title === title));
      break;
  }

  displayData.forEach((item, index) => {
    const musicItem = document.createElement('div');
    musicItem.classList.add('music-item');
    
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = isEnglish ? item.titleEn : item.title;
    
    const title = document.createElement('p');
    title.textContent = isEnglish ? item.titleEn : item.title;
    
    const favoriteBtn = document.createElement('button');
    favoriteBtn.classList.add('favorite-btn');
    favoriteBtn.innerHTML = favorites.includes(item.title) ? '&#9829;' : '&#9825;';
    favoriteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(item.title);
    });
    
    musicItem.appendChild(img);
    musicItem.appendChild(title);
    musicItem.appendChild(favoriteBtn);
    
    musicItem.addEventListener('click', () => playMusic(musicData.indexOf(item)));
    
    grid.appendChild(musicItem);
  });
}

function toggleFavorite(title) {
  const index = favorites.indexOf(title);
  if (index === -1) {
    favorites.push(title);
  } else {
    favorites.splice(index, 1);
  }
  createMusicItems();
}

function playMusic(index) {
  const item = musicData[index];
  
  if (currentlyPlaying !== index) {
    audio.src = item.audio;
    audio.play();
    currentlyPlaying = index;
    playPauseBtn.textContent = isEnglish ? 'Pause' : '暂停';
    updateNowPlaying(item);
    updateRecentlyPlayed(item.title);
  } else {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = isEnglish ? 'Pause' : '暂停';
    } else {
      audio.pause();
      playPauseBtn.textContent = isEnglish ? 'Play' : '播放';
    }
  }
}

function updateNowPlaying(item) {
  nowPlaying.textContent = isEnglish ? `Now Playing: ${item.titleEn}` : `正在播放：${item.title}`;
}

function updateRecentlyPlayed(title) {
  const index = recentlyPlayed.indexOf(title);
  if (index !== -1) {
    recentlyPlayed.splice(index, 1);
  }
  recentlyPlayed.unshift(title);
  if (recentlyPlayed.length > 10) {
    recentlyPlayed.pop();
  }
}

playPauseBtn.addEventListener('click', () => {
  if (currentlyPlaying !== null) {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = isEnglish ? 'Pause' : '暂停';
    } else {
      audio.pause();
      playPauseBtn.textContent = isEnglish ? 'Play' : '播放';
    }
  }
});

audio.addEventListener('ended', () => {
  playPauseBtn.textContent = isEnglish ? 'Play' : '播放';
});

langToggleBtn.addEventListener('click', () => {
  isEnglish = !isEnglish;
  langToggleBtn.textContent = isEnglish ? '中文' : 'English';
  pageTitle.textContent = isEnglish ? 'Ruska Music Magazine' : 'Ruska 音乐杂志';
  playPauseBtn.textContent = isEnglish ? (audio.paused ? 'Play' : 'Pause') : (audio.paused ? '播放' : '暂停');
  tabs[0].textContent = isEnglish ? 'Home' : '首页';
  tabs[1].textContent = isEnglish ? 'Favorites' : '收藏';
  tabs[2].textContent = isEnglish ? 'Recently Played' : '最近在听';
  contactUsBtn.textContent = isEnglish ? 'Contact Us' : '联系我们';
  if (currentlyPlaying !== null) {
    updateNowPlaying(musicData[currentlyPlaying]);
  }
  createMusicItems();
});

tabSwitcher.addEventListener('click', (e) => {
  if (e.target.classList.contains('tab')) {
    currentTab = e.target.dataset.tab;
    tabs.forEach(tab => tab.classList.remove('active'));
    e.target.classList.add('active');
    createMusicItems();
  }
});

createMusicItems();