const register = document.getElementById("registration");
const registrationForm = document.getElementById("registration-form");
registrationForm.addEventListener("submit", (e) => {
    console.log(0);
    e.preventDefault();
    let info = new FormData(registrationForm);
    let sendObject = {
        user: {
            email: info.get("user_email"),
            name: info.get("user_name").toUpperCase()
        }
    }
    fetch("/register", {
        method: "POST",
        body: JSON.stringify(sendObject),
        headers: {"Content-Type":"application/json"}
    }).then(result => result.json()).then(json => {
        console.log(sendObject);
        location.replace("../pages/logged.html")
    })
})