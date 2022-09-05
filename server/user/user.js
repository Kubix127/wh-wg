const express = require('express');
const path = require('path');
const user = express.Router();

const pool = require('../db');

const login = require('./login');
const register = require('./register');
const frakcja = require('./frakcja');
const prowincje = require('./prowincje');
const budynek = require('./budynek');
const budowa = require('./budowa');
const armia = require('./armia');
const agenci = require('./agenci');
const technologie = require('./technologie');
const relacje = require('./relacje');

user.use(login);
user.use(register);
user.use(frakcja);
user.use(prowincje);
user.use(budynek);
user.use(budowa);
user.use(armia);
user.use(agenci);
user.use(technologie);
user.use(relacje);


user.get('/api/users', (req, res) => {
  if(req.cookies["Gracz_Id"])
   pool.query(`select Rola from gracz WHERE Id='${req.cookies["Gracz_Id"]}'`, (err, rows) => {
     if (err) {
       res.send(err);
     } else {
       res.send(rows[0].Rola);
     }
   });
 else res.send(``);
});


module.exports = user;