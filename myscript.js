window.onload = function(){
    var num_holes = 6;
    var num_rows = 2;
    var num_beans = 4;
    createBoard(num_holes, num_rows, num_beans);
}

function createBoard(num_holes, num_rows, num_beans){
    var rows = document.getElementById("rows");
    while (rows.firstChild) {
        rows.removeChild(rows.firstChild);
    }
    for (let j = 1; j<=num_rows; j++){
        let row = document.createElement("div");
        row.setAttribute("class","row");
        for(let i = 1; i<= num_holes; i++) {
            let hole = document.createElement("div");
            hole.setAttribute("class","hole");
            for(let i = 1; i<= num_beans; i++) {
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


function apagarConfig() {
    document.getElementById("config").style.display = "none";
}

function apagarInstrucoes() {
    document.getElementById("instrucoes").style.display = "none";
}

function apagarBoard() {
    document.getElementById("board").style.display = "none";
}

function apagarLogIn() {
    document.getElementById("login").style.display = "none";
}

function apagarSignUp() {
    document.getElementById("signup").style.display = "none";
}



document.getElementById("botao_instrucoes").onclick = function() {
    apagarBoard();
    apagarLogIn();
    apagarSignUp();
    apagarConfig();
    document.getElementById("instrucoes").style.display = "block";
}

document.getElementById("botao_config").onclick = function() {
    apagarBoard();
    apagarLogIn();
    apagarSignUp();
    apagarInstrucoes();
    document.getElementById("config").style.display = "block";
}

document.getElementById("botao_login").onclick = function() {
    apagarBoard();
    apagarInstrucoes();
    apagarSignUp();
    apagarConfig();
    document.getElementById("login").style.display = "block";
}

document.getElementById("botao_signup").onclick = function() {
    apagarBoard();
    apagarInstrucoes();
    apagarLogIn();
    apagarConfig();
    document.getElementById("signup").style.display = "block";
}

document.getElementById("novojogo").onclick = function() {
    apagarConfig();
    apagarLogIn();
    apagarSignUp();
    apagarInstrucoes();
    document.getElementById("board").style.display = "flex";
}

function changeholes(){
    var input_holes = document.getElementById("input_holes").value;
    createBoard(input_holes, 2, 4);
}

function changebeans(){
    var input_beans = document.getElementById("input_beans").value;
    createBoard(6, 2, input_beans);
}

function placeBeanRandom(bean, hole) {
  
    // If there isn't a parent defined, take body
    var parent = hole;
    
    // Limit the random number for the coordinates
    var parentPosition = parent.getBoundingClientRect(),
        beanPosition = bean.getBoundingClientRect(),
        x = Math.floor(Math.random() * (parentPosition.width - beanPosition.width)) + parentPosition.left,
        y = Math.floor(Math.random() * (parentPosition.height - beanPosition.height)) + parentPosition.top;
    
    console.log(parentPosition.top, parentPosition.right, parentPosition.bottom, parentPosition.left);

    bean.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
  };