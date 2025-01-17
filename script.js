const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");

const startPauseBt = document.querySelector("#start-pause");
const startPauseBtImg = document.querySelector("#start-pause img");
const startPauseBtText = document.querySelector("#start-pause span");
const displayTempo = document.querySelector("#timer");

const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("./sons/luna-rise-part-one.mp3");

const audioPlay = new Audio("./sons/play.wav");
const audioPausa = new Audio("./sons/pause.mp3");
const audioTempoFinalizado = new Audio("./sons/beep.mp3");

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = duracaoFoco;
  alterarContexto("foco");g
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = duracaoDescansoCurto;
  alterarContexto("descanso-curto");  
});

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = duracaoDescansoLongo;
  alterarContexto("descanso-longo");  
});

function alterarContexto(contexto) {
  mostrarTempo();
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);

  botoes.forEach((botao) => {
    botao.classList.remove("active");
  });

  switch (contexto) {
    case "foco":
      focoBt.classList.add("active");
      titulo.innerHTML = ` Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      curtoBt.classList.add("active");
      titulo.innerHTML = ` Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      longoBt.classList.add("active");
      titulo.innerHTML = ` Hora de voltar a superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    audioTempoFinalizado.play();
    alert("Tempo finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    audioPausa.play();
    zerar();
    return;
  }
  audioPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  startPauseBtText.textContent = "Pausar";
  startPauseBtImg.setAttribute("src", "./imagens/pause.png");
}

function zerar() {
  clearInterval(intervaloId);
  startPauseBtText.textContent = "Começar"
  startPauseBtImg.setAttribute("src", "./imagens/play_arrow.png");
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-BR", {minute: '2-digit', second: '2-digit'});
  displayTempo.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
alterarContexto("foco");
