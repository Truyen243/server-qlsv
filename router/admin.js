const express = require('express');
const router = express.Router();
const {createAmin, getAdminId,loginAdmin,verifyEmailAdmin,forgotAdmin} = require('../controllers/admin');
const {verifyToken} = require('../validate/jwt');

router.get('/get/:id', verifyToken, getAdminId);
router.post('/create', createAmin);
router.post('/login', loginAdmin);
router.post('/forgot/:id',forgotAdmin);
router.get('/verify/email/:email/code/:code',verifyEmailAdmin);

module.exports = router;