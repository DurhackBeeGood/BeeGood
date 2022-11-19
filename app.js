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
    const username = req.body.newMemberUser;
    print(username)
    

    // fixing this so it works now:
    if (members[username] !== undefined){
        resp.status(404).send('Sorry, this fish was not found! Check your id is correct.');
        return;
    }
    
    const name = req.body.newMemberName;
    const email = req.body.newMemberEmail;
    const age = req.body.newMemberAge;
    const location = req.body.newMemberLocation;
    let newMember = {
        username: username,
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