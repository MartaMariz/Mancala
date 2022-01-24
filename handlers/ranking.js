const fs = require("fs");

exports.handleRanking = () => {
  const file_path = "./handlers/ranking.json";

  try {
    const ranking_data = fs.readFileSync(file_path, {
      encoding: "utf-8",
      flag: "r",
    });

    const line = ranking_data.split(/\r?\n/)[0];
    return [line, 200];
  } catch (err) {
    console.error(err);
  }
};