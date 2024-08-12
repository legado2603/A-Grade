function getBotResponse(userInput) {
    // Transforme a entrada do usuário em minúsculas para facilitar a comparação
    userInput = userInput.toLowerCase();

    // Verifique a entrada do usuário e retorne a resposta apropriada
    if (userInput.includes("olá")) {
        return "Olá! Como posso te ajudar?";
    } else if (userInput.includes("como está")) {
        return "Estou bem, obrigado por perguntar!";
    } else if (userInput.includes("qual é o seu nome?")) {
        return "Meu nome é ChatBot. Como posso ajudar você hoje?";
    } else if (userInput.includes("o que você faz?")) {
        return "Eu sou um chatbot projetado para responder perguntas e ajudar com informações.";
    } else if (userInput.includes("quem te criou?")) {
        return "Fui criado por um desenvolvedor como parte de um projeto.";
    } else {
        return "Desculpe, não entendi. Por favor, reformule sua pergunta.";
    }
}