const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "empresa"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});



app.get("/api", (req, res) => {
    con.query("SELECT * FROM clientes WHERE clie_tx_status = 'ativo'", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

app.post("/cadastrar", (req, res) => {
    let nome = req.body.nome;
    let telefone = req.body.telefone;

    con.query(`INSERT INTO clientes (clie_tx_nome, clie_tx_telefone, clie_tx_status) VALUES ('${nome}','${telefone}','ativo')`, function (err, result, fields) {
        if (err) throw err;
    });
    res.redirect('http://localhost:3000/');
});

app.post("/excluir", (req, res) => {
    let id = req.body.id;

    con.query(`UPDATE clientes SET clie_tx_status='inativo' WHERE clie_nb_id='${id}'`, function (err, result, fields) {
        if (err) throw err;
    });

    res.redirect('http://localhost:3000/');
});

app.listen(3001, () => {
    console.log('Servidor rodando');
})