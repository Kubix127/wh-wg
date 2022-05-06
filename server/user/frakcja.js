const express = require('express');
const frakcja = express.Router();

const pool = require('../db');


frakcja.get('/api/users/frakcja', (req, res) =>{
  const Gracz_Id = req.cookies["Gracz_Id"];

  if(Gracz_Id)
    pool.query(`SELECT frakcja.Id FROM frakcja INNER JOIN gracz ON gracz.Rola=frakcja.Nazwa WHERE gracz.Id='${Gracz_Id}'`, async (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        const Id = rows[0].Id;
        pool.query(`SELECT * FROM frakcja WHERE Id='${Id}'`, (err, rows)=>{
          if (err) {
            res.send(err);
          } else {
            res.send(rows);
          }
        });
      }
    });
});

frakcja.get('/api/users/frakcja/skarbiec', (req, res) =>{
  const Gracz_Id = req.cookies["Gracz_Id"];

  if(Gracz_Id)
    pool.query(`SELECT frakcja.Id FROM frakcja INNER JOIN gracz ON gracz.Rola=frakcja.Nazwa WHERE gracz.Id='${Gracz_Id}'`, async (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        const Id = rows[0].Id;
        pool.query(`SELECT Saldo FROM frakcja WHERE Id='${Id}'`, (err, rows)=>{
          if (err) {
            res.send(err);
          } else {
            res.send(rows[0]);
          }
        });
      }
    });
});



module.exports = frakcja;