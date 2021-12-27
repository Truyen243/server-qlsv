const express = require('express');
const {verifyToken} = require("../validate/jwt");
const {
    createMH,
    getMH,
    editMH,
    deleteMH,
    getMHALL,
getMHD} = require("../controllers/monhoc");
const router = express.Router();

router.post('/create',verifyToken,createMH);
router.post('/edit',verifyToken,editMH);
router.delete('/delete/:id',verifyToken,deleteMH);
router.get('/get/all',verifyToken,getMHALL);
router.get('/get/:id',verifyToken,getMH);
router.get('/diem/:mamonhoc',verifyToken,getMHD);


module.exports = router;