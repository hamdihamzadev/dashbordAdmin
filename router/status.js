const express = require('express');
const router = express.Router();

const Controller = require('../controller/status');
const authAdmin = require('../middlware/authAdmin')

router.post('/Addstatus',authAdmin,Controller.createStatus);
router.get('/AllStatusByAdmin',authAdmin,Controller.getStatus);
router.put('/UpdateStatus/:id',authAdmin,Controller.updateStatus);

module.exports = router;