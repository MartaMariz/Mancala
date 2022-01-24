import {Bean} from './bean.js';

export class ScoreCavity {
    constructor(player){
        this.player = player;
        if (player==1) this.html_id = "player-one"
        else this.html_id = "player-two"
        this.beanlist = [];
        this.num_beans = 0;
    }
    addBean(){
        let bean = new Bean(-1, this.player);
        this.num_beans++;
        this.beanlist.push(bean);
        const beancount = document.getElementById("countbean-"+this.html_id);
        beancount.innerHTML = this.num_beans;

    }
    
    getNumBeans(){
        return this.num_beans;
    }

    getPlayer(){
        return this.player;
    }
}