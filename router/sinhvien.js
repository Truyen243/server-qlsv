const express = require('express');
const {verifyToken} = require("../validate/jwt");
const { createSV,
    getSV,
    editSV,
    deleteSV,
    getSVALL} = require("../controllers/sinhvien");
const router = express.Router();

router.post('/create',verifyToken,createSV);
router.post('/edit',verifyToken,editSV);
router.post('/delete',verifyToken,deleteSV);
router.get('/get/:id',verifyToken,getSV);
router.get('/get/all',verifyToken,getSVALL);

module.exports = router;