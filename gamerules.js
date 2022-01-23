import {enableClick, setTurn, disableClick, sleep} from './utils.js';
import { notifyMove } from './server.js';

export class gameRules {
    constructor(board, ai_level, starts, op, game){
        this.board = board;
        this.ai_level = ai_level;
        this.starts = starts;
        this.game = game;
        let holes = document.getElementsByClassName("hole");
        let play_again;
        let game_state;
        if (starts == 2 && op == "ai") {
            disableClick(board);
            waitforAI(board, game, ai_level);
        }
        
        for (let i = this.board.num_holes; i < holes.length; i++){
            holes[i].addEventListener("click", async function(){

                play_again = board.play(i);

                if ( op == "player"){
                    notifyMove(game, i - board.num_holes);
                }

                game_state = board.endGame();

                if (game_state == 1) {
                    disableClick(board);
                    console.log("GAME OVER PUTAS");
                    gameOver(board, game, ai_level);
                    return 0;
                }

                if (play_again != -1 && play_again != 1 && game_state == 0){
                    disableClick(board);
                    setTurn(2);
                    if (op == "ai")
                        waitforAI(board, game, ai_level);//devia ser algo tipo espera a próxima jogada e se fosse player vs player fazia pedido ao servidor e atualizava o board e tal
                }
                
            });
        }
    }

}


async function waitforAI(board, game, ai_level){
    let play_again;
    let game_state;
    do {
        await sleep(2500).then(() => {
            do {
                play_again = aiMove(ai_level, board);
                game_state = board.endGame();
            } while (play_again == -1);
            if (play_again == 0 || play_again == 1) enableClick(board);
        });

    } while ( play_again == 2 && game_state == 0);

    if (game_state == 1) {
        console.log("GAME OVER PUTAS");
        gameOver(board, game, ai_level);
        return 0;
    }

    setTurn(1);
}

async function gameOver(board, game, ai_level){

    await sleep(4000).then(() => {
        let winner = board.getWinner();
        if (winner == 3) alert("It was a tie!");
        else {
            let points = board.countPoints();
            if (winner == 1) game.addPoints(points, ai_level);
            alert("Player" + winner + " won!");
        }
    });
    board.clearBoard();
}

function aiMove(ai_level, board){
    if (ai_level == 1){
        let index = Math.floor(Math.random()*board.num_holes);
        console.log("oi sou o ai joguei index " + index);
        return board.play(index); 
    }
    else {
        let index = smartAI(board, ai_level);
        console.log("o melhor index é " + index);
        return board.play(index);
    }
}

function smartAI(board, ai_level){
    console.log("AI PLAYNG");
    let points = 0;
    let curr_points;
    let best_move;
    for(let i = 0 ; i< board.num_holes; i++){
        console.log("CHECAR PINTS");

        curr_points = board.simulatePlay(i, ai_level);
        if (curr_points >= points){
            points = curr_points;
            best_move = i;
        }
    }
    if (points == 0){
        console.log("olha fodasse");
        best_move = Math.floor(Math.random()*board.num_holes);
    }
    return best_move;
}