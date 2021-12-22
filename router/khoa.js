const express = require('express');
const {verifyToken} = require("../validate/jwt");
const {
    createK,
    getK,
    editK,
    deleteK,
    getKALL,searchMK} = require("../controllers/khoa");

const router = express.Router();

router.post('/create',verifyToken,createK);
router.post('/edit',verifyToken,editK);
router.delete('/delete/:id',verifyToken,deleteK);
router.get('/get/all',verifyToken,getKALL);
router.get('/get/:id',verifyToken,getK);
router.get('/search/:makhoa',verifyToken,searchMK);

module.exports = router;