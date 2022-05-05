const express = require('express')
const app = express()

const path = require('path')

const pool = require('./db');


app.get('/api/users', (req, res) => {
    // if(req.cookies["Gracz_Id"])
     pool.query(`select Rola from gracz`, (err, rows) => {
       if (err) {
         res.send(err);
       } else {
         res.send('Success');
       }
     });
//    else res.send(``);
});



const port = process.env.PORT || 3000


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('build', 'index.html'));
    })
}

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log('Server running on', port);
})


