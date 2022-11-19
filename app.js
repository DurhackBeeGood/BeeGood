const express = require('express');
const app = express();

app.use(express.static('client'));
app.use(express.json());

app.use(express.static('body-parser'));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

let entities = require('./entities.json');
const members = entities.members;

app.post('/member/add', function (req, resp) {
    const name = req.body.name;
    const email = req.body.email;
    const age = req.body.age;
    const location = req.body.location;
    const newMember = {
        name: name,
        email: email,
        age: age,
        location: location
    }
    members.push(newMember)
    resp.set('Content-Type', 'text/html');
    const htmltext = '<html> <head> <link rel="stylesheet" href="../style.css"></head> <body> <h1 class="centered" style="color:white;"> Thanks, the new member has been added! </h1> </body> </html>';
    resp.send(htmltext);
    }
);

module.exports = app;