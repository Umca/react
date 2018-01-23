const router = require('express').Router()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

router.post('/signup', jsonParser, (req, res) => {
    console.log(req.body)
    res.send({"a": "1"})
})

module.exports = router