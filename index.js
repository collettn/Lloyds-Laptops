import express from "express";
//import flash from "express-flash";
import Router from "./config/router.js";
import db from "./db/helpers.js"
import appController from "./controller/appController.js";

import { PORT } from "./config/environment.js"

const app = express();

app.use(express.json());
app.use(Router);
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(flash());

app.post("/user/add", appController.addUser);
app.post("/laptop/add", appController.addLaptop);
app.post("/user/edit/:id", appController.updateUser);
app.post("/laptop/edit/:id", appController.updateLaptop);

async function startServer(){
    try {
        await db.connect();
        console.log('Mongoose is connected to the database')

        app.listen(PORT, function(){
            console.log('Lloyds-Laptop is listening on port ' + PORT);
        });
    } catch (err) {
        console.log('Something went wrong connecting to the datbase')
    }
}
startServer()