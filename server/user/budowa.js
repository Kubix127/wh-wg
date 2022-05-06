const express = require('express');
const budowa = express.Router();

const pool = require('../db');


budowa.post('/api/users/budowa', (req, res) => {
  const	Id_Budynek = req.body.Id_Budynek;
  const	Id_Miasto = req.body.Id_Miasto;
  const Gracz_Id = req.cookies["Gracz_Id"];

  if(Gracz_Id)
    pool.query(`SELECT Saldo, frakcja.Id FROM frakcja INNER JOIN gracz ON gracz.Rola = frakcja.Nazwa WHERE gracz.Id = '${Gracz_Id}'`, (err, rows) =>{
    if (err) {
      res.send(err);
    } else {
      const Saldo=rows[0].Saldo;
      const Id_Frakcja=rows[0].Id;
      pool.query(`SELECT MIN(Tier) AS Tier, Koszt, Koszt_Przeludnienie FROM budynek WHERE Id_Budynek='${Id_Budynek}'`,(err,rows) => {
        if (err) {
          res.send(err);
        } else {
          const Tier = rows[0].Tier;
          const Koszt = rows[0].Koszt;
          const Koszt_Przeludnienie = rows[0].Koszt_Przeludnienie;
          console.log(Koszt_Przeludnienie);
          if(Koszt_Przeludnienie){
            var Przeludnienie_Pass = 1;
            console.log('notPass');
            pool.query(`SELECT Przeludnienie FROM prowincja WHERE Id_Właściciel='${Id_Frakcja}' AND Id_Prowincja=(SELECT Id_Prowincja FROM miasto WHERE Id=${Id_Miasto})`,(err,rows) => {
              if (err) {
                res.send(err);
              } else {
                const Przeludnienie = rows[0].Przeludnienie;
                if (Przeludnienie>=Koszt_Przeludnienie){
                  Przeludnienie_Pass = 0;
                  console.log('Pass');
                }
              }
            });
          }
          if(Koszt>Saldo && !Przeludnienie_Pass) {
            res.send('Brak środków')
          } else {
            pool.query(`INSERT INTO zabudowa VALUES ('', '${Id_Miasto}','${Id_Budynek}','${Tier}','${Tier}'); UPDATE frakcja SET Saldo=Saldo-${Koszt} WHERE Id=${Id_Frakcja}; UPDATE prowincja SET Przeludnienie = Przeludnienie-${Koszt_Przeludnienie} WHERE Id_Właściciel='${Id_Frakcja}' AND Id_Prowincja=(SELECT Id_Prowincja FROM miasto WHERE Id=${Id_Miasto})`, (err, rows) => {
              if (err) {
                res.send(err);
              } else {
                res.send('succ');
              }
            });
          }
        }
      })
    }
  });
});







module.exports = budowa;