const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    res.send("Create user")
    console.log(req.body)
})

router.get('/', (req, res) => {
    res.send("Get all users")
})

router.route("/:id").get((req, res) => {
    console.log(req.user)
    res.send(`Get user with id ${req.params.id}`)
}).put((req, res) => {
    res.send(`Update user with id ${req.params.id}`)
}).delete((req, res) => {
    res.send(`Delete user with id ${req.params.id}`)
})

const Users = [{name:"Aksel"}, {name:"Anna"}]

//Anytime a request is used that uses "id", this middleware will run.
//This completes before the response is sent.
//We save the user inside "req.user", and we can call this anywhere in the file.
router.param("id", (req, res, next, id) => {
    console.log(id)
    req.user = Users[id]
    next()
})

module.exports = router