    // Configuração do Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyBp0QRdqod_68ARBfJlDfZQBX4sg1Du_o4",
      authDomain: "Socialnetwork021",
      databaseURL: "https://socialnetwork021-fad5a-default-rtdb.firebaseio.com/",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    // Inicialize o Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const database = firebase.database();

    let userId = null;
    let chatRoom = null;
    let userName = '';
    let userPhotoURL = '';

    // Função para abrir o modal principal
    function openModal() {
      document.getElementById('modal').style.display = 'block';
    }

    // Função para fechar o modal principal
    function closeModal() {
      document.getElementById('modal').style.display = 'none';
      document.getElementById('mainScreen').style.display = 'block';
      document.getElementById('createRoomModal').style.display = 'none';
      document.getElementById('joinRoomModal').style.display = 'none';
      document.getElementById('roomsModal').style.display = 'none';
      document.getElementById('chatModal').style.display = 'none';
      document.getElementById('nameInputContainer').style.display = 'none';
    }

    // Abrir modal principal ao clicar no botão Starchat
    document.getElementById('starchatBtn').addEventListener('click', () => {
      if (auth.currentUser) {
        userId = auth.currentUser.uid;
        userName = auth.currentUser.displayName || '';
        userPhotoURL = auth.currentUser.photoURL || '';
        if (!userName) {
          document.getElementById('nameInputContainer').style.display = 'block';
        } else {
          openModal();
        }
      } else {
        alert('Você deve estar logado para usar o chat.');
      }
    });

    // Função para confirmar o nome do usuário
    document.getElementById('confirmNameBtn').addEventListener('click', () => {
      userName = document.getElementById('userNameInput').value;
      if (userName) {
        auth.currentUser.updateProfile({ displayName: userName });
        document.getElementById('nameInputContainer').style.display = 'none';
        openModal();
      } else {
        alert('Por favor, insira um nome.');
      }
    });

    // Fechar modal
    document.getElementById('closeModal').addEventListener('click', closeModal);

    // Abrir modal de criação de sala
    document.getElementById('createRoomBtn').addEventListener('click', () => {
      document.getElementById('mainScreen').style.display = 'none';
      document.getElementById('createRoomModal').style.display = 'block';
    });

    // Criar sala
document.getElementById('createRoomSubmit').addEventListener('click', () => {
  const roomName = document.getElementById('roomNameInput').value;
  const roomPassword = document.getElementById('roomPasswordInput').value;
  if (roomName) {
    // Verificar se o nome da sala já existe
    const roomRef = database.ref('rooms').child(roomName);
    roomRef.once('value').then(snapshot => {
      if (snapshot.exists()) {
        alert('Uma sala com esse nome já existe.');
      } else {
        // Usar o nome da sala como ID e criar a sala
        roomRef.set({ name: roomName, password: roomPassword });
        alert(`Sala ${roomName} criada com sucesso.`);
        document.getElementById('createRoomModal').style.display = 'none';
        document.getElementById('mainScreen').style.display = 'block';
      }
    });
  } else {
    alert('Por favor, insira um nome para a sala.');
  }
});

    // Abrir modal de entrar em sala
    document.getElementById('joinRoomBtn').addEventListener('click', () => {
      document.getElementById('mainScreen').style.display = 'none';
      document.getElementById('joinRoomModal').style.display = 'block';
    });

    // Entrar em sala
    document.getElementById('joinRoomSubmit').addEventListener('click', () => {
      const roomId = document.getElementById('roomIdInput').value;
      const roomPassword = document.getElementById('roomPasswordInputJoin').value;
      if (roomId) {
        const roomRef = database.ref('rooms').child(roomId);
        roomRef.once('value').then(snapshot => {
          const roomData = snapshot.val();
          if (roomData) {
            if (roomData.password === roomPassword || roomData.password === '') {
              chatRoom = roomId;
              openChat();
            } else {
              alert('Senha incorreta.');
            }
          } else {
            alert('Sala não encontrada.');
          }
        });
        document.getElementById('joinRoomModal').style.display = 'none';
      } else {
        alert('Por favor, insira um nome da sala.');
      }
    });

    // Abrir modal de lista de salas
    document.getElementById('listRoomsBtn').addEventListener('click', () => {
    document.getElementById('mainScreen').style.display = 'none';
    document.getElementById('roomsModal').style.display = 'block';

    // Lista fixa de nomes de salas
    const allowedRooms = ["CULINÁRIA", "ESPORTE", "ESTUDOS", "FILMES", "GERAL", "JOGOS", "LIVROS", "MÚSICA", "NOTÍCIAS", "SAÚDE", "TECNOLOGIA"];
    
    const roomsRef = database.ref('rooms').limitToFirst(12);
    roomsRef.once('value').then(snapshot => {
        const roomsElement = document.getElementById('rooms');
        roomsElement.innerHTML = '';

        snapshot.forEach(childSnapshot => {
            const roomName = childSnapshot.val().name;

            // Exibir apenas se o nome da sala estiver na lista permitida
            if (allowedRooms.includes(roomName)) {
                const roomId = childSnapshot.key;
                const roomBtn = document.createElement('button');
                roomBtn.textContent = roomName;
                roomBtn.className = 'room-btn';
                roomBtn.addEventListener('click', () => {
                    document.getElementById('roomIdInput').value = roomId;
                    document.getElementById('joinRoomBtn').click();
                });
                roomsElement.appendChild(roomBtn);
            }
        });
    });
});

    // Função para abrir a interface de chat
    function openChat() {
      if (chatRoom) {
        closeModal();
        document.getElementById('chatModal').style.display = 'block';
        const messagesRef = database.ref('rooms').child(chatRoom).child('messages');
        messagesRef.on('child_added', snapshot => {
          const message = snapshot.val();
          const messageElement = document.createElement('div');
          if (message.photoURL) {
            const img = document.createElement('img');
            img.src = message.photoURL;
            messageElement.appendChild(img);
          }
          const text = document.createElement('span');
          text.textContent = `${message.userName}: ${message.text}`;
          messageElement.appendChild(text);
          document.getElementById('messages').appendChild(messageElement);
        });
      } else {
        alert('Você não está em nenhuma sala.');
      }
    }

    // Enviar mensagem
    document.getElementById('sendMessage').addEventListener('click', () => {
      const messageText = document.getElementById('messageInput').value;
      if (messageText && chatRoom) {
        const messagesRef = database.ref('rooms').child(chatRoom).child('messages');
        messagesRef.push().set({
          text: messageText,
          userName: userName,
          photoURL: userPhotoURL,
        });
        document.getElementById('messageInput').value = '';
      } else {
        alert('Digite uma mensagem ou certifique-se de que você está em uma sala.');
      }
    });

    // Atualizar status de digitação
    const messageInput = document.getElementById('messageInput');
    messageInput.addEventListener('input', () => {
      if (chatRoom) {
        const typingRef = database.ref('rooms').child(chatRoom).child('typing');
        typingRef.set(userName);
        setTimeout(() => {
          typingRef.remove();
        }, 3000);
      }
    });

    // Mostrar status de digitação
    database.ref('rooms').on('child_changed', snapshot => {
      if (chatRoom) {
        const typingRef = database.ref('rooms').child(chatRoom).child('typing');
        typingRef.on('value', snapshot => {
          const typingUser = snapshot.val();
          if (typingUser) {
            document.getElementById('typingStatus').textContent = `${typingUser} está digitando...`;
          } else {
            document.getElementById('typingStatus').textContent = '';
          }
        });
      }
    });
    // Função para abrir a imagem no modal
  function openImageModal(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('imgInModal');
    modal.style.display = 'block';
    modalImg.src = src;
  }

  // Fechar o modal de imagem ao clicar no "X"
  document.querySelector('.close-image-modal').addEventListener('click', () => {
    document.getElementById('imageModal').style.display = 'none';
  });

  // Fechar o modal de imagem ao clicar fora da imagem
  document.getElementById('imageModal').addEventListener('click', (e) => {
    if (e.target !== document.getElementById('imgInModal')) {
      document.getElementById('imageModal').style.display = 'none';
    }
  });

// Função para abrir o chat
function openChat() {
  if (chatRoom) {
    closeModal();
    document.getElementById('chatModal').style.display = 'block';
    
    // Limpar mensagens antigas
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
    
    // Remover escuta de eventos anteriores
    if (window.messagesRef) {
      window.messagesRef.off(); // Remove todos os ouvintes do banco de dados
    }
    
    // Adicionar escuta de novas mensagens
    window.messagesRef = database.ref('rooms').child(chatRoom).child('messages');
    window.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      const messageElement = document.createElement('div');
      if (message.photoURL) {
        const img = document.createElement('img');
        img.src = message.photoURL;
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openImageModal(message.photoURL));
        messageElement.appendChild(img);
      }
      const text = document.createElement('span');
      text.textContent = `${message.userName}: ${message.text}`;
      messageElement.appendChild(text);
      messagesContainer.appendChild(messageElement);
    });
  } else {
    alert('Você não está em nenhuma sala.');
  }
}
let onlineUsersRef = null;

// Função para atualizar o contador de membros online
function updateOnlineUsersCount() {
  if (chatRoom) {
    onlineUsersRef = database.ref('rooms').child(chatRoom).child('onlineUsers');
    onlineUsersRef.on('value', snapshot => {
      const onlineUsers = snapshot.numChildren();
      document.getElementById('onlineUsersCount').textContent = `${onlineUsers} usuário(s) online`;
    });
  }
}

// Função para adicionar o usuário à lista de usuários online
function addUserToOnlineList() {
  if (chatRoom && userId) {
    const userRef = onlineUsersRef.child(userId);
    userRef.set({
      userName: userName,
      photoURL: userPhotoURL,
    });

    // Remover o usuário da lista de online ao sair
    window.addEventListener('beforeunload', () => {
      userRef.remove();
    });
  }
}

// Função para abrir o chat
function openChat() {
  if (chatRoom) {
    closeModal();
    document.getElementById('chatModal').style.display = 'block';
    
    // Limpar mensagens antigas
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
    
    // Remover escuta de eventos anteriores
    if (window.messagesRef) {
      window.messagesRef.off(); // Remove todos os ouvintes do banco de dados
    }
    
    // Adicionar escuta de novas mensagens
    window.messagesRef = database.ref('rooms').child(chatRoom).child('messages');
    window.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      const messageElement = document.createElement('div');
      if (message.photoURL) {
        const img = document.createElement('img');
        img.src = message.photoURL;
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openImageModal(message.photoURL));
        messageElement.appendChild(img);
      }
      const text = document.createElement('span');
      text.textContent = `${message.userName}: ${message.text}`;
      messageElement.appendChild(text);
      messagesContainer.appendChild(messageElement);
    });

    // Atualizar contador de membros online
    updateOnlineUsersCount();
    addUserToOnlineList();
  } else {
    alert('Você não está em nenhuma sala.');
  }
}
function requestNotificationPermission() {
  if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') {
        console.log('Permissão para notificações não concedida.');
      }
    });
  }
}

// Solicitar permissão quando o chat é carregado
requestNotificationPermission();
function sendNotification(message) {
  if (Notification.permission === 'granted') {
    const notificationOptions = {
      body: `${message.userName}: ${message.text}`,
      icon: message.photoURL || 'default-icon.png' // Substitua com um ícone de notificação se necessário
    };
    new Notification('Nova Mensagem', notificationOptions);
  }
}
// Adicionar escuta de novas mensagens
window.messagesRef.on('child_added', snapshot => {
  const message = snapshot.val();

  // Adicionar a mensagem ao chat
  const messageElement = document.createElement('div');
  if (message.photoURL) {
    const img = document.createElement('img');
    img.src = message.photoURL;
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openImageModal(message.photoURL));
    messageElement.appendChild(img);
  }
  const text = document.createElement('span');
  text.textContent = `${message.userName}: ${message.text}`;
  messageElement.appendChild(text);
  document.getElementById('messages').appendChild(messageElement);

  // Enviar notificação para a nova mensagem
  sendNotification(message);
});
function sendNotification(message) {
  if (Notification.permission === 'granted' && document.hidden) {
    const notificationOptions = {
      body: `${message.userName}: ${message.text}`,
      icon: message.photoURL || 'default-icon.png'
    };
    new Notification('Nova Mensagem', notificationOptions);
  }
}