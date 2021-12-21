import {Hole} from './hole.js';


export class Row {
    constructor(row_index, num_holes, num_beans){
        this.html_id = "row"+row_index.toString();
        console.log("idk " + this.html_id);
        this.row_index = row_index;
        this.num_holes = num_holes;
        this.num_beans = num_beans;
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
        
    }
    getBeans(index){
        return this.holelist[index].spreadBeans();
    }
    distributeBeans(index, beansToDistribute){
        console.log("row" + this.row_index + " index " + index);
        let dir = this.row_index;
        let maxIndex = this.num_holes;
        if (this.row_index == 0) {
            dir = -1;
            maxIndex = -1;
        }
        let currIndex = index + dir;

        while (currIndex != maxIndex && beansToDistribute != 0){
            this.holelist[currIndex].addBean();
            currIndex = currIndex + dir;
            beansToDistribute --;
        }
        


        return beansToDistribute;
    }
}