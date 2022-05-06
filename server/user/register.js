const express = require('express')
const register = express.Router()
const { v4: uuidv4 } = require('uuid');

const pool = require('../db');


register.post('/api/users/register', (req, res) => {
  const user = {
    Nazwa: req.body.Nazwa,
    password: req.body.password
  }
  if(user)
   pool.query(`select Id from gracz WHERE Login='${user.Nazwa}'`, (err, rows) => {
     if (err) {
       res.send(err);
     } else {
      if (!(!rows[0])) {
        res.send({state: 'Już istnieje'});
        console.log(`Już istnieje`);
      } else {
        do{
          var d;
          var uuid=uuidv4();
          pool.query(`SELECT * FROM gracz WHERE Id='`+uuid+`'`, (err, rows) => {
            if (err) {
              res.send(err);
            } else {
              d=(!rows[0]);
              console.log(d);
              console.log("uuid: " + uuid);
            }
          })
        } while(d);
        console.log(uuid);
        pool.query(`INSERT INTO gracz (Id, Login, Hasło) VALUES ('${uuid}','${user.Nazwa}','${user.password}')`, (err, rows) => {
        if (err) {
          res.send(err);
        } else {
          res.send({state:'Success', Id: uuid});
        }});
      }
     }
   });
});


module.exports = register;