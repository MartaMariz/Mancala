import {sleep, enableClick, disableClick, setTurn} from './utils.js';


function notifyMove(game, index){

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
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 
                'application/json;'
        },
        body: JSON.stringify({nick: user, password: pass })
    }
    fetch('http://twserver.alunos.dcc.fc.up.pt:9074/register', options)
    .then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw new Error('Wrong password');
        }
      })
      .catch((error) => {
        console.log(error.message);
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
            thisgame.game_id = d.game;
            setUpdate(d.game, thisgame);
            return d.game;
        })   
}

function setUpdate(game, gameobj){
    const urlUpdate =new URL("http://twserver.alunos.dcc.fc.up.pt:8008/update");

    urlUpdate.searchParams.append('game', game);
    urlUpdate.searchParams.append('nick', gameobj.user);

    const updater = new EventSource(urlUpdate.href);

    updater.onmessage = res => {

        const message = JSON.parse(res.data);

        if ('winner' in message){
            serverGameOver(message.winner, gameobj.user, gameobj.board);
        }
        
        if('board' in message){
            if ('turn' in message.board){
                let turn = message.board.turn;
                if (turn != gameobj.user){
                    disableClick(gameobj.board);
                    setTurn(2);
                }
                else {
                    enableClick(gameobj.board);
                    setTurn(1);
                }
            }
            if ('pit' in message){
                let pit = message.pit;
                let turn = message.board.turn;
                let adv_points;
                let adv_side; let adv_pits;
                for (let store in message.stores)
                    if (store != gameobj.user) adv_points = message.stores[store];

                for (let side in message.board.sides){
                    if (side != gameobj.user) {
                        adv_side = message.board.sides[side];
                        adv_pits = adv_side.pits;
                    }
                }
                gameobj.updateGame(pit, turn, adv_points, adv_pits);
            }
            if ('stores' in message){

            }
        }
    }
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
        })
}

function ranking(){
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 
                'application/json;charset=utf-8'
        },
        body: JSON.stringify({})
    }
    let fetchRes = fetch('http://twserver.alunos.dcc.fc.up.pt:9074/ranking', options);
    fetchRes.then(res =>
        res.json()).then(d => {
            loadRanking(d.ranking);
        })
}

async function serverGameOver(winner, player, board){

    await sleep(4000).then(() => {
        if (winner == player) {
            alert("Player 1 won!");
        }
        else alert("Player 2 won!");

    });
    board.clearBoard();
}

function loadRanking(ranking){

    const classif = document.getElementById("boardbody_server");

    for (let i in ranking){
        let user_info = ranking[i];
        let nick = user_info.nick;
        let victories = user_info.victories;
        let games = user_info.games;

        let new_points = document.createElement("tr");
        new_points.setAttribute("class", "points");

        let username = document.createElement("td");
        username.innerHTML = nick;
        let points = document.createElement("td");
        points.innerHTML = victories;
        let total = document.createElement("td");
        total.innerHTML = games;
        new_points.appendChild(username);
        new_points.appendChild(points);
        new_points.appendChild(total);

        classif.appendChild(new_points);
    }
    
}

export { notifyMove, logInServer, joinGame, leave, serverGameOver, ranking };