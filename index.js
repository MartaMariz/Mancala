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


  handlePOST(req, res, body) {
    const url = req.url.split("?")[0];
    let response;
    switch (url) {
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
        res.write(response[0], () => {
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