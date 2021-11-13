
function apagarConfig() {
    document.getElementById("config").style.display = "none";
}

function apagarInstrucoes() {
    document.getElementById("instrucoes").style.display = "none";
}

function apagarBoard() {
    document.getElementById("board").style.display = "none";
}


document.getElementById("botao_instrucoes").onclick = function() {
    apagarBoard();
    apagarConfig();
    document.getElementById("instrucoes").style.display = "block";
}

document.getElementById("botao_config").onclick = function() {
    apagarBoard();
    apagarInstrucoes();
    document.getElementById("config").style.display = "block";
}

document.getElementById("novojogo").onclick = function() {
    apagarConfig();
    apagarInstrucoes();
    document.getElementById("board").style.display = "flex";
}