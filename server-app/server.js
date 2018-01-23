const express = require('express')
const router = require('./router/api-router')

const server = express()

const port = process.env.PORT || 3003


server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

server.use('/api', router)

server.listen(port , () => {
    console.log(`Listen port: ${port}`)
})


