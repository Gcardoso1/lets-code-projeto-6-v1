var express = require('express');
var router = express.Router();
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todolist"
});
router.post('/register', async function (req, res, next) {
try {
    let { username, email, password } = req.body;
    const hashed_password = md5(password.toString())
    const checkUsername = `Select username FROM users WHERE username = ?`;
    con.query(checkUsername, [username], (err, result, fields) => {
    if(!result.length){
        const sql = `Insert Into users (username, email, password) VALUES ( ?, ?, ? )`
        con.query(
            sql, [username, email, hashed_password],
            (err, result, fields) =>{
                if(err){
                    res.send({ status: 0, data: err });
                }else{
                    let token = jwt.sign({ data: result }, 'secret')
                    res.send({ status: 1, data: result, token : token });
                }
            }
        )
    }
    });
} catch (error) {
    res.send({ status: 0, error: error });
}
});

router.post('/create-task', async function (req, res, next) {
    try {
        let { id_users, titulo, descricao, data_entrega, prioridade } = req.body;
        //const hashed_password = md5(password.toString())
        //const checkUsername = `Select username FROM users WHERE username = ?`;
        const sql = `Insert Into task (id_users, title, description, dueDate, priority) VALUES ( ?, ?, ?, ?, ? )`
        con.query(
            sql, [id_users, titulo, descricao, data_entrega, prioridade],
            (err, result, fields) =>{
                if(err){
                    res.send({ status: 0, data: err });
                }else{
                    let token = jwt.sign({ data: result }, 'secret')
                    res.send({ status: 1, data: result, token : token });
                }
            }
        );
        /*con.query(checkUsername, [username], (err, result, fields) => {
        if(!result.length){
            const sql = `Insert Into task (id_users, titulo, descricao, data_entrega, prioridade) VALUES ( ?, ?, ?, ?, ? )`
            con.query(
                sql, [username, email, hashed_password],
                (err, result, fields) =>{
                    if(err){
                        res.send({ status: 0, data: err });
                    }else{
                        let token = jwt.sign({ data: result }, 'secret')
                        res.send({ status: 1, data: result, token : token });
                    }
                }
            )
        }
        });*/
    } catch (error) {
        res.send({ status: 0, error: error });
    }
    }
);
router.post('/update-task', async function (req, res, next) {
    try {
        let { id_task, titulo, descricao, data_entrega, prioridade } = req.body;
        //const hashed_password = md5(password.toString())
        //const checkUsername = `Select username FROM users WHERE username = ?`;
        const sql = `UPDATE task SET title=?,description=?,dueDate=?,priority=? WHERE id_task=?`
        con.query(
            sql, [titulo, descricao, data_entrega, prioridade, id_task],
            (err, result, fields) =>{
                if(err){
                    res.send({ status: 0, data: err });
                }else{
                    let token = jwt.sign({ data: result }, 'secret')
                    res.send({ status: 1, data: result, token : token });
                }
            }
        );
    } catch (error) {
        res.send({ status: 0, error: error });
    }
    }
);
router.post('/login', async function (req, res, next) {
    try {
        let { username, password } = req.body;
        const hashed_password = md5(password.toString())
        const sql = `SELECT * FROM users WHERE username = ? AND password = ?`
        con.query(
        sql, [username, hashed_password],
        function(err, result, fields){
        if(err){
            res.send({ status: 0, data: err });
        }else{
            console.log(result);
            let token = jwt.sign({ data: result }, 'secret')
            res.send({ status: 1, data: result, token: token });
        }
        })
    } catch (error) {
    res.send({ status: 0, error: error });
    }
});
router.post('/read-task', async function (req, res, next) {
    try {
        let { id_user } = req.body;
        const sql = `SELECT * FROM task WHERE id_users = ?`
        con.query(
        sql, [id_user],
        function(err, result, fields){
            /*if(err){
                res.send({ status: 0, data: err });
            }else{
                let token = jwt.sign({ data: result }, 'secret')
                res.send({ status: 1, data: result, token: token });
            }*/
            if(err){
                res.send({ data: err });
            }else{
                let token = jwt.sign({ data: result }, 'secret')
                res.send(result);
            }
        })
    } catch (error) {
    res.send({ status: 0, error: error });
    }
});
router.get('/read', async function (req, res, next) {
    try {
        const sql = `SELECT * FROM task`
        con.query(
        sql, function(err, result, fields){
            if(err){
                res.send({ data: err });
            }else{
                let token = jwt.sign({ data: result }, 'secret')
                console.log(result);
                res.send(result);
            }
        })
    } catch (error) {
    res.send({ status: 0, error: error });
    }
});
router.post('/delete-task', async function (req, res, next) {
    try {
        let { id_task } = req.body;
        const sql = `DELETE FROM task WHERE id_task = ?`
        con.query(
        sql, [id_task],
        function(err, result, fields){
            if(err){
                res.send({ status: 0, data: err });
            }else{
                let token = jwt.sign({ data: result }, 'secret')
                res.send({ status: 1, data: result, token: token });
            }
        })
    } catch (error) {
    res.send({ status: 0, error: error });
    }
});

router.post('/task-done', async function (req, res, next) {
    try {
        let { id_task, done } = req.body;
        const sql = `UPDATE task SET done=? WHERE id_task=?`
        con.query(
        sql, [done, id_task],
        function(err, result, fields){
            if(err){
                res.send({ status: 0, data: err });
            }else{
                let token = jwt.sign({ data: result }, 'secret')
                res.send({ status: 1, data: result, token: token });
            }
        })
    } catch (error) {
    res.send({ status: 0, error: error });
    }
});

router.post('/read-one-task', async function (req, res, next) {
    try {
        let { id_task } = req.body;
        const sql = `SELECT * FROM task WHERE id_task = ?`
        con.query(
        sql, [id_task],
        function(err, result, fields){
            if(err){
                res.send({ status: 0, data: err });
            }else{
                let token = jwt.sign({ data: result }, 'secret')
                res.send({ status: 1, data: result, token: token });
            }
        })
    } catch (error) {
    res.send({ status: 0, error: error });
    }
});
module.exports = router;