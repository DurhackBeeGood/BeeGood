var currentUser = "DylH";

document.getElementById("viewAll").addEventListener('click', function(e){
    document.getElementById("viewAll").style.display = "none";
    document.getElementById("or").style.display = "none";
    document.getElementById("matchMe").style.display = "none";
    document.getElementById("resetOrganisations").style.display = "block";
    document.getElementById("viewMatches").style.display = "none";
    const container = document.getElementById("charitiesContainer")
    fetch("http://127.0.0.1:8090/charities")
    .then(response => response.json())
    .then(function(body){
        console.log("here")
        for (let i = 0; i < body.length; i++) {
            const charity = body[i]
            const id = charity.id
            const name = charity.charity
            const nameHtml = '<p>' + name + "<p>"
            const matchBtnName = 'match' + id
            const matchBtn = '<button id="'+ matchBtnName+ '">Match</button>'
            newHtml = nameHtml + matchBtn
            container.innerHTML += newHtml

        }
        for (let i=0; i < body.length; i++){
            const id = body[i].id
            document.getElementById("match"+id).addEventListener('click', function(e){
                console.log('id: ' + id)
                fetch("http://127.0.0.1:8090/charities/name/"+id)
                .then(response => response.json())
                .then(function(body){
                    alert("Congrats! You are now a volunteer at " + body + "!")
                    fetch("http://127.0.0.1:8090/matches/add/"+currentUser+"/"+id)
                })
            })
        }
    })
});

document.getElementById("matchMe").addEventListener('click', function(e){
    document.getElementById("viewAll").style.display = "none";
    document.getElementById("or").style.display = "none";
    document.getElementById("matchMe").style.display = "none";
    document.getElementById("viewMatches").style.display = "none";
    document.getElementById("resetOrganisations").style.display = "block";
});

document.getElementById("resetOrganisations").addEventListener('click', function(e){
    document.getElementById("viewAll").style.display = "block";
    document.getElementById("or").style.display = "block";
    document.getElementById("matchMe").style.display = "block";
    document.getElementById("viewMatches").style.display = "block";
    document.getElementById("resetOrganisations").style.display = "none";
    document.getElementById("charitiesContainer").innerHTML = "";
    document.getElementById("matchesContainer").innerHTML = "";
});

document.getElementById("viewMatches").addEventListener('click', function(e){
    document.getElementById("viewAll").style.display = "none";
    document.getElementById("or").style.display = "none";
    document.getElementById("matchMe").style.display = "none";
    document.getElementById("resetOrganisations").style.display = "block";
    document.getElementById("viewMatches").style.display = "none";
    fetch("http://127.0.0.1:8090/matches")
    .then(response => response.json())
    .then(function(body){
        let charityId;
        for (let i = 0; i < body.length; i++) {
            match = body[i]
            if (match.user === currentUser){
                charityId = match.charity
                fetch("http://127.0.0.1:8090/charities/name/"+charityId)
                .then(response => response.text())
                .then(function(body){
                    document.getElementById("matchesContainer").innerHTML += "<p>"+body+"</p>"
                })
            }
        }
    })
});