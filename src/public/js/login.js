let login = document.getElementById("login");
let innerLogin = `
    <form id="login-form" name="login-form">
        <div class="login-div1">
            <div class="login-div2">
                <h1>Login de Usuario</h1>
                <label for="login_name">Ingrese su nombre</label>
                <input type="text" name="login_name" class="border rounded shadow mb-5 bg-body border-secondary" required>
                <button type="submit" id="submit-login" value="send" class="btn btn-secondary btn-lg">Enviar</button>
            </div>
        </div>
    </form>
`
login.innerHTML = innerLogin;