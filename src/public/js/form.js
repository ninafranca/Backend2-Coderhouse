document.addEventListener("submit", sendForm);
const socket = io();

function sendForm(e) {
    e.preventDefault();
    let form = document.querySelector("#product-form");
    let data = new FormData(form);
    let title = data.get("title");
    let price = data.get("price");
    let thumbnail = data.get("thumbnail");
    let object = {title, price, thumbnail};
    fetch("http://localhost:8080/api/products", {
        method: "POST",
        body: JSON.stringify(object),
        headers: {"Content-type": "application/json"}
    })
    .then(result => {
        console.log(object);
        let sent = document.getElementById("sent");
        let sentObject = `<h2 class="sent-object">Producto añadido con éxito</h2>`;
        sent.innerHTML = sentObject;
        let form = document.getElementById("product-form");
        form.reset();
        setTimeout(() => {
            sent.innerHTML = "";
        }, 1500)
        return result.json();
    })
    .catch(() => {
        return {status: "error", message: "Error al enviar el producto"}
    })
}

socket.on("deliverProducts", data => {
    let products = data.payload;
    fetch("templates/productTable.handlebars").then(string => string.text()).then(template => {
        const processedTemplate = Handlebars.compile(template);
        const templateObject = {
            products: products
        }
        const html = processedTemplate(templateObject);
        let div = document.getElementById("deliverProducts");
        div.innerHTML = html;
    })
})