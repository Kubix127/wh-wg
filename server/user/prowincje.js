const express = require('express');
const prowincje = express.Router();

const pool = require('../db');

prowincje.post('/api/users/prowincje/miasta', (req, res) => {
  const Gracz_Id = req.cookies["Gracz_Id"];
  const miasto_Id = req.body.Id;
  if(Gracz_Id)
    pool.query(`SELECT budynek.*, zabudowa.Czas FROM zabudowa INNER JOIN budynek ON zabudowa.Id_Budynek=budynek.Id_Budynek WHERE Id_miasto=${miasto_Id} AND zabudowa.Tier=budynek.Tier ORDER BY budynek.Id_Budynek`, async (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        var budynki=[];
        for([index, budynek] of rows.entries()) {
          if(rows[index].Id_Rekrutacja) {
            const budynek_Id = budynek.Id_Budynek;
            var budynek = [];
            budynek[0]=rows[index];
            const budynekRekrutacja = new Promise(resolve_budynekRekrutacja => {
                pool.query(`SELECT DISTINCT jednostka.Nazwa, jednostka.Id FROM jednostka INNER JOIN rekrutacja on rekrutacja.Id_Jednostka=jednostka.Id INNER JOIN budynek ON budynek.Id_Rekrutacja = rekrutacja.Id INNER JOIN zabudowa ON zabudowa.Id_Budynek = budynek.Id_Budynek WHERE zabudowa.Id_Budynek=${budynek_Id} AND zabudowa.Id_Miasto=${miasto_Id} AND zabudowa.Tier >= budynek.Tier`, (err, rows) => {
                if(err) {
                  res.send(err);
                } else {
                  budynek[1]=rows;
                  resolve_budynekRekrutacja();
                }
              });
            });
            await budynekRekrutacja;
          } else {
            budynek = [budynek];
          }
          budynki.push(budynek);
          
        }
        res.send(budynki);
      }
    });
});


prowincje.post('/api/users/prowincje/miasta/budowa', (req, res) => {
  const Gracz_Id = req.cookies["Gracz_Id"];
  const miasto_Id = req.body.Id;
  if(Gracz_Id)
   pool.query(`SELECT frakcja.Id FROM frakcja INNER JOIN gracz ON gracz.Rola=frakcja.Nazwa WHERE gracz.Id='${Gracz_Id}'`, (err, rows) => {
     if (err) {
       res.send(err);
     } else {
       const frakcja_Id = rows[0].Id;
       pool.query(`SELECT DISTINCT Id_Budynek, Nazwa, Geneza, MIN(Tier) AS Tier, Koszt, Dochód, Ład, Spaczenie, Przyrost, Wydobycie, Id_Bonus, Id_Rekrutacja FROM budynek WHERE NOT EXISTS (SELECT DISTINCT zabudowa.Id_Budynek FROM zabudowa WHERE zabudowa.Id_Budynek=budynek.Id_Budynek AND zabudowa.Id_Miasto="${miasto_Id}") AND (Geneza = (SELECT Geneza FROM frakcja  WHERE Id ='${frakcja_Id}') OR Geneza=(SELECT miasto.Nazwa FROM miasto WHERE miasto.Id="${miasto_Id}")) AND budynek.Tier<=(SELECT DISTINCT MAX(zabudowa.Tier) FROM zabudowa INNER JOIN budynek ON budynek.Id_Budynek=zabudowa.Id_Budynek WHERE budynek.Nazwa='Budynek główny' AND zabudowa.Id_Miasto="${miasto_Id}") GROUP BY budynek.Id_Budynek`, (err, rows) => {
        if (err) {
       res.send(err);
     } else {
      res.send(rows);
     }
       });
     }
   });
});




//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

prowincje.get('/api/users/prowincje', async(req, res) => {
  const Gracz_Id = req.cookies["Gracz_Id"];

  if(Gracz_Id)
  pool.query(`SELECT frakcja.Id FROM frakcja INNER JOIN gracz ON gracz.Rola=frakcja.Nazwa WHERE gracz.Id='${Gracz_Id}'`, (err, rows) => {
     if (err) {
       res.send(err);
     } else {
       const frakcja_Id = rows[0].Id;
       pool.query(`SELECT * FROM prowincja WHERE Id_Właściciel='${frakcja_Id}'`, async (err, rows) => {
        if (err) {
          res.send(err);
        } else {
          var response = [];
          const prowincje_Count = rows.length;
          const prowincje = new Promise(async (resolve1) => {
          // console.log('prowincje start');
          var prowincje_Done = 0;

            for ([index, row] of rows.entries()) {

              var prowincja = [rows[index], [], []];
              // console.log('loop');
              const prowincja_Id = row.Id_Prowincja;

              const prowincjaRekrutacja = new Promise(resolve_prowincjaRekrutacja => {
                pool.query(`SELECT t1.Nazwa, t1.Id FROM (SELECT jednostka.Nazwa, jednostka.Id, COUNT(DISTINCT rekrutacja.Id) as count, miasto.Id_Prowincja FROM rekrutacja INNER JOIN budynek ON rekrutacja.Id=budynek.Id_Rekrutacja INNER JOIN zabudowa ON budynek.Id_Budynek = zabudowa.Id_Budynek INNER JOIN miasto ON miasto.Id = zabudowa.Id_Miasto INNER JOIN jednostka ON jednostka.Id = rekrutacja.Id_Jednostka INNER JOIN frakcja ON miasto.Id_Właściciel = frakcja.Id WHERE zabudowa.Tier >= budynek.Tier AND (jednostka.Geneza = frakcja.Geneza OR jednostka.Geneza = frakcja.Nazwa) AND miasto.Id_Prowincja ='${prowincja_Id}' GROUP BY jednostka.Id, miasto.Id_Prowincja) t1 INNER JOIN (SELECT jednostka.Nazwa, jednostka.id, COUNT(DISTINCT rekrutacja.Id) as count FROM jednostka INNER JOIN rekrutacja ON rekrutacja.Id_Jednostka=jednostka.Id  INNER JOIN budynek ON rekrutacja.Id=budynek.Id_Rekrutacja GROUP BY jednostka.Id) t2 ON t1.count = t2.count WHERE t1.id=t2.id`, (err, rows) => {
                  if (err) {
                    res.send(err);
                  } else {
                    prowincja[2]=rows;
                    resolve_prowincjaRekrutacja();
                  }
                });
              });

              const prowincjaZabudowa = new Promise(resolve_prowincjaZabudowa => {
                pool.query(`SELECT miasto.Id, miasto.Nazwa, miasto.Stolica, miasto.Woda, surowiec.Nazwa AS Surowiec, surowiec.Cena FROM miasto LEFT JOIN surowiec on miasto.Id_Surowiec = surowiec.Id WHERE Id_Prowincja=${prowincja_Id} AND Id_Właściciel=${frakcja_Id} ORDER BY miasto.Id`, async(err, rows) => {
                  if (err) {
                    res.send(err);
                  } else {
                    const miasta_Count = rows.length;
                    const miastaZabudowa = new Promise(async (resolve) => {
                      // console.log('query start');
                      var done = 0;
                      // console.log('done= ' + done);
                      for(row of rows) {
                        var miasto_Id = row.Id;
                        // console.log('id= ' + miasto_Id);
                        budynki = new Promise(resolve2 => {
                          // console.log('budynki ' + miasto_Id);
                          pool.query(`SELECT budynek.*, zabudowa.Czas FROM zabudowa INNER JOIN budynek ON zabudowa.Id_Budynek=budynek.Id_Budynek WHERE Id_miasto=${miasto_Id} AND zabudowa.Tier=budynek.Tier ORDER BY budynek.Id_Budynek`, async (err, rows) => {
                              if (err) {
                                res.send(err);
                              } else {
                                var budynki=[];
                                for([index, budynek] of rows.entries()) {
                                  if(rows[index].Id_Rekrutacja) {
                                    const budynek_Id = budynek.Id_Budynek;
                                    var budynek = [];
                                    budynek[0]=rows[index];
                                    const budynekRekrutacja = new Promise(resolve_budynekRekrutacja => {
                                        pool.query(`SELECT DISTINCT jednostka.Nazwa, jednostka.Id FROM jednostka INNER JOIN rekrutacja on rekrutacja.Id_Jednostka=jednostka.Id INNER JOIN budynek ON budynek.Id_Rekrutacja = rekrutacja.Id INNER JOIN zabudowa ON zabudowa.Id_Budynek = budynek.Id_Budynek WHERE zabudowa.Id_Budynek=${budynek_Id} AND zabudowa.Id_Miasto=${miasto_Id} AND zabudowa.Tier >= budynek.Tier`, (err, rows) => {
                                        if(err) {
                                          res.send(err);
                                        } else {
                                          budynek[1]=rows;
                                          resolve_budynekRekrutacja();
                                        }
                                      });
                                    });
                                    await budynekRekrutacja;
                                  } else {
                                    budynek = [budynek];
                                  }
                                  budynki.push(budynek);
                                  
                                }
                                // console.log('budynki= ' + budynki);
                                // console.log(budynek);
                                prowincja[1].push([row, budynki]);
                                done++;
                                // console.log('done= ' + done);
                                resolve2();
                              }
                            });
                          }); 
                          await budynki;
                          if (done === miasta_Count) {
                            resolve();       
                          }
                       }
                    });
                    await miastaZabudowa;
                    resolve_prowincjaZabudowa();
                    response.push(prowincja);
                  }
                });
              });
              await prowincjaRekrutacja;
              await prowincjaZabudowa;
              prowincje_Done ++;
              if(prowincje_Done==prowincje_Count)
                resolve1();

              // console.log('Prowincje end');
            }      
          });
          await prowincje;              
          // console.log(response);
          res.send(response);
          }
       })
     }
   });
});
 
prowincje.get('/api/users/prowincje/edykty', (req, res) => {
  const Gracz_Id = req.cookies["Gracz_Id"];
  if(Gracz_Id)
  pool.query(`SELECT frakcja.Id FROM frakcja INNER JOIN gracz ON gracz.Rola=frakcja.Nazwa WHERE gracz.Id='${Gracz_Id}'`, async (err, rows) => {
    if(err){
        res.send(err);
      } else {
        const Frakcja_Id = rows[0].Id;
        var edykty = []
        const getEdykty = new Promise(resolve_edykty => {
          pool.query(`SELECT edykt.Nazwa, edykt.Id, Opis FROM edykt INNER JOIN frakcja ON frakcja.Geneza = edykt.Geneza WHERE frakcja.Id = ${Frakcja_Id}`, (err, rows) => {
            if(err) {
              res.send(err);
            } else {
              edykty = rows;
              resolve_edykty();
            }
          });
        })
        var efekty = []
        const getEfekty = new Promise(resolve_efekty =>{
          pool.query(`SELECT edykt_efekty.* FROM edykt_efekty INNER JOIN edykt ON edykt.Id=edykt_efekty.edykt_Id INNER JOIN frakcja ON frakcja.Geneza = edykt.Geneza WHERE frakcja.Id = ${Frakcja_Id}`, (err, rows) => {
            if(err) {
              res.send(err);
            } else {
              efekty = rows;
              resolve_efekty();
            }
          });
        })
        await getEdykty;
        await getEfekty;

        edykty.forEach(element => {
          element.efekty = efekty.filter(e => {return e.edykt_Id==element.Id})
        });

        // console.log(edykty,efekty)
        res.send(edykty);
      }
    });
  
});

prowincje.post('/api/users/prowincje/changeEdykt', (req, res) => {
  const edyktId = req.body.edyktId;
  const prowincjaId = req.body.prowincjaId;

  const Gracz_Id = req.cookies["Gracz_Id"];
  if(Gracz_Id)
  pool.query(`SELECT frakcja.Id FROM frakcja INNER JOIN gracz ON gracz.Rola=frakcja.Nazwa WHERE gracz.Id='${Gracz_Id}'`, (err, rows) => {
    if(err){
        res.send(err);
      } else {
        const Frakcja_Id = rows[0].Id;

        pool.query(`UPDATE prowincja SET Id_Edykt=${edyktId} WHERE Id_Właściciel = ${Frakcja_Id} AND Id_prowincja=${prowincjaId}`, (err, rows) => {
          if(err) {
            res.send(err);
        } else {
          res.send('Success')
        }});   
      }
    });
  
});


module.exports = prowincje;