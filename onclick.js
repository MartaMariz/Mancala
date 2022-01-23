import {Game} from './game.js';
import {enableClick, setTurn, disableClick, gameOver} from './utils.js';
import {logInServer, joinGame, leave, serverGameOver, ranking} from './server.js';

let game;

window.onload = function(){
    document.getElementById("continuar_jogo").style.display = "none";
    document.getElementById("acaba_jogo").style.display = "none";

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

function eraseClassificacoesLocais() {
    document.getElementById("classificacoes_locais").style.display = "none";
}

function eraseClassificacoesServer() {
    document.getElementById("classificacoes_server").style.display = "none";
}

function eraseNovoJogo() {
    document.getElementById("novo_jogo").style.display = "none";
}


function logIn(username, password){
    document.getElementById("user").innerHTML = username;
    document.getElementById("user").style.display = "block";
    game.setUser(username, password);
}



document.getElementById("botao_instrucoes").onclick = function() {
    eraseGame();
    eraseLogIn();
    eraseSignUp();
    eraseConfig();
    eraseClassificacoesLocais();
    eraseClassificacoesServer();
    document.getElementById("continuar_jogo").style.display = "block";
    document.getElementById("instrucoes").style.display = "block";
}

document.getElementById("botao_config").onclick = function() {
    eraseGame();
    eraseLogIn();
    eraseSignUp();
    eraseInstrucoes();
    eraseClassificacoesLocais();
    eraseClassificacoesServer();
    document.getElementById("continuar_jogo").style.display = "block";
    document.getElementById("config").style.display = "block";
}

document.getElementById("botao_login").onclick = function() {
    eraseGame();
    eraseInstrucoes();
    eraseSignUp();
    eraseConfig();
    eraseClassificacoesLocais();
    eraseClassificacoesServer();
    document.getElementById("continuar_jogo").style.display = "block";
    document.getElementById("login").style.display = "block";
}

document.getElementById("botao_classificacoes_locais").onclick = function() {
    eraseGame();
    eraseInstrucoes();
    eraseLogIn();
    eraseClassificacoesServer();
    eraseSignUp();
    eraseConfig();
    document.getElementById("continuar_jogo").style.display = "block";
    document.getElementById("classificacoes_locais").style.display = "block";
}

document.getElementById("botao_classificacoes_server").onclick = function() {
    eraseGame();
    eraseInstrucoes();
    eraseLogIn();
    eraseSignUp();
    eraseClassificacoesLocais();
    eraseConfig();
    document.getElementById("continuar_jogo").style.display = "block";
    loadGlobalLeaderboard();
    document.getElementById("classificacoes_server").style.display = "block";
}

document.getElementById("botao_signup").onclick = function() {
    eraseGame();
    eraseInstrucoes();
    eraseLogIn();
    eraseConfig();
    eraseClassificacoesLocais();
    eraseClassificacoesServer();
    document.getElementById("continuar_jogo").style.display = "block";
    document.getElementById("signup").style.display = "block";
}

document.getElementById("novo_jogo").onclick = function() {
    eraseConfig();
    eraseLogIn();
    eraseSignUp();
    eraseClassificacoesLocais();
    eraseClassificacoesServer();
    eraseInstrucoes();
    eraseNovoJogo();
    game.newGame();
    document.getElementById("game").style.display = "block";
    document.getElementById("acaba_jogo").style.display = "block";
}

document.getElementById("acaba_jogo").onclick = function() {
    eraseConfig();
    eraseLogIn();
    eraseSignUp();
    eraseClassificacoesLocais();
    eraseClassificacoesServer();
    eraseInstrucoes();
    eraseNovoJogo();
    if (game.game_id != 0){
        console.log("o game id era diferente de 0");
        leave(game);
    }
    document.getElementById("game").style.display = "none";
    document.getElementById("acaba_jogo").style.display = "none";
    document.getElementById("novo_jogo").style.display = "block";

}

document.getElementById("continuar_jogo").onclick = function() {
    eraseConfig();
    eraseLogIn();
    eraseClassificacoesLocais();
    eraseClassificacoesServer();
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
    joinGame(game);
    console.log("set update");
    game.setOpponent("player");
    console.log(" Nice entraste friend agora espera idk " + game.game_id);

}

document.getElementById("send_login").onclick = function() {

 
    const user = JSON.parse(localStorage.getItem(document.getElementById("input_login_user").value));

    const r = logInServer(document.getElementById("input_login_user").value, document.getElementById("input_login_pass").value);
    console.log(r);

    if (user == null) {
        alert("User not found!");
        return;
    }
    if (user.password == document.getElementById("input_login_pass").value){
        logIn(document.getElementById("input_login_user").value, document.getElementById("input_login_pass").value);
    }

}

document.getElementById("send_signup").onclick = function() {
    const nick = document.getElementById("input_signup_user").value;
    const pass = document.getElementById("input_signup_pass").value

    const r = logInServer(nick, pass);
    console.log(r);

    const user = JSON.parse(localStorage.getItem(nick));
    if (user != null) {
        alert("User already exists!");
        return;
    }


    if (pass == document.getElementById("confirm_pass").value){
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
    const classif = document.getElementById("boardbody_local");
    let user_info;
    const values = allStorage();
    
    for (let i in values){
        user_info = JSON.parse(values[i]);

        if (user_info.hasOwnProperty('history')) {
            for (let j in user_info.history) {

                let play = user_info.history[j];
                let new_points = document.createElement("tr");
                new_points.setAttribute("class", "points");

                let username = document.createElement("td");
                username.innerHTML = i;
                let points = document.createElement("td");
                points.innerHTML = play.points;
                let opponent = document.createElement("td");
                opponent.innerHTML = "AI level " + play.ai_level;
                new_points.appendChild(username);
                new_points.appendChild(points);
                new_points.appendChild(opponent);

                classif.appendChild(new_points);
            }
        }
    }
}

function updateLocalLeaderboard(points, user, ai_level){
    const classif = document.getElementById("boardbody_local");
    let new_points = document.createElement("tr");
    new_points.setAttribute("class", "points");

    let username = document.createElement("td");
    username.innerHTML = user;
    let userpoints = document.createElement("td");
    userpoints.innerHTML = points;
    let opponent = document.createElement("td");
    opponent.innerHTML = "AI level " + ai_level;


    new_points.appendChild(username);
    new_points.appendChild(userpoints);
    new_points.appendChild(opponent);

    classif.appendChild(new_points);
}

function loadGlobalLeaderboard(){
    const classif = document.getElementById("boardbody_server");
    while (classif.firstChild) {
        classif.removeChild(classif.firstChild);
    }
    ranking();

}