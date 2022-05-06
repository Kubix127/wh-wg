const express = require('express');
const efekty = express.Router();

const pool = require('../db');

efekty.get('/api/wydarzenia/efekty', async (req, res) => {

	var Zakres = [];
	var Obiekt = [];
	var Prowincja = [];
	var Miasto = [];
	var Budynek = [];
	var Armia = [];
	var Jednostka = [];

const query = new Promise(async (resolve_query) =>{
	const Zakres_query = new Promise(async (resolve_Zakres) =>{
		pool.query(`SELECT Nazwa FROM efekty_zakres WHERE Typ='Zakres'`, (err, rows) => {
		  if (err) {
		    res.send(err);
		  } else {
		    Zakres = rows;
		    resolve_Zakres();
		  }
		});
	});


	const Obiekt_query = new Promise(async (resolve_Obiekt) =>{
		pool.query(`SELECT Nazwa FROM efekty_zakres WHERE Typ='Obiekt'`, (err, rows) => {
		  if (err) {
		    res.send(err);
		  } else {
		    Obiekt = rows;
		  	resolve_Obiekt();
		  }
		});
	});
	const Prowincja_query = new Promise(async (resolve_Prowincja) =>{
		pool.query(`SELECT Nazwa FROM efekty_zakres WHERE Typ='Prowincja'`, (err, rows) => {
		  if (err) {
		    res.send(err);
		  } else {
		    Prowincja = rows;
		    resolve_Prowincja();
		  }
		});
	});
	const Miasto_query = new Promise(async (resolve_Miasto) =>{
		pool.query(`SELECT Nazwa FROM efekty_zakres WHERE Typ='Miasto'`, (err, rows) => {
		  if (err) {
		    res.send(err);
		  } else {
		    Miasto = rows;
		    resolve_Miasto();
		  }
		});
	});
	const Budynek_query = new Promise(async (resolve_Budynek) =>{
		pool.query(`SELECT Nazwa FROM efekty_zakres WHERE Typ='Budynek'`, (err, rows) => {
		  if (err) {
		    res.send(err);
		  } else {
		    Budynek = rows;
		    resolve_Budynek();
		  }
		});
	});
	const Armia_query = new Promise(async (resolve_Armia) =>{
		pool.query(`SELECT Nazwa FROM efekty_zakres WHERE Typ='Armia'`, (err, rows) => {
		  if (err) {
		    res.send(err);
		  } else {
		    Armia = rows;
		    resolve_Armia();
		  }
		});
	});
	const Jednostka_query = new Promise(async (resolve_Jednostka) =>{
		pool.query(`SELECT Nazwa FROM efekty_zakres WHERE Typ='Jednostka'`, (err, rows) => {
		  if (err) {
		    res.send(err);
		  } else {
		    Jednostka = rows;
		    resolve_Jednostka();
		  }
		});
	});

	await Zakres_query;
	await Obiekt_query;
	await Prowincja_query;
	await Miasto_query;
	await Budynek_query;
	await Armia_query;
	await Jednostka_query;
	resolve_query();

});

 await query;
	const response = {
		Zakres: Zakres,
		Obiekt: Obiekt,
		Prowincja: Prowincja,
		Miasto: Miasto,
		Budynek: Budynek,
		Armia: Armia,
		Jednostka: Jednostka,
	};

	res.send(response);
});

efekty.get('/api/wydarzenia/efekty/Zakres', async (req, res) => {

var Frakcje = [];
var Prowincje = [];
var Miasta = [];
var Budynki = [];
var Armie = [];
var Jednostki = [];

const query = new Promise(async (resolve_query) =>{
	const Frakcje_query = new Promise(async (resolve_Frakcje) => {
		pool.query(`SELECT DISTINCT Nazwa FROM Frakcja`, (err, rows) => {
			if (err) {
			  res.send(err);
			} else {
				Frakcje = rows;
				resolve_Frakcje();
			}
		});		
	});

	const Prowincje_query = new Promise(async (resolve_Prowincje) => {
		pool.query(`SELECT DISTINCT Nazwa FROM Prowincja`, (err, rows) => {
			if (err) {
			  res.send(err);
			} else {
				Prowincje = rows;
				resolve_Prowincje();
			}
		});		
	});

	const Miasta_query = new Promise(async (resolve_Miasta) => {
		pool.query(`SELECT DISTINCT Nazwa FROM Miasto`, (err, rows) => {
			if (err) {
			  res.send(err);
			} else {
				Miasta = rows;
				resolve_Miasta();
			}
		});		
	});

	const Budynki_query = new Promise(async (resolve_Budynki) => {
		pool.query(`SELECT DISTINCT Nazwa FROM Budynek`, (err, rows) => {
			if (err) {
			  res.send(err);
			} else {
				Budynki = rows;
				resolve_Budynki();
			}
		});		
	});

	const Armie_query = new Promise(async (resolve_Armie) => {
		pool.query(`SELECT DISTINCT Nazwa FROM Armia`, (err, rows) => {
			if (err) {
			  res.send(err);
			} else {
				Armie = rows;
				resolve_Armie();
			}
		});		
	});

	const Jednostki_query = new Promise(async (resolve_Jednostki) => {
		pool.query(`SELECT DISTINCT Nazwa FROM Jednostka`, (err, rows) => {
			if (err) {
			  res.send(err);
			} else {
				Jednostki = rows;
				resolve_Jednostki();
			}
		});		
	});

	await Frakcje_query;
	await Prowincje_query;
	await Miasta_query;
	await Budynki_query;
	await Armie_query;
	await Jednostki_query;
	resolve_query();
});

await query;
const response = {
	Frakcja: Frakcje,
	Prowincja: Prowincje,
	Miasto: Miasta,
	Budynek: Budynki,
	Armia: Armie,
	Jednostka: Jednostki,
};

res.send(response);
console.log(response);
});



efekty.post('/api/wydarzenia/efekty/Obiekt', (req, res) =>{
	const Zakres = req.body.Zakres;
	const Zakres_value = req.body.Zakres_value;
	const Obiekt = req.body.Obiekt;

	if (Zakres == 'Świat') {
		if (Obiekt == 'Prowincja' || Obiekt == 'Miasto') {
			pool.query(`SELECT DISTINCT ${Obiekt}.Nazwa FROM ${Obiekt}`, (err, rows) => {
			if (err) {
			  res.send(err);
			} else {
				res.send(rows);
			}
			});	
		}
		if (Obiekt == 'Budynek' || Obiekt == 'Jednostka') {
			pool.query(`SELECT DISTINCT ${Obiekt}.Nazwa FROM ${Obiekt}`, (err, rows) => {
			if (err) {
			  res.send(err);
			} else {
				res.send(rows);
			}
			});	
		}
		if (Obiekt == 'Armia') {
			pool.query(`SELECT DISTINCT ${Obiekt}.Nazwa FROM ${Obiekt}`, (err, rows) => {
			if (err) {
			  res.send(err);
			} else {
				res.send(rows);
			}
			});	
		}
	}

	if (Zakres == 'Frakcja') {
		if (Obiekt == 'Prowincja' || Obiekt == 'Miasto') {
			pool.query(`SELECT DISTINCT ${Obiekt}.Nazwa FROM ${Obiekt} INNER JOIN Frakcja ON Frakcja.Id = ${Obiekt}.Id_Właściciel WHERE Frakcja.Nazwa = '${Zakres_value}'`, (err, rows) => {
			if (err) {
			  res.send(err);
			} else {
				res.send(rows);
			}
			});	
		}
		if (Obiekt == 'Budynek' || Obiekt == 'Jednostka') {
			pool.query(`SELECT DISTINCT ${Obiekt}.Nazwa FROM ${Obiekt} INNER JOIN Frakcja ON Frakcja.Geneza = ${Obiekt}.Geneza WHERE Frakcja.Nazwa = '${Zakres_value}'`, (err, rows) => {
			if (err) {
			  res.send(err);
			} else {
				res.send(rows);
			}
			});	
		}
		// if (Obiekt == 'Armia') {
		// 	pool.query(`SELECT DISTINCT ${Obiekt}.Nazwa FROM ${Obiekt} INNER JOIN Frakcja ON Frakcja.Geneza = ${Obiekt}.Geneza WHERE Frakcja.Nazwa = '${Zakres_value}'`, (err, rows) => {
		// 	if (err) {
		// 	  res.send(err);
		// 	} else {
		// 		res.send(rows);
		// 	}
		// 	});	
		// }
	}
	if (Zakres == 'Prowincja') {
		if (Obiekt == 'Miasto') {
			pool.query(`SELECT DISTINCT Miasto.Nazwa FROM Miasto INNER JOIN Prowincja ON Prowincja.Id = Miasto.Id_Prowincja WHERE Prowincja.Nazwa = '${Zakres_value}'`, (err, rows) => {
			if (err) {
			  res.send(err);
			} else {
				res.send(rows);
			}
			});	
		}
	}

});


// efekty.post('/api/wydarzenia/efekty/Dodaj', (req, res) =>{

// 	const efekty = req.body.efekty;
// 	const Id_Bonus = req.body.Id_Bonus;
// 	efekty.forEach((efekt) =>{
// 		pool.query(`INSERT INTO bonusy_lista (Id_Bonus,Zakres,Zakres_value,Obiekt,Obiekt_value,Bonus,Bonus_value,Procent,Czas) VALUES(${Id_Bonus},${efekt.Zakres},${efekt.Zakres_value},${efekt.Obiekt},${efekt.Obiekt_value},${efekt.Bonus},${efekt.Bonus_value},${efekt.Bonus_percent},${efekt.Czas})`,(err, rows)=>{
// 			if (err) {
// 				res.send(err);
// 			} else {
// 				res.send('Succ');
// 		}		
// 	});

// 	});
// }




module.exports = efekty;