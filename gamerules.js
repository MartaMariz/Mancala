
export class gameRules {
    constructor(board){
        this.board = board;
        let holes = document.getElementsByClassName("hole");
        console.log("length dos holes é " + holes.length);
        for (let i= this.board.num_holes; i<holes.length; i++){
            holes[i].addEventListener("click", function(){board.play(i);});
        }
    }
    
}