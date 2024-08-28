const maxDescriptionLength = 300; // Limite de caracteres
const rssFeeds = [
    "https://feeds2.feedburner.com/canaltechbr",
    "https://olhardigital.com.br/rss/ultimas_noticias.php",
    "https://olhardigital.com.br/rss",
    "https://olhardigital.com.br/editorias/seguranca/feed/",
    "https://agenciabrasil.ebc.com.br/feed/ultimasnoticias/feed.xml",
    "https://www.cnnbrasil.com.br/feed/",
    "https://jovempan.com.br/feed",
    "https://extra.globo.com/rss/extra"
];

function isNewsFromCurrentMonth(pubDate) {
    const today = new Date();
    const newsDate = new Date(pubDate);
    return newsDate.getFullYear() === today.getFullYear() &&
           newsDate.getMonth() === today.getMonth();
}

async function fetchRSS(url) {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data.items;
}

async function carregarNoticias() {
    const container = document.getElementById('news-container');
    container.innerHTML = ''; // Limpar o conteúdo atual

    for (const url of rssFeeds) {
        const artigos = await fetchRSS(url);
        artigos
            .filter(artigo => isNewsFromCurrentMonth(artigo.pubDate)) // Filtrar notícias do mês atual
            .forEach(artigo => {
                let description = artigo.description;
                if (description.length > maxDescriptionLength) {
                    description = description.slice(0, maxDescriptionLength) + '... <a href="#" data-url="' + artigo.link + '">Leia mais</a>';
                }

                const artigoElem = document.createElement('div');
                artigoElem.classList.add('news-item');
                artigoElem.innerHTML = `
                    <h2><a href="#" data-url="${artigo.link}">${artigo.title}</a></h2>
                    <p>Publicado em: ${new Date(artigo.pubDate).toLocaleDateString('pt-BR')}</p>
                    <p>${description}</p>
                    ${artigo.enclosure ? `<img src="${artigo.enclosure.url}" alt="">` : ''}
                    <hr/>
                `;
                container.appendChild(artigoElem);
            });
    }
    
    // Garantir que a página comece no topo
    window.scrollTo(0, 0);
}

function showIframe(url) {
    const iframeContainer = document.getElementById('iframe-container');
    const iframe = document.getElementById('news-iframe');
    iframe.src = url;
    iframeContainer.style.display = 'flex';
}

document.getElementById('iframe-container').querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('iframe-container').style.display = 'none';
    document.getElementById('news-iframe').src = '';
});

document.getElementById('news-container').addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.dataset.url) {
        e.preventDefault();
        showIframe(e.target.dataset.url);
    }
});

// Carregar notícias a cada 10 minutos
carregarNoticias();
setInterval(carregarNoticias, 10 * 60 * 1000); // 10 minutos
