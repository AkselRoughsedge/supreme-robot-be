const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');
const { Client } = require('pg')

const client = new Client({
    host: "localhost",
    port: 5432,
    database: "aksel",
    user: "postgres",
    password: "5sDXzU4368LV"
})

client.connect()
app.use(cors())

//Allows us to access the body of our requests
app.use(express.urlencoded({ extended:true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const userRouter = require("./routes/users")

app.use("/users", userRouter)