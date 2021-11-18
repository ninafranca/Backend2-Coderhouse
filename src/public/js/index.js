document.addEventListener("submit", sendForm)

function sendForm(e) {
    e.preventDefault()
    let form = document.getElementsByTagName("form")
    let data = new FormData(form)
    fetch('/api/products',{
        method:'POST',
        body:data
    }).then(result => {
        console.log(data)
        return result.json();
    }).then(json => {
        Swal.fire({
            title:'Éxito',
            text:json.message,
            icon:'success',
            timer:2000,
        }).then(result=>{
            location.href='/'
        })
    })
}