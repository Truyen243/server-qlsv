const express = require('express');
const {verifyToken} = require("../validate/jwt");
const {
    createMH,
    getMH,
    editMH,
    deleteMH,
    getMHALL} = require("../controllers/monhoc");
const router = express.Router();

router.post('/create',verifyToken,createMH);
router.post('/edit',verifyToken,editMH);
router.delete('/delete',verifyToken,deleteMH);
router.get('/get/:id',verifyToken,getMH);
router.get('/get/all',verifyToken,getMHALL);

module.exports = router;