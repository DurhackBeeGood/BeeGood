document.getElementById("submitlogin").addEventListener('click', function (e) {
    fetch("http://127.0.0.1:8090/members/password/" + id)
    .then(response => response.text())
    .then(body => Authenticator(body))
});


function Authenticator(password) {
    console.log(password)
    const input = document.getElementById("loginpass").value;
    console.log(input)
    if (input === password) {
        alert("Login successful");
    }
    else {
        alert("Incorrect password");
    }
}