const express = require('express');
const router = express.Router();

router.get('/test',((req, res) => {
    res.sendFile(__dirname + '/121_1- Cutting Edge Pre-Intermediate Students_ Book_2013 -177p.pdf');
}))

module.exports = router;