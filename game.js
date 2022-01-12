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
        this.user = "Visitante";
        this.newGame();
    }

    newGame(){
        this.board = new Board(this.num_holes, this.num_beans, "board", this);
        this.game_rules = new gameRules(this.board, this.ai_level, this.starts, this.opponent, this);
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

    setUser(username){
        this.user = username;
    }

    addPoints(points, ai_level){
        if (this.user == "Visitante") return;
        const user_info = JSON.parse(localStorage.getItem(this.user));

        if (!user_info.hasOwnProperty('history'))
            user_info['history'] = [{points: points, ai_level: ai_level}];
        else 
            user_info['history'].push({points: points, ai_level: ai_level});

        localStorage.setItem(this.user, JSON.stringify(user_info));

        updateLeaderboard(points, this.user, ai_level);
    }

}


window.onload = function(){
    document.getElementById("continuar_jogo").style.display = "none";
    loadLeaderboard();
    let num_holes = 6;
    let num_beans = 4;
    let ai_level = 1;
    game = new Game(num_holes, num_beans, ai_level);
}

function eraseConfig() {
    document.getElementById("config").style.display = "none";
}

function eraseInstrucoes() {
    document.getElementById("instrucoes").style.display = "none";
}

function eraseGame() {
    document.getElementById("game").style.display = "none";
}

function eraseLogIn() {
    document.getElementById("login").style.display = "none";
}

function eraseSignUp() {
    document.getElementById("signup").style.display = "none";
}

function eraseClassificacoes() {
    document.getElementById("classificacoes").style.display = "none";
}

function logIn(username){
    document.getElementById("user").innerHTML = username;
    document.getElementById("user").style.display = "block";
    game.setUser(username);
}


document.getElementById("botao_instrucoes").onclick = function() {
    eraseGame();
    eraseLogIn();
    eraseSignUp();
    eraseConfig();
    eraseClassificacoes();
    document.getElementById("continuar_jogo").style.display = "block";
    document.getElementById("instrucoes").style.display = "block";
}

document.getElementById("botao_config").onclick = function() {
    eraseGame();
    eraseLogIn();
    eraseSignUp();
    eraseInstrucoes();
    eraseClassificacoes();
    document.getElementById("continuar_jogo").style.display = "block";
    document.getElementById("config").style.display = "block";
}

document.getElementById("botao_login").onclick = function() {
    eraseGame();
    eraseInstrucoes();
    eraseSignUp();
    eraseConfig();
    eraseClassificacoes();
    document.getElementById("continuar_jogo").style.display = "block";
    document.getElementById("login").style.display = "block";
}

document.getElementById("botao_classificacoes").onclick = function() {
    eraseGame();
    eraseInstrucoes();
    eraseLogIn();
    eraseSignUp();
    eraseConfig();
    document.getElementById("continuar_jogo").style.display = "block";
    document.getElementById("classificacoes").style.display = "block";
}

document.getElementById("botao_signup").onclick = function() {
    eraseGame();
    eraseInstrucoes();
    eraseLogIn();
    eraseConfig();
    eraseClassificacoes();
    document.getElementById("continuar_jogo").style.display = "block";
    document.getElementById("signup").style.display = "block";
}

document.getElementById("novo_jogo").onclick = function() {
    eraseConfig();
    eraseLogIn();
    eraseSignUp();
    eraseClassificacoes();
    eraseInstrucoes();
    game.newGame();
    document.getElementById("game").style.display = "block";
}

document.getElementById("continuar_jogo").onclick = function() {
    eraseConfig();
    eraseLogIn();
    eraseClassificacoes();
    eraseSignUp();
    eraseInstrucoes();
    document.getElementById("game").style.display = "block";
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
    document.getElementById("turn").innerHTML = 'Vez do Player1';
}

document.getElementById("input_player2").onclick = function() {
    game.setStarts(2);
    document.getElementById("turn").innerHTML = 'Vez do Player2';
}

document.getElementById("input_pc").onclick = function() {
    game.setOpponent("ai");
}

document.getElementById("input_player").onclick = function() {
    game.setDifficulty(0);
    game.setOpponent("player");
}

document.getElementById("send_login").onclick = function() {
    const user = JSON.parse(localStorage.getItem(document.getElementById("input_login_user").value));
    if (user == null) {
        alert("User not found!");
        return;
    }
    if (user.password == document.getElementById("input_login_pass").value)
        logIn(document.getElementById("input_login_user").value);
}

document.getElementById("send_signup").onclick = function() {
    const user = JSON.parse(localStorage.getItem(document.getElementById("input_signup_user").value));
    if (user != null) {
        alert("User already exists!");
        return;
    }

    if (document.getElementById("input_signup_pass").value == document.getElementById("confirm_pass").value){
        localStorage.setItem(document.getElementById("input_signup_user").value,
        JSON.stringify({
            password: document.getElementById("input_signup_pass").value,
            history: []
        }))
        logIn(document.getElementById("input_signup_user").value);
    }
}

function allStorage() {
    return { ...localStorage };
}

function loadLeaderboard(){
    const classif = document.getElementById("boardbody");
    let user_info;
    const values = allStorage();
    
    for (let i in values){
        user_info = JSON.parse(values[i]);
        let user = localStorage.key(i);

        if (user_info.hasOwnProperty('history')) {
            for (let j in user_info.history) {

                let play = user_info.history[j];
                let new_points = document.createElement("tr");
                new_points.setAttribute("class", "points");

                let username = document.createElement("td");
                username.innerHTML = user;
                let points = document.createElement("td");
                points.innerHTML = play.points;
                let ai_level = document.createElement("td");
                ai_level.innerHTML = play.ai_level;

                new_points.appendChild(username);
                new_points.appendChild(points);
                new_points.appendChild(ai_level);

                classif.appendChild(new_points);
            }
        }
    }
}

function updateLeaderboard(points, user, ai_level){
    const classif = document.getElementById("boardbody");
    let new_points = document.createElement("li");
    new_points.setAttribute("class", "points");
    new_points.innerHTML = points + ' points - user ' + user + ' - ai_level '+ ai_level;
    classif.appendChild(new_points);
}
