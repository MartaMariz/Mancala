export class Bean {
    constructor(row_index, hole_index){
        this.row_index = row_index;
        this.hole_index = hole_index;
        
        if (row_index == -1) {
            if (this.hole_index == 1) this.cavityId = "player-one";
            else this.cavityId = "player-two";
        }
        else this.cavityId = "hole"+(this.row_index).toString()+(this.hole_index).toString();

        this.createBean();
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
        const cavity = document.getElementById(this.cavityId);
        let bean = document.createElement("div");
        bean.setAttribute("class", "bean");
        let topStr = "top: " + Math.floor( Math.random() * 60).toString() + "%;";
        let leftStr = "left: " + Math.floor( Math.random() * 60).toString() + "%;";
        let rotStr = "transform: rotate(" + Math.floor( Math.random() * 180).toString() + "deg);";
        bean.style = "position:absolute;" + topStr + leftStr + rotStr;
        
        cavity.appendChild(bean);
    }
}