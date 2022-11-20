document.getElementById("submitlogin").addEventListener('click', function (e) {
    alert("here");
    e.preventDefault();
    user = document.getElementById("loginuser").value;
    console.log(user);
    fetch("http://127.0.0.1:8090/members/password/" + user)
    .then(response => response.text())
    .then(body => authenticate(body))
});


function authenticate(password) {
    console.log(password)
    const input = document.getElementById("loginpass").value;
    alert(input)
    if (input === password) {
        alert("Login successful");
    }
    else {
        alert("Incorrect password");
    }
}