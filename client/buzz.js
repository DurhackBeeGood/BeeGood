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

