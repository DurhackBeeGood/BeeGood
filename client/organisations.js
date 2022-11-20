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
        for (let i = 0; i < body.length; i++) {
            const charity = body[i]
            const id = charity.id
            const charityHtml = makeInfo(charity)
            // SHOULD CHECK AND INDICATE HERE WHICH ONES ARE MATCHED ALREADY 
            const matchBtnName = 'match' + id
            const matchBtn = '<button class="matchBtn" id="'+ matchBtnName+ '">Sign up to volunteer</button>'
            newHtml = charityHtml + matchBtn
            container.innerHTML += newHtml

        }
        for (let i=0; i < body.length; i++){
            const id = body[i].id
            // ONLY ADD THIS EVENT LISTENER IF NOT ALREADY MATCHED
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
                fetch("http://127.0.0.1:8090/charities/info/"+charityId)
                .then(response => response.json())
                .then(function(body){
                    console.log(body)
                    let info = makeInfo(body)
                    const unmatchBtnName = 'unmatch' + charityId
                    const unmatchBtn = '<button class="unmatchBtn" id="'+ unmatchBtnName+ '">Stop volunteering here</button>'
                    newHTML = info + unmatchBtn
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
        if (body.length > 0){
            trySuggesting(body[0], 0);
        }
        else{
            document.getElementById("matchMeGame").innerHTML = "<p>No matches currently</p>"
        }
    })
}

function trySuggesting(charity, index){
    let charityInfo =  makeInfo(charity)
    let acceptBtn = '<button class="acceptBtn" id="accept'+charity.id + '">Accept</br>'
    let denyBtn = '<button class="denyBtn" id="deny'+charity.id + '">Not interested></br>'
    let newHTML = charityInfo + acceptBtn + denyBtn
    document.getElementById("matchMeGame").innerHTML = newHTML
    console.log("here")
    let id = charity.id

    document.getElementById("accept"+id).addEventListener("click", function(e){
        suggestions.splice(index, 1)
        alert("Thanks for joining us!")
        if(suggestions.length > 0){
            let newIndex = (index + 1) % suggestions.length
            trySuggesting(suggestions[newIndex],newIndex )
        }
        fetch("http://127.0.0.1:8090/matchs/add/" + currentUser + "/" + id)
    })
    document.getElementById("deny"+id).addEventListener("click", function(e){
        alert("Passed!")
        suggestions.splice(index, 1)
        if(suggestions.length > 0){
            let newIndex = (index + 1) % suggestions.length
            trySuggesting(suggestions[newIndex],newIndex )
        }
    })

}

function makeInfo(charity){
    // MAKE HTML INFO ABOUT THE CHARITY HERE, PICTURES ETC
    // CHARITY.EMAIL, CHARITY.NUMBER, ETC GIVE ALL THE INFO YOU NEED
    const nameHtml = '<div class="charityBox"><p>' + charity.charity + "<br>"
    const number = 'Number: ' + charity.number + "<br>"
    const email = 'Email: ' + charity.email + "<br>"
    const hrs = 'Hours per week: ' + charity.volHoursPerWeek + "</p><div>"
    newHTML = nameHtml + number + email + hrs
    return newHTML;
}