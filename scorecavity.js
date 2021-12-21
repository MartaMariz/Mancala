import {Bean} from './bean.js';

export class scoreCavity {
    constructor(index){
        this.html_id = "player area "+index.toString();
        console.log("score cavity "+this.html_id);
        this.cavity_index = index;
        this.beanlist = [];
        this.numBeans = 0;
        let scoreCavities = document.getElementById("player area");
        let scorecavity = document.createElement("div");
        scorecavity.setAttribute("class", "player area");
        scorecavity.setAttribute("id", this.html_id);
        scoreCavities.appendChild(scorecavity);
    
    }
    addBean(){
        let bean = new Bean(3, this.cavity_index);
        this.beanlist.push(bean);
        this.numBeans++;
    }
}