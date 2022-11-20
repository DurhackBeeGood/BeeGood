




document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);

function theDomHasLoaded(e) {
    if (localStorage.getItem("user") != null){
    fetch("http://127.0.0.1:8090/members")
    .then(response => response.json())
    .then(function(body){
    jsObjects = body;
    let user = jsObjects.find(obj => {
        return (obj.username === localStorage.getItem("user"));
    })

    document.getElementById("buzz").innerHTML = user.buzz;
    document.getElementById("username").innerHTML = user.username;
    document.getElementById("name").innerHTML = user.name;
    document.getElementById("location").innerHTML = user.location;
    document.getElementById("age").innerHTML = user.age;
    document.getElementById("availability").innerHTML = user.availability;
});
    } else{
        document.getElementById("bigdiv").innerHTML = "<br><h3> User must log in before viewing profile data</h3>";
    }
};

