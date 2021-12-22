const express = require('express');
const {verifyToken} = require("../validate/jwt");
const {
    createD,
    getD,
    editD,
    deleteD,
    getDALL} = require("../controllers/diem");
const router = express.Router();

router.post('/create',verifyToken,createD);
router.post('/edit',verifyToken,editD);
router.delete('/delete/:id',verifyToken,deleteD);
router.get('/get/all',verifyToken,getDALL);
router.get('/get/:id',verifyToken,getD);


module.exports = router;