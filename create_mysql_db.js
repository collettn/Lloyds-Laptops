import mysql from "mysql"

var con = mysql.createConnection({
    host: "localhost",
    user: "ncollett",
    password: "Passw0rd"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS lloyds-db", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });