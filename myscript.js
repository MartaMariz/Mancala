import {Board} from './board.js';

window.onload = function(){
    var num_cavities = 6;
    var num_beans = 4;
    this.board = new Board(this, num_cavities, num_beans);
    //var boardcontainer = document.getElementById("board");
    //boardcontainer.appendChild(this.board);
}

function apagarConfig() {
    document.getElementById("config").style.display = "none";
}

function apagarInstrucoes() {
    document.getElementById("instrucoes").style.display = "none";
}

function apagarBoard() {
    document.getElementById("board").style.display = "none";
}

function apagarLogIn() {
    document.getElementById("login").style.display = "none";
}

function apagarSignUp() {
    document.getElementById("signup").style.display = "none";
}



document.getElementById("botao_instrucoes").onclick = function() {
    apagarBoard();
    apagarLogIn();
    apagarSignUp();
    apagarConfig();
    document.getElementById("instrucoes").style.display = "block";
}

document.getElementById("botao_config").onclick = function() {
    apagarBoard();
    apagarLogIn();
    apagarSignUp();
    apagarInstrucoes();
    document.getElementById("config").style.display = "block";
}

document.getElementById("botao_login").onclick = function() {
    apagarBoard();
    apagarInstrucoes();
    apagarSignUp();
    apagarConfig();
    document.getElementById("login").style.display = "block";
}

document.getElementById("botao_signup").onclick = function() {
    apagarBoard();
    apagarInstrucoes();
    apagarLogIn();
    apagarConfig();
    document.getElementById("signup").style.display = "block";
}

document.getElementById("novojogo").onclick = function() {
    apagarConfig();
    apagarLogIn();
    apagarSignUp();
    apagarInstrucoes();
    document.getElementById("board").style.display = "flex";
}

function changeholes(){
    var input_holes = document.getElementById("input_holes").value;
    createBoard(input_holes, 2, 4);
}

function changebeans(){
    var input_beans = document.getElementById("input_beans").value;
    createBoard(6, 2, input_beans);
}

function placeBeanRandom(bean, hole) {
  
    var parent = hole;
    
    // Limit the random number for the coordinates
    var parentPosition = parent.getBoundingClientRect(),
        beanPosition = bean.getBoundingClientRect(),
        x = Math.floor(Math.random() * (parentPosition.width - beanPosition.width)) + parentPosition.left,
        y = Math.floor(Math.random() * (parentPosition.height - beanPosition.height)) + parentPosition.top;
    
    console.log(parentPosition.top, parentPosition.right, parentPosition.bottom, parentPosition.left);

    bean.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
  };