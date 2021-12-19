const express = require('express');
const {verifyToken} = require("../validate/jwt");
const {
    createL,
    getL,
    editL,
    deleteL,
    getLALL} = require("../controllers/lop");
const router = express.Router();

router.post('/create',verifyToken,createL);
router.post('/edit',verifyToken,editL);
router.delete('/delete',verifyToken,deleteL);
router.get('/get/:id',verifyToken,getL);
router.get('/get/all',verifyToken,getLALL);
module.exports = router;