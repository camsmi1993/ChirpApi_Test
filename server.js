const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();
const port = '3000';

const router = express.Router()
const chirpRouter = require("./chirprouter.js")
const usersRouter = require("./usersrouter.js")
app.use(express.json())
app.use("/chirps", chirpRouter)
app.use("/users", usersRouter)



let mysql = require("mysql");
let connection =
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'BeGre@t2019',
        database: "chirpr"
    });

connection.connect();







app.listen(port, function () {
    console.log("Server listening on port " + port)
});

