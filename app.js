const { match } = require('assert');
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
var userCount = entities.userCount;
var charityCount = entities.charityCount;
const hours = entities.hours;

app.get('/hours/:id', function (req, resp) {
    resp.json(hours[req.params.id])
})

app.get('/members', function(req, resp){
    resp.json(members)
})

app.get('/members/buzz', function(req, resp){
    console.log("started");
    let list = [];
    var item;
    for (let i = 0; i < members.length; i++) {
        item = [];
        item.push(hours[i].reduce((a, b) => a + b, 0));
        item.push(members[i].name)
        item.push(members[i].location)
        list.push(item);
      }

    list.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));
    resp.json(list);
})

app.get('/charities', function(req, resp){
    resp.json(charities)
})

app.get('/matches', function(req, resp){
    resp.json(matches)
})

app.get('/suitableCharities/:user', function(req, resp){
    let suitable = [];
    const user = req.params.user
    let themes = undefined;
    for (let i = 0; i < members.length; i++) {
        m = members[i];
        if (m.username === user){
            themes = m.interests;
            break;
        }
    }
    if (themes == undefined){
        resp.sendStatus(404);
        return;
    }
    for (let i = 0; i < charities.length; i++) {
        charity = charities[i]
        if (themes.includes(charity.type)){
            suitable.push(charity);
        }
    }
    resp.send(suitable);
    return;
})

app.get('/charities/info/:id', function(req, resp){
    const id = parseInt(req.params.id);
    let charity;
    for (let i = 0; i < charities.length; i++) {
        charity = charities[i];
        if (charity.id === id){
            resp.json(charity)
            return
        }
    }
    resp.sendStatus(404);
})

app.get('/charities/name/:id', function(req, resp){
    const id = parseInt(req.params.id);
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

app.get('/charities/password/:id', function (req, resp) {
    for (let i = 0; i < charities.length; i++) {
        c = charities[i]
        if (c.id === parseInt(req.params.id)) {
            resp.send(c.password);
            return;
        }
    }
    resp.send("");
})

app.get('/hours/:charity/:user', function(req, resp){
    const charity = req.params.charity
    const user = req.params.user
    // GET HOURS HERE AND SEND THEM

    resp.send("10")
})


app.get('/matches/charities/:id', function(req, resp){
    let array = []
    const id = parseInt(req.params.id)
    for (let i = 0; i < matches.length; i++) {
       let match = matches[i];
        if (match.charity == id){
            array.push(match.user)
        }
    }
    resp.send(array)
})

app.get('/matches/members/:user', function(req, resp){
    let array = []
    const user = req.params.user 
    for (let i = 0; i < matches.length; i++) {
        match = matches[i];
        if (match.user == user){
            array.push(match.charity)
        }
    }
    resp.send(array)
})

app.get('/matches/add/:user/:charityId', function(req, resp){
    const user = req.params.user;
    const charity = parseInt(req.params.charityId);
    const newMatch = {
        user: user,
        charity: charity
    }
    matches.push(newMatch)
    writeFile();
})

app.get('/matches/delete/:user/:charityId', function(req, resp){
    const user = req.params.user;
    const charityId = parseInt(req.params.charityId);
    let m;
    for (let i = 0; i < matches.length; i++) {
        m = matches[i];
        if (m.user === user && m.charity === charityId){
            matches.splice(i, 1);
        }
    }
    writeFile();
})

app.post('/hours/update', function (req, resp) {
    const user = req.body.userForHours;
    const hours = req.body.hoursValue;
    //const charityId = localStorage.getItem("charity")
    // CANT ACCESS LOCAL STORAGE HERE? MIGHT HAVE TO SEND WHICH CHARITY IS LOGGED IN BODY
    console.log(user, hours)
    // UPDATE HOURS VALUE THEN CALL WRITE VALUE 
    resp.sendStatus(200);
});

app.post('/members/add', function (req, resp) {
    const username = req.body.newMemberUser;
    
    /*Should check username is unique here*/


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
        id: userCount,
        username: username,
        name: name,
        pass: pass,
        email: email,
        age: age,
        location: location,
        availability: "",
        donationHistory: [],
        interests: interests

    }
    members.push(newMember)
    userCount = parseInt(userCount) + 1;
    hours.push(Array(charityCount).fill(0))

    writeFile();
    resp.set('Content-Type', 'text/html');
    resp.status(201);
    console.log(output)
    return;
    }

);

function writeFile(){
    console.log(matches)
    const output = '{"members":' + JSON.stringify(members) + ',' + '"charities":' + JSON.stringify(charities) + ',' + '"matches":' + JSON.stringify(matches) + ','+ '"userCount":' + userCount + ',' + '"charityCount":' + charityCount + ',' + '"hours":' +  JSON.stringify(hours) + "}"
    fs.writeFile("./entities.json",output,(err) => {
        if (err) console.log(err)
    })
}

module.exports = app;