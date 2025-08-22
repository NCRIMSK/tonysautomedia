function initPlayer() {
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play-pause');
  const trackButtons = document.querySelectorAll('.track-select button');
  const tracks = {
    original: 'Original.mp3',
    ai: 'Just AI.mp3',
    fix: 'My fix plus AI.mp3'
  };
  let currentTrack = 'original';
  let isPlaying = false;

  function setTrack(track) {
    const time = audio.currentTime;
    const wasPaused = audio.paused;
    audio.src = tracks[track];
    audio.currentTime = time;
    trackButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.track === track));
    currentTrack = track;
    if (!wasPaused) {
      audio.play();
      isPlaying = true;
      playBtn.textContent = 'Pause';
    }
  }

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      playBtn.textContent = 'Play';
    } else {
      audio.play();
      playBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
  });

  trackButtons.forEach(btn => {
    btn.addEventListener('click', () => setTrack(btn.dataset.track));
  });

  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.play();
  });

  audio.src = tracks[currentTrack];
}

document.addEventListener('DOMContentLoaded', initPlayer);
