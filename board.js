import {Row} from './row.js';


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
            currRow =1;
            index = index - this.num_holes;
        }
        let beansToDistribute = this.rowlist[currRow].getBeans(index);
        while (beansToDistribute>0){
            beansToDistribute = this.rowlist[currRow].distributeBeans(index, beansToDistribute);
            if (currRow== 0) {
                currRow =1;
                index = -1;
            }
            else {currRow = 0;
                index =this.num_holes;
            }
        }
       
        console.log(beansToDistribute);
        
        let currIndex= index;

       /* while (numBeans>0 ){
            if (currRow == 0 ){
                if (currIndex<0){
                    currRow = 1;
                    currIndex = 0;
                }
                else{
                    this.rowholelist[currIndex].addBean();
                    currIndex--;
                    numBeans--;
                }
            }
            if (currRow == 1){
                if (currIndex >= this.num_holes){
                    currRow = 0;
                    currIndex = this.num_holes -1;
                }
                else{
                    this.holelist[currIndex].addBean();
                    currIndex++;
                    numBeans--;
                }
            }
        }*/
        
    }

}
export default {Board}