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

/* app.get('/members/login', function (req, resp) {
    const username = req.body.loginuser;
    const password = req.body.loginpass;
    /* check username and password match 
    if (username === members.username && password === members.password) {
        resp.send('login successful');
    }
    
}); */

app.get('/members/password/:user', function (req, resp) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].username === req.params.user) {
            resp.send(members[i].password);
        }
    }
})

app.post('/members/add', function (req, resp) {
    const username = req.body.newMemberUser;
    console.log(username)
    
    /*
    for (let i = 0; i < members.length; i++) {
        m = members[i]
        if( m["username"] == username){
            resp.status(404).send('Sorry, this fish was not found! Check your id is correct.');
            return;
        }
    }
    */
    
    const name = req.body.newMemberName;
    const pass = req.body.newMemberPass;
    const email = req.body.newMemberEmail;
    const age = req.body.newMemberAge;
    const location = req.body.newMemberLocation;
    let interests = []
    if (req.body.family === 'on'){
        interests.push("Family Support")
    }
    if (req.body.social === 'on'){
        interests.push("Social Support")
    }
    if (req.body.health === 'on'){
        interests.push("Health")
    }
    if (req.body.environment === 'on'){
        interests.push("Environment")
    }
    if (req.body.housing === 'on'){
        interests.push("Housing")
    }
    if (req.body.foodbanks === 'on'){
        interests.push("Food Banks")
    }
    if (req.body.women === 'on'){
        interests.push("Womens Support")
    }
    if (req.body.young === 'on'){
        interests.push("Young People")
    }
   
    let newMember = {
        username: username,
        name: name,
        pass: pass,
        email: email,
        age: age,
        location: location,
        availibility: "",
        buzz: 0,
        donationHistory: [],
        interests: interests

    }
    console.log(newMember)
    members.push(newMember)
    const output = '{"members":' + JSON.stringify(members) + "}"
    fs.writeFile("./entities.json",output,(err) => {
        if (err) console.log(err)
    })
    resp.set('Content-Type', 'text/html');
    resp.status(201);
    return;
    }
);

module.exports = app;