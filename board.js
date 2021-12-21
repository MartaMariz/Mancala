import {Row} from './row.js';
import {scoreCavity} from './scorecavity.js';




export class Board {
    constructor(num_holes, num_beans, html_id){
        this.html_id = html_id;
        this.num_holes = num_holes;
        this.num_beans = num_beans;
        this.num_rows = 2;
        this.rowlist = [];
        this.cavitylist = [];
        this.createBoard();
    }
    createBoard(){
        const rows = document.getElementById("rows");
        while (rows.firstChild) {
            rows.removeChild(rows.firstChild);
        }
        for (let j = 0; j<this.num_rows; j++){
            let row = new Row(j, this.num_holes, this.num_beans);
            this.rowlist[j] = row;
        }
        /*const scorecavities = document.getElementsByClassName("player area");
        while (scorecavities.firstChild) {
            scorecavities.removeChild(scorecavities.firstChild);
        }

        this.cavitylist[0] = new scoreCavity(0);
        this.cavitylist[1] = new scoreCavity(1);
*/
    }
    play(index){
        let currRow = 0;
        console.log("oi "+ index);
        if (index >= (this.num_holes)){
            currRow =1;
            index = index - this.num_holes;
        }
        let beansToDistribute = this.rowlist[currRow].getBeans(index);
        while (beansToDistribute>0){
            beansToDistribute = this.rowlist[currRow].distributeBeans(index, beansToDistribute);
            if (currRow== 0 && beansToDistribute>0) {
                currRow =1;
                index = -1;
                /*this.cavitylist[1].addBean();
                beansToDistribute--;*/
            }
            else if(beansToDistribute>0) {
                currRow = 0;
                index =this.num_holes;
                /*this.cavitylist[0].addBean();
                beansToDistribute--;*/
            }
        }
       
        console.log(beansToDistribute);
                
    }

}
export default {Board}