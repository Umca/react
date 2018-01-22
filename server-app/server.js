const express = require('express')

const server = express()

const port = process.env.PORT || 3001

server.listen(port , () => {
    console.log(`Listen port: ${port}`)
})

server.get('/', (req, res) => {
    res.send('hi there')
})