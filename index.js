import express from "express";
//import flash from "express-flash";
import Router from "./config/router.js";
import db from "./db/helpers.js"
import appController from "./controller/appController.js";
import path from 'path';



//Fix from https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import { fileURLToPath } from "url";
import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER, PORT } from "./config/environment.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use(Router);
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
//app.use(flash());

app.post("/user/add", appController.addUser);
app.post("/laptop/add", appController.addLaptop);
app.post("/user/edit/:id", appController.updateUser);
app.post("/laptop/edit/:id", appController.updateLaptop);

async function startServer(){
    try {
        console.log("Connect to MongoDB database");
        await db.connect();
        console.log('Mongoose is connected to the database')


        console.log("Connect to MYSQL database");
        let conn = db.sqlConnect();

        console.log("Create SQL Database");
        conn.query("CREATE DATABASE IF NOT EXISTS " + MYSQL_DATABASE, (err) => {
            if (err) throw err;
        });

        console.log("Use Database");
        conn.query("USE " + MYSQL_DATABASE, (err) => {
            if (err) throw err;
        });

        console.log("Start Application");
        app.listen(PORT, function(){
            console.log('Lloyds-Laptop is listening on port ' + PORT);
        });
    } catch (err) {
        console.log('Something went wrong connecting to the datbase');
        console.log(err);

    }
}
startServer()