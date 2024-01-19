if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const cors = require("cors")

const express = require('express')
const router = require('./routers');
const errorHandlers = require("./middlewares/errorHandlers");

const app = express()
// const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())


app.use(router)

app.use(errorHandlers)

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports = app