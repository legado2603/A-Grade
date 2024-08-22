function toggleSidebar() {
var sidebar = document.getElementById('sidebar');
sidebar.classList.toggle('show-sidebar');
}

function toggleConfigPanel() {
var configPanel = document.getElementById('configPanel');
if (configPanel.style.display === 'none' || configPanel.style.display === '') {
configPanel.style.display = 'flex';
} else {
configPanel.style.display = 'none';
}
}

function fecharConfigPanel() {
var configPanel = document.getElementById('configPanel');
configPanel.style.display = 'none';
}

function mudarCorTexto() {
var corTexto = document.getElementById('corTexto').value;
document.body.style.color = corTexto;
}
function mudarCorFundo() {
var corFundo = document.getElementById('corFundo').value;
document.body.style.backgroundColor = corFundo;
}

function mudarImagemFundo() {
var linkImagem = document.getElementById('linkImagem').value;
document.body.style.backgroundImage = "url('" + linkImagem + "')";
}

// Carrega a API do YouTube
function carregarAPI() {
    gapi.client.load('youtube', 'v3', function() {
        console.log('API do YouTube carregada com sucesso.');
    });
}

// Função para realizar a pesquisa no YouTube
function pesquisar() {
    var termo = document.getElementById('termoPesquisa').value;
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: termo,
        type: 'video'
    });

    request.execute(function(response) {
        var resultados = response.result.items;
        var listaVideos = '';
        resultados.forEach(function(item) {
            var videoId = item.id.videoId;
            var titulo = item.snippet.title;
            var thumbnail = item.snippet.thumbnails.default.url;
            listaVideos += '<div><a href="#" onclick="abrirModal(\'' + videoId + '\')"><img src="' + thumbnail + '"><br>' + titulo + '</a></div>';
        });
        document.getElementById('resultadoPesquisa').innerHTML = listaVideos;
    });
}

// Função para abrir o modal e reproduzir o vídeo
function abrirModal(videoId) {
    var modal = document.getElementById('myModal');
    var videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = 'https://www.youtube.com/embed/' + videoId;
    modal.style.display = 'block';
}

// Função para fechar o modal
function fecharModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
    document.getElementById('resultadoPesquisa').innerHTML = '';
}

// Inicializa a API do YouTube
gapi.load('client', carregarAPI);
// Inicializa a API do YouTube com sua chave de API
gapi.load('client', function() {
    gapi.client.setApiKey('AIzaSyA6HXa5GsktPI2htICCMaGKJ7mJhUX18m4');
    carregarAPI(); // Chama a função carregarAPI() após a inicialização da chave de API
});
        function sendMessage() {
          var userInput = document.getElementById("userInput").value;
          var response = getBotResponse(userInput);
          document.getElementById("botResponse").innerText = response;
        }
        
// Event listeners para os botões "Outro Botão", "Outro Botão 2" e "Outro Botão 3"
document.getElementById("outroBotao").addEventListener("click", function() {
    window.location.href = "agrade1(green).html"; // Substitua pela URL desejada
});

document.getElementById("outroBotao2").addEventListener("click", function() {
    window.location.href = "agrade2(red).html"; // Substitua pela URL desejada
});

document.getElementById("outroBotao3").addEventListener("click", function() {
    window.location.href = "agrade3(violet).html"; // Substitua pela URL desejada
});
document.getElementById("outroBotao4").addEventListener("click", function() {
  window.location.href = "starchat1(yellow).html"; // Substitua pela URL desejada
});
document.getElementById("outroBotao5").addEventListener("click", function() {
  window.location.href = "SafiraBot.html"; // Substitua pela URL desejada
});
document.getElementById("outroBotao6").addEventListener("click", function() {
  window.location.href = "sobre.html"; // Substitua pela URL desejada
});
document.getElementById("outroBotao7").addEventListener("click", function() {
  window.location.href = "/A-Grade/starmusic/player.html"; // Substitua pela URL desejada
});


        function openModal() {
          document.getElementById("chatModal").style.display = "block";
        }

        function closeModal() {
          document.getElementById("chatModal").style.display = "none";
        }

        function sendMessage() {
          var userInput = document.getElementById("userInput").value;
          if (userInput.trim() !== "") {
            var chat = document.getElementById("chat");

            // Adiciona a mensagem do usuário
            var userMessage = document.createElement("div");
            userMessage.className = "chat-message user-message";
            userMessage.innerText = userInput;
            chat.appendChild(userMessage);

            // Adiciona a resposta do bot
            var botMessage = document.createElement("div");
            botMessage.className = "chat-message bot-message";
            if (faq[userInput]) {
              botMessage.innerText = faq[userInput];
            } else {
              botMessage.innerText = "Desculpe, eu não sei a resposta para isso.";
            }
            chat.appendChild(botMessage);

            // Limpa o campo de entrada
            document.getElementById("userInput").value = "";

            // Faz o scroll para a última mensagem
            chat.scrollTop = chat.scrollHeight;
          }
        }

        // Fecha o modal ao clicar fora do conteúdo
        window.onclick = function(event) {
          var modal = document.getElementById("chatModal");
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
         // Perguntas e respostas predefinidas
        const faq = {
          "nome": "Qual é o nome do bot da página principal? Eu sou o bot da página home.",
          "estado": "Como o bot da página principal está funcionando? Estou funcionando perfeitamente!",
          "função": "O que o bot da página principal pode fazer? Posso responder perguntas simples e ajudá-lo com informações básicas sobre a Grade.",
          "grade": "O que é a Grade? A Grade é uma nova rede social baseada em conteúdo e chat entre usuários.",
          "safira": "Quem é a Safira? Safira é o chatbot da Grade, com tendência a evoluir mais do que qualquer outra ferramenta dentro da plataforma.",
          "projeto": "Em que estágio a Grade está? A Grade está no seu primeiro estágio e é o projeto mais querido. Sempre haverá atualizações para a Grade.",
          "atualizações": "A Grade recebe atualizações? Sim, a Grade sempre receberá atualizações, pois é o projeto mais querido.",
          "páginas": "Quantas páginas a Grade possui? A Grade tem três páginas, sendo que a terceira página tem duas em uma.",
          "sidebar": "O que tem na Sidebar da página principal? Dentro da Sidebar da página principal (home), há um botão 'sobre' que explica mais sobre a Grade.",
          "sobre": "Onde posso encontrar informações sobre a Grade? Você pode encontrar mais informações na página 'sobre', acessível pela Sidebar da página principal.",
          "starchat": "Qual é a diferença entre Starchat e SafiraBot? Não há comunicação entre o Starchat e a SafiraBot.",
          "tema": "Qual é o tema da Grade? O tema da Grade é futurista, focado em agrupamento de conhecimento e criação de uma nova cultura.",
          "comunicação": "Existe comunicação entre Starchat e SafiraBot? Não, não há comunicação entre o Starchat e a SafiraBot.",
          "evolução": "Qual chatbot tem maior tendência à evolução? A Safira tende a evoluir mais do que qualquer outra ferramenta dentro da Grade.",
          "cultura": "O que a Grade busca criar? A Grade busca criar uma nova cultura emergente, baseada no avanço da tecnologia.",
          "comunidade": "Como a Grade pretende formar uma comunidade? A Grade forma uma comunidade através do agrupamento de conhecimento e compartilhamento de mídias.",
          "tecnologia": "A Grade acompanha o avanço da tecnologia? Sim, a Grade está sempre alinhada com o avanço da tecnologia.",
          "conteúdo": "Qual é o foco principal da Grade? O foco principal da Grade é conteúdo e chat entre usuários.",
          "chat": "Como funciona o chat entre usuários na Grade? O chat na Grade permite que os usuários se comuniquem e compartilhem conhecimentos.",
          "salas": "O que a Safira pode fazer em relação às salas? A Safira pode criar, entrar e deletar salas na Grade.",
          "criar": "A Safira pode criar salas? Sim, a Safira pode criar salas na Grade.",
          "entrar": "A Safira pode entrar em salas? Sim, a Safira pode entrar em salas na Grade.",
          "deletar": "A Safira pode deletar salas? Sim, a Safira pode deletar salas na Grade.",
          "arquivo": "Em que formato está o arquivo da Safira? O arquivo da Safira está em formato JSON.",
          "primeiro filho": "Por que a Grade é considerada o projeto mais querido? A Grade é considerada o projeto mais querido porque, como todo primeiro filho, recebe atenção especial e constantes atualizações.",
          "mídias": "Qual é o papel das mídias na Grade? As mídias na Grade ajudam a acumular conhecimento e formar uma comunidade que contribui para uma nova cultura.",
          "agrupamento": "O que significa o agrupamento de conhecimento na Grade? O agrupamento de conhecimento na Grade refere-se ao acúmulo de informações e mídias para o surgimento de uma nova cultura.",
          "bot": "Quem é o bot da Grade? O bot da Grade é o responsável por responder perguntas e auxiliar os usuários, com a Safira sendo um exemplo de chatbot evolutivo.",
          "json": "Qual é o formato do arquivo da Safira? O arquivo da Safira está no formato JSON.",
          "criador": "Quem criou a Grade? O criador da Grade está descrito na página 'sobre'.",
        
          "?": "Comandos disponíveis: nome, estado, função, grade, safira, projeto, atualizações, páginas, sidebar, sobre, starchat, tema, comunicação, evolução, cultura, comunidade, tecnologia, conteúdo, chat, salas, criar, entrar, deletar, arquivo, primeiro filho, mídias, agrupamento, bot, json, criador."
        };
        