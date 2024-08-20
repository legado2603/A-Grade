document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const genresList = document.getElementById('genres-list');
  const artistModal = document.getElementById('artist-modal');
  const artistList = document.getElementById('artist-list');
  const albumModal = document.getElementById('album-modal');
  const albumList = document.getElementById('album-list');
  const trackModal = document.getElementById('track-modal');
  const trackList = document.getElementById('track-list');
  const playPauseButton = document.getElementById('play-pause');
  const stopButton = document.getElementById('stop');
  const rewindButton = document.getElementById('rewind');
  const forwardButton = document.getElementById('forward');
  const prevTrackButton = document.getElementById('prev-track');
  const nextTrackButton = document.getElementById('next-track');
  const audioPlayer = document.getElementById('audio-player');
  const toggleSidebarButton = document.getElementById('toggle-sidebar');
  const closeSidebarButton = document.getElementById('close-sidebar');
  let currentTracks = [];
  let currentTrackIndex = 0;
  let isPlaying = false;

  // Função para abrir um modal
  function openModal(modal) {
    modal.style.display = 'flex';
  }

  // Função para fechar um modal
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }

  // Função para tocar uma faixa
  function playTrack(index) {
    if (currentTracks[index]) {
      audioPlayer.src = currentTracks[index];
      audioPlayer.play();
      isPlaying = true;
      playPauseButton.textContent = '⏸️';
      currentTrackIndex = index;
    }
  }

  // Função para tocar a próxima faixa
  function playNextTrack() {
    if (currentTrackIndex < currentTracks.length - 1) {
      playTrack(currentTrackIndex + 1);
    }
  }

  // Carrega os dados e configura a interface
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Cria a lista de gêneros
      genresList.innerHTML = data.genres.map((genre, genreIndex) => `
        <li><button class="genre-button" data-index="${genreIndex}">${genre.name}</button></li>
      `).join('');

      // Manipulador de eventos para abrir o modal de artistas
      genresList.addEventListener('click', (event) => {
        if (event.target.classList.contains('genre-button')) {
          const genreIndex = parseInt(event.target.getAttribute('data-index'), 10);
          const artists = data.genres[genreIndex].artists;
          artistList.innerHTML = artists.map((artist, artistIndex) => `
            <li><button class="artist-button" data-genre="${genreIndex}" data-index="${artistIndex}">${artist.name}</button></li>
          `).join('');
          openModal(artistModal);
        }
      });

      // Manipulador de eventos para abrir o modal de álbuns
      artistList.addEventListener('click', (event) => {
        if (event.target.classList.contains('artist-button')) {
          const genreIndex = parseInt(event.target.getAttribute('data-genre'), 10);
          const artistIndex = parseInt(event.target.getAttribute('data-index'), 10);
          const albums = data.genres[genreIndex].artists[artistIndex].albums;
          albumList.innerHTML = albums.map((album, albumIndex) => `
            <li><button class="album-button" data-genre="${genreIndex}" data-artist="${artistIndex}" data-index="${albumIndex}">${album.name}</button></li>
          `).join('');
          openModal(albumModal);
        }
      });

      // Manipulador de eventos para abrir o modal de faixas
      albumList.addEventListener('click', (event) => {
        if (event.target.classList.contains('album-button')) {
          const genreIndex = parseInt(event.target.getAttribute('data-genre'), 10);
          const artistIndex = parseInt(event.target.getAttribute('data-artist'), 10);
          const albumIndex = parseInt(event.target.getAttribute('data-index'), 10);
          const tracks = data.genres[genreIndex].artists[artistIndex].albums[albumIndex].tracks;
          currentTracks = tracks.map(track => track.url);
          trackList.innerHTML = tracks.map((track, trackIndex) => `
            <li><button class="track-button" data-index="${trackIndex}">${track.name}</button></li>
          `).join('');
          openModal(trackModal);
        }
      });

      // Manipulador de eventos para tocar a faixa selecionada
      trackList.addEventListener('click', (event) => {
        if (event.target.classList.contains('track-button')) {
          const trackIndex = parseInt(event.target.getAttribute('data-index'), 10);
          playTrack(trackIndex);
        }
      });

      // Manipulador de eventos para tocar/pausar a música
      playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
          audioPlayer.pause();
          playPauseButton.textContent = '▶️';
        } else {
          audioPlayer.play();
          playPauseButton.textContent = '⏸️';
        }
        isPlaying = !isPlaying;
      });

      // Manipulador de eventos para parar a música
      stopButton.addEventListener('click', () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        playPauseButton.textContent = '▶️';
        isPlaying = false;
      });

      // Manipulador de eventos para retroceder
      rewindButton.addEventListener('click', () => {
        audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
      });

      // Manipulador de eventos para avançar
      forwardButton.addEventListener('click', () => {
        audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
      });

      // Manipulador de eventos para tocar a faixa anterior
      prevTrackButton.addEventListener('click', () => {
        if (currentTrackIndex > 0) {
          playTrack(currentTrackIndex - 1);
        }
      });

      // Manipulador de eventos para tocar a próxima faixa
      nextTrackButton.addEventListener('click', () => {
        if (currentTrackIndex < currentTracks.length - 1) {
          playTrack(currentTrackIndex + 1);
        }
      });

      // Manipulador de eventos para fechar os modais
      document.querySelectorAll('.close').forEach(closeButton => {
        closeButton.addEventListener('click', (event) => {
          const modalId = event.target.getAttribute('data-modal');
          closeModal(modalId);
        });
      });

      // Manipulador de eventos para abrir e fechar a sidebar
      toggleSidebarButton.addEventListener('click', () => {
        sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
      });

      closeSidebarButton.addEventListener('click', () => {
        sidebar.style.display = 'none';
      });
    })
    .catch(error => console.error('Erro ao carregar os dados:', error));

  // Manipulador de evento para tocar a próxima faixa quando a atual terminar
  audioPlayer.addEventListener('ended', playNextTrack);
});