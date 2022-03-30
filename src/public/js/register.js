let registrationForm = document.getElementById("register-form");

registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if(document.getElementById("register-user-password").value === document.getElementById("register-user-repeat-password").value) {
        let info = new FormData(registrationForm);
        let sendObject = {
            email: info.get("email"),
            name: info.get("name")[0].toUpperCase() + info.get("name").substr(1).toLowerCase(),
            password: info.get("password"),
            address: info.get("address"),
            age: info.get("age"),
            phone: info.get("phone"),
            //avatar: info.get("avatar")
            avatar: "NA",
            role: "admin"
        }
        fetch("/register", {
            method: "POST",
            body: JSON.stringify(sendObject),
            headers: {"Content-Type":"application/json"}
        })
        .then(result => {
            if (result.status === 200) {
                console.log("success");
                location.replace("/login");
            } else {
                location.replace("../pages/registration-error.html");
            }
          })
    } else {
        alert("Las contraseñas no son iguales");
    }
})