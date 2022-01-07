import {Board} from './board.js';
import { gameRules } from './gamerules.js';

let game;

class Game{
    constructor(num_holes, num_beans, ai_level){
        this.num_beans = num_beans;
        this.num_holes = num_holes;
        this.ai_level = ai_level;
        this.newgame();
    }

    newgame(){
        this.board = new Board(this.num_holes, this.num_beans, "board");
        this.game_rules = new gameRules(this.board, this.ai_level);
    }
    
    changeholes(){
        this.num_holes = parseInt(document.getElementById("input_holes").value);
    }

    changebeans(){
        this.num_beans = parseInt(document.getElementById("input_beans").value);
    }

    changedifficulty(){
        this.ai_level = parseInt(document.getElementById("input_difficulty").value);
    }

    default(){
        this.num_beans = 4;
        this.num_holes = 6;
        this.ai_level = 1;
    }

}


window.onload = function(){
    document.getElementById("continuarjogo").style.display = "none";
    let num_holes = 6;
    let num_beans = 4;
    let ai_level = 1;
    game = new Game(num_holes, num_beans, ai_level);
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
    document.getElementById("continuarjogo").style.display = "block";
    document.getElementById("instrucoes").style.display = "block";
}

document.getElementById("botao_config").onclick = function() {
    apagarBoard();
    apagarLogIn();
    apagarSignUp();
    apagarInstrucoes();
    document.getElementById("continuarjogo").style.display = "block";
    document.getElementById("config").style.display = "block";
}

document.getElementById("botao_login").onclick = function() {
    apagarBoard();
    apagarInstrucoes();
    apagarSignUp();
    apagarConfig();
    document.getElementById("continuarjogo").style.display = "block";
    document.getElementById("login").style.display = "block";
}

document.getElementById("botao_signup").onclick = function() {
    apagarBoard();
    apagarInstrucoes();
    apagarLogIn();
    apagarConfig();
    document.getElementById("continuarjogo").style.display = "block";
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

document.getElementById("continuarjogo").onclick = function() {
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

document.getElementById("send_difficulty").onclick = function() {
    game.changedifficulty();
}

document.getElementById("send_default").onclick = function() {
    game.default();
}