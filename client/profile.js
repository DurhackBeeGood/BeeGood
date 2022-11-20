
let user = {username:"BarryB",name:"Barry Benson",pass:"beemovie",email:"barry.benson@gmail.com",age:14,location:"New York",availability:"All the time",buzz:0,donationHistory:[],interests:["Family Support","Social Support","Health","Environment","Housing"]}



document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);

function theDomHasLoaded(e) {
    document.getElementById("buzz").innerHTML = user.buzz;
    document.getElementById("username").innerHTML = user.username;
    document.getElementById("name").innerHTML = user.name;
    document.getElementById("location").innerHTML = user.location;
    document.getElementById("age").innerHTML = user.age;
    document.getElementById("availability").innerHTML = user.availability;
};

