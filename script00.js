function toggleColumn(columnNumber) {
    var column = document.getElementById('col' + columnNumber);
    if (column.style.display === 'block') {
        column.style.display = 'none';
    } else {
        column.style.display = 'block';
    }
}
function toggleColumn(columnNumber) {
    var column = document.getElementById('col' + columnNumber);
    if (column.style.display === 'block') {
        column.style.display = 'none';
    } else {
        column.style.display = 'block';
    }
}

function toggleColumn(columnNumber) {
    var column = document.getElementById('col' + columnNumber);
    var button = event.target; // Obter o botão que foi clicado

    if (column.style.display === 'block') {
        column.style.display = 'none';
    } else {
        column.style.display = 'block';
        button.style.display = 'none'; // Ocultar o botão após a coluna ser exibida
    }
}

function toggleColumn(columnNumber, buttonId) {
    var column = document.getElementById('col' + columnNumber);
    var button = document.getElementById(buttonId); // Obter o botão pelo ID

    if (column.style.display === 'block') {
        column.style.display = 'none';
    } else {
        column.style.display = 'block';
        if (button) {
            button.style.display = 'none'; // Ocultar o botão após a coluna ser exibida
        }
    }
}

function closeColumn(columnNumber, buttonId) {
    var column = document.getElementById('col' + columnNumber);
    var button = document.getElementById(buttonId); // Obter o botão pelo ID

    column.style.display = 'none';
    button.style.display = 'none'; // Mostrar o botão novamente
}

function revealSecretButtons() {
    var input = document.getElementById('secretCodeInput').value;
    
    var secretCodes = {
        "senhaSecreta1": "secretButton1",
        "senhaSecreta2": "secretButton2",
        "senhaSecreta3": "secretButton3",
        "senhaSecreta4": "secretButton4",
        "senhaSecreta5": "secretButton5",
        "senhaSecreta6": "secretButton6",
        "senhaSecreta7": "secretButton7"
    };

    // Ocultar todos os botões antes de exibir o correto
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.style.display = 'none';
    });

    if (secretCodes[input]) {
        document.getElementById(secretCodes[input]).style.display = 'block';
    } else {
        alert("Código secreto incorreto!");
    }
}
// script.js
document.getElementById('main-button').addEventListener('click', function() {
    var subButtons = document.getElementById('sub-buttons');
    subButtons.classList.toggle('visible');
});
// script.js
let clickCount = 0;
const clicksBeforeAdditional = 7;
const clicksBeforeReset = 14;

document.getElementById('main-button').addEventListener('click', function() {
    clickCount++;

    // Mostrar os botões secundários na primeira vez que o botão é clicado
    const subButtons = document.getElementById('sub-buttons');
    if (clickCount === 1) {
        subButtons.classList.add('visible');
    }

    // Mostrar os botões adicionais após múltiplos de 7 cliques
    const extraButtons = document.getElementById('extra-buttons');
    if (clickCount === clicksBeforeAdditional || (clickCount > clicksBeforeAdditional && (clickCount - clicksBeforeAdditional) % clicksBeforeReset === 0)) {
        extraButtons.classList.add('visible');
    } else if (clickCount > clicksBeforeAdditional && (clickCount - clicksBeforeAdditional) % clicksBeforeReset !== 0) {
        extraButtons.classList.remove('visible');
    }
});