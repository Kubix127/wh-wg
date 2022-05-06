const express = require('express');
const wydarzenia = express.Router();

const pool = require('../db');

const efekty = require('./efekty');
wydarzenia.use(efekty);

wydarzenia.get('/api/wydarzenia', (req, res) => {
	pool.query(`SELECT Id, Title, Text, Autor, Kwartał FROM posty`, (err, rows) => {
	  if (err) {
	    res.send(err);
	  } else {
	    res.send(rows);
	  }
	});
});

wydarzenia.post('/api/wydarzenia', (req,res) => {


	post = {
		title: req.body.post.title,
		text: req.body.post.text,
		autor: req.body.post.autor,
		kwartal: 1,
		data: req.body.post.date,
	}
	pool.query(`INSERT INTO posty (Title, Text, Autor, Kwartał, Data) VALUES ('${post.title}','${post.text}','${post.autor}','${post.kwartal}','${post.data}')`,(err)=>{
		if(err)
			console.log(err)
		else
			res.send('Success')
	})
})

wydarzenia.post('/api/wydarzenia/post/delete', (req,res) => {


	post = {
		id: req.body.id,
	}
		pool.query(`DELETE FROM posty WHERE id='${post.id}'`,(err)=>{
		if(err)
			console.log(err)
		else
			res.send('Success')
	})
})

module.exports = wydarzenia;