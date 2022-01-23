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


async function gameOver(player, board, game, ai_level){

    await sleep(4000).then(() => {
        let winner = board.getWinner();
        if (winner == 3) alert("It was a tie!");
        else {
            let points = board.countPoints();
            let total = game.num_beans*game.num_holes*2;
            if (winner == 1) game.addPoints(player, points, total, ai_level);
            alert("Player" + winner + " won!");
        }
    });
    board.clearBoard();
}

export { sleep, setTurn, enableClick, disableClick, gameOver };