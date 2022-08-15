const express = require('express')
const general = express.Router()

const pool = require('../db');


general.post('/api/general/editPage', async (req, res) => {
  const page = {
    name: req.body.name,
    paragraphs: req.body.paragraphs
  };
  var oldParagraphs = [];
  getOldParagraphs = new Promise(resolve_old=>pool.query(`SELECT * FROM pages WHERE page='${page.name}'`, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      oldParagraphs = rows;
      resolve_old();
    }
  }));
  await getOldParagraphs;
  for(paragraph of page.paragraphs){
    if(oldParagraphs.find(p => p.IdPage === paragraph.IdPage && p.page === paragraph.page) === undefined)
    pool.query(`INSERT INTO pages (page,content,IdPage) VALUES ('${paragraph.page}','${paragraph.content}','${paragraph.IdPage}')`, (err, rows) => {
      if (err) {
        res.send(err);
      }
    }); 

    pool.query(`UPDATE pages SET content='${paragraph.content}', IdPage='${paragraph.IdPage}' WHERE IdPage='${paragraph.IdPage}' AND page='${paragraph.page}'`, (err, rows) => {
      if (err) {
        res.send(err);
      }
    });
  } 
  res.send('Success!')
});

general.post('/api/general/deleteParagraph', (req, res) => {
  const paragraph = {
    name: req.body.name,
    Id: req.body.Id
  };
  pool.query(`DELETE FROM pages WHERE page='${paragraph.name}' AND Id='${paragraph.Id}'`, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Success!');
    }
  });
});

general.get('/api/general/page', async (req, res) => {
  var main = [];
  var archive = [];
  var news = [];
  const getMain = new Promise(resolve_main=>{
    pool.query(`SELECT * FROM pages WHERE page='main'`, (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        main = rows;
        resolve_main();
      }
    });
  });
  
  const getArchive = new Promise(resolve_archive=>{
    pool.query(`SELECT * FROM pages WHERE page='archive'`, (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        archive = rows;
        resolve_archive();
      }
    });
  });

  const getNews = new Promise(resolve_news=>{
    pool.query(`SELECT * FROM pages WHERE page='news'`, (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        news = rows;
        resolve_news();
      }
    });
  });

  await getMain;
  await getArchive;
  await getNews;

  const page = {
    main: main,
    archive: archive,
    news: news,
  };
  res.send(page);
});

module.exports = general;
