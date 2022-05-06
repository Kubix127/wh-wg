const express = require('express')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const path = require('path')

const pool = require('./db');
const user = require('./user/user');
const event = require('./wydarzenia/wydarzenia');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(user);
app.use(event);


const port = process.env.PORT || 3001


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


