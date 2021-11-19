document.addEventListener("submit", sendForm);

function sendForm(e) {
    e.preventDefault();
    let form = document.getElementsByTagName("form");
    let data = new FormData(form);
    fetch('/api/products',{
        method: 'POST',
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