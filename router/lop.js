const express = require('express');
const {verifyToken} = require("../validate/jwt");
const {
    createL,
    getL,
    editL,
    deleteL,
    getLALL,searchMsl,getLSV} = require("../controllers/lop");
const router = express.Router();

router.post('/create',verifyToken,createL);
router.post('/edit',verifyToken,editL);
router.delete('/delete/:id',verifyToken,deleteL);
router.get('/get/all',verifyToken,getLALL);
router.get('/get/:id',verifyToken,getL);
router.get('/search/:malop',verifyToken,searchMsl);
router.get('/sv/:id',verifyToken,getLSV);

module.exports = router;