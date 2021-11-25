document.addEventListener("submit", sendForm);

function sendForm(e) {
    e.preventDefault();
    let form = document.querySelector("#product-form");
    let data = new FormData(form);
    let product = data.get("product");
    let price = data.get("price");
    let thumbnail = data.get("thumbnail");
    let object = {product, price, thumbnail};
    fetch("http://localhost:8080/api/products", {
        method: "POST",
        body: JSON.stringify(object),
        headers: {"Content-type": "application/json"}
    })
    .then(result => {
        console.log(object);
        return result.json();
    })
    .catch(() => {
        return {status: "error", message: "Error al enviar el producto"}
    })
}