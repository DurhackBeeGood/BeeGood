




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
    fetch(query)
    .then(response => response.json())
    .then(function(body){
    let hours = body;
    


    document.getElementById("buzz").innerHTML = hours.reduce((a, b) => a + b, 0);
    document.getElementById("username").innerHTML = user.username;
    document.getElementById("name").innerHTML = user.name;
    document.getElementById("location").innerHTML = user.location;
    document.getElementById("age").innerHTML = user.age;
    document.getElementById("availability").innerHTML = user.availability;

    showHours(hours)

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    
    // Draw the chart and set the chart values
    function drawChart() {
        let hourData = [['Charity', 'Total Hours']]
        for (let i = 0; i < hours.length; i++) {
            if (hours[i] != 0){
                fetch("/charities/name/"+i)
                .then(response => response.json())
                .then(function(body){
                    hourData.push([body,hours[i]])
                })
                
            }
          }
         
        console.log(typeof hourData);        
        var data = google.visualization.arrayToDataTable(hourData);

        
        // Optional; add a title and set the width and height of the chart
        var options = {'title':'My Charity Portfolio', 'width':550, 'height':400};
        
        // Display the chart inside the <div> element with id="piechart"
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
        
    }

});
    
});
    } else{
        document.getElementById("bigdiv").innerHTML = "<br><h3> User must log in before viewing profile data</h3>";
    }
};



