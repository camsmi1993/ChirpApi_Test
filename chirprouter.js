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


router.get("/:userid", (req, res) => {
    connection.query('SELECT * FROM chirps WHERE userid=?',
        [req.params.userid], function (err, results, fields) {
            if (err) {
                connection.end();
                return console.log(err);
            }
            res.send(results)
        })
});
router.get("/:id", (req, res) => {
    connection.query('SELECT * FROM chirps WHERE id=?',
        [req.params.id], function (err, results, fields) {
            if (err) {
                connection.end();
                return console.log(err);
            }
            res.send(results)
        })
});
router.delete("/:id", (req, res) => {
    connection.query('DELETE FROM chirps WHERE id = ?',
    [req.params.id], function (err, results, fields) {
            if (err) {
                connection.end();
                return console.log(err);
            }
            res.send(results);

        })
});
router.post("/", (req, res)=>{
    let userid = req.body.userid;
    let text = req.body.text;
    let location = req.body.location;
    connection.query("INSERT INTO chirps (userid,text,location) VALUES('?','?', '?')",[userid, text, location],
        function (err, results, fields){
            if(err){
                connection.end();
                return console.log(err)
            }
            res.send(results)
        })
});


router.get("/", (req, res) => {
    connection.query('SELECT * FROM chirps',
        function (err, results, fields) {
            if (err) {
                connection.end();
                return console.log(err);
            }
            res.send(results)
        })
});
module.exports = router