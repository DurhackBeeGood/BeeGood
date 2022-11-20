document.getElementById("viewAll").addEventListener('click', function(e){
    document.getElementById("viewAll").style.display = "none";
    document.getElementById("or").style.display = "none";
    document.getElementById("matchMe").style.display = "none";
    document.getElementById("resetOrganisations").style.display = "block";
    const container = document.getElementById("charitiesContainer")
    fetch("http://127.0.0.1:8090/charities")
    .then(response => response.json())
    .then(function(body){
        console.log("here")
        for (let i = 0; i < body.length; i++) {
            const charity = body[i]
            const name = '<p>' + charity.charity + "<p>"
            container.innerHTML += name
        }
    })
});

document.getElementById("matchMe").addEventListener('click', function(e){
    document.getElementById("viewAll").style.display = "none";
    document.getElementById("or").style.display = "none";
    document.getElementById("matchMe").style.display = "none";
    document.getElementById("resetOrganisations").style.display = "block";
});

document.getElementById("resetOrganisations").addEventListener('click', function(e){
    document.getElementById("viewAll").style.display = "block";
    document.getElementById("or").style.display = "block";
    document.getElementById("matchMe").style.display = "block";
    document.getElementById("resetOrganisations").style.display = "none";
    document.getElementById("charitiesContainer").innerHTML = "";
});