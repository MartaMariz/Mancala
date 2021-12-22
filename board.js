import {Row} from './row.js';
import {Bean} from './bean.js';

export class Board {
    constructor(num_holes, num_beans, html_id){
        this.html_id = html_id;
        this.num_holes = num_holes;
        this.num_beans = num_beans;
        this.num_rows = 2;
        this.rowlist = [];
        this.createBoard();
    }
    createBoard(){
        let scorecavity = document.getElementsByClassName("player-two scorecavity")[0];
        while(scorecavity.firstChild) scorecavity.removeChild(scorecavity.firstChild);
        scorecavity = document.getElementsByClassName("player-one scorecavity")[0];
        while(scorecavity.firstChild) scorecavity.removeChild(scorecavity.firstChild);
        
        const rows = document.getElementById("rows");
        while (rows.firstChild) {
            rows.removeChild(rows.firstChild);
        }
        for (let j = 0; j<this.num_rows; j++){
            let row = new Row(j, this.num_holes, this.num_beans);
            this.rowlist[j] = row;
        }
    }
    play(index){
        let currRow = 0;
        console.log("oi "+ index);
        if (index >= (this.num_holes)){
            currRow = 1;
            index = index - this.num_holes;
        }
        let beansToDistribute = this.rowlist[currRow].getBeans(index);
        while (beansToDistribute>0){
            beansToDistribute = this.rowlist[currRow].distributeBeans(index, beansToDistribute);
            if (currRow == 0) {
                if (beansToDistribute>0){
                    new Bean(-1, 2);
                    console.log("adding bean to player-two");
                    beansToDistribute--;
                }
                currRow = 1;
                index = -1;
            }
            else {
                if (beansToDistribute>0){
                    new Bean(-1, 1);
                    console.log("adding bean to player-one");
                    beansToDistribute--;
                }
                currRow = 0;
                index = this.num_holes;
            }
            console.log(beansToDistribute);
        }
       
        
    }

}
export default {Board}