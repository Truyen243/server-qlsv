const express = require('express');
const {verifyToken} = require("../validate/jwt");
const {createSV, getSV} = require("../controllers/sinhvien");
const router = express.Router();

router.post('/create',verifyToken,createSV);
router.get('/get/:id',verifyToken,getSV);

module.exports = router;