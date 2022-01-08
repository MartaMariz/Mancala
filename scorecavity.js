import {Bean} from './bean.js';

export class ScoreCavity {
    constructor(player){
        this.player = player;
        if (player==1) this.htmlid = "player-one"
        else this.htmlid = "player-two"
        this.beanlist = [];
        this.num_beans = 0;
    }
    addBean(){
        let bean = new Bean(-1, this.player);
        this.num_beans++;
        this.beanlist.push(bean);
        const beancount = document.getElementById("countbean-"+this.htmlid);
        beancount.innerHTML = this.num_beans;

        console.log("adding bean to "+ this.html_id);
    }
    getNumBeans(){
        return this.num_beans;
    }
}