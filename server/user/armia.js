const express = require('express')
const armie = express.Router()

const pool = require('../db');


// armie.get('/api/users/armia/miasta', (req, res) => {
//   pool.query(`SELECT Nazwa FROM miasto WHERE Id_Właściciel=(SELECT frakcja.Id FROM frakcja INNER JOIN gracz ON frakcja.Nazwa = gracz.Rola WHERE gracz. Id ='${req.cookies["Gracz_Id"]}')`, (err, rows) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(rows);
//     }
//   });
// });

armie.get('/api/users/armie', (req, res) => {
  const Gracz_Id = req.cookies["Gracz_Id"];

  if(Gracz_Id)
  pool.query(`SELECT frakcja.Id FROM frakcja INNER JOIN gracz ON gracz.Rola=frakcja.Nazwa WHERE gracz.Id='${Gracz_Id}'`, async (err, rows) => {
     if (err) {
      	res.send(err);
      } else {
      	const frakcja_Id = rows[0].Id;
      	var response = [];
      	const armie = new Promise(async (resolve_armia) =>{
      		pool.query(`SELECT armia.Id, armia.Nazwa, Lokalizacja, Utrzymanie, Ruch, armia_działania.Nazwa as Działanie FROM armia INNER JOIN armia_działania ON armia_działania.Id = armia.działanie WHERE Id_Frakcja='${frakcja_Id}'`, async (err, rows) => {
      			if(err) {
      				res.send(err);
      			} else {
      				const armie = rows;
      				const armie_Count = rows.length;
      				var done = 0;
      				for(armia of armie){
      					const armia_Id = armia.Id;
                var jednostki = [];
                var działania = [];

                const działaniaQuery = new Promise(async (resolve_działania) => {
                  pool.query(`SELECT * FROM armia_działania`, (err, rows) => {
                    if(err) {
                      res.send(err);
                    } else {
                      działania = rows;
                      resolve_działania();
                    }
                  });
                });
                await działaniaQuery;

      					const jednostkiQuery = new Promise(async (resolve_jednostki) => {
      						pool.query(`SELECT armia_jednostki.Id, Nazwa, armia_jednostki.Hp, jednostka.Hp as maxHp, Atak, Dyscyplina, jednostka.Poziom, Rodzaj, Koszt, Utrzymanie, Geneza FROM armia_jednostki INNER JOIN jednostka ON jednostka.Id = armia_jednostki.Id_Jednostka WHERE Id_Armia='${armia_Id}'`, (err, rows) => {
      							if(err) {
      								res.send(err);
      							} else {
      								jednostki = rows;
      								resolve_jednostki();
      							}
      						});
      					});
      					await jednostkiQuery;
                response.push([armia, jednostki, działania]);
      					done++;
      					if(done==armie_Count) {
      						resolve_armia();
      					}
      				}
      			}
      		});
      	});
      	await armie;
      	res.send(response);	}
	});
});

armie.get('/api/users/armia', async (req, res)=>{
  const Id = req.query.Id;
  var jednostki = [];
  var działania = [];
  var rekrutacja = [];

  pool.query(`SELECT armia.Id, armia.Nazwa, Lokalizacja, Utrzymanie, Ruch, armia_działania.Nazwa as Działanie FROM armia INNER JOIN armia_działania ON armia_działania.Id = armia.działanie WHERE armia.Id='${Id}'`, async (err, rows) => {
    if(err) {
      res.send(err);
    } else {
      const armia = rows[0];
      const Lokalizacja = rows[0].Lokalizacja;

      const działaniaQuery = new Promise(async (resolve_działania) => {
        pool.query(`SELECT * FROM armia_działania`, (err, rows) => {
          if(err) {
            res.send(err);
          } else {
            działania = rows;
            resolve_działania();
          }
        });
      });
      await działaniaQuery;

      const jednostkiQuery = new Promise(async (resolve_jednostki) => {
        pool.query(`SELECT armia_jednostki.Id, Nazwa, armia_jednostki.Hp, jednostka.Hp as maxHp, Atak, Dyscyplina, jednostka.Poziom, Rodzaj, Koszt, Utrzymanie, Geneza FROM armia_jednostki INNER JOIN jednostka ON jednostka.Id = armia_jednostki.Id_Jednostka WHERE Id_Armia='${Id}'`, (err, rows) => {
          if(err) {
            res.send(err);
          } else {
            jednostki = rows;
            resolve_jednostki();
          }
        });
      });
      await jednostkiQuery;

      const rekrutacjaQuery = new Promise(async (resolve_rekrutacja)=>{
        pool.query(`SELECT t1.Nazwa, t1.Id FROM (SELECT jednostka.Nazwa, jednostka.Id, COUNT(DISTINCT rekrutacja.Id) as count, miasto.Id_Prowincja FROM rekrutacja INNER JOIN budynek ON rekrutacja.Id=budynek.Id_Rekrutacja INNER JOIN zabudowa ON budynek.Id_Budynek = zabudowa.Id_Budynek INNER JOIN miasto ON miasto.Id = zabudowa.Id_Miasto INNER JOIN jednostka ON jednostka.Id = rekrutacja.Id_Jednostka INNER JOIN Frakcja ON miasto.Id_Właściciel = Frakcja.Id WHERE zabudowa.Tier >= budynek.Tier AND (jednostka.Geneza = Frakcja.Geneza OR jednostka.Geneza = Frakcja.Nazwa) AND miasto.Id_Prowincja = (SELECT Id_Prowincja FROM miasto WHERE Nazwa='${Lokalizacja}') GROUP BY jednostka.Id, miasto.Id_Prowincja) t1 INNER JOIN (SELECT jednostka.Nazwa, jednostka.id, COUNT(DISTINCT rekrutacja.Id) as count FROM jednostka INNER JOIN rekrutacja ON rekrutacja.Id_Jednostka=jednostka.Id  INNER JOIN budynek ON rekrutacja.Id=budynek.Id_Rekrutacja GROUP BY Jednostka.Id) t2 ON t1.count = t2.count WHERE t1.id=t2.id`, (err, rows)=>{
          if(err){
            res.send(err);
          } else {
            rekrutacja = rows;
            
            resolve_rekrutacja();
          }
        });
      });
      await rekrutacjaQuery;

      res.send({armia, jednostki, działania, rekrutacja});
    }
  });
});

armie.post('/api/users/armia/dzialanie', (req, res) => {
  const Działanie = req.body.Działanie;
  const Id_Armia = req.body.Id_Armia;
  pool.query(`UPDATE armia SET Działanie=(SELECT Id FROM armia_działania WHERE Nazwa='${Działanie}') WHERE Id=${Id_Armia}`, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send('succ');
    }
  });
});


armie.post('/api/users/armia/rekrutacja',async (req, res) => {
  const Id_Rekrut = req.body.Id_Rekrut;
  const Id_Armia = req.body.Id_Armia;
  pool.query(`SELECT COUNT(Id) as Count FROM armia_jednostki WHERE Id_Armia = '${Id_Armia}'`, (err , rows) => {
    if(err) {
      res.send(err);
    } else {
      const Rozmiar = rows[0].Count;
      console.log(Rozmiar);
      if (Rozmiar<20) {
        pool.query(`SELECT * FROM jednostka WHERE Id='${Id_Rekrut}'`, (err, rows) => {
          if (err) {
            res.send(err);
          } else {
            const jednostka = rows[0];
            var Hp = jednostka.Hp;
            var Poziom = jednostka.Poziom;
            var Czas = 1;
            pool.query(`INSERT INTO armia_jednostki VALUES('','${Id_Armia}','${Id_Rekrut}','${Hp}','${Poziom}','${Czas}')`, (err, rows) => {
              if(err) {
                res.send(err);
              } else {
                res.send('succ');        
              }
            });
          }
        });
      }
    }
  });
});

module.exports = armie;