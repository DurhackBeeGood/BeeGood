document.getElementById("submitlogin").addEventListener('click', function (e) {
    e.preventDefault();
    const input = document.getElementById("loginpass").value;
    user = document.getElementById("loginuser").value;
    fetch("http://127.0.0.1:8090/members/password/" + user)
    .then(response => response.text())
    .then(body => authenticate(body, input,user))
});


function authenticate(password, input, user) {
    if(password === ""){
        alert("User does not exist")
    }
    else if (input === password) {
        localStorage.setItem("user", user);
        alert("Login successful");
        // Redirect to profile page
        document.location.href = "/profile.html";
    }
    else {
        alert("Incorrect password");
    }
}