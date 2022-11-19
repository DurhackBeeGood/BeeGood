const { json } = require('body-parser');
const express = require('express');
const fs = require('fs')
const app = express();

app.use(express.static('client'));
app.use(express.json());

app.use(express.static('body-parser'));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

let entities = require('./entities.json');
const members = entities.members;

app.post('/members/add', function (req, resp) {
    const name = req.body.newMemberName;
    const email = req.body.newMemberEmail;
    const age = req.body.newMemberAge;
    const location = req.body.newMemberLocation;
    let newMember = {
        name: name,
        email: email,
        age: age,
        location: location
    }
    members.push(newMember)
    const output = '{"members":' + JSON.stringify(members) + "}"
    fs.writeFile("./entities.json",output,(err) => {
        if (err) console.log(err)
    })
    resp.set('Content-Type', 'text/html');
    const htmltext = '<html> <head> <link rel="stylesheet" href="../style.css"></head> <body> <h1 class="centered" style="color:white;"> Thanks, the new member has been added! </h1> </body> </html>';
    resp.status(201);
    }
);

module.exports = app;