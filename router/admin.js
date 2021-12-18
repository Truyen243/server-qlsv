const express = require('express');
const router = express.Router();
const {createAmin, getAdminId,loginAdmin,verifyEmailAdmin} = require('../controllers/admin');
const {verifyToken} = require('../validate/jwt');

router.get('/get/:id', verifyToken, getAdminId);
router.post('/create', createAmin);
router.post('/login', loginAdmin);
router.get('/verify/email/:email/code/:code',verifyEmailAdmin);

module.exports = router;