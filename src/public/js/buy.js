let plus = document.getElementById("plus");
let minus = document.getElementById("minus");
let counter = document.getElementById("counter-value");

function deleteProduct (cartId, prodId) {
    fetch(`http://localhost:8080/api/carrito/${cartId}/productos/${prodId}`, {
        method: "DELETE",
        headers: {"Content-type": "application/json"}
    })
    .then(result=> {
        return result.json()
    })
    .then(json=> {
        location.reload()
    })
    .catch(() => {
        return {status: "error", message: "Error al borrar el producto"}
    })
}

function addProduct (cartId, prodId) {
    fetch(`http://localhost:8080/api/carrito/${cartId}/productos/${prodId}`, {
        method: "POST",
        headers: {"Content-type": "application/json"}
    })
    .then(result=> {
        return result.json()
    })
    .then(json=> {
        location.reload()
    })
    .catch(() => {
        return {status: "error", message: "Error al agregar producto"}
    })
}

function deleteCart (cartId) {
    fetch(`http://localhost:8080/api/carrito/${cartId}`, {
        method: "DELETE",
        headers: {"Content-type": "application/json"}
    })
    .then(result=> {
        return result.json()
    })
    .then(json=> {
        location.reload()
    })
    .catch(() => {
        return {status: "error", message: "Error al borrar el producto"}
    })
}

function newOrder (cartId, userId) {
    fetch(`http://localhost:8080/orders/cart/${cartId}/user/${userId}`, {
        method: "POST",
        headers: {"Content-type": "application/json"}
    })
    .then(result=> {
        return result.json()
    })
    .then(json=> {
        location.reload()
    })
    .catch(() => {
        return {status: "error", message: "Error al crear órden"}
    })
}

function buyProduct (userId, prodId) {
    fetch(`http://localhost:8080/api/carrito/usuario/${userId}/producto/${prodId}`, {
        method: "POST",
        headers: {"Content-type": "application/json"}
    })
    .then(result=> {
        return result.json()
    })
    .then(json=> {
        location.reload()
    })
    .catch(() => {
        return {status: "error", message: "Error al comprar el producto"}
    })
}