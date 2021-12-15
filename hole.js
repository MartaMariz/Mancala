import {Bean} from './bean.js';

export class Hole {
    constructor(row_index, hole_index, num_beans){
        this.html_id = "hole"+row_index+hole_index;
        console.log("beans"+num_beans);
        this.row_index = row_index;
        this.hole_index = hole_index;
        this.num_beans = num_beans;
        this.beanlist = [];
        this.createHole();
    }

    createHole(){
        const row = document.getElementById("row"+this.row_index);
        console.log("row"+this.row_index);
        let hole = document.createElement("div");
        hole.setAttribute("class", "hole");
        hole.setAttribute("id", this.html_id);
        row.appendChild(hole);
            
        for(let k = 0; k<this.num_beans; k++) {
            let bean = new Bean(this.row_index, this.hole_index, (k+1)*(this.hole_index+1)*(this.row_index+1));
            this.beanlist[k] = bean;
        }
    }
}