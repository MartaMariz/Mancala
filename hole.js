import {Bean} from './bean.js';

export class Hole {
    constructor(row_index, hole_index, num_beans){
        this.html_id = "hole"+row_index.toString()+hole_index.toString();
        this.row_index = row_index;
        this.hole_index = hole_index;
        this.num_beans = num_beans;
        this.beanlist = [];
        this.createHole();
    }
    
    createHole(){
        const row = document.getElementById("row"+(this.row_index).toString());
        let hole = document.createElement("div");
        hole.setAttribute("class", "hole");
        hole.setAttribute("id", this.html_id);
        row.appendChild(hole);

        for(let k = 0; k<this.num_beans; k++) {
            let bean = new Bean(this.row_index, this.hole_index);
            this.beanlist[k] = bean;
        }
    }

    addBean(){
        let bean = new Bean(this.row_index, this.hole_index);
        this.num_beans++;
        this.beanlist.push(bean);
        const beancount = document.getElementById("countbean"+(this.row_index).toString()+this.hole_index.toString());
        beancount.innerHTML = this.num_beans;


        console.log("adding bean to "+ this.html_id);
    }
    getNumBeans(){
        return this.num_beans;
    }

    spreadBeans(){
        let beansToDistribute = this.num_beans;
        let hole = document.getElementById(this.html_id);
        while (hole.firstChild) {
            console.log("removing child");
            hole.removeChild(hole.firstChild);
        }

        this.beanlist = [];
        this.num_beans = 0;
        const beancount = document.getElementById("countbean"+(this.row_index).toString()+this.hole_index.toString());
        beancount.innerHTML = this.num_beans;
        return beansToDistribute;
    }
}