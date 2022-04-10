let buy = document.getElementById("buy-form");

buy.addEventListener("click", (e) => {
    e.preventDefault();
    let data = new FormData(buy);
    let productId = data.get("product-id");
    console.log(productId);
    fetch(`/api/carrito/${productId}`, {
        method: "POST",
        body: JSON.stringify(productId),
        headers: {"Content-type": "application/json"}
    })
    // let userId = req.user.payload.toObject();
    // .then(result => {
    //     if (result.status === 200) {
    //     let sent = document.getElementById("sent");
    //     let sentObject = `<h2 class="sent-object">Producto añadido con éxito</h2>`;
    //     sent.innerHTML = sentObject;
    //     productForm.reset();
    //     setTimeout(() => {
    //         sent.innerHTML = "";
    //     }, 1500)
    //     return result.json();
    //     }
    // })
    // .catch(() => {
    //     return {status: "error", message: "Error al enviar el producto"}
    // })
})