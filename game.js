import {Board} from './board.js';
import { gameRules } from './gamerules.js';
import {enableClick, setTurn, disableClick, gameOver} from './utils.js';
import {logInServer, joinGame, leave, serverGameOver, ranking} from './server.js';
import './onclick.js'


export class Game{
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

    addPoints(user, points, total, ai_level){
        if (this.user == "Visitante") return;
        const user_info = JSON.parse(localStorage.getItem(user));

        let relacao_points = points + "/" +total;

        if (!user_info.hasOwnProperty('history'))
            user_info['history'] = [{points: relacao_points, ai_level: ai_level}];
        else 
            user_info['history'].push({points: relacao_points, ai_level: ai_level});

        localStorage.setItem(user, JSON.stringify(user_info));

        updateLocalLeaderboard(relacao_points, user, ai_level);
    }

    updateGame(pit, turn, adv_points, adv_pits){
        console.log("pit" + pit);
        console.log("turn" + turn);
        console.log("adv_points" + adv_points);
        console.log("adv_pits" + adv_pits);
        console.log(adv_pits[pit]);

        if (turn == this.user && !adv_pits[pit]){
            console.log("mover pecinhas do amigo pls");
            this.board.play(this.num_holes-pit-1);
        }
        else if (adv_points > this.board.scorecavity2.getNumBeans()) this.board.play(this.num_holes-pit-1);

        let game_state = this.board.endGame();

        if (game_state == 1) {
            disableClick(this.board);
            console.log("GAME OVER PUTAS");
            gameOver(this.board, this, ai_level);
            return 0;
        }
            
    }


}

function createServer(){
    const http = require('http');

    let server = http.createServer((request,response) => {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Oi amigos')
    });

    server.listen(3000, '127.0.0.1');
    console.log("listening");

    
}

export default {Game}