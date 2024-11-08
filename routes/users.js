const express = require('express')
const router = express.Router()
const { Client } = require('pg')

const client = new Client({
    host: "localhost",
    port: 5432,
    database: "aksel",
    user: "postgres",
    password: "5sDXzU4368LV"
})

client.connect();

router.post('/', (req, res) => {
    console.log(req.body)

    //Search for the user by email
    let querySearch = 'SELECT * FROM users WHERE LOWER(email) = LOWER($1)';
    client.query(querySearch, [req.body.email], (err, resSearch) => {
        if (err) {
            console.log("Error searching database");
            console.log(err.message);
            res.status(500).send("Error searching database");
            client.end();
            return;
        }

        //If user does not exist, create a new user
        if (resSearch.rows.length === 0) {
            let queryCreate = "INSERT INTO users (email, password) VALUES ($1, $2)";
            client.query(queryCreate, [req.body.email, req.body.password], (err, resCreate) => {
                if (err) {
                    console.log("Error creating user");
                    console.log(err.message)
                    res.status(500).send("Error creating user");
                } else {
                    console.log("User created successfully");
                    res.status(201).send("User created successfully");
                }
                client.end();
            });
        } else {
            console.log("User already exists");
            res.status(400).send("User already exists");
            client.end();
        }
    })
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

const Users = [{ name: "Aksel" }, { name: "Anna" }]

//Anytime a request is used that uses "id", this middleware will run.
//This completes before the response is sent.
//We save the user inside "req.user", and we can call this anywhere in the file.
router.param("id", (req, res, next, id) => {
    console.log(id)
    req.user = Users[id]
    next()
})

module.exports = router