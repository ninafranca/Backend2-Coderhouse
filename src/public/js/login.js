let userEmail = document.getElementById("user_email");
let userName = document.getElementById("user_name");
const login = document.getElementById("login");

const sendLogin = document.getElementById("login-form");
sendLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    let info = new FormData(sendLogin);
    let sendObject = {
        name: info.get("login_name").toUpperCase(),
        email: info.get("login_email")
    }
    fetch("/login", {
        method: "POST",
        body: JSON.stringify(sendObject),
        headers: {"Content-Type":"application/json"}
    }).then(result => result.json()).then(json => {
        console.log(sendObject);
        location.replace("../pages/logged.html")
    })
})

/*
let renderLogin = `
    <form id="login-form" name="login-form">
        <div class="login-div1">
            <div class="login-div2">
                <h1>Login de Usuario</h1>
                <label for="login_name">Ingrese su nombre</label>
                <input type="text" id="login_name" name="login_name" class="border rounded shadow mb-5 bg-body border-secondary" required>
                <button type="submit" id="submit-login" value="send" class="btn btn-secondary btn-lg">Enviar</button>
            </div>
        </div>
    </form>
`;
login.innerHTML = renderLogin;
login.style.visibility = "hidden";
login.style.height = "0vh";*/



/*let renderRegistration = `
    <div class="div-registration">
        <h1>Registro de Usuario</h1>
        <form id="registration-form" name="registration-form">
            <input type="email" name="user_email" id="user_email" class="border rounded shadow mb-5 bg-body border-secondary" placeholder="E-mail" required>
            <input type="text" name="user_name" id="user_name" class="border rounded shadow mb-5 bg-body border-secondary" placeholder="Nombre" required>
            <input type="submit" value="register" class="btn btn-secondary btn-lg to-login-btn" required>
        </form>
        <p>¿Ya estás registrado? <span id="login-span">Logueate</span></p>
    </div>
`;
register.innerHTML = renderRegistration;*/

/*const loginSpan = document.getElementById("login-span");
loginSpan.addEventListener("click", () => {
    location.replace("login")
})*/









/*
let userEmail = document.getElementById("user_email");
let userName = document.getElementById("user_name");

const login = document.getElementById("login");
let renderLogin = `
    <form id="login-form" name="login-form">
        <div class="login-div1">
            <div class="login-div2">
                <h1>Login de Usuario</h1>
                <label for="login_name">Ingrese su nombre</label>
                <input type="text" id="login_name" name="login_name" class="border rounded shadow mb-5 bg-body border-secondary" required>
                <button type="submit" id="submit-login" value="send" class="btn btn-secondary btn-lg">Enviar</button>
            </div>
        </div>
    </form>
`;
login.innerHTML = renderLogin;
login.style.visibility = "hidden";
login.style.height = "0vh";
const sendLogin = document.getElementById("login-form");
sendLogin.addEventListener("submit", (e) => {
    console.log("soy eventListener de login");
    e.preventDefault();
    let info = new FormData(sendLogin);
    let sendObject = {
        name: info.get("login_name").toUpperCase(),
    }
    console.log(0);
    fetch("/login", {
        method: "POST",
        body: JSON.stringify(sendObject),
        headers: {"Content-Type":"application/json"}
    }).then(result => result.json()).then(json => {
        login.remove();
        let name = info.get("login_name");
        let welcomeLogged = document.getElementById("welcome");
        let renderWelcome = `
            <h1>Biemvenido ${name}</h1>
        `;
        welcomeLogged.innerHTML = renderWelcome;
    })
})

const register = document.getElementById("registration");
let renderRegistration = `
    <div class="div-registration">
        <h1>Registro de Usuario</h1>
        <form id="registration-form" name="registration-form">
            <input type="email" name="user_email" id="user_email" class="border rounded shadow mb-5 bg-body border-secondary" placeholder="E-mail" required>
            <input type="text" name="user_name" id="user_name" class="border rounded shadow mb-5 bg-body border-secondary" placeholder="Nombre" required>
            <input type="submit" value="register" class="btn btn-secondary btn-lg to-login-btn" required>
        </form>
        <p>¿Ya estás registrado? <span id="login-span">Logueate</span></p>
    </div>
`;
register.innerHTML = renderRegistration;

const loginSpan = document.getElementById("login-span");
loginSpan.addEventListener("click", () => {
    register.remove();
    login.innerHTML = renderLogin;
    login.style.visibility = "visible";
    login.style.height = "35vh";
})

const registrationForm = document.getElementById("registration-form");
registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let info = new FormData(registrationForm);
    let sendObject = {
        user: {
            email: info.get("user_email"),
            name: info.get("user_name").toUpperCase()
        }
    }
    fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(sendObject),
        headers: {"Content-Type":"application/json"}
    }).then(result => result.json()).then(json => {
        register.remove();
        const logged = document.getElementById("logged");
        let name = info.get("user_name");
        let renderLogged = `
            <div>
                <h1>Bienvenid@ ${name}</h1>
            </div>
        `;
        logged.innerHTML = renderLogged;
    })
})
*/