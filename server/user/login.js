const express = require('express')
const login = express.Router()

const pool = require('../db');


login.post('/api/users/login', (req, res) => {
  const user = {
    Nazwa: req.body.user.Nazwa,
    password: req.body.user.password
  }
  if(user)
   pool.query(`select Id from gracz WHERE Login='${user.Nazwa}' AND Hasło = '${user.password}'`, (err, rows) => {
     if (err) {
       res.send(err);
     } else {
      console.log(rows);
      console.log(user);
       res.send(rows[0]);
     }
   });
 else res.send(``);
});

module.exports = login;