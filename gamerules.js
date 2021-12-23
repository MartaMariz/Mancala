
export class gameRules {
    constructor(board, ai_level){
        this.board = board;
        this.ai_level = ai_level;
        let holes = document.getElementsByClassName("hole");
        console.log("length dos holes é " + holes.length);
        for (let i= this.board.num_holes; i<holes.length; i++){
            holes[i].addEventListener("click", function(){
                board.play(i);
                sleep(2000).then(() => {
                    aiMove(ai_level, board);
                });
                
            });
        }
    }

}

function aiMove(ai_level, board){
    if (ai_level == 1){
        //let index = Math.floor(Math.random()*board.num_holes);
        board.play(5);
    }
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
  