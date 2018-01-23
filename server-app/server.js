const express = require('express')
const router = require('./router/api-router')
const mongoose = require('mongoose')
const keys = require('./utils/keys')

mongoose.connect(`mongodb://${keys.db.username}:${keys.db.password}@${keys.db.uri}/emojifier`, (err, db) => {
    if (err) {
        console.log(`${err.name}: ${err.message}`)
    } else {
        console.log('DB connection is ON')
    }
    })


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


