const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/play_bingo", (req, res) => {
  const str_list_number = req.body.str_list_number || req.query.str_list_number;
  var table_bingo = new Array(5);

  for (var i = 0; i < table_bingo.length; i++) {
    table_bingo[i] = new Array(5);
  }

  var count = 1;
  for (var i = 0; i < table_bingo.length; i++) {
    for (var j = 0; j < table_bingo.length; j++) {
      table_bingo[i][j] = count;
      count++;
    }
  }

  var list_number = str_list_number.split(",");
  var result = false;
  for (var i = 0; i < table_bingo.length; i++) {
    for (var j = 0; j < table_bingo.length; j++) {
      for (var list_n = 0; list_n < list_number.length; list_n++) {
        if (table_bingo[i][j] === Number(list_number[list_n])) {
          table_bingo[i][j] = "S";
        }
      }
    }
  }

  if (
    table_bingo[0][0] === "S" &&
    table_bingo[0][1] === "S" &&
    table_bingo[0][2] === "S" &&
    table_bingo[0][3] === "S" &&
    table_bingo[0][4] === "S"
  ) {
    result = true;
  }
  if (
    table_bingo[4][0] === "S" &&
    table_bingo[4][1] === "S" &&
    table_bingo[4][2] === "S" &&
    table_bingo[4][3] === "S" &&
    table_bingo[4][4] === "S"
  ) {
    result = true;
  }
  if (
    table_bingo[0][0] === "S" &&
    table_bingo[1][1] === "S" &&
    table_bingo[2][2] === "S" &&
    table_bingo[3][3] === "S" &&
    table_bingo[4][4] === "S"
  ) {
    result = true;
  }

  if (
    table_bingo[4][0] === "S" &&
    table_bingo[3][1] === "S" &&
    table_bingo[2][2] === "S" &&
    table_bingo[1][3] === "S" &&
    table_bingo[0][4] === "S"
  ) {
    result = true;
  }

  //console.log(table_bingo);
  //console.log(result);
  res.json({ isBingo: result });
});

app.listen(3000, () => {
  console.log("Server 3000 is Running");
});
