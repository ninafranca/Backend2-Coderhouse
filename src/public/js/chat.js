//INSTANCIO EL IO
const socket = io();
let input = document.getElementById("info");
let user = document.getElementById("user");

input.addEventListener("keyup", (e) => {
    if(e.key === "Enter") {
        if(e.target.value) {
            socket.emit('message', {user: user.value, message: e.target.value});
        }
    }
})

//CUANDO RECIBA EL WELCOME, CON LA DATA QUE ME HAYA PASADO, VOY A EJECUTAR X
socket.on("welcome", data => {
    alert(data.message);
});
socket.on("messagelog", data => {
    let p = document.getElementById("log");
    let mensajes = data.map(message => {
        return `<div><span>${message.user} dice: ${message.message}</span></div>`
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