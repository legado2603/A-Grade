document.getElementById('botao-mestre').addEventListener('click', () => {
    document.getElementById('accordion').style.display = 'block';
    document.getElementById('botao-mestre').style.display = 'none'
    document.getElementById('botao-mestre').addEventListener('click', () => {
    document.getElementById('accordion').style.display = 'block';
    document.getElementById('botao-mestre').style.display = 'none';
});

document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        let modalId = button.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'block';
        button.style.boxShadow = '0 0 10px red';
    });
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        let contentId = tab.getAttribute('data-content');
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(contentId).classList.add('active');
    });
});

document.querySelectorAll('.accordion-button, #botao-mestre').forEach(button => {
    button.addEventListener('mouseover', () => {
        let tooltip = document.querySelector('.tooltip');
        tooltip.style.display = 'block';
        tooltip.style.top = button.offsetTop + 'px';
        tooltip.style.left = (button.offsetLeft + button.offsetWidth) + 'px';
        tooltip.textContent = `Tooltip for ${button.textContent}`;
    });
    button.addEventListener('mouseout', () => {
        document.querySelector('.tooltip').style.display = 'none';
    });
});

document.querySelectorAll('.tab-option').forEach(button => {
    button.addEventListener('mouseover', () => {
        let tooltip = document.querySelector('.tooltip');
        tooltip.style.display = 'block';
        tooltip.style.top = button.offsetTop + 'px';
        tooltip.style.left = (button.offsetLeft + button.offsetWidth) + 'px';
        tooltip.textContent = `Tooltip for ${button.textContent}`;
    });
    button.addEventListener('mouseout', () => {
        document.querySelector('.tooltip').style.display = 'none';
    });
});