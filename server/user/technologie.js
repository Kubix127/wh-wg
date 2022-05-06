const express = require('express')
const technologie = express.Router()

const pool = require('../db');


technologie.get('/api/users/technologie', (req, res) => {
  const Gracz_Id = req.cookies["Gracz_Id"];

  if(Gracz_Id)
  pool.query(`SELECT frakcja.Id FROM frakcja INNER JOIN gracz ON gracz.Rola=frakcja.Nazwa WHERE gracz.Id='${Gracz_Id}'`, async (err, rows) => {
     if (err) {
      	res.send(err);
      } else {
      	const frakcja_Id = rows[0].Id;
      	var response = [];
      	const techs = new Promise(async (resolve_techTree) =>{
      		pool.query(`SELECT CONCAT('Id_', technologia.Id, 'T') AS Id, technologia.Nazwa, MIN(t1.Czas) AS Czas, technologia.Geneza, tech_user.Frakcja_Id, tech_user.Wariant, technologia.opis, technologia.Koszt, COUNT(tech_links.Id)-COUNT(CASE WHEN t2.Czas = 0 THEN tech_links.Id END) AS Techs_needed, tech_user.Active FROM technologia INNER JOIN (SELECT Id, Czas FROM technologia UNION SELECT Tech_Id AS Id, Czas FROM tech_user WHERE tech_user.Frakcja_Id=${frakcja_Id}) as t1  ON t1.Id=technologia.Id LEFT JOIN tech_user ON technologia.Id=tech_user.Tech_Id LEFT JOIN tech_links ON tech_links.Child_Id = technologia.Id LEFT JOIN (SELECT * FROM tech_user WHERE tech_user.Frakcja_Id=${frakcja_Id}) as t2 ON t2.Tech_Id = tech_links.Parent_Id  WHERE tech_user.Frakcja_Id=${frakcja_Id} OR tech_user.Frakcja_Id IS NULL AND technologia.Geneza=(SELECT Geneza FROM frakcja WHERE Id=1) GROUP BY technologia.Id`, async (err, rows) => {
      			if(err) {
      				res.send(err);
      			} else {
      				var techTree = rows;
                var done = techTree.length;
                for ([index, tech] of techTree.entries()) {
                  const id = tech.Id.slice(3,-1);
                  const efektyQuery = new Promise(resolve_efekty=>{
                    pool.query(`SELECT * FROM tech_bonus WHERE Tech_Id=${id}`, async (err, rows) =>{
                      if (err) {
                        res.send(err);
                      } else {
                       techTree[index].efekty = rows;
                       resolve_efekty();
                     }
                    });      
                  });
                await efektyQuery;  
                }    
              response.push(techTree);
  						resolve_techTree();
      			}
      		});
      	});
        await techs;

        const links = new Promise(async (resolve_links) =>{
          pool.query(`SELECT CONCAT('Id_', Parent_Id, 'T') as 'from', CONCAT('Id_', Child_Id, 'T') as 'to' FROM tech_links`, async (err, rows) => {
            if(err) {
              res.send(err);
            } else {
              const link = rows;
              response.push(link);
              resolve_links();
            }
          });
        });
        await links;
        // console.log(response);
      	res.send(response);	}
	});
});

technologie.post('/api/users/technologie/wynajdz', (req, res) => {
  const Gracz_Id = req.cookies["Gracz_Id"];
  const Tech_Id = req.body.tech_Id;

  if(Gracz_Id)
  pool.query(`SELECT frakcja.Id FROM frakcja INNER JOIN gracz ON gracz.Rola=frakcja.Nazwa WHERE gracz.Id='${Gracz_Id}'`, async (err, rows) => {
     if (err) {
        res.send(err);
      } else {
        const frakcja_Id = rows[0].Id;

        pool.query(`
          UPDATE tech_user SET Active=0 WHERE Frakcja_Id='${frakcja_Id}';
          UPDATE tech_user SET Active=1 WHERE Frakcja_Id='${frakcja_Id}' AND Tech_Id='${Tech_Id}'
          `, (err,rows) => {
            if (err) {
              res.send(err);
            } else {
              if  (!rows[1].affectedRows) {
                pool.query(`INSERT INTO tech_user (Frakcja_Id,Tech_Id,Czas,Active) SELECT '${frakcja_Id}','${Tech_Id}', technologia.Czas, '1' FROM technologia WHERE Id='${Tech_Id}'`, (err,rows) => {
                  if (err) {
                    res.send(err);
                  } else {
                    res.send('Success');
                  }
                });
              } else
              res.send('Success');
            }
          });
      }
  });
});

module.exports = technologie;