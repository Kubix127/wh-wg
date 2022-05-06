const express = require('express')
const budynek = express.Router()

const pool = require('../db');


budynek.post('/api/users/budynek', (req, res) => {
  const	Id_Budynek = req.body.Id_Budynek;
  const	Id_Miasto = req.body.Id_Miasto;
   pool.query(`SELECT zabudowa.Czas, budynek.* FROM budynek INNER JOIN zabudowa ON zabudowa.Id_Budynek=budynek.Id_Budynek WHERE Id_Miasto='${Id_Miasto}' AND zabudowa.Id_Budynek='${Id_Budynek}' AND zabudowa.Tier=budynek.Tier`, (err, rows) => {
     if (err) {
       res.send(err);
     } else {
       res.send(rows);
     }
   });
});

budynek.post('/api/users/budynek/deconstruct', (req, res) => {
  const	Id_Budynek = req.body.Id_Budynek;
  const	Id_Miasto = req.body.Id_Miasto;
   pool.query(`UPDATE zabudowa SET czas='-1' WHERE Id_Miasto='${Id_Miasto}' AND Id_Budynek='${Id_Budynek}'`, (err, rows) => {
     if (err) {
       res.send(err);
     } else {
       res.send('succ');
     }
   });
});

budynek.post('/api/users/budynek/deconstruct/stop', (req, res) => {
  const	Id_Budynek = req.body.Id_Budynek;
  const	Id_Miasto = req.body.Id_Miasto;

   pool.query(`UPDATE zabudowa SET czas='0' WHERE Id_Miasto='${Id_Miasto}' AND Id_Budynek='${Id_Budynek}'`, (err, rows) => {
     if (err) {
       res.send(err);
     } else {
       res.send('succ');
     }
   });
});

budynek.post('/api/users/budynek/upgrade', (req, res) => {
  const Id_Budynek = req.body.Id_Budynek;
  const Id_Miasto = req.body.Id_Miasto;
  const Gracz_Id = req.cookies["Gracz_Id"];

  if(Gracz_Id)
  pool.query(`SELECT Saldo, frakcja.Id FROM frakcja INNER JOIN gracz ON gracz.Rola = frakcja.Nazwa WHERE gracz.Id = '${Gracz_Id}'`, (err, rows) =>{
    if (err) {
      res.send(err);
    } else {
      const Saldo=rows[0].Saldo;
      const Id_Frakcja=rows[0].Id;
      pool.query(`SELECT MIN(budynek.Tier) as Tier, Koszt FROM budynek INNER JOIN zabudowa ON zabudowa.Id_Budynek = budynek.Id_Budynek WHERE budynek.Id_Budynek='${Id_Budynek}' AND budynek.Tier>zabudowa.Tier AND Id_Miasto='${Id_Miasto}'`, (err, rows) => {
        if (err) {
          res.send(err);
        } else {
          const Tier=rows[0].Tier;
          const Koszt=rows[0].Koszt;
          if(Koszt>Saldo){
            res.send('Brak środków');
          } else {
            pool.query(`UPDATE zabudowa SET Tier=${Tier}, Czas=${Tier} WHERE Id_Miasto=${Id_Miasto} AND Id_Budynek=${Id_Budynek}; UPDATE frakcja SET Saldo=Saldo-${Koszt} WHERE Id=${Id_Frakcja}`, (err, rows) => {
              if(err) {
                res.send(err);
              } else {
                res.send('succ');
              }
            });
          }
        }
      });
    }
  });
});

budynek.post('/api/users/budynek/stop', (req, res) => {
  const Id_Budynek = req.body.Id_Budynek;
  const Id_Miasto = req.body.Id_Miasto;
  const Gracz_Id = req.cookies["Gracz_Id"];

  if(Gracz_Id)
    pool.query(`SELECT frakcja.Id FROM frakcja INNER JOIN gracz ON gracz.Rola = frakcja.Nazwa WHERE gracz.Id = '${Gracz_Id}'`, (err, rows) =>{
      if (err) {
        res.send(err);
      } else {
        const Id_Frakcja=rows[0].Id;

        pool.query(`SELECT MAX(budynek.Tier) as Tier, Koszt FROM budynek INNER JOIN zabudowa ON zabudowa.Id_Budynek = budynek.Id_Budynek WHERE budynek.Id_Budynek='${Id_Budynek}' AND budynek.Tier<zabudowa.Tier`, (err, rows) => {
          if(err) {
            res.send(err);
          } else {
            const MaxTier = rows[0].Tier;
            console.log(MaxTier);
            if(MaxTier==null){
              pool.query(`DELETE FROM zabudowa WHERE Id_Miasto='${Id_Miasto}' AND Id_Budynek='${Id_Budynek}'; UPDATE frakcja SET Saldo=Saldo+(SELECT Koszt FROM budynek WHERE Id_Budynek=${Id_Budynek} AND Tier=(SELECT MIN(Tier) FROM budynek WHERE Id_Budynek=${Id_Budynek})) WHERE Id=${Id_Frakcja}`, (err, rows) => {
                if (err) {
                  res.send(err);
                } else {
                  res.send('succ');
                }
              });
            } else {
              pool.query(`UPDATE frakcja SET Saldo=Saldo+(SELECT Koszt FROM budynek INNER JOIN zabudowa ON zabudowa.Id_Budynek = budynek.Id_Budynek WHERE budynek.Id_Budynek=${Id_Budynek} AND budynek.Tier=zabudowa.Tier AND zabudowa.Id_Miasto=${Id_Miasto}) WHERE Id=${Id_Frakcja}; UPDATE zabudowa SET Tier=${MaxTier}, czas='0' WHERE Id_Miasto='${Id_Miasto}' AND Id_Budynek='${Id_Budynek}'`, (err, rows) => {
                if (err) {
                  res.send(err);
                } else {
                  res.send('succ');
                }
              });
            }
          }
        });
      }
    });
});





module.exports = budynek;