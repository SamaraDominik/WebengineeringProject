const express = require('express');
const app = express();
const path = require("path");
const mysql = require("mysql2/promise");

let notes = ["hello", "Samara"];

app.get('/', async function (req, res){
    const connection = await mysql.createConnection({host: 'localhost', database:'webengineering', user: 'root', password: pw});
    const [rows, fields] = await connection.execute('SELECT * FROM notes');
    res.render('display', {title: 'Helppp', notes: rows});
} )

app.use(express.static('./public'));
app.use(express.urlencoded({extended: false}));

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "pug");

app.get("/display", function(req, res, next){
    res.render("layout", {title: "Display notes", notes: notes})
})