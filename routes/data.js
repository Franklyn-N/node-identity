const express = require('express');

const dataController = require('../controllers/data');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/credentials', isAuth, dataController.getCredentials);

router.get('/credential/:dataId', isAuth, dataController.getCredential);

router.post('/data', isAuth, dataController.createData);

router.post('/update/:dataId', isAuth, dataController.updateData);

module.exports = router; 