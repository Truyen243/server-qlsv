const express = require('express');
const {verifyToken} = require("../validate/jwt");
const { createSV,
    getSV,
    editSV,
    deleteSV,
    getSVALL,
searchMssv} = require("../controllers/sinhvien");
const router = express.Router();

router.post('/create',verifyToken,createSV);
router.post('/edit',verifyToken,editSV);
router.delete('/delete/:id',verifyToken,deleteSV);
router.get('/get/:id',verifyToken,getSV);
router.get('/get/all',verifyToken,getSVALL);
router.get('/search/:mssv',verifyToken,searchMssv);

module.exports = router;