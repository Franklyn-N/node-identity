const express = require('express');

const dataController = require('../controllers/data');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/credentials', dataController.getCredentials);

router.get('/credential/:dataId', isAuth, dataController.getCredential);

router.post('/data', dataController.createData);

router.post('/update/:dataId', dataController.updateData);

router.post('/updates/:dataId', dataController.updateCreds);

module.exports = router; 