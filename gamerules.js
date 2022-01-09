
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
            waitforAI(board, ai_level);
        }
        for (let i = this.board.num_holes; i < holes.length; i++){
            holes[i].addEventListener("click", async function(){

                play_again = board.play(i);

                game_state = board.endGame();

                if (game_state == 1) {
                    disableClick(board);
                    console.log("GAME OVER PUTAS");
                    gameOver(board);
                    return 0;
                }
                if (play_again != -1 && play_again != 1 && game_state == 0){
                    disableClick(board);
                    if (op == "ai")
                        waitforAI(board, ai_level);
                }
                
            });
        }
    }

    showFinalResults(){
        apagarBoard();
        apagarLogIn();
        apagarSignUp();
        apagarConfig();
        document.getElementById("instrucoes").style.display = "block";
    }

}

function disableClick(board){
    let holes = document.getElementsByClassName("hole");
    for (let i = board.num_holes; i < holes.length; i++){
        holes[i].style.pointerEvents = 'none';
    }
}

function enableClick(board){
    let holes = document.getElementsByClassName("hole");
    for (let i = board.num_holes; i < holes.length; i++){
        holes[i].style.pointerEvents = 'auto';
    }
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




async function waitforAI(board, ai_level){
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
        gameOver(board);
        return 0;
    }
    
}

async function gameOver(board){
    await sleep(4000).then(() => {
        let winner = board.countPoints()
        if (winner == 3) alert("It was a tie!");
        else alert("Player" + winner + " won!");
    });
    board.clearBoard();
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
  