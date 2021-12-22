const express = require('express');
const {verifyToken} = require("../validate/jwt");
const {
    createMH,
    getMH,
    editMH,
    deleteMH,
    getMHALL,} = require("../controllers/monhoc");
const router = express.Router();

router.post('/create',verifyToken,createMH);
router.post('/edit',verifyToken,editMH);
router.delete('/delete/:id',verifyToken,deleteMH);
router.get('/get/all',verifyToken,getMHALL);
router.get('/get/:id',verifyToken,getMH);


module.exports = router;