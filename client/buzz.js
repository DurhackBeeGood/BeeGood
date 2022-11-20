document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);

console.log("let's get buzzing")

function theDomHasLoaded(e) {

fetch("http://127.0.0.1:8090/members/buzz")
.then(response => response.text())
.then(function(body){
    const arr = JSON.parse(body);
const table = document.getElementById('table');
console.log(arr)

for (let i = 0; i < arr.length; i++) {
    const row = document.createElement('tr');
    for(let j = 0; j < arr[j].length; j++){
        const col = document.createElement('td');
        col.textContent = arr[i][j];
        row.appendChild(col);
      }
    table.appendChild(row);

};
}
)}


// Login in as an organisation

document.getElementById("subitOrgLogin").addEventListener('click', function (e) {
    e.preventDefault();
    const input = document.getElementById("loginOrgPass").value;
    const id = document.getElementById("loginOrg").value;
    fetch("http://127.0.0.1:8090/charities/password/" + id)
    .then(response => response.text())
    .then(body => authenticate(body, input,id))
});


function authenticate(password, input, id) {
    if(password === ""){
        alert("User does not exist")
    }
    else if (input === password) {
        localStorage.setItem("charity", id);
        alert("Login successful");
        createHoursForCharity(id)
    }
    else {
        alert("Incorrect password");
    }
}

function createHoursForCharity(charityId){
    document.getElementById("charityLoginCard").style.display = "none";
    fetch("http://127.0.0.1:8090/matches/charities/" + charityId)
    .then(response => response.json())
    .then(function(body){
        let user;
        if(body.length == 0){
            newHTML = "<p>Your organisation has no volunteers signed up currently.</p>"
            document.getElementById("buzzGiver").innerHTML = newHTML 
        }
        for (let i = 0; i < body.length; i++) {
            user = body[i];
            fetch("http://127.0.0.1:8090/hours/" + charityId + "/" + user)
            .then(response => response.text())
            .then(function(hours){
                newHTML = "<p>" + user + ": " + hours + "</p>"
                document.getElementById("buzzGiver").innerHTML = newHTML 
            })
        }
    })
    document.getElementById("updateHours").style.display = "block";
}