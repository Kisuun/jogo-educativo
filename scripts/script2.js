let n1, n2;
let r1, r2;
let respostaC;
let pontos = 0;
let vidas = 3;
let bloqueado = false;

const sinais = ["-", "+"];
let sim = "-";


function sinalr() {
  sim = sinais[Math.floor(Math.random() * sinais.length)];
}


function start() {
  sinalr();
  document.getElementById("start").style.display = "none";
  document.getElementById("certoerrado").innerHTML = "";
  
  n1 = Math.floor(Math.random() * 16);
  n2 = Math.floor(Math.random() * 16);
  r1 = Math.floor(Math.random() * 16);
  r2 = Math.floor(Math.random() * 16);

  document.getElementById("contas").innerText = `${n1} ${sim} ${n2}`;
  document.getElementById("score").innerText = pontos;
  document.getElementById("pontos").style.display = "flex";
  document.getElementById("lifes").style.display = "flex";

  menosvida();
  mandar();
  maximo();
}


function derrota() {
  document.getElementById("pop-perdeu").style.display = "flex";
  pontos = 0;
}


function checar(botao) {
  if (bloqueado) return;
  bloqueado = true;

  if (Number(botao.innerText) === respostaC) {
    document.getElementById("certoerrado").innerHTML =
      `<p style="background-color: green;">certa resposta</p>`;
    pontos += 1;
  } else {
    document.getElementById("certoerrado").innerHTML =
      `<p style="background-color: red;">resposta errada</p>`;
    vidas -= 1;
  }

  setTimeout(() => {
    bloqueado = false;
    start();
  }, 1000);
}


function mandar() {
  const Divresult = document.getElementById("result");
  Divresult.innerHTML = "";

  if (sim === "+") {
    respostaC = n1 + n2;
    let respostaE1 = respostaC + r1;
    let respostaE2 = n1 + r1 + r2;

    // evita respostas repetidas
    if (respostaE1 === respostaC) respostaE1 += 1;
    if (respostaE2 === respostaC || respostaE2 === respostaE1) respostaE2 += 2;

    criarBotoes([respostaC, respostaE1, respostaE2], Divresult);
  }

  if (sim === "-") {
    if (n1 < n2) {
      [n1, n2] = [n2, n1]; // troca
    }

    respostaC = n1 - n2;
    let respostaE1 = respostaC - r1;
    let respostaE2 = respostaC - r2;

    // garante números distintos
    if (respostaE1 === respostaC) respostaE1 += 1;
    if (respostaE2 === respostaC || respostaE2 === respostaE1) respostaE2 += 2;

    document.getElementById("contas").innerText = `${n1} - ${n2}`;
    criarBotoes([respostaC, respostaE1, respostaE2], Divresult);
  }
}


function criarBotoes(array, container) {
  array.sort(() => Math.random() - 0.5);
  array.forEach((valor) => {
    const botao = document.createElement("button");
    botao.innerText = valor;
    botao.onclick = () => checar(botao);
    container.appendChild(botao);
  });
}


function menosvida() {
  const vida1 = document.getElementById("v1");
  const vida2 = document.getElementById("v2");
  const vida3 = document.getElementById("v3");

  vida1.style.display = vidas >= 1 ? "block" : "none";
  vida2.style.display = vidas >= 2 ? "block" : "none";
  vida3.style.display = vidas === 3 ? "block" : "none";

  if (vidas <= 0) derrota();
}


function restart() {
  document.getElementById("pop-perdeu").style.display = "none";
  pontos = 0;
  vidas = 3;
  menosvida();
  start();
}

function maximo(){
  if(pontos === 10){
    document.getElementById("pop-proximo").style.display= "block";
  }
}