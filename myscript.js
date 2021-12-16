import {Board} from './board.js';

var game;

class GameObjects{
    constructor(num_holes, num_beans){
        this.board = new Board(num_holes, num_beans, "board");
    }
    
    changeholes(){
        var input_holes = document.getElementById("input_holes").value;
        let prev_board = this.board;
        let num_beans = prev_board.num_beans;
        this.board = new Board(input_holes, num_beans, "board");
    }

    changebeans(){
        var input_beans = document.getElementById("input_beans").value;
        let prev_board = this.board;
        let num_holes = prev_board.num_holes;
        new Board(num_holes, input_beans, "board");
    }

}


window.onload = function(){
    let num_holes = 6;
    let num_beans = 4;
    game = new GameObjects(num_holes, num_beans);
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

document.getElementById("send_holes").onclick = function() {
    game.changeholes();
}

document.getElementById("send_beans").onclick = function() {
    game.changebeans();
}
