




document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);

function showHours(hourList){
    const histDiv = document.getElementById("histDiv")
    for (let i = 0; i < hourList.length; i++) {
        if (hourList[i] != 0){
            fetch("/charities/name/"+i)
            .then(response => response.json())
            .then(function(body){
                console.log(hourList[i] + " at " + body);

                histDiv.innerHTML += "<p>" + hourList[i] + " hours at " + body + "</p>";
            })
            
        }
      }
}

function theDomHasLoaded(e) {
    if (localStorage.getItem("user") != null){



    fetch("http://127.0.0.1:8090/members")
    .then(response => response.json())
    .then(function(body){
    jsObjects = body;
    let user = jsObjects.find(obj => {
        return (obj.username === localStorage.getItem("user"));
    })

    const id = user.id


    const query = "http://127.0.0.1:8090/hours/" + id;
    console.log(query)
    fetch(query)
    .then(response => response.json())
    .then(function(body){
    let hours = body;
    


    document.getElementById("buzz").innerHTML = user.buzz;
    document.getElementById("username").innerHTML = user.username;
    document.getElementById("name").innerHTML = user.name;
    document.getElementById("location").innerHTML = user.location;
    document.getElementById("age").innerHTML = user.age;
    document.getElementById("availability").innerHTML = user.availability;

    showHours(hours)

});
    
});
    } else{
        document.getElementById("bigdiv").innerHTML = "<br><h3> User must log in before viewing profile data</h3>";
    }
};



