import { Bean } from './bean.js';
import {Hole} from './hole.js';


export class Row {
    constructor(row_index, num_holes, num_beans, board){
        this.html_id = "row"+row_index.toString();
        this.row_index = row_index;
        this.num_holes = num_holes;
        this.num_beans = num_beans;
        this.board = board;
        this.holelist = [];
        this.createRow();
    }
    createRow(){
        const rows = document.getElementById("rows");
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        row.setAttribute("id", this.html_id);
        rows.appendChild(row);
    
        for(let i = 0; i<this.num_holes; i++) {
            let hole = new Hole(this.row_index, i, this.num_beans);
            this.holelist[i] = hole;
        }

        let counter = document.createElement("div");
        counter.setAttribute("class", "counter");
        rows.appendChild(counter);

        for(let i = 0; i<this.num_holes; i++) {
            let beans = document.createElement("div");
            beans.setAttribute("class", "countbean");
            beans.innerHTML = this.num_beans;
            beans.setAttribute("id", "countbean"+this.row_index.toString()+i.toString());
            counter.appendChild(beans);
        }

        
    }
    getBeans(index){
        return this.holelist[index].spreadBeans();
    }
    checkEndGame(){
        for (let i = 0; i<this.num_holes; i++){
            if (this.holelist[i].getNumBeans() != 0)
                return false;
        }

        return true;
    }
    async endGame(){

        await sleep(2500).then(() => {
            for (let i = 0; i<this.num_holes; i++){
                console.log("stealing bean "+ this.row_index + "hole " + i);
                for (let j = 0; j < this.holelist[i].getNumBeans(); j++){
                    console.log("deleting bean " +j+ "on hole "+i);
                    this.board.giveBean(this.row_index);
                }
                this.holelist[i].spreadBeans();
            
            }
        });
    }

    distributeBeans(index, beansToDistribute, player){
        let conditionToSteal = (player == this.row_index) || (player == 2 && this.row_index == 0);
        console.log("row" + this.row_index + " index " + index);
        let dir = this.row_index;
        let maxIndex = this.num_holes;
        if (this.row_index == 0) {
            dir = -1;
            maxIndex = -1;
        }
        let currIndex = index + dir;

        while (currIndex != maxIndex && beansToDistribute > 0){
            console.log("curr "+ currIndex);
            this.holelist[currIndex].addBean();
            
            if (beansToDistribute == 1 &&  this.holelist[currIndex].num_beans == 1 && conditionToSteal){
                sleep(2000).then(() => {
                    this.holelist[currIndex].spreadBeans();
                });
                
                let player = this.row_index;
                sleep(2000).then(() => {
                    this.board.giveBean(player);

                });
                
                beansToDistribute = (currIndex+1)*(-1);
                return beansToDistribute;
            }
            currIndex = currIndex + dir;
            beansToDistribute --;
            
        }
        
        return beansToDistribute;
    }
    stealBeans(index){
        let player = this.row_index + 1;
        for (let i = 1; i <= this.holelist[index].beanlist.length; i++)
            this.board.giveBean(player);
        this.holelist[index].spreadBeans();
    }
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}