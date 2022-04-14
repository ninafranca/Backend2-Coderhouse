// let buy = document.getElementById("buy-form");
// let productId = document.getElementById("product-id").innerHTML;
// let userId = document.getElementById("user-id").innerHTML;

// buy.addEventListener("click", (e) => {
//     e.preventDefault();
//     let object = {
//         prod_id: productId,
//         user_id: userId
//     };
//     console.log(object);
//     fetch(`/api/carrito/usuario/${object.user_id}/producto/${object.prod_id}`, {
//         method: "POST",
//         body: JSON.stringify(object),
//         headers: {"Content-type": "application/json"}
//     })
//     .then(result => result.json())
//     .then(json => {
//         console.log(json);
//     })
//     .catch(() => {
//         return {status: "error", message: "Error al enviar el producto"}
//     })
// })