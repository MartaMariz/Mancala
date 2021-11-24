class Board extends Element{
    constructor(scene, num_cavities, num_beans){
        this.scene = scene;
        this.num_cavities = num_cavities;
        this.num_beans = num_beans;
        this.num_rows = 2;
        createBoard();
    }

    createBoard(){
        var rows = document.getElementById("rows");
        while (rows.firstChild) {
            rows.removeChild(rows.firstChild);
        }
        for (let j = 1; j<=this.num_rows; j++){
            let row = document.createElement("div");
            row.setAttribute("class","row");
            for(let i = 1; i<= this.num_cavities; i++) {
                let hole = document.createElement("div");
                hole.setAttribute("class","hole");
                for(let i = 1; i<= this.num_beans; i++) {
                    let bean = document.createElement("div");
                    bean.setAttribute("class","bean");
                    //placeBeanRandom(bean, hole);
                    hole.appendChild(bean);
                }
                row.appendChild(hole);
            }
            rows.appendChild(row);
        }
    }

}
export default {Board}