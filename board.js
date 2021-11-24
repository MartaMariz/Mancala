import {Hole} from './hole.js';


export class Board {
    constructor(scene, num_cavities, num_beans){
        this.scene = scene;
        this.num_cavities = num_cavities;
        this.num_beans = num_beans;
        this.num_rows = 2;
        this.holelist = [];
        this.createBoard();
    }
    createBoard(){
        var rows = document.getElementById("rows");
        while (rows.firstChild) {
            rows.removeChild(rows.firstChild);
        }
        for (let j = 0; j<this.num_rows; j++){
            let row = document.createElement("div");
            row.setAttribute("class","row");
            for(let i = 0; i< this.num_cavities; i++) {
                let hole = new Hole(j,i);
                this.holelist[i]= hole;

                for(let k = 0; k< this.num_beans; k++) {
                    let bean = document.createElement("div");
                    bean.setAttribute("class","bean");
                    //placeBeanRandom(bean, hole);
                
                }
            }
            rows.appendChild(row);
        }
    }

}
export default {Board}