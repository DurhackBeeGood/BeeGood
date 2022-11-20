//var currentUser = "DylH";


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
            const matchBtn = '<button id="'+ matchBtnName+ '">Sign up to volunteer</button>'
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
                    let currentUser = localStorage.getItem("user")
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
    document.getElementById("matchMeGame").innerHTML += "<p>In future, we will have matching game here to suggest charities based on volunteers' preferences."
    let currentUser = localStorage.getItem("user")
    startMatchingGame(currentUser);
});

document.getElementById("resetOrganisations").addEventListener('click', function(e){
    document.getElementById("viewAll").style.display = "block";
    document.getElementById("or").style.display = "block";
    document.getElementById("matchMe").style.display = "block";
    document.getElementById("viewMatches").style.display = "block";
    document.getElementById("resetOrganisations").style.display = "none";
    document.getElementById("next-match").style.display = "none"
    document.getElementById("charitiesContainer").innerHTML = "";
    document.getElementById("matchesContainer").innerHTML = "";
    document.getElementById("matchMeGame").innerHTML = "";
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
        let currentUser = localStorage.getItem("user");
        for (let i = 0; i < body.length; i++) {
            match = body[i]
            if (match.user === currentUser){
                charityId = match.charity
                fetch("http://127.0.0.1:8090/charities/name/"+charityId)
                .then(response => response.text())
                .then(function(body){
                    nameHTML = "<p>"+body+"</p>"
                    const unmatchBtnName = 'unmatch' + charityId
                    const unmatchBtn = '<button id="'+ unmatchBtnName+ '">Stop volunteering here</button>'
                    newHTML = nameHTML + unmatchBtn
                    document.getElementById("matchesContainer").innerHTML += newHTML

                    document.getElementById("unmatch"+charityId).addEventListener('click', function(e){
                        console.log('id: ' + charityId)
                        fetch("http://127.0.0.1:8090/matches/delete/"+currentUser+"/"+charityId)
                        alert("We are sorry to see you leave!")
                    })
                })
            }
        }
    })
});

let suggestions = []

function startMatchingGame(user){
    let currentUser = localStorage.getItem("user");
    fetch("http://127.0.0.1:8090/suitableCharities/" + currentUser)
    .then(response => response.json())
    .then(function(body){
        suggestions = body;
        console.log(body)
        if (body.length > 0){
            trySuggesting(body[0], 0);
        }
        else{
            document.getElementById("matchMeGame").innerHTML = "<p>No matches currently</p>"
        }
    })
}

function trySuggesting(charity, index){
    document.getElementById("next-match").style.display = "block"
    let charityInfo =  "<p>" + charity.charity + "</p>"
    let acceptBtn = '<button id="accept'+charity.id + '">Accept</br>'
    let denyBtn = '<button id="deny'+charity.id + '">Not interested></br>'
    let newHTML = charityInfo + acceptBtn + denyBtn
    document.getElementById("matchMeGame").innerHTML = newHTML
    console.log("here")

    document.getElementById("accept"+charity.id).addEventListener("click", function(e){
        alert("Yes!")
    })
    document.getElementById("deny"+charity.id).addEventListener("click", function(e){
        alert("Passed!")
    })
}

document.getElementById("next-match").addEventListener("click", function(e){
    alert("Not yet functional")
})