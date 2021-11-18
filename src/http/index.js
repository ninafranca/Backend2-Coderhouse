const http = require("http")

const server = http.createServer((petition, response) => {
    response.end("LEVANTANDO UN SERVIDOR")
})

const connectedServer = server.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080")
})

