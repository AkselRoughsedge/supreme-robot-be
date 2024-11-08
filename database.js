const { Client } = require('pg')

const client = new Client({
    host: "localhost",
    port: 5432,
    database: "aksel",
    user: "postgres",
    password: "5sDXzU4368LV"
})

client.connect();

client.query(`SELECT * FROM users`, (err, res) => {
    if (!err) {
        console.log(res.rows)
    } else if (err) {
        console.log("There was an error!")
        console.log(err.message)
    }
    client.end();
})