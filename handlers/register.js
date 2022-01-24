const fs = require("fs");

exports.handleRegister = function (body) {
  const data = JSON.parse(body);
  const file_path = "./handlers/users.jsonl";
  let nick, pass;

  for (const key in data) {
    if (key === "nick") {
      nick = data[key];
    } else if (key === "password") {
      pass = data[key];
    } else {
      return [{ error: "Invalid parameter in request" }, 400];
    }
  }

  if (nick === undefined) {
    return [{ error: "Nick not specified" }, 400];
  }

  if (pass === undefined) {
    return [{ error: "Password not specified" }, 400];
  }

  try {
    let found = false;

    const user_data = fs.readFileSync(file_path, {
      encoding: "utf-8",
      flag: "r",
    });

    const lines = user_data.split(/\r?\n/);

    for (let i = 0; i < lines.length; i++) {
      if (lines[i] !== "") {
        const line = JSON.parse(lines[i]);

        if (line.nick === nick) {
          if (
            line.pass === pass
          ) {
            found = true;
            return [{}, 200];
          } else {
            found = true;
            return [
              { error: "User registered with a different password" },
              401,
            ];
          }
        }
      }
    }

    if (!found) {
      const new_user = {
        nick: nick,
        pass: pass,
      };

      fs.appendFileSync(file_path, JSON.stringify(new_user) + "\n", (err) => {
        if (err) {
          throw err;
        }
      });

      return [{}, 200];
    }
  } catch (err) {
    console.error(err);
  }
};