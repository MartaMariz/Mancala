import {sleep} from './utils.js';


function notifyMove(game, index){
    console.log("notifiquei a jogada oi dá update pls beijo");
    console.log( game.user );
    console.log( game.pass );

    console.log( "index" + index );
    console.log( game.game_id );


    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 
                'application/json;'
        },
        body: JSON.stringify({nick: game.user, password: game.pass, game: game.game_id, move: index })
    }
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/notify', options)
    .then((response) => {
        if (response.ok) {
            console.log(response.json());
            console.log("move was made");
          return response;
        } else {
          throw new Error('Invalid move');
        }
      })
      .catch((error) => {
        console.log(error);
    });
}

function logInServer(user, pass){
    console.log(user + "  " + pass);
    console.log("doing log in server");
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 
                'application/json;'
        },
        body: JSON.stringify({nick: user, password: pass })
    }
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/register', options)
    .then((response) => {
        if (response.ok) {
            console.log(response.json());
          return response;
        } else {
          throw new Error('Wrong password');
        }
      })
      .catch((error) => {
        console.log(error);
    });
}

function joinGame(thisgame){
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 
                'application/json;charset=utf-8'
        },
        body: JSON.stringify({nick: thisgame.user, password: thisgame.pass, size: thisgame.num_holes, initial: thisgame.num_beans })
    }
    let fetchRes = fetch('http://twserver.alunos.dcc.fc.up.pt:8008/join', options);
    fetchRes.then(res =>
        res.json()).then(d => {
            console.log(d.game);
            thisgame.game_id = d.game;
            thisgame.setUpdate(d.game);
            return d.game;
        })

}

function leave(game){
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 
                'application/json;charset=utf-8'
        },
        body: JSON.stringify({nick: game.user, password: game.pass, game: game.game_id })
    }
    let fetchRes = fetch('http://twserver.alunos.dcc.fc.up.pt:8008/leave', options);
    fetchRes.then(res =>
        res.json()).then(d => {
            console.log("leave game");
            console.log(d);
        })
}

async function serverGameOver(game, winner, player, board){

    await sleep(4000).then(() => {
        if (winner == player) {
            let points = board.countPoints();
            game.addPoints(winner, points, 0);
            alert("Player 1 won!");
        }
        else alert("Player 2 won!");

    });
    board.clearBoard();
}

export { notifyMove, logInServer, joinGame, leave, serverGameOver };