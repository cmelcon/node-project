
const mysql = require('mysql');
const connection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'todoapp',
    host: 'localhost'
});

connection.connect();

const express = require ('express');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next();
});

app.get('/', (req, res) => res.end("hi"));

app.get('/task', (req, res) => {
  connection.query('SELECT * FROM task', (err, rows) => {
    if (err) res.end('error in get route for task');
    else res.end(JSON.stringify(rows));
  });
});

app.get('/task/:uid', (req, res) => {
  connection.query(`SELECT description, status FROM task WHERE uid='${req.params.uid}'`, (err, rows) => {
    if (err) res.end('error in get route for task');
    else res.end(JSON.stringify(rows));
  });
});

app.post('/task/:desc/:uid/:status', (req, res) => {
    connection.query(`INSERT INTO task (description, uid, status) VALUES
    ('${req.params.desc}', '${req.params.uid}', '${req.params.status}')`,
    (err, dbres) => {
      if (err) res.end('error in posting task route');
      else res.json(dbres);
    });
});

app.put('/task/:uid/:newStatus', (req, res) => {
  connection.query(`UPDATE task SET status='${req.params.newStatus}' WHERE uid='${req.params.uid}'`,
  (err, dbres) => {
    if(err) res.end('error in update task status');
    else res.json(dbres);
  });
});


app.delete('/task/:id', (req, res) => {
  connection.query(`DELETE FROM task WHERE id='${req.params.id}'`,
  (err, dbres) => {
    if (err) res.end('error in delete task content');
    else res.json(dbres);
  });
});

app.listen(9999, () => console.log("Server listening at port 9999"));
