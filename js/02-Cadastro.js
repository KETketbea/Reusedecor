const menu = document.querySelector('.menu');
const NavMenu = document.querySelector('.nav-menu');

menu.addEventListener('click', () => {
    menu.classList.toggle('ativo');
    NavMenu.classList.toggle('ativo');
});

function validarNome(nome) {
    let nomeRegex = /^[a-zA-ZÀ-ÿ\s']{3,}$/;
    return nomeRegex.test(nome);
}

function validarEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validarSenha(senha) {
    let senhaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/;
    return senhaRegex.test(senha);
}

const exibirMensagemErro = (campo, mensagem) => {
    const campoElement = document.getElementById(campo);
    const mensagemAtual = document.querySelector(`#${campo}-erro`);

    if (mensagemAtual) {
        mensagemAtual.remove();
    }

    const mensagemElement = document.createElement('p');
    mensagemElement.textContent = mensagem;
    mensagemElement.id = `${campo}-erro`;
    mensagemElement.style.color = 'red';
    campoElement.parentNode.insertBefore(mensagemElement, campoElement.nextSibling);

    setTimeout(() => {
        mensagemElement.remove();
    }, 3000);
}

const exibirMensagemSucesso = () => {
    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
        label.classList.add('green-message');
        label.style.pointerEvents = 'none';
    });

    const mensagemSucesso = document.createElement('p');
    mensagemSucesso.textContent = 'Parabéns, você foi cadastrado com sucesso em nosso site!';
    mensagemSucesso.classList.add('mensagem-sucesso'); // Adiciona uma classe para aplicar o estilo CSS
    document.getElementById('cadastro').appendChild(mensagemSucesso);

    // Remove o evento de submit após exibir a mensagem de sucesso
    document.getElementById('cadastro').removeEventListener('submit', submitForm);
}

function submitForm(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!validarNome(nome)) {
        exibirMensagemErro('nome', 'Por favor, insira um nome válido.');
    }

    if (!validarEmail(email)) {
        exibirMensagemErro('email', 'Por favor, insira um e-mail válido.');
    }

    if (!validarSenha(senha)) {
        exibirMensagemErro('senha', 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.');
    }

    if (validarNome(nome) && validarEmail(email) && validarSenha(senha)) {
        exibirMensagemSucesso();
    }
}

document.getElementById('cadastro').addEventListener('submit', submitForm);

document.querySelectorAll('label').forEach(label => {
    label.addEventListener('click', () => {
        if (document.querySelector('.green-message') !== null) {
            return false;
        }
    });
});

// Função para exibir o alerta de confirmação ao sair da página
function confirmExit(event) {
    if (document.querySelector('.green-message') === null) {
        event.preventDefault();
        event.returnValue = ''; // Para navegadores mais antigos
        return ''; // Para navegadores modernos
    }
}

// Evento antes de sair da página
window.addEventListener('beforeunload', confirmExit);