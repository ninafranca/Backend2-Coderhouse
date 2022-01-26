let input = document.getElementById("info");
let email = document.getElementById("user");
let enter = document.getElementById("send-message");
let chatForm = document.getElementById("chat-form");

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let info = new FormData(chatForm);
    if(input.value && email.value) {
        socket.emit('message', {email: email.value, message: input.value});
        input.value = "";
    }
    let sendObject = {
        author: {
            email: info.get("email"),
            first_name: info.get("first_name"),
            last_name: info.get("last_name"),
            alias: info.get("alias"),
            avatar: info.get("avatar"),
            age: info.get("age")
        },
        text: info.get("text")
    }
    fetch("/api/chats", {
        method: "POST",
        body: JSON.stringify(sendObject),
        headers: {"Content-Type":"application/json"}
    }).then(result => result.json()).then(json => {
        input.value = "";
    })
})

//CUANDO RECIBA EL WELCOME, CON LA DATA QUE ME HAYA PASADO, VOY A EJECUTAR X
socket.on("messagelog", data => {
    let p = document.getElementById("log");
    let avatar = document.getElementById("avatar").value;
    let date = new Date();
    let mensajes = data.map(message => {
        return `<div class="sent-msg"><img src="${avatar}" alt="Avatar"><span class="user">${message.email}</span> <span class="date">[${date.toLocaleString()}] </span><span class="message">${message.message}</span></div>`
    }).join("");
    p.innerHTML = mensajes;
})