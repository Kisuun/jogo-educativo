let n1, n2, r1, r2;
let respostaC;
let pontos = 0;
let vidas = 3;
let bloqueado = false;

const sinais = ["-", "+", "X", "÷"];
let simbolo;
let sim = "x";

function sinalr() {
  simbolo = sinais.sort(() => Math.random() - 0.5);
  sim = simbolo[0];
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
  console.log(vidas);
}

function derrota() {
  document.getElementById("pop-perdeu").style.display = "flex";
  pontos = 0;
}

function checar(botao) {
  if (bloqueado) return; // impede clique duplo
  bloqueado = true;

  if (Number(botao.innerText) === respostaC) {
    document.getElementById("certoerrado").innerHTML = `<p style="background-color: green;"> certa resposta</p>`;
    pontos += 1;
  } else {
    document.getElementById("certoerrado").innerHTML = `<p style="background-color: red;"> resposta errada</p>`;
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

  // SOMA
  if (sim === "+") {
    respostaC = n1 + n2;
    let respostaE1 = respostaC + r1;
    let respostaE2 = n1 + r1 + r2;

    let tentativas = 0;
    while (
      (respostaC === respostaE1 ||
        respostaC === respostaE2 ||
        respostaE1 === respostaE2) &&
      tentativas < 20
    ) {
      r1 = Math.floor(Math.random() * 16);
      r2 = Math.floor(Math.random() * 16);
      respostaE1 = respostaC + r1;
      respostaE2 = n1 + r1 + r2;
      tentativas++;
    }

    const botoes = [respostaC, respostaE1, respostaE2].sort(
      () => Math.random() - 0.5
    );

    botoes.forEach((valor) => {
      const botao = document.createElement("button");
      botao.innerText = valor;
      botao.onclick = () => checar(botao);
      Divresult.appendChild(botao);
    });
  }

  // SUBTRAÇÃO
  if (sim === "-") {
    if (n1 < n2) {
      let temp = n1;
      n1 = n2;
      n2 = temp;
    }

    respostaC = n1 - n2;
    let respostaE1 = respostaC - r1;
    let respostaE2 = respostaC - r2;

    let tentativas = 0;
    while (
      (respostaC === respostaE1 ||
        respostaC === respostaE2 ||
        respostaE1 === respostaE2) &&
      tentativas < 20
    ) {
      r1 = Math.floor(Math.random() * 16);
      r2 = Math.floor(Math.random() * 16);
      respostaE1 = respostaC - r1;
      respostaE2 = respostaC - r2;
      tentativas++;
    }

    document.getElementById("contas").innerText = `${n1} - ${n2}`;

    const botoes = [respostaC, respostaE1, respostaE2].sort(
      () => Math.random() - 0.5
    );

    botoes.forEach((valor) => {
      const botao = document.createElement("button");
      botao.innerText = valor;
      botao.onclick = () => checar(botao);
      Divresult.appendChild(botao);
    });
  }

  // MULTIPLICAÇÃO
  if (sim === "X") {
    respostaC = n1 * n2;
    let respostaE1 = n2 * r2;
    let respostaE2 = n1 * r1;

    let tentativas = 0;
    while (
      (respostaC === respostaE1 ||
        respostaC === respostaE2 ||
        respostaE1 === respostaE2) &&
      tentativas < 20
    ) {
      r1 = Math.floor(Math.random() * 16);
      r2 = Math.floor(Math.random() * 16);
      respostaE1 = n2 * r2;
      respostaE2 = n1 * r1;
      tentativas++;
    }

    const botoes = [respostaC, respostaE1, respostaE2].sort(
      () => Math.random() - 0.5
    );

    botoes.forEach((valor) => {
      const botao = document.createElement("button");
      botao.innerText = valor;
      botao.onclick = () => checar(botao);
      Divresult.appendChild(botao);
    });
  }

  // DIVISÃO
  if (sim === "÷") {
    if (n2 === 0) n2 = 1;
    if (r1 === 0) r1 = 1;
    if (r2 === 0) r2 = 1;

    if (n1 < n2) {
      let temp = n1;
      n1 = n2;
      n2 = temp;
    }

    respostaC = +(n1 / n2).toFixed(2);
    let respostaE1 = +(n1 / r1).toFixed(2);
    let respostaE2 = +(n2 / r2).toFixed(2);

    let tentativas = 0;
    while (
      (respostaC === respostaE1 ||
        respostaC === respostaE2 ||
        respostaE1 === respostaE2) &&
      tentativas < 20
    ) {
      r1 = Math.floor(Math.random() * 15) + 1;
      r2 = Math.floor(Math.random() * 15) + 1;
      respostaE1 = +(n1 / r1).toFixed(2);
      respostaE2 = +(n2 / r2).toFixed(2);
      tentativas++;
    }

    document.getElementById("contas").innerText = `${n1} ÷ ${n2}`;

    const botoes = [respostaC, respostaE1, respostaE2].sort(
      () => Math.random() - 0.5
    );

    botoes.forEach((valor) => {
      const botao = document.createElement("button");
      botao.innerText = valor;
      botao.onclick = () => checar(botao);
      Divresult.appendChild(botao);
    });
  }
}

function menosvida() {
  const vida1 = document.getElementById("v1");
  const vida2 = document.getElementById("v2");
  const vida3 = document.getElementById("v3");

  if (vidas === 2) vida3.style.display = "none";
  if (vidas === 1) vida2.style.display = "none";
  if (vidas <= 0) vida1.style.display = "none";

  if (vidas <= 0) derrota();

  if (vidas === 3) {
    vida3.style.display = "block";
    vida2.style.display = "block";
    vida1.style.display = "block";
  }
}

function restart() {
  document.getElementById("pop-perdeu").style.display = "none";
  pontos = 0;
  vidas = 3;
  menosvida();
  start();
}
