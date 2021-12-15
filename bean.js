export class Bean {
    constructor(row_index, hole_index, index){
        this.html_id = "bean"+index;
        console.log(this.html_id);
        console.log(row_index);
        console.log(hole_index);
        this.row_index = row_index;
        this.hole_index = hole_index;
        this.createBean();
    }

    createBean(){
        const hole = document.getElementById("hole"+this.row_index+this.hole_index);
        console.log("hole"+this.row_index+this.hole_index);
        let bean = document.createElement("div");
        bean.setAttribute("class", "bean");
        bean.setAttribute("id", this.html_id);
        hole.appendChild(bean);
    }
}