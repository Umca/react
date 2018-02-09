//import { Error } from 'mongoose';

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
                .then(response => {
                    res.send({ message: 'New user added' })
                })

        }
    })
})

router.post('/login', jsonParser, (req, res) => {
    User.findOne({ email: req.body.email }).then(response => {
        if (response) {
            User.getAuthenticated(req.body.email, req.body.password, (err, user) => {
                console.log(err, user)
                if (err) throw Error(err)
                if (user) {
                    res.send({message: 'we have such user'})
                }
            })
        } else {
            res.send({message: 'there is no user with such email'})
        }
    })
})

module.exports = router