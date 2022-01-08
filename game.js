import {Board} from './board.js';
import { gameRules } from './gamerules.js';

let game;

class Game{
    constructor(num_holes, num_beans, ai_level){
        this.num_beans = num_beans;
        this.num_holes = num_holes;
        this.ai_level = ai_level;
        this.starts = 1;
        this.opponent = "ai";
        this.newGame();
    }

    newGame(){
        this.board = new Board(this.num_holes, this.num_beans, "board");
        this.game_rules = new gameRules(this.board, this.ai_level, this.starts, this.opponent);
    }
    
    setHoles(){
        this.num_holes = parseInt(document.getElementById("input_holes").value);
    }

    setBeans(){
        this.num_beans = parseInt(document.getElementById("input_beans").value);
    }

    setDifficulty(){
        this.ai_level = parseInt(document.getElementById("input_difficulty").value);
    }

    default(){
        this.num_beans = 4;
        this.num_holes = 6;
        this.ai_level = 1;
        this.opponent = "ai";
        this.starts = 1;
    }

    setStarts(player){
        this.starts = player;
    }

    setOpponent(op){
        this.opponent = op;
    }

}


window.onload = function(){
    document.getElementById("continuar_jogo").style.display = "none";
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
    document.getElementById("continuar_jogo").style.display = "block";
    document.getElementById("instrucoes").style.display = "block";
}

document.getElementById("botao_config").onclick = function() {
    apagarBoard();
    apagarLogIn();
    apagarSignUp();
    apagarInstrucoes();
    document.getElementById("continuar_jogo").style.display = "block";
    document.getElementById("config").style.display = "block";
}

document.getElementById("botao_login").onclick = function() {
    apagarBoard();
    apagarInstrucoes();
    apagarSignUp();
    apagarConfig();
    document.getElementById("continuar_jogo").style.display = "block";
    document.getElementById("login").style.display = "block";
}

document.getElementById("botao_signup").onclick = function() {
    apagarBoard();
    apagarInstrucoes();
    apagarLogIn();
    apagarConfig();
    document.getElementById("continuar_jogo").style.display = "block";
    document.getElementById("signup").style.display = "block";
}

document.getElementById("novo_jogo").onclick = function() {
    apagarConfig();
    apagarLogIn();
    apagarSignUp();
    apagarInstrucoes();
    game.newGame();
    document.getElementById("board").style.display = "flex";
}

document.getElementById("continuar_jogo").onclick = function() {
    apagarConfig();
    apagarLogIn();
    apagarSignUp();
    apagarInstrucoes();
    document.getElementById("board").style.display = "flex";
}

document.getElementById("send_holes").onclick = function() {
    game.setHoles();
}

document.getElementById("send_beans").onclick = function() {
    game.setBeans();
}

document.getElementById("send_difficulty").onclick = function() {
    game.setDifficulty();
}

document.getElementById("send_default").onclick = function() {
    game.default();
}

document.getElementById("input_player1").onclick = function() {
    game.setStarts(1);
}

document.getElementById("input_player2").onclick = function() {
    game.setStarts(2);
}

document.getElementById("input_pc").onclick = function() {
    game.setOpponent("ai");
}

document.getElementById("input_player").onclick = function() {
    game.setOpponent("player");
}