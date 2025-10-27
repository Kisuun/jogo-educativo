let n1,n2;
let r1,r2;
let respostaC;
let pontos = 0;
let vidas = 3;
const sinais = ["-", "+"];
let simbolo;
let sim = "-";


function sinalr(){
simbolo = sinais.sort(() => Math.random() -0.5);
sim = simbolo[0];

}


function start(){
  document.getElementById("certoerrado").innerHTML = "";
  n1 = Math.floor(Math.random() * 16);
  n2 = Math.floor(Math.random() * 16);
  r1 = Math.floor(Math.random() * 16);
  r2 = Math.floor(Math.random() * 16);
  document.getElementById("contas").innerText = `${n1} ${sim} ${n2}` ;
  document.getElementById("score").innerText = pontos;
  document.getElementById("pontos").style.display="flex" ;
  document.getElementById("lifes").style.display="flex" ;
  menosvida();
  mandar();
  sinalr();
  console.log(vidas);
}

function derrota(){
    document.getElementById("pop-perdeu").style.display ="flex";
    pontos = 0;
}

function checar(botao){
  if(Number(botao.innerText) === respostaC){
    document.getElementById("certoerrado").innerHTML = `<p style= "background-color: green;"> certa resposta</p>`;
    pontos += 1;
    setTimeout(() => {
      start();
    },1000)
  }
  else{
    document.getElementById("certoerrado").innerHTML = `<p style= "background-color: red;"> resposta errada</p>`;
    vidas -= 1;
    setTimeout(() => {
      start();
    },1000)
    
  }
    
    
}

function mandar(){
    if (sim === "+"){
  respostaC = n1 + n2;
  let respostaE1 = respostaC + r1;
  let respostaE2 = n1 + r1 + r2;
  
  while(respostaC === respostaE1 || respostaC === respostaE2 || respostaE1 === respostaE2){
  r1 = Math.floor(Math.random() * 16);
  r2 = Math.floor(Math.random() * 16);
  respostaE1 = respostaC + r1;
  respostaE2 = n1 + r1 + r2;
}
 
 const Divresult = document.getElementById("result");
 Divresult.innerHTML = "";

const resultado1 = document.createElement("button");
const resultado2 = document.createElement("button");
const resultado3 = document.createElement("button");

if (respostaC != respostaE1 && respostaC != respostaE2){
resultado1.innerHTML = respostaC;
resultado2.innerHTML = respostaE1;
resultado3.innerHTML = respostaE2;}


const botoes = [resultado1, resultado2, resultado3];

botoes.sort(() => Math.random() -0.5);

botoes.forEach((botao)=>{
  botao.onclick = () => checar(botao)
  
})

Divresult.append(...botoes);
    }
        if (sim === "-"){
  respostaC = n1 - n2;
  let respostaE1 = respostaC - r1;
  let respostaE2 = n1 - r1 - r2;

  while(n1 < n2){
  n1 = Math.floor(Math.random() * 16);
  n2 = Math.floor(Math.random() * 16);
  respostaE1 = respostaC - r1;
  respostaE2 = respostaC - r2;

  }
  
  while(respostaC === respostaE1 || respostaC === respostaE2 || respostaE1 === respostaE2){
  r1 = Math.floor(Math.random() * 16);
  r2 = Math.floor(Math.random() * 16);
  respostaE1 = respostaC - r1;
  respostaE2 = respostaC - r2;
}
 
 const Divresult = document.getElementById("result");
 Divresult.innerHTML = "";

const resultado1 = document.createElement("button");
const resultado2 = document.createElement("button");
const resultado3 = document.createElement("button");

if (respostaC != respostaE1 && respostaC != respostaE2){
resultado1.innerHTML = respostaC;
resultado2.innerHTML = respostaE1;
resultado3.innerHTML = respostaE2;}


const botoes = [resultado1, resultado2, resultado3];

botoes.sort(() => Math.random() -0.5);

botoes.forEach((botao)=>{
  botao.onclick = () => checar(botao)
  
})

Divresult.append(...botoes);
}
}


function menosvida(){
  const vida1 = document.getElementById("v1");
  const vida2 = document.getElementById("v2");
  const vida3 = document.getElementById("v3");
  
  if (Number(vidas===2)){
    vida3.style.display="none";
  }
  if (Number(vidas===1)){
    vida2.style.display="none";
  }
if (Number(vidas===0)){
    vida1.style.display="none";
  }
  if (Number(vidas===0)){
    derrota();
  }

  if(vidas === 3){
    vida3.style.display="block";
    vida2.style.display="block";
    vida1.style.display="block";
  }
}




function restart(){
    document.getElementById("pop-perdeu").style.display = "none"
    pontos = 0;
    vidas = 3;
    menosvida();
    start();

}