// Toggle the visibility of the episodes
function toggleEpisodes(div) {
 const episodes = div.nextElementSibling;
 if (episodes.style.display === "block") {
     episodes.style.display = "none";
     div.textContent = "Show Episodes";
 } else {
     episodes.style.display = "block";
     div.textContent = "Hide Episodes";
 }
}

// Play the selected audio and save the state
function playAudio(src, title) {
 const audioPlayer = document.getElementById('audio-player');
 const nowPlaying = document.getElementById('now-playing');
 const floatingPlayer = document.getElementById('floating-player');
 const toggleBtn = document.getElementById('toggle-btn');

 audioPlayer.src = src;
 audioPlayer.play();
 nowPlaying.textContent = title;
 floatingPlayer.classList.add('show');
 toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';

 // Save the audio state
 localStorage.setItem('audioSrc', src);
 localStorage.setItem('audioTitle', title);
 localStorage.setItem('isPlaying', 'true');
 localStorage.setItem('isPlayerVisible', 'true'); // New: Save visibility state
}

// Toggle the floating audio player
function togglePlayer() {
 const floatingPlayer = document.getElementById('floating-player');
 const toggleBtn = document.getElementById('toggle-btn');

 if (floatingPlayer.classList.contains('show')) {
     floatingPlayer.classList.remove('show');
     toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
     localStorage.setItem('isPlayerVisible', 'false'); // Save visibility state
 } else {
     floatingPlayer.classList.add('show');
     toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
     localStorage.setItem('isPlayerVisible', 'true'); // Save visibility state
 }
}

// Save the current time and playback status
const audioPlayer = document.getElementById('audio-player');
audioPlayer.addEventListener('timeupdate', () => {
 localStorage.setItem('audioCurrentTime', audioPlayer.currentTime);
});

audioPlayer.addEventListener('pause', () => {
 localStorage.setItem('isPlaying', 'false');
});

audioPlayer.addEventListener('play', () => {
 localStorage.setItem('isPlaying', 'true');
});

// Restore audio state on page load
window.addEventListener('load', () => {
 const savedSrc = localStorage.getItem('audioSrc');
 const savedTitle = localStorage.getItem('audioTitle');
 const savedTime = localStorage.getItem('audioCurrentTime');
 const isPlaying = localStorage.getItem('isPlaying');
 const isPlayerVisible = localStorage.getItem('isPlayerVisible'); // Get visibility state

 if (savedSrc) {
     audioPlayer.src = savedSrc;
     audioPlayer.currentTime = savedTime ? parseFloat(savedTime) : 0;
     document.getElementById('now-playing').textContent = savedTitle;

     // Continue playing if it was playing before the refresh
     if (isPlaying === 'true') {
         audioPlayer.play();
     }

     // Only show the floating player if it was visible before
     if (isPlayerVisible === 'true') {
         document.getElementById('floating-player').classList.add('show');
         document.getElementById('toggle-btn').innerHTML = '<i class="fas fa-chevron-down"></i>';
     }
 }
});