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
const charities = entities.charities;
const matches = entities.matches;

console.log(charities)

/* app.get('/members/login', function (req, resp) {
    const username = req.body.loginuser;
    const password = req.body.loginpass;
    /* check username and password match 
    if (username === members.username && password === members.password) {
        resp.send('login successful');
    }
    
}); */

app.get('/members', function(req, resp){
    resp.json(members)
})

app.get('/charities', function(req, resp){
    resp.json(charities)
})

app.get('/matches', function(req, resp){
    resp.json(matches)
})

app.get('/charities/name/:id', function(req, resp){
    const id = parseInt(req.params.id);
    console.log(id)
    let charity;
    for (let i = 0; i < charities.length; i++) {
        charity = charities[i];
        if (charity.id === id){
            resp.json(charity.charity)
            return
        }
    }
    resp.sendStatus(404);
})

app.get('/members/password/:user', function (req, resp) {
    for (let i = 0; i < members.length; i++) {
        m = members[i]
        if (m.username === req.params.user) {
            resp.send(m.pass);
            return;
        }
    }
    resp.send("");
})

app.get('/matches/add/:user/:charityId', function(req, resp){
    const user = req.params.user;
    const charity = parseInt(req.params.charityId);
    const newMatch = {
        user: user,
        chairty: charity
    }
    matches.push(newMatch)
    console.log(matches)
    const output = '{"members":' + JSON.stringify(members) + ',' + '"charities":' + JSON.stringify(charities) + ',"matches":' + JSON.stringify(matches) + "}"
    fs.writeFile("./entities.json",output,(err) => {
        if (err) console.log(err)
    })
})

app.post('/members/add', function (req, resp) {
    const username = req.body.newMemberUser;
    
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
        availability: "",
        buzz: 0,
        donationHistory: [],
        interests: interests

    }
    members.push(newMember)



    const output = '{"members":' + JSON.stringify(members) + ',' + '"charities":' + JSON.stringify(charities) + '"matches":' + JSON.stringify(matches) + "}"
    fs.writeFile("./entities.json",output,(err) => {
        if (err) console.log(err)
    })
    resp.set('Content-Type', 'text/html');
    resp.status(201);
    return;
    }
);

module.exports = app;