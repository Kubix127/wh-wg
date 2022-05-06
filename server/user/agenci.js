const express = require('express')
const agenci = express.Router()

const pool = require('../db');


agenci.post('/api/users/agenci', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  }
  if(user)
   pool.query(`select Id from gracz WHERE Login='${user.username}' AND Hasło = '${user.password}'`, (err, rows) => {
     if (err) {
       res.send(err);
     } else {
       res.send(rows[0]);
     }
   });
 else res.send(`Brak`);
});

module.exports = agenci;