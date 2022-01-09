import {Row} from './row.js';
import { ScoreCavity } from './scorecavity.js';

export class Board {
    constructor(num_holes, num_beans, html_id){
        this.html_id = html_id;
        this.num_holes = num_holes;
        this.num_beans = num_beans;
        this.num_rows = 2;
        this.rowlist = [];
        this.scorecavity1 = new ScoreCavity(1);
        this.scorecavity2 = new ScoreCavity(2); 
        this.createBoard();
    }
    
    createBoard(){
        let counter = document.getElementById("countbean-player-two");
        counter.innerHTML = 0;
        counter = document.getElementById("countbean-player-one");
        counter.innerHTML = 0;

        let scorecavity = document.getElementById("player-two");
        while(scorecavity.firstChild) scorecavity.removeChild(scorecavity.firstChild);
        scorecavity = document.getElementById("player-one");
        while(scorecavity.firstChild) scorecavity.removeChild(scorecavity.firstChild);
        
        const rows = document.getElementById("rows");
        while (rows.firstChild) {
            rows.removeChild(rows.firstChild);
        }
        for (let j = 0; j<this.num_rows; j++){
            let row = new Row(j, this.num_holes, this.num_beans, this);
            this.rowlist[j] = row;
        }
    }

    endGame(){
        console.log(" check endgame");

        if (this.rowlist[0].checkEndGame()){
            console.log("game will wnd 0");
            this.rowlist[1].endGame();
            return 1;
        }
        if (this.rowlist[1].checkEndGame()){
            console.log("game will wnd 1");
            this.rowlist[0].endGame();
            return 1;
        }
        return 0;
    }

    play(index){
        let player;
        let curr_row = 0;
        if (index >= (this.num_holes)){
            curr_row = 1;
            index = index - this.num_holes;
            player = 1;
        }
        else player = 2;
        let beans_to_distribute = this.rowlist[curr_row].getBeans(index);
        if (beans_to_distribute == 0) return -1;

        while (beans_to_distribute>0){
            beans_to_distribute = this.rowlist[curr_row].distributeBeans(index, beans_to_distribute, player);
            let condition_to_steal = (player == curr_row) || (player == 2 && curr_row == 0);
            if (beans_to_distribute < 0 && condition_to_steal) {
                sleep(2000).then(() => {
                    this.stealBeans((beans_to_distribute+1)*(-1), player);
                });
            }
            if (beans_to_distribute>0){
                if (curr_row == 0) {
                    this.scorecavity2.addBean();
                    console.log("adding bean to player-two");
                    beans_to_distribute--;
                    curr_row = 1;
                    index = -1;
                    if (beans_to_distribute == 0 ) return 2;
                }
                else {
                    this.scorecavity1.addBean();
                    console.log("adding bean to player-one");
                    beans_to_distribute--;
                    curr_row = 0;
                    index = this.num_holes;
                    if (beans_to_distribute == 0 ) return 1;
                }
            
            }
            console.log(beans_to_distribute);
        }
        return 0;
        
    }

    stealBeans(index, player){
        if (player == 2){
            this.rowlist[1].stealBeans(index);
        }
        else {
            this.rowlist[0].stealBeans(index);
        }
        console.log(player + "stole from index " + index);
    }

    simulatePlay(index){
        let points;
        let previouspoints = document.getElementById("player-two").childElementCount;
        console.log("index " + index + " prevpoints "+ previouspoints);
        this.play(index);
        points = document.getElementById("player-two").childElementCount - previouspoints;
        return points;
    }

    giveBean(player){
        if (player == 1) this.scorecavity1.addBean();
        else this.scorecavity2.addBean();
    }

    countPoints(){
        if (this.scorecavity1.getNumBeans() > this.scorecavity2.getNumBeans())
            return 1;
        else if (this.scorecavity1.getNumBeans() < this.scorecavity2.getNumBeans())
            return 2;
        else return 3;
    }

    clearBoard(){
        this.createBoard();
    }

}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export default {Board}