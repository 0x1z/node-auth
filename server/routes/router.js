const express = require('express');
const router = express.Router();
const authController = require('../controller/controller');
router.get('/sign_up', authController.sign_upGet);
router.post('/sign_up', authController.sign_upPost);
router.get('/log_in', authController.log_inGet);
router.post('/log_in', authController.log_inPost);
router.get('/log_out', authController.log_outGet);
module.exports = router;