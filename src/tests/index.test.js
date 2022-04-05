import supertest from "supertest";
import {expect} from "chai";
import { envConfig } from "../config/envConfig.js";

const request = supertest(`http://localhost:${envConfig.PORT}`);

describe("Test API", () => {

    describe("GET", () => {
        it("La petición debería retornar todos los chats", async () => {
            let res = await request.get("/api/chats");
            expect(res.status).to.equal(200)
        })

        it("La petición debería retornar todos los productos", async () => {
            let res = await request.get("/api/productos");
            expect(res.status).to.equal(200)
        })

        it("La petición debería retornar todos los usuarios", async () => {
            let res = await request.get("/users");
            expect(res.status).to.equal(200)
        })
    })

    describe("POST", () => {
        it("Debe poder guardar un producto", async () => {
            let product = {
                title: "Legend",
                brand: "Montblanc",
                code: "legend-montblanc",
                price: 89,
                stock: 25,
                description: "Legend Parfum by Montblanc",
                gender: "hombre",
                thumbnail: "http://rouge.com/legend.jpg"
            }
            let res = await request.post("/login").send(product)
            expect(res.status).to.be.equal(200)
        })

        it("Debe poder hacer un login", async () => {
            let user = {
                email: "nina@user.com",
                password: "123"
            }
            let res = await request.post("/login").send(user)
            expect(res.status).to.be.equal(200)
        })
    })

})

// import TODOS from "./TODOS.js";
// import assert from "assert";

// describe("Pruebas de TODOS", () => {
//     it("Si instancio la clase debe estar vacía", () => {
//         const todos = new TODOS();
//         assert.strictEqual(todos.list().length, 0)
//     })
// });

// describe("Errores en TODOS", () => {
//     it("Debe arrojar error si no tengo tareas al querer completar", () => {
//         const todos = new TODOS();
//         const expected = new Error("No tasks");
//         assert.throws(() => {
//             todos.completeTodo("abc");
//         }, expected);
//     })
// });