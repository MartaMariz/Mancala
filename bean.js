export class Bean {
    constructor(row_index, hole_index){
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
        let topStr = "top: " + Math.floor( Math.random() * 70).toString() + "%;";
        let leftStr = "left: " + Math.floor( Math.random() * 70).toString() + "%;";
        let rotStr = "transform: rotate(" + Math.floor( Math.random() * 360).toString() + "deg);";
        bean.style = "position:absolute;" + topStr + leftStr + rotStr;
        
        hole.appendChild(bean);
    }
}