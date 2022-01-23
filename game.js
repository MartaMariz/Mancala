import {Board} from './board.js';
import { gameRules } from './gamerules.js';
import {enableClick, setTurn, disableClick} from './utils.js';
import {logInServer, joinGame, leave} from './server.js';


let game;

class Game{
    constructor(num_holes, num_beans, ai_level){
        console.log("oi");
        this.game_id = 0;
        this.num_beans = num_beans;
        this.num_holes = num_holes;
        this.ai_level = ai_level;
        this.starts = 1;
        this.opponent = "ai";
        this.user = "Visitante";
        this.pass = "";
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

    setUser(username, password){
        this.user = username;
        this.pass = password;
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

    setUpdate( game ){
        const urlUpdate =new URL("http://twserver.alunos.dcc.fc.up.pt:8008/update");

        urlUpdate.searchParams.append('game', game);
        urlUpdate.searchParams.append('nick', this.user);

        console.log("fiz cenas nos params e tal");
        console.log(urlUpdate.href);
        
        const updater = new EventSource(urlUpdate.href);

        updater.onmessage = res => {
            console.log(res.data);

            const message = JSON.parse(res.data);
            console.log(message);
            
            if('board' in message){
                if ('turn' in message.board){
                    let turn = message.board.turn;
                    if (turn != this.user){
                        disableClick(this.board);
                        setTurn(2);
                    }
                    else {
                        enableClick(this.board);
                        setTurn(1);
                    }
                }
                if ('pit' in message){
                    let pit = message.pit;
                    let turn = message.board.turn;
                    let adv_points;
                    for (let store in message.stores)
                        if (store != this.user) adv_points = message.stores[store];

                    this.updateGame(pit, turn, adv_points);
                }
                if ('stores' in message){

                }
            }
        }
    }

    updateGame(pit, turn, adv_points){
        console.log("pit" + pit);
        console.log("turn" + turn);
        console.log("adv_points" + adv_points);
        console.log(this.board.scorecavity2.getNumBeans());

        if (turn == this.user && this.board.rowlist[1].getNumBeans(pit)){
            console.log("mover pecinhas do amigo pls");
            this.board.play(this.num_holes-pit-1);
        }
        else if (adv_points > this.board.scorecavity2.getNumBeans()) this.board.play(this.num_holes-pit-1);
            
    }

}


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

function eraseClassificacoes() {
    document.getElementById("classificacoes").style.display = "none";
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
    eraseNovoJogo();
    game.newGame();
    document.getElementById("game").style.display = "block";
    document.getElementById("acaba_jogo").style.display = "block";
}

document.getElementById("acaba_jogo").onclick = function() {
    eraseConfig();
    eraseLogIn();
    eraseSignUp();
    eraseClassificacoes();
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
