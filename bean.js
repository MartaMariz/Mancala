export class Bean {
    constructor(row_index, hole_index){
        this.row_index = row_index;
        this.hole_index = hole_index;
        if (row_index == 3){
            this.createBeanScoreCavity();
        }
        else this.createBean();
    }
    createBeanScoreCavity(){
        const scoreCavity = document.getElementById("player area "+(this.hole_index).toString());
        let bean = document.createElement("div");
        bean.setAttribute("class", "bean");
        let topStr = "top: " + Math.floor( Math.random() * 70).toString() + "%;";
        let leftStr = "left: " + Math.floor( Math.random() * 70).toString() + "%;";
        let rotStr = "transform: rotate(" + Math.floor( Math.random() * 180).toString() + "deg);";
        bean.style = "position:absolute;" + topStr + leftStr + rotStr;
        
        scoreCavity.appendChild(bean);

    }
    createBean(){
        const hole = document.getElementById("hole"+(this.row_index).toString()+(this.hole_index).toString());
        let bean = document.createElement("div");
        bean.setAttribute("class", "bean");
        let topStr = "top: " + Math.floor( Math.random() * 70).toString() + "%;";
        let leftStr = "left: " + Math.floor( Math.random() * 70).toString() + "%;";
        let rotStr = "transform: rotate(" + Math.floor( Math.random() * 180).toString() + "deg);";
        bean.style = "position:absolute;" + topStr + leftStr + rotStr;
        
        hole.appendChild(bean);
    }
}