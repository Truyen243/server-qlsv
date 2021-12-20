const express = require('express');
const {verifyToken} = require("../validate/jwt");
const {
    createK,
    getK,
    editK,
    deleteK,
    getKALL} = require("../controllers/khoa");
const router = express.Router();

router.post('/create',verifyToken,createK);
router.post('/edit',verifyToken,editK);
router.delete('/delete/:id',verifyToken,deleteK);
router.get('/get/:id',verifyToken,getK);
router.get('/get/all',verifyToken,getKALL);
module.exports = router;