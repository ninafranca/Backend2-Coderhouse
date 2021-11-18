const express = require('express')
const router = express.Router();
const Contenedor = require('../classes/Contenedor')
const contenedor  = new Contenedor();

//GETS
router.get('/',(req,res)=>{
    contenedor.getAll().then(result=>{
        res.send(result);
    })
})

/*router.get('/:uid',(req,res)=>{
    let id= parseInt(req.params.uid);
    contenedor.getUserById(id).then(result=>{
        res.send(result);
    })
})
//POSTS
router.post('/',(req,res)=>{
    let user = req.body;
    console.log(user);
    contenedor.registerUser(user).then(result=>{
        res.send(result);
    })
})
//PUTS
router.put('/:uid',(req,res)=>{
    let body = req.body;
    let id = parseInt(req.params.uid);
    contenedor.updateUser(id,body).then(result=>{
        res.send(result);
    })
})
//DELETES
router.delete('/:uid',(req,res)=>{
    let id= parseInt(req.params.uid);
    contenedor.deleteUser(id).then(result=>{
        res.send(result);
    })
})
*/

module.exports = router