const http = require("http");
const ranking = require("./handlers/ranking");
const register = require("./handlers/register");

const PORT = 9074;

class Server {
  constructor() {}

  getServer() {
    return this.server;
  }

  initServer() {
    this.server = http.createServer((request, response) => {
      switch (request.method) {
        case "GET":
          this.handleGET(request, response);
          break;
        case "POST":
          let body = "";
          request.on("data", (chunk) => {
            body += chunk;
          });
          request.on("end", () => {
            this.handlePOST(request, response, body);
          });
          break;
        case "OPTIONS":
          response.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
          });
          response.end();
          break;
        default:
          response.writeHead(404, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
          });
          response.end();
          break;
      }
    });
  }

  listen(PORT) {
    this.server.listen(PORT);
  }

  handleGET(req, res) {
    const url = req.url.split("?")[0];
    switch (url) {
      case "/update":
        handleUpdate();
        break;
      default:
        const error = {
          error: "Invalid GET Request",
        };
        res.writeHead(404, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
        });
        res.write(JSON.stringify(error), () => {
          res.end();
        });
    }
  }

  handlePOST(req, res, body) {
    const url = req.url.split("?")[0];
    let response;
    switch (url) {
      case "/join":
        response = join.handleJoin(body);
        res.writeHead(response[1], {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
        });
        res.write(JSON.stringify(response[0]), () => {
          res.end();
        });
        break;
      case "/leave":
        handleLeave();
        break;
      case "/notify":
        response = notify.handleNotify(body);
        res.writeHead(response[1], {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
        });
        res.write(JSON.stringify(response[0]), () => {
          res.end();
        });
        break;
      case "/ranking":
        console.log("Ranking");
        response = ranking.handleRanking();
        console.log("no ranking response 0 " + response[0]);
        console.log("no ranking response 1 " +response[1]);

        res.writeHead(response[1], {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
        });
        res.write(JSON.stringify(response[0]), () => {
          res.end();
        });
        break;
      case "/register":
        console.log(body);
        response = register.handleRegister(body);
        console.log("response 0 " + response[0]);
        console.log("response 1 " + response[1]);

        res.writeHead(response[1], {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
        });
        res.write(JSON.stringify(response[0]), () => {
          res.end();
        });
        break;
      default:
        const error = {
          error: "Invalid POST Request",
        };
        console.log("invalid post request");
        res.writeHead(404, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
        });
        res.write(JSON.stringify(error), () => {
          res.end();
        });
    }
  }
}

const server = new Server();
server.initServer();
server.listen(PORT);

/*
const http = require('http');
const url  = require('url');


http.createServer((request,response) => {

    switch(request.method) {
    case 'POST':
        doActualPOSTRequests(request, response);
        break;
    default:
        response.writeHead(501); // 501 Not Implemented
        response.end();
    }

}).listen(9074);

const data = JSON.stringify({
    nick: "abc",
    victories:100,
    games:200
});


function doActualPOSTRequests(request, response) {
    const parsedUrl = url.parse(request.url,true);  
    const pathname = parsedUrl.pathname;
    const params = parsedUrl.searchParams;
    switch(pathname){
        case '/register':
            console.log("register");
        break;
        case '/ranking':
            if (response.ok) {
                console.log(response.json());
                console.log("move was made");
                console.log("ranking");
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.write( data); //write do objeto ranking que eu não sei como obter 
                response.end();
                return response;
            } else {
              throw new Error('Invalid move');
            }
        break;
    }
}
/*

const server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Método: '+request.method+'\n');
    response.write('URL: '+request.url+'\n');
    const parsedUrl = url.parse(request.url,true);    

    const pathname = parsedUrl.pathname;
    switch(pathname){
        case '/register':
            let body = '';
            case 'POST':    
              request
                  .on('data', (chunk) => { body += chunk;  })
                  .on('end', () => {
                         try { query = JSON.parse(body);   }
                         catch(err) {  }
                  })
                  .on('error', (err) => { console.log(err.message); });
              break;
        break;
        case '/':
            response.write("nada");
        break;
        default:
            response.writeHead(501); // 501 Not Implemented
            response.end();
        
    }
    const query = parsedUrl.query;
    const name = query.name == undefined? 'amig@': query.name; 
    const mensagem = 'Podes repetir?';

    switch(parsedUrl.pathname) {
    case '/hello':
        mensagem = 'Olá '+name;
    break;
    case '/bye':
        mensagem = 'Adeus '+name;
    break;
    }
    response.write(mensagem);
    response.end();
});
server.listen(9074);

/*let PORT     = 8001;

let http     = require('https');
let url      = require('url');


const crypto = require('crypto');

const hash = crypto
               .createHash('md5')
               .update('a')
              .digest('hex');

const data = JSON.stringify({
    game: hash
});

const options ={
    hostname : 'twserver.alunos.dcc.fc.up.pt',
    path : '/register',
        method: 'POST',
        header: {
            'Content-Type': 
                'application/json;'
        }
}

const req= http.request(options, (res) =>{
    let body = '';
    console.log("Status Code: ", res.statusCode)
    res.on('data', (chunk) =>{
        body += chunk;
    })
    res.on('end', () =>{
        console.log("Body:", JSON.parse(data));
    })
} )

req.write(data);
req.end();
/*
let server = http.createServer( function(request, response){
    response.writeHead(200, {'Content-TYpe': 'application/json'});
    response.write('Método: '+request.method+'\n');
    response.write('URL: '+request.url+'\n');
    response.end('hi');
    
});
/*
http.createServer((request,response) => {

    switch(request.method) {
    case 'POST':
        doPostRequest(request,response);
        break;
    default:
        response.writeHead(501); // 501 Not Implemented
        response.end();    
    }

}).listen(conf.port);
server.listen(974, 'twserver.alunos.dcc.fc.up.pt');
console.log('im here');

function doPostRequest(request,response){


}



function doGetRequest(request,response) {
    const pathname = getPathname(request);
    if(pathname === null) {
        response.writeHead(403); // Forbidden
        response.end();
    } else 
        fs.stat(pathname,(err,stats) => {
            if(err) {
                response.writeHead(500); // Internal Server Error
                response.end();
            } else if(stats.isDirectory()) {
                if(pathname.endsWith('/'))
                   doGetPathname(pathname+conf.defaultIndex,response);
                else {
                   response.writeHead(301, // Moved Permanently
                                      {'Location': pathname+'/' });
                   response.end();
                }
            } else 
                doGetPathname(pathname,response);
       });    
}

function getPathname(request) {
    const purl = url.parse(request.url);
    let pathname = path.normalize(conf.documentRoot+purl.pathname);

    if(! pathname.startsWith(conf.documentRoot))
       pathname = null;

    return pathname;
}
*/