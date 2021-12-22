export class Bean {
    constructor(row_index, hole_index){
        this.row_index = row_index;
        this.hole_index = hole_index;
        if (row_index == -1) this.createBeanScore();
        else this.createBean();
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

    createBeanScore(){
        let scorecavity_class = "scorecavity";
        if (this.hole_index == 1) scorecavity_class = "player-one " + scorecavity_class;
        else scorecavity_class = "player-two " + scorecavity_class;

        const scorecavity = document.getElementsByClassName(scorecavity_class)[0];
        let bean = document.createElement("div");
        bean.setAttribute("class", "bean");
        let topStr = "top: " + Math.floor( Math.random() * 70).toString() + "%;";
        let leftStr = "left: " + Math.floor( Math.random() * 70).toString() + "%;";
        let rotStr = "transform: rotate(" + Math.floor( Math.random() * 180).toString() + "deg);";
        bean.style = "position:absolute;" + topStr + leftStr + rotStr;
        
        scorecavity.appendChild(bean);
    }
}