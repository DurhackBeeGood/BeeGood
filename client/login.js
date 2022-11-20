document.getElementById("submitlogin").addEventListener('click', function (e) {
    e.preventDefault();
    const input = document.getElementById("loginpass").value;
    user = document.getElementById("loginuser").value;
    fetch("http://127.0.0.1:8090/members/password/" + user)
    .then(response => response.text())
    .then(body => authenticate(body, input))
});


function authenticate(password, input) {
    if(password === ""){
        alert("User does not exist")
    }
    else if (input === password) {
        alert("Login successful");
    }
    else {
        alert("Incorrect password");
    }
}