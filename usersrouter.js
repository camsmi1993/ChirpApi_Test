const express = require('express')
const router = express.Router()
const mysql = require("mysql")


let connection =
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'BeGre@t2019',
        database: "chirpr"
    });

router.get("/", (req, res) => {
    connection.query('SELECT * FROM users',
        function (err, results, fields) {
            if (err) {
                connection.end();
                return console.log(err);
            }
            res.send(results)
        })
});



router.get("/:id", (req, res) => {
    connection.query('SELECT * FROM users WHERE id=?',
        [req.params.id], function (err, results, fields) {
            if (err) {
                connection.end();
                return console.log(err);
            }
            res.send(results)
        })
});


router.delete("/:name", (req, res) => {
    connection.query('DELETE FROM users WHERE name = ?',
        [req.params.id], function (err, results, fields) {
            if (err) {
                connection.end();
                return console.log(err);
            }
            res.send(results);

        })
});



router.post("/", (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    connection.query(`INSERT INTO users(name, email, password) VALUES( "?", "?", "?")`, [name, email, password],
        function (err, results, fields) {
            if (err) {
                connection.end();
                return console.log(err)
            }
            res.send(results)
        })
});

router.put("/:id", (req, res) => {
    let name = req.body.name;
    let id = req.params.id;
    let email = req.body.email;
    let password = req.body.password;
    connection.query("UPDATE users SET ? WHERE id=?",
        [{ name: name }, { email: email }, { password: password }, id], function (err, results, fields) {
            if (err) {
                connection.end();
                return console.log(err)
            }
            res.send(results)
        })
});

module.exports = router;