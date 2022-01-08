
export class gameRules {
    constructor(board, ai_level){
        this.board = board;
        this.ai_level = ai_level;
        let holes = document.getElementsByClassName("hole");
        let Playagain;
        console.log("length dos holes é " + holes.length);
        for (let i = this.board.num_holes; i < holes.length; i++){
             holes[i].addEventListener("click", async function(){

                let gameState ;
                Playagain = board.play(i);

                gameState = board.endGame();

                if (gameState == 1) {
                    console.log("GAME OVER PUTAS");
                    return 0;
                }

                console.log("Play again " + Playagain);
                if (Playagain == 0 || Playagain == 2 ){
                    disableClick(board);
                    waitforNextPlayer(board);
                }
                else{
                    console.log("try again jogada merdosa");
                }
                
            });
        }
    }

    async waitforNextPlayer(board){
        await sleep(2500).then(() => {
            do {
                Playagain = aiMove(ai_level, board);
            }while (Playagain == -1 || Playagain == 2);
            gameState = board.endGame();
            if (gameState == 1) {
                console.log("GAME OVER PUTAS");
                return 0;
            }

         
        });
         enableClick(board);
        
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
        smartAI(board);
    }
}

function smartAI(board){
    //let holes = document.getElementsByClassName("hole");
    let points = [];
    for (let i = 0; i < board.num_holes; i++){
        points[i] = board.simulateplay(i);
    }
    let index = points.indexOf(Math.max(points));
    board.play(index)
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
  