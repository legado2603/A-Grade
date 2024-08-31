const apiKey = 'AIzaSyCpT_lA2JjlAZLFMj9fknwib03VX-Yd8Fg'; // Substitua com sua chave de API
const videoContainer = document.getElementById('video-container');
const thumbnailContainer = document.getElementById('thumbnail-container');

let videos = [];

function loadVideos(query) {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=22&q=${query}%20shorts&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            videos = data.items.map(item => ({
                id: item.id.videoId,
                thumbnail: item.snippet.thumbnails.medium.url
            }));
            renderThumbnails();
            renderVideo(0); // Exibe o primeiro vídeo
        })
        .catch(error => console.error('Erro ao buscar vídeos:', error));
}

function renderVideo(index) {
    const video = videos[index];
    if (video) {
        videoContainer.innerHTML = `
            <div class="video-item">
                <iframe src="https://www.youtube.com/embed/${video.id}?autoplay=1&playsinline=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;
    }
}

function renderThumbnails() {
    thumbnailContainer.innerHTML = videos.map((video, index) => `
        <div class="thumbnail" data-index="${index}">
            <img src="${video.thumbnail}" alt="Miniatura do vídeo">
        </div>
    `).join('');
    
    document.querySelectorAll('.thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', (event) => {
            const index = parseInt(event.currentTarget.getAttribute('data-index'), 10);
            renderVideo(index);
        });
    });
}

loadVideos('realidade impressionante,fabio akita,Seiti arata,video morivacional nando pinheiro,record news,cnn,passagens biblicas'); // Substitua por sua busca