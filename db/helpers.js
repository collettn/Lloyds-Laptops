import mongoose from 'mongoose';
import mysql from 'mysql2'
import { DB_URI } from "../config/environment.js";
import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER } from "../config/environment.js"

function sqlConnect() {
    console.log("Create MYSQL Connection");
    console.log("Connetion data: " + MYSQL_USER + ":" + MYSQL_PASSWORD + "@"+ MYSQL_HOST );
    let conn = mysql.createConnection({
        host: MYSQL_HOST,
        user: 'root',
        password: MYSQL_PASSWORD
    });

    console.log("Connect to Server");
    conn.connect((err) => {
        if (err) {
            console.log("Connection failed", err);
        } else {
            console.log("Connected!");
        }
        return conn
    });
}

function connect() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  return mongoose.connect(DB_URI, options);
}

export default {
  connect,
  sqlConnect
};