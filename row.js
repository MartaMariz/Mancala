import {Hole} from './hole.js';


export class Row {
    constructor(row_index, num_holes, num_beans){
        this.html_id = "row"+row_index;
        console.log(this.html_id);
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
}