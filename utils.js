function disableClick(board){
    let holes = document.getElementsByClassName("hole");
    for (let i = board.num_holes; i < holes.length; i++){
        holes[i].style.pointerEvents = 'none';
    }
}

function enableClick(board){
    let holes = document.getElementsByClassName("hole");
    for (let i = board.num_holes; i < holes.length; i++){
        holes[i].style.pointerEvents = 'auto';
    }
}

function setTurn(player){
    document.getElementById("turn").innerHTML = 'Vez do Player'+player;
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export { sleep, setTurn, enableClick, disableClick };