

import {Board} from './board.js';


export class gameRules {
    constructor( board){
        this.board = board;
        let holes = document.getElementsByClassName("hole");
        console.log("length dos holes é " + holes.length);
        for (let i= 0; i<holes.length; i++){
            holes[i].addEventListener( "click", function(){  board.play(i);});
        }
    }
}



//var holes = document.getElementsByClassName("hole");
//console.log("length: "+ holes.length);

/*
for (let i=0; i<holes.length; i++){
    holes[i].onclick = function(){
        alert("Hello!");
    }
}*/