const express = require('express')
const relacje = express.Router()

const pool = require('../db');


relacje.get('/api/users/relacje', (req, res) => {
  const Gracz_Id = req.cookies["Gracz_Id"];

  if(Gracz_Id)
  pool.query(`SELECT frakcja.Id FROM frakcja INNER JOIN gracz ON gracz.Rola=frakcja.Nazwa WHERE gracz.Id='${Gracz_Id}'`, async (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      const frakcja_Id = rows[0].Id;
      var response = {};
      pool.query(`SELECT frakcja.Id, frakcja.Nazwa FROM frakcja WHERE frakcja.Id != ${frakcja_Id} ORDER BY frakcja.Geneza`, (err, rows) => {
        if (err) {
          res.send(err);
        } else {
          response.frakcje = rows;
          res.send(response);
        }
      })
    }
  });
});
module.exports = relacje;