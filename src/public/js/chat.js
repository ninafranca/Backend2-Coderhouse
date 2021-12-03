//INSTANCIO EL IO
let input = document.getElementById("info");
let user = document.getElementById("user");
let enter = document.getElementById("send-message");

input.addEventListener("keyup", (e) => {
    if(e.key === "Enter") {
        if(e.target.value && user.value) {
            socket.emit('message', {user: user.value, message: e.target.value});
            input.value = "";
        }
    }
})
enter.addEventListener("click", ()=> {
    if(input.value && user.value) {
        socket.emit('message', {user: user.value, message: input.value});
        input.value = "";
    }
})

//CUANDO RECIBA EL WELCOME, CON LA DATA QUE ME HAYA PASADO, VOY A EJECUTAR X
/*socket.on("welcome", data => {
    alert(data.message);
});*/
socket.on("messagelog", data => {
    let p = document.getElementById("log");
    let date = new Date();
    let mensajes = data.map(message => {
        return `<div><span class="user">${message.user}</span> <span class="date">[${date}]</span><span class="message">: ${message.message}</span></div>`
    }).join("");
    p.innerHTML = mensajes;
})

/*socket.on("log", data => {
    let div = document.getElementById("log");
    if(div.firstChild) div.removeChild(div.firstChild);
    let p = document.createElement("p");
    p.innerHTML = data;
    div.appendChild(p);
})*/