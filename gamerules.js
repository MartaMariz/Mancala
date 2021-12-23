
export class gameRules {
    constructor(board, ai_level){
        this.board = board;
        this.ai_level = ai_level;
        let holes = document.getElementsByClassName("hole");
        console.log("length dos holes é " + holes.length);
        for (let i = this.board.num_holes; i < holes.length; i++){
            holes[i].addEventListener("click", async function(){
                board.play(i);
                disableClick(board);
                await sleep(2000).then(() => {
                    aiMove(ai_level, board);
                });
                enableClick(board);
            });
        }
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
        board.play(5);
    }
    else smartAI(board);
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
  