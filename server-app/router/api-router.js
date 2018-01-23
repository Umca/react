const router = require('express').Router()
const bodyParser = require('body-parser')
const User = require('../models/user')

const jsonParser = bodyParser.json()

router.post('/signup', jsonParser, (req, res) => {
    User.findOne({ email: req.body.email }).then(response => {
        if (response) {
            res.send({message: 'We already have user with such email'})
        } else {
            new User(req.body)
                .save()
                .then(response => res.send({ "message": "New user added to db" }))
            
        }
    })
    
})

module.exports = router