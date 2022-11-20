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
    const id = document.getElementById("loginOrgPass").value;
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
        createHours(table)
    }
    else {
        alert("Incorrect password");
    }
}

function createHours(e){}