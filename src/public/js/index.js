document.addEventListener("submit", sendForm(e));

function sendForm(e) {
    e.preventDefault();
    let form = document.getElementById("product-form");
    let data = new FormData(form);
    console.log("Form")
    fetch('http://localhost:8080/api/products',{
        method: "POST",
        body: data
    })
    .then(result => {
        console.log(data);
        return result.json();
    })
    .catch(() => {
        return {status: "error", message: "Error al enviar el producto"}
    })
}