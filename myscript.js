import {Board} from './board.js';
import { gameRules } from './gamerules.js';

let game;

class Game{
    constructor(num_holes, num_beans){
        this.num_beans = num_beans;
        this.num_holes = num_holes;
        this.newgame();
    }

    newgame(){
        this.board = new Board(this.num_holes, this.num_beans, "board");
        this.gameRules = new gameRules(this.board);
    }
    
    
    changeholes(){
        this.num_holes = parseInt(document.getElementById("input_holes").value);
    }

    changebeans(){
        this.num_beans = parseInt(document.getElementById("input_beans").value);
    }

}


window.onload = function(){
    let num_holes = 6;
    let num_beans = 4;
    game = new Game(num_holes, num_beans);
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
    game.newgame();
    document.getElementById("board").style.display = "flex";
}

document.getElementById("send_holes").onclick = function() {
    game.changeholes();
}

document.getElementById("send_beans").onclick = function() {
    game.changebeans();
}


document.getElementsByClassName("hole").onclick = function() {
    let holes = document.getElementsByClassName("hole");
    console.log("length: "+ holes.length);
}
