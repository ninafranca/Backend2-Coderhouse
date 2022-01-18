let input = document.getElementById("info");
let email = document.getElementById("user");
let enter = document.getElementById("send-message");
let chatForm = document.getElementById("chat-form");

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

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let info = new FormData(chatForm);
    let sendObject = {
        id: email,
        first_name: info.get("first_name"),
        last_name: info.get("last_name"),
        alias: info.get("alias"),
        avatar: info.get("avatar"),
        age: info.get("age"),
        text: input
    }
    fetch("/api/chats", {
        method: "POST",
        body: JSON.stringify(sendObject),
        headers: {"Content-Type":"application/json"}
    }).then(result => result.json()).then(json => {
        chatForm.reset();
    })
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