import {Row} from './row.js';
import {Bean} from './bean.js';
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
        let currRow = 0;
        if (index >= (this.num_holes)){
            currRow = 1;
            index = index - this.num_holes;
            player = 1;
        }
        else player = 2;
        let beansToDistribute = this.rowlist[currRow].getBeans(index);
        if (beansToDistribute == 0) return -1;

        while (beansToDistribute>0){
            beansToDistribute = this.rowlist[currRow].distributeBeans(index, beansToDistribute, player);
            if (beansToDistribute < 0) {
                sleep(2000).then(() => {
                    this.stealBeans(beansToDistribute*(-1), player);
                });
            }
            if (beansToDistribute>0){
                if (currRow == 0) {
                    this.scorecavity2.addBean();
                    console.log("adding bean to player-two");
                    beansToDistribute--;
                    currRow = 1;
                    index = -1;
                    if (beansToDistribute == 0 ) return 2;
                }
                else {
                    this.scorecavity1.addBean();
                    console.log("adding bean to player-one");
                    beansToDistribute--;
                    currRow = 0;
                    index = this.num_holes;
                    if (beansToDistribute == 0 ) return 1;
                }
            
            }
            console.log(beansToDistribute);
        }
        return 0;
        
    }

    stealBeans(index, player){
        let toSteal;
        if (index >= (this.num_holes) && player == 2){
            toSteal = index - this.num_holes;
            this.rowlist[1].stealBeans(toSteal);
        }
        else if (index < (this.num_holes) && player == 1){
            toSteal = index;
            this.rowlist[0].stealBeans(toSteal);
        }
        sleep(1000).then(() => {
            console.log("stole from index " + toSteal);
        });
    }

    simulateplay(index){
        let points;
        let previouspoints = document.getElementById("player-two").childElementCount;
        console.log("index " + index + " prevpoints "+ previouspoints);
        this.play(index);
        points = document.getElementById("player-two").childElementCount - previouspoints;
        return points;
    }

    givebean(player){
        if (player == 1) this.scorecavity1.addBean();
        else this.scorecavity2.addBean();
    }

}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export default {Board}