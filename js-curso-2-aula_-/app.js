// modificar texto html
function exibirNaTela(tag, texto) {
    let textos = document.querySelector(tag);
    textos.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

function exibirMensagemInicial() {
    exibirNaTela('h1', 'Jogo do número secreto');
    exibirNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

// variaveis
let listaDeNumeroAleatorio = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;

// funçõa para gerar números aleatorios, e junto com a lista para impedir a repetição de números
function gerarNumeroAleatorio() {
    let numeroEscolhido =  parseInt(Math.random() * 10 + 1);
    if (listaDeNumeroAleatorio.length == 10) {
        listaDeNumeroAleatorio = [];
    } if (listaDeNumeroAleatorio.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroAleatorio.push(numeroEscolhido);
        return numeroEscolhido;
    }     
}

// função para limpar o chute
function limparChute() {
    chute = document.querySelector('input');
    chute.value = '';
}

// botão de chute
// comparando chute e o númemro secreto
function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirNaTela('h1', 'Parabens!!!');
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto com ${tentativa} ${palavraTentativa}`;
        exibirNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        console.log(listaDeNumeroAleatorio)
    } else {
        tentativa++;
        limparChute();
        if (chute > numeroSecreto) {
            exibirNaTela('p', `o número secreto é menor que ${chute}`);
        } else {
            exibirNaTela('p', `O número secreto é maior que ${chute}`);
        }
    }
}

// botão reiniciar jogo
function reiniciarJogo() {
    exibirMensagemInicial();
    limparChute();
    numeroSecreto = gerarNumeroAleatorio();
    tentativa = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}