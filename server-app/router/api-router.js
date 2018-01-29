import { Error } from 'mongoose';

const router = require('express').Router()
const bodyParser = require('body-parser')
const User = require('../models/user')

const jsonParser = bodyParser.json()

router.post('/signup', jsonParser, (req, res) => {
    User.findOne({ email: req.body.email }).then(response => {
        if (response) {
            res.send({ message: 'We already have user with such email' })
        } else {
            new User(req.body)
                .save()
                .then(respose => {
                    res.send({ message: 'New user added' })
                })

        }
    })
})

router.post('/login', jsoParser, (req, res) => {
    User.findOne({ email: req.body.email }).then(response => {
        if (response) {
            User.getAuthenticated(req.body.username, req.body.password, (err, user) => {
                if (err) throw Error(err)

                if (user) {
                    res.send('new user added')
                }
            })
        } else {
            res.send('there is no user with such email')
        }
    })
})

module.exports = router