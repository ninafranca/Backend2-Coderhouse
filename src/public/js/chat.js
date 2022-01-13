let input = document.getElementById("info");
let email = document.getElementById("user");
let enter = document.getElementById("send-message");

input.addEventListener("keyup", (e) => {
    if(e.key === "Enter") {
        if(e.target.value && email.value) {
            socket.emit('message', {email: email.value, message: e.target.value});
            input.value = "";
        }
    }
})

enter.addEventListener("click", ()=> {
    if(input.value && email.value) {
        socket.emit('message', {email: email.value, message: input.value});
        input.value = "";
    }
})

//CUANDO RECIBA EL WELCOME, CON LA DATA QUE ME HAYA PASADO, VOY A EJECUTAR X
socket.on("messagelog", data => {
    let p = document.getElementById("log");
    let date = new Date();
    let mensajes = data.map(message => {
        return `<div><span class="user">${message.email}</span> <span class="date">[${date.toLocaleString()}]</span><span class="message">: ${message.message}</span></div>`
    }).join("");
    p.innerHTML = mensajes;
})

document.addEventListener("submit", sendChat);

function sendChat(e) {
    console.log(1);
    e.preventDefault();
    let form = document.querySelector("#chat-form");
    let data = new FormData(form);
    let id = data.get("id");
    let first_name = data.get("first_name");
    let last_name = data.get("last_name");
    let age = data.get("age");
    let avatar = data.get("avatar");
    let alias = data.get("alias");
    let message = data.get("message");
    let object = {id, first_name, last_name, age, avatar, alias, message};
    fetch("http://localhost:8080/api/chats", {
        method: "POST",
        body: JSON.stringify(object),
        headers: {"Content-type": "application/json"}
    })
    .then(result => {
        console.log(object);
        return result.json();
    })
    .catch(() => {
        return {status: "error", message: "Error al enviar el mensaje"}
    })
}