import {Board} from './board.js';


window.onload = function(){
    var num_holes = 6;
    var num_beans = 4;
    new Board(num_holes, num_beans, "board");
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
    config_options();
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

function config_options(){
    document.getElementById("send_holes").addEventListener("click", changeholes());
    document.getElementById("send_beans").addEventListener("click", changebeans());
}

function changeholes(){
    var input_holes = document.getElementById("input_holes").value;
    new Board(input_holes, 4, "board");
}

function changebeans(){
    var input_beans = document.getElementById("input_beans").value;
    new Board(6, input_beans, "board");
}